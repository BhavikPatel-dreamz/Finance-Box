import fs from "node:fs";
import path from "node:path";

export function pascalCase(input: string): string {
  return input.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
}

export function kebabCase(input: string): string {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/[_\s]+/g, "-").replace(/-+/g, "-").toLowerCase();
}

export function layoutTypeName(layout: string): string {
  return `PageBuilderPageBuilder${pascalCase(layout)}Layout`;
}

export interface GqlType { kind: string; name: string | null; ofType?: GqlType | null; }
export interface GqlField { name: string; type: GqlType; }
export interface IntrospectionType { name: string; kind: string; fields: GqlField[] | null; }
export interface Schema { __schema: { types: IntrospectionType[] } }

export function unwrap(type: GqlType): { kind: string; name: string; modifiers: string[] } {
  const modifiers: string[] = [];
  let current: GqlType | null | undefined = type;
  while (current && (current.kind === "NON_NULL" || current.kind === "LIST")) {
    modifiers.push(current.kind);
    current = current.ofType ?? null;
  }
  return { kind: current?.kind ?? "SCALAR", name: current?.name ?? "Unknown", modifiers };
}

export function isImageField(fields: IntrospectionType["fields"]): boolean {
  const names = (fields ?? []).map((f) => f.name);
  return names.includes("node") || names.includes("sourceUrl") || names.includes("altText");
}

export function isLinkField(fields: IntrospectionType["fields"]): boolean {
  const names = (fields ?? []).map((f) => f.name);
  return names.includes("url") && (names.includes("title") || names.includes("label"));
}

export function findType(schema: Schema, name: string): IntrospectionType | null {
  return schema.__schema.types.find((t) => t.name === name) ?? null;
}

export function listLayouts(schema: Schema): string[] {
  return schema.__schema.types
    .map((t) => t.name)
    .filter((name): name is string => Boolean(name && name.startsWith("PageBuilderPageBuilder") && name.endsWith("Layout") && name !== "PageBuilderPageBuilder_Layout"))
    .map((name) => name.replace(/^PageBuilderPageBuilder/, "").replace(/Layout$/, ""));
}

export function generateFieldFragment(field: GqlField, schema: Schema, typeName: (n: string) => IntrospectionType | null, depth: number): string {
  const { name: ftName, modifiers } = unwrap(field.type);
  const isArray = modifiers.includes("LIST");
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
  return `${indent}${field.name} {${body}}`;
}

export function fragmentContent(layout: string, type: IntrospectionType, schema: Schema): string {
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

export async function loadSchema(): Promise<Schema> {
  // .env support handled by callers usually; read here too
  const envPath = path.join(process.cwd(), ".env");
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
  const base = (process.env.WORDPRESS_GRAPHQL_URL || "").replace(/\/?$/, "");
  const url = base.endsWith("graphql") ? base : `${base}/graphql`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query: "query { __schema { types { name kind fields { name type { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } } } }" }),
  });
  const json = await res.json() as { data?: Schema; errors?: unknown };
  if (!json.data) throw new Error(`Introspection failed: ${JSON.stringify(json.errors)}`);
  return json.data;
}

export function registeredLayouts(): string[] {
  const dir = path.join(process.cwd(), "src/components/sections");
  const set = new Set<string>();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) {
    const src = fs.readFileSync(path.join(dir, f), "utf8");
    for (const m of src.matchAll(/layout:\s*"([^"]+)"/g)) set.add(m[1]);
  }
  return [...set];
}
