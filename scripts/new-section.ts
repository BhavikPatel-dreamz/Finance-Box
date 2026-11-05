import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = path.resolve(process.cwd());

// Load .env without an extra dependency.
const envPath = path.join(ROOT, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
const SCHEMA_URL = process.env.WORDPRESS_GRAPHQL_URL || process.env.WORDPRESS_URL;
const REGISTRY_PATH = path.join(ROOT, "src/components/page-builder/section-registry.ts");
const QUERIES_DIR = path.join(ROOT, "src/lib/wordpress/queries/sections");
const COMPONENTS_DIR = path.join(ROOT, "src/components/sections");

type GqlType = { kind: string; name: string | null; ofType?: GqlType | null };

interface GqlField {
  name: string;
  type: GqlType;
  args?: unknown[];
}

interface IntrospectionType {
  name: string;
  kind: string;
  fields: GqlField[] | null;
}

interface Schema {
  __schema: { types: IntrospectionType[] };
}

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

function layoutTypeName(layout: string): string {
  return `PageBuilderPageBuilder${pascalCase(layout)}Layout`;
}

function unwrap(type: GqlType): { kind: string; name: string; modifiers: string[] } {
  const modifiers: string[] = [];
  let current: GqlType | null | undefined = type;
  while (current && (current.kind === "NON_NULL" || current.kind === "LIST")) {
    modifiers.push(current.kind);
    current = current.ofType ?? null;
  }
  return { kind: current?.kind ?? "SCALAR", name: current?.name ?? "Unknown", modifiers };
}

async function loadSchema(): Promise<Schema> {
  const introspectionQuery = `query IntrospectionQuery { __schema { types { name kind fields { name type { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } }`;
  const url = SCHEMA_URL?.replace(/\/?$/, "") + (SCHEMA_URL?.endsWith("graphql") ? "" : "/graphql");
  if (!url) throw new Error("WORDPRESS_GRAPHQL_URL not set");
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: introspectionQuery }),
  });
  if (!res.ok) throw new Error(`Introspection failed: ${res.status}`);
  const json = (await res.json()) as { data?: Schema; errors?: unknown };
  if (!json.data) throw new Error(`Introspection returned no data: ${JSON.stringify(json.errors)}`);
  return json.data;
}

function findType(schema: Schema, layout: string): IntrospectionType | null {
  const target = layoutTypeName(layout);
  return schema.__schema.types.find((t) => t.name === target) ?? null;
}

function listLayouts(schema: Schema): string[] {
  return schema.__schema.types
    .map((t) => t.name)
    .filter((name): name is string => Boolean(name && name.startsWith("PageBuilderPageBuilder") && name.endsWith("Layout") && name !== "PageBuilderPageBuilder_Layout"))
    .map((name) => name.replace(/^PageBuilderPageBuilder/, "").replace(/Layout$/, ""));
}

function registeredLayouts(): string[] {
  const dir = path.join(ROOT, "src/components/sections");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".tsx"));
  const set = new Set<string>();
  for (const f of files) {
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of src.matchAll(/layout:\s*"([^"]+)"/g)) set.add(m[1]);
  }
  return [...set];
}

function isImageField(typeName: string, fields: IntrospectionType["fields"]): boolean {
  const fieldNames = (fields ?? []).map((f) => f.name);
  return fieldNames.includes("node") || fieldNames.includes("sourceUrl") || fieldNames.includes("altText");
}

function isLinkField(fields: IntrospectionType["fields"]): boolean {
  const fieldNames = (fields ?? []).map((f) => f.name);
  return fieldNames.includes("url") && (fieldNames.includes("title") || fieldNames.includes("label"));
}

function generateFieldFragment(field: GqlField, schema: Schema, typeName: (n: string) => IntrospectionType | null, depth: number): string {
  const { name: ftName, modifiers } = unwrap(field.type);
  const isArray = modifiers.includes("LIST");
  const isNullable = !modifiers.includes("NON_NULL");
  const objType = typeName(ftName);

  if (depth > 4) {
    console.warn(`Max nesting depth reached at field "${field.name}".`);
    return "";
  }

  const indent = "  ".repeat(depth);

  if (!objType || objType.kind === "SCALAR" || objType.kind === "ENUM") {
    return `${indent}${field.name}`;
  }

  const subFields = objType.fields ?? [];
  if (isImageField(ftName, subFields)) {
    return `${indent}${field.name} {\n${indent}  node {\n${indent}    sourceUrl\n${indent}    altText\n${indent}    mediaDetails { width height }\n${indent}  }\n${indent}}`;
  }
  if (isLinkField(subFields)) {
    const parts = subFields.map((f) => f.name).filter((n) => ["title", "url", "target", "label"].includes(n));
    return `${indent}${field.name} {\n${indent}  ${parts.join(" ")}\n${indent}}`;
  }

  const inner = (subFields ?? [])
    .filter((f) => !f.name.startsWith("__"))
    .map((f) => generateFieldFragment(f, schema, typeName, depth + 1))
    .filter(Boolean)
    .join("\n");

  const body = inner ? `\n${inner}\n${indent}` : "";
  const open = isArray ? "\n" : "";
  return `${indent}${field.name} {${body}}`;
}

function fragmentContent(layout: string, type: IntrospectionType, schema: Schema): string {
  const typeName = (name: string) => schema.__schema.types.find((t) => t.name === name) ?? null;
  const fields = (type.fields ?? []).filter((f) => !f.name.startsWith("__"));
  const fieldLines = fields
    .map((f) => generateFieldFragment(f, schema, typeName, 1))
    .filter(Boolean)
    .join("\n");
  return `fragment ${pascalCase(layout)}Section on ${type.name} {
  __typename
${fieldLines}
}
`;
}

function kebabName(layout: string): string {
  return kebabCase(layout);
}

function componentContent(layout: string, fields: string[]): string {
  const pascal = pascalCase(layout);
  const typeImport = `${pascal}SectionFragment`;
  const destructure = fields.length ? `  const { ${fields.join(", ")} } = data;\n` : "";
  return `import { defineSection } from "@/lib/page-builder/types";
import type { ${typeImport} } from "@/lib/wordpress/generated/graphql";

/** ${pascal}Section — TODO: implement. */
export const ${pascal}Section = defineSection<${typeImport}>({
  layout: "${pascal}",
  render: (data) => {
${destructure}    return (
      <section>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    );
  },
});
`;
}

async function main() {
  const args = process.argv.slice(2);
  const isList = args.includes("--list");
  const isDry = args.includes("--dry-run");
  const layout = args.find((a) => !a.startsWith("--"));

  if (isList) {
    const schema = await loadSchema();
    const all = listLayouts(schema);
    const registered = new Set(registeredLayouts());
    const missing = all.filter((l) => !registered.has(l));
    console.log("ACF layouts without a registered component:");
    for (const l of missing) console.log("  -", l);
    if (!missing.length) console.log("  (none)");
    return;
  }

  if (!layout) {
    console.error("Usage: npm run new-section <acf_layout_name> [--dry-run]");
    process.exit(1);
  }

  const schema = await loadSchema();
  const type = findType(schema, layout);
  if (!type) {
    console.error(`Layout type not found: ${layoutTypeName(layout)}`);
    const suggestions = listLayouts(schema)
      .filter((l) => l.toLowerCase().includes(layout.toLowerCase().replace(/_/g, "")))
      .slice(0, 5);
    if (suggestions.length) {
      console.error("Closest matches:");
      for (const s of suggestions) console.error("  -", s);
    }
    process.exit(1);
  }

  const sectionName = `${pascalCase(layout)}Section`;
  const kebab = kebabName(layout);
  const fragmentPath = path.join(QUERIES_DIR, `${sectionName}.graphql`);
  const componentPath = path.join(COMPONENTS_DIR, `${kebab}-section.tsx`);

  if (fs.existsSync(fragmentPath) || fs.existsSync(componentPath)) {
    console.error("Section already exists; refusing to overwrite.");
    process.exit(1);
  }

  const fields = (type.fields ?? []).filter((f) => !f.name.startsWith("__"));
  const fieldNames = fields.map((f) => f.name);
  const typeLookup = (name: string) => schema.__schema.types.find((t) => t.name === name) ?? null;
  const fragment = fragmentContent(layout, type, schema);
  const component = componentContent(layout, fieldNames);

  if (isDry) {
    console.log("Dry run. Would create:");
    console.log("  ", fragmentPath);
    console.log("  ", componentPath);
    console.log("Fields:");
    for (const f of fields) console.log("  -", f.name, unwrap(f.type).name);
    console.log("\nFragment:\n" + fragment);
    return;
  }

  fs.mkdirSync(path.dirname(fragmentPath), { recursive: true });
  fs.mkdirSync(path.dirname(componentPath), { recursive: true });
  fs.writeFileSync(fragmentPath, fragment);
  fs.writeFileSync(componentPath, component);

  const registry = fs.readFileSync(REGISTRY_PATH, "utf8");
  const importLine = `import { ${sectionName.toLowerCase().replace(/section$/, "Section")} } from "@/components/sections/${kebab}-section";\n`.replace(sectionName.toLowerCase(), sectionName);
  const betterImport = `import { ${sectionName.charAt(0).toLowerCase()}${sectionName.slice(1)}Section } from "@/components/sections/${kebab}-section";\n`;
  const importInsert = registry.indexOf("const definitions = [");
  const updatedRegistry =
    registry.slice(0, importInsert) +
    betterImport +
    registry.slice(importInsert).replace(/\n\];\s*$/, `\n  ${sectionName.charAt(0).toLowerCase()}${sectionName.slice(1)}Section,\n];`);
  fs.writeFileSync(REGISTRY_PATH, updatedRegistry);

  console.log("Created:");
  console.log("  ", fragmentPath);
  console.log("  ", componentPath);
  console.log("Updated:", REGISTRY_PATH);
  console.log("\nFields found:");
  for (const f of fields) console.log("  -", f.name, unwrap(f.type).name);
  console.log("Schema + codegen...");
  execSync("npm run schema", { stdio: "inherit" });
  execSync("npm run codegen", { stdio: "inherit" });

  console.log("\nAdded to registry:");
  console.log(`  import { ${sectionName.charAt(0).toLowerCase()}${sectionName.slice(1)}Section } from "@/components/sections/${kebab}-section";`);
  console.log(`  ${sectionName.charAt(0).toLowerCase()}${sectionName.slice(1)}Section,`);
  console.log("\nNext step: implement JSX in the generated component.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
