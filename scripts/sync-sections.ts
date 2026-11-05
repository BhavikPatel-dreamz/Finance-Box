import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import * as L from "./lib/sections";
import * as U from "./lib/section-field-updater";


const ROOT = process.cwd();
const args = process.argv.slice(2);
const isDry = args.includes("--dry-run");
const isYes = args.includes("--yes");

const COMPONENTS_DIR = path.join(ROOT, "src/components/sections");
const QUERIES_DIR = path.join(ROOT, "src/lib/wordpress/queries/sections");

async function main() {
  const schema = await L.loadSchema();
  console.log("WordPress URL:", process.env.WORDPRESS_GRAPHQL_URL || process.env.WORDPRESS_URL);
  const layouts = L.listLayouts(schema);
  if (!layouts.length || layouts.length < 3) {
    console.error("Schema fetch incomplete; aborting.");
    process.exit(1);
  }

  const registered = L.registeredLayouts();
  const newLayouts = layouts.filter((l) => !registered.includes(l));
  const removedLayouts = registered.filter((l) => !layouts.includes(l));
  const common = layouts.filter((l) => registered.includes(l));

  // detect changed fragments
  const changed: { layout: string; added: string[]; removed: string[]; usages: string[] }[] = [];
  for (const layout of common) {
    const type = L.findType(schema, L.layoutTypeName(layout));
    if (!type) continue;
    const newFragment = L.fragmentContent(layout, type, schema);
    const fragmentPath = path.join(QUERIES_DIR, `${L.pascalCase(layout)}.graphql`);
    if (!fs.existsSync(fragmentPath)) continue;
    const oldContent = fs.readFileSync(fragmentPath, "utf8");
    if (oldContent.trim() !== newFragment.trim()) {
      const newFields = (type.fields ?? []).filter((f) => !f.name.startsWith("__") && f.name !== "fieldGroupName").map((f) => f.name);
      // old fields from old fragment simple parse
      const oldFields = [...oldContent.matchAll(/^\s+([a-zA-Z0-9_]+)\s*$/gm)].map((m) => m[1]).filter((f) => !f.startsWith("__"));
      const added = newFields.filter((f) => !oldFields.includes(f));
      const removed = oldFields.filter((f) => !newFields.includes(f));
      // usages in component
      const componentPath = path.join(COMPONENTS_DIR, `${L.kebabCase(layout)}.tsx`);
      const usages: string[] = [];
      if (fs.existsSync(componentPath)) {
        const src = fs.readFileSync(componentPath, "utf8");
        for (const r of removed) {
          const re = new RegExp("\\\\b" + r + "\\\\b", "g");
          if (re.test(src)) usages.push(r);
        }
      }
      changed.push({ layout, added, removed, usages });
    }
  }

  console.log("\nPLAN:");
  console.log("NEW:");
  newLayouts.forEach((l) => console.log("  +", l));
  if (!newLayouts.length) console.log("  (none)");
  console.log("REMOVED:");
  removedLayouts.forEach((l) => console.log("  -", l));
  if (!removedLayouts.length) console.log("  (none)");
  console.log("CHANGED (fragment only):");
  for (const c of changed) {
    console.log("  ~", c.layout);
    if (c.added.length) console.log("    added fields:", c.added.join(", "));
    if (c.removed.length) {
      console.log("    removed fields:", c.removed.join(", "));
      if (c.usages.length) console.log("    component still uses removed fields:", c.usages.join(", "));
    }
  }
  if (!changed.length) console.log("  (none)");

  if (removedLayouts.length > 3) {
    console.log("\nMore than 3 removals; type 'remove' to confirm.");
  }

  if (isDry) {
    console.log("\nDry run only; no changes.");
    return;
  }

  let confirm = isYes;
  if (!confirm) {
    const rl = (await import("node:readline/promises")).createInterface({ input: process.stdin, output: process.stdout });
    const prompt = removedLayouts.length > 3
      ? "Type 'remove' to continue: "
      : "Apply? (y/n) ";
    const answer = await rl.question(prompt);
    rl.close();
    confirm = removedLayouts.length > 3 ? answer.trim() === "remove" : answer.trim().toLowerCase() === "y";
  }
  if (!confirm) {
    console.log("Aborted.");
    return;
  }

  // Apply new
  for (const l of newLayouts) {
    execSync(`npm run new-section -- ${l} --yes`, { stdio: "inherit" });
  }
  // Apply removed
  for (const l of removedLayouts) {
    execSync(`npm run remove-section -- ${l} --yes`, { stdio: "inherit" });
  }
  // Apply changed fragments
  for (const c of changed) {
    const type = L.findType(schema, L.layoutTypeName(c.layout))!;
    const newFragment = L.fragmentContent(c.layout, type, schema);
    const fragmentPath = path.join(QUERIES_DIR, `${L.pascalCase(c.layout)}.graphql`);
    fs.writeFileSync(fragmentPath, newFragment);
    console.log("Regenerated fragment:", path.relative(ROOT, fragmentPath));
  }

  execSync("npm run schema", { stdio: "inherit" });
  execSync("npm run codegen", { stdio: "inherit" });

  // Update component destructuring + TODOs for changed layouts.
  for (const c of changed) {
    const componentPath = path.join(COMPONENTS_DIR, `${L.kebabCase(c.layout)}.tsx`);
    if (!fs.existsSync(componentPath)) continue;
    const type = L.findType(schema, L.layoutTypeName(c.layout))!;
    const fieldKinds: Record<string, U.FieldKind> = {};
    for (const f of type.fields ?? []) {
      if (f.name.startsWith("__")) continue;
      fieldKinds[f.name] = U.classifyField(f, schema);
    }
    const original = fs.readFileSync(componentPath, "utf8");
    const fieldDefs: Record<string, L.GqlField> = {};
    for (const f of type.fields ?? []) if (!f.name.startsWith("__")) fieldDefs[f.name] = f;
    const currentFields = (type.fields ?? []).filter((f:any)=>!f.name.startsWith("__")).map((f:any)=>f.name);
    const { next, result } = U.updateComponentDestructuring(componentPath, currentFields, c.added, c.removed, fieldKinds, fieldDefs, schema);
    if (result.manual) {
      console.log(`\n${c.layout}: manual edit required (${result.manualReason}).`);
      if (c.added.length) console.log("  fields added:", c.added.join(", "));
    } else {
      fs.writeFileSync(componentPath, next);
      console.log(`\n${c.layout}: fields added [${result.fieldsAdded.join(", ") || "none"}], removed [${result.fieldsRemoved.join(", ") || "none"}].`);
      if (!result.autoAreaMissing) {
        console.log(`  auto-rendered: ${(result.autoFieldsRendered || []).join(", ") || "(none)"}; handled by JSX: ${(result.handledByJsx || []).join(", ") || "(none)"}`);
      } else {
        console.log("  no auto area present (older component); add fields manually.");
      }
      if (result.removedStillUsed.length) {
        for (const r of result.removedStillUsed) {
          console.log(`  ${r} still used: lines ${result.usageLines[r].join(", ")}`);
        }
      }
    }

    try {
      execSync("npm run typecheck", { stdio: "inherit" });
    } catch (err) {
      if (!result.manual) {
        fs.writeFileSync(componentPath, original);
        console.log(`\nTypecheck failed for ${c.layout}; reverted component changes.`);
      }
      throw err;
    }
  }

  console.log("\nSync complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
