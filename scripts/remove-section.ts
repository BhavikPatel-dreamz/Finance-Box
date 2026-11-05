import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import readline from "node:readline/promises";

const ROOT = path.resolve(process.cwd());
const ENV_PATH = path.join(ROOT, ".env");
if (fs.existsSync(ENV_PATH)) {
  for (const line of fs.readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

const REGISTRY_PATH = path.join(ROOT, "src/components/page-builder/section-registry.ts");
const QUERIES_DIR = path.join(ROOT, "src/lib/wordpress/queries/sections");
const COMPONENTS_DIR = path.join(ROOT, "src/components/sections");

const args = process.argv.slice(2);
const isDry = args.includes("--dry-run");
const isYes = args.includes("--yes");
const isOrphans = args.includes("--orphans");
const layout = args.find((a) => !a.startsWith("--"));

function pascalCase(input: string): string {
  return input
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function kebabCase(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

function componentExportName(layout: string): string {
  const pascal = pascalCase(layout);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1) + "Section";
}

function componentFileName(layout: string): string {
  return `${kebabCase(layout)}-section.tsx`;
}

function fragmentFileName(layout: string): string {
  return `${pascalCase(layout)}Section.graphql`;
}

function readLines(p: string): string[] {
  return fs.readFileSync(p, "utf8").split(/\r?\n/);
}

function registeredLayouts(): string[] {
  const dir = path.join(ROOT, "src/components/sections");
  const set = new Set<string>();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of src.matchAll(/layout:\s*"([^"]+)"/g)) set.add(m[1]);
  }
  return [...set];
}

async function loadSchema(): Promise<{ __schema: { types: { name: string }[] } }> {
  const url = (process.env.WORDPRESS_GRAPHQL_URL || "").replace(/\/?$/, "") + (process.env.WORDPRESS_GRAPHQL_URL?.endsWith("graphql") ? "" : "/graphql");
  const q = "query { __schema { types { name } } }";
  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: q }),
  });
  const j = await r.json();
  if (!j.data) throw new Error("schema introspection failed");
  return j.data;
}

async function main() {
  if (isOrphans) {
    const schema = await loadSchema();
    const acf = new Set(
      schema.__schema.types
        .map((t) => t.name)
        .filter((n) => n.startsWith("PageBuilderPageBuilder") && n.endsWith("Layout"))
        .map((n) => n.replace(/^PageBuilderPageBuilder/, "").replace(/Layout$/, "")),
    );
    const registered = registeredLayouts();
    const orphans = registered.filter((l) => !acf.has(pascalCase(l)));
    console.log("Registered sections missing from WP schema:");
    for (const o of orphans) console.log("  -", o);
    if (!orphans.length) console.log("  (none)");
    return;
  }

  if (!layout) {
    console.error("Usage: npm run remove-section <acf_layout_name> [--dry-run] [--yes]");
    process.exit(1);
  }

  const componentFile = path.join(COMPONENTS_DIR, componentFileName(layout));
  const fragmentFile = path.join(QUERIES_DIR, fragmentFileName(layout));
  const layoutName = pascalCase(layout);
  const exportName = componentExportName(layout);

  const filesToRemove = [componentFile, fragmentFile].filter((p) => fs.existsSync(p));

  // check imports elsewhere of the component
  const grepFiles: string[] = [];
  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) grepFiles.push(full);
    }
  }
  walk(path.join(ROOT, "src"));
  for (const f of grepFiles) {
    if (f === componentFile) continue;
    const src = fs.readFileSync(f, "utf8");
    if (src.includes(exportName)) {
      console.error(`Component is still imported/used in: ${path.relative(ROOT, f)}`);
      process.exit(1);
    }
  }

  console.log("Would remove:");
  if (filesToRemove.length) {
    for (const f of filesToRemove) console.log("  file:", path.relative(ROOT, f));
  } else {
    console.log("  (no files found)");
  }

  const registry = fs.readFileSync(REGISTRY_PATH, "utf8");
  const linesToRemove = registry
    .split(/\r?\n/)
    .filter((line) => line.includes(exportName) || line.includes(`${exportName},`));
  if (linesToRemove.length) {
    console.log("  registry lines:");
    for (const l of linesToRemove) console.log("    " + l.trim());
  }
  console.log("  note: no separate page-builder query spread to edit (fragments are auto-collected at codegen).");

  if (isDry) {
    console.log("Dry run only; nothing changed.");
    return;
  }

  if (!isYes) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await rl.question("Remove these? (y/n) ");
    rl.close();
    if (answer.trim().toLowerCase() !== "y") {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  for (const f of filesToRemove) fs.unlinkSync(f);
  const newRegistry = registry
    .split(/\r?\n/)
    .filter((line) => !(line.includes(exportName)))
    .join("\n");
  fs.writeFileSync(REGISTRY_PATH, newRegistry);

  console.log("Removed files + registry references.");
  console.log("Running schema, codegen, typecheck...");
  execSync("npm run schema", { stdio: "inherit" });
  execSync("npm run codegen", { stdio: "inherit" });
  execSync("npm run typecheck", { stdio: "inherit" });
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
