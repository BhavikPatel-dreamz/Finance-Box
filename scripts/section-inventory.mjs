// Prints a Markdown table of every ACF Flexible Content layout and its GraphQL fields,
// read from src/lib/wordpress/schema.graphql. Usage: npm run sections:inventory
import { readFileSync } from "node:fs";
import { buildSchema, getNamedType, isObjectType, isListType, getNullableType } from "graphql";
const schema = buildSchema(readFileSync(process.argv[2] ?? "src/lib/wordpress/schema.graphql", "utf8"));
const iface = schema.getType("PageBuilderPageBuilder_Layout");
const SKIP = new Set(["fieldGroupName"]);
function describe(type, depth) {
  const named = getNamedType(type);
  const list = isListType(getNullableType(type));
  if (named.name === "AcfMediaItemConnectionEdge") return "image";
  if (named.name === "AcfLink") return "link {title url target}";
  if (isObjectType(named) && depth < 3 && named.name.startsWith("PageBuilder")) {
    const inner = Object.values(named.getFields()).filter(f => !SKIP.has(f.name)).map(f => `${f.name}: ${describe(f.type, depth + 1)}`);
    return `${list ? "repeater" : "group"} { ${inner.join("; ")} }`;
  }
  return (list ? "[" : "") + named.name + (list ? "]" : "");
}
for (const t of schema.getPossibleTypes(iface)) {
  const name = t.name.replace(/^PageBuilderPageBuilder/, "").replace(/Layout$/, "");
  const fields = Object.values(t.getFields()).filter(f => !SKIP.has(f.name)).map(f => `${f.name}: ${describe(f.type, 0)}`);
  console.log(`| \`${name}\` | ${fields.join("<br>")} |`);
}
