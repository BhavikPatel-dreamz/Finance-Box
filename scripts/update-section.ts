import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import * as L from "./lib/sections";
import * as U from "./lib/section-field-updater";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const isDry = args.includes("--dry-run");
const isYes = args.includes("--yes");
const layout = args.find((a) => !a.startsWith("--"));

const COMPONENTS_DIR = path.join(ROOT, "src/components/sections");
const QUERIES_DIR = path.join(ROOT, "src/lib/wordpress/queries/sections");

async function main() {
  if (!layout) {
    console.error("Usage: npm run update-section <acf_layout_name> [--dry-run] [--yes]");
    process.exit(1);
  }

  const schema = await L.loadSchema();
  const type = L.findType(schema, layout);
  if (!type) {
    console.error(`Layout type not found: ${L.layoutTypeName(layout)}`);
    process.exit(1);
  }

  const newFragment = L.fragmentContent(layout, type, schema);
  const fragmentPath = path.join(QUERIES_DIR, `${L.pascalCase(layout)}Section.graphql`);
  const componentPath = path.join(COMPONENTS_DIR, `${L.kebabCase(layout)}-section.tsx`);

  if (!fs.existsSync(fragmentPath)) {
    console.error("Fragment does not exist; use new-section first.");
    process.exit(1);
  }
  if (!fs.existsSync(componentPath)) {
    console.error("Component does not exist; use new-section first.");
    process.exit(1);
  }

  const oldContent = fs.readFileSync(fragmentPath, "utf8");
  const newFields = (type.fields ?? []).filter((f) => !f.name.startsWith("__")).map((f) => f.name);
  const oldFields = [...oldContent.matchAll(/^\s+([a-zA-Z0-9_]+)\s*$/gm)].map((m) => m[1]);
  const added = newFields.filter((f) => !oldFields.includes(f));
  const removed = oldFields.filter((f) => !newFields.includes(f));

  const fieldKinds: Record<string, U.FieldKind> = {};
  for (const f of type.fields ?? []) {
    if (f.name.startsWith("__")) continue;
    fieldKinds[f.name] = U.classifyField(f, schema);
  }

  console.log("\nPLAN for", layout);
  console.log("Fragment changed:", oldContent.trim() !== newFragment.trim());
  if (added.length) console.log("Fields added:", added.join(", "));
  if (removed.length) console.log("Fields removed:", removed.join(", "));
  if (!added.length && !removed.length) console.log("No field changes detected.");
  console.log("Component:", path.relative(ROOT, componentPath));

  if (isDry) {
    console.log("\nDry run; no changes.");
    return;
  }

  let confirm = isYes;
  if (!confirm) {
    const rl = (await import("node:readline/promises")).createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question("Apply? (y/n) ");
    rl.close();
    confirm = answer.trim().toLowerCase() === "y";
  }
  if (!confirm) {
    console.log("Aborted.");
    return;
  }

  // Regenerate fragment
  fs.writeFileSync(fragmentPath, newFragment);
  console.log("Regenerated fragment:", path.relative(ROOT, fragmentPath));

  // schema + codegen
  execSync("npm run schema", { stdio: "inherit" });
  execSync("npm run codegen", { stdio: "inherit" });

  // read component and apply destructuring update
  const originalComponent = fs.readFileSync(componentPath, "utf8");
  const { next, result } = U.updateComponentDestructuring(componentPath, added, removed, fieldKinds);

  if (result.manual) {
    console.log(`\nManual edit required: ${result.manualReason}`);
    if (added.length) console.log("Fields added:", added.join(", "));
  } else {
    fs.writeFileSync(componentPath, next);
    console.log("\nComponent updated.");
    console.log("Fields added:", result.fieldsAdded.join(", ") || "(none)");
    console.log("Fields removed:", result.fieldsRemoved.join(", ") || "(none)");
    if (result.removedStillUsed.length) {
      console.log("Removed fields still used, not removed from destructure:");
      for (const r of result.removedStillUsed) {
        console.log(`  ${r}: lines ${result.usageLines[r].join(", ")}`);
      }
    }
    for (const name of result.fieldsAdded) {
      // TODOs are already inserted by updater; list them
      console.log(U.kindSnippet(name, fieldKinds[name] ?? "text"));
    }
  }

  // typecheck
  try {
    execSync("npm run typecheck", { stdio: "inherit" });
    console.log("\nTypecheck passed.");
  } catch (err) {
    if (!result.manual) {
      fs.writeFileSync(componentPath, originalComponent);
      console.log("\nTypecheck failed; reverted component changes.");
    }
    throw err;
  }

  console.log("\nUpdate complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
