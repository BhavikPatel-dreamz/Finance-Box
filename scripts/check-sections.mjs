// Verifies the page-builder wiring. Run with `npm run sections:check` (also part of CI-style checks).
//
// 1. Every fragment in src/lib/wordpress/queries/sections has a registered section, and vice versa.
// 2. Every fragment targets a layout type that exists in the schema snapshot.
// 3. The composed page query (all fragments together, as content.ts sends it) is valid GraphQL.
//    This catches two layouts using the same field name with different types, which
//    must be aliased (see HomeLeadershipSection.teamMembersList).
// 4. Every live layout without a component is listed (those render as "unregistered").
import { readFileSync, readdirSync } from "node:fs";
import { buildSchema, parse, validate, Kind } from "graphql";

const PREFIX = "PageBuilderPageBuilder";
const SUFFIX = "Layout";
const schema = buildSchema(readFileSync("src/lib/wordpress/schema.graphql", "utf8"));
const problems = [];

const fragmentDir = "src/lib/wordpress/queries/sections";
const fragments = readdirSync(fragmentDir)
  .filter((file) => file.endsWith(".graphql"))
  .map((file) => {
    const source = readFileSync(`${fragmentDir}/${file}`, "utf8");
    const definition = parse(source).definitions.find((node) => node.kind === Kind.FRAGMENT_DEFINITION);
    const typename = definition.typeCondition.name.value;
    return { file, source, name: definition.name.value, typename, layout: typename.slice(PREFIX.length, -SUFFIX.length) };
  });

const sectionDir = "src/components/sections";
const registered = new Map();
for (const file of readdirSync(sectionDir).filter((name) => name.endsWith(".tsx"))) {
  const match = readFileSync(`${sectionDir}/${file}`, "utf8").match(/layout:\s*"([A-Za-z0-9]+)"/);
  if (match) registered.set(match[1], file);
}
const registry = readFileSync("src/components/page-builder/section-registry.ts", "utf8");

for (const fragment of fragments) {
  if (!schema.getType(fragment.typename)) problems.push(`${fragment.file}: type ${fragment.typename} is not in the schema`);
  if (!registered.has(fragment.layout)) problems.push(`${fragment.file}: no section in ${sectionDir} declares layout "${fragment.layout}"`);
}
for (const [layout, file] of registered) {
  if (!fragments.some((fragment) => fragment.layout === layout)) problems.push(`${file}: layout "${layout}" has no fragment in ${fragmentDir}`);
  if (!registry.includes(`/sections/${file.replace(/\.tsx$/, "")}"`)) problems.push(`${file}: not imported in section-registry.ts`);
}

const pageCore = readFileSync("src/lib/wordpress/queries/page-core.graphql", "utf8");
const query = `
  query PageByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on Page { ...PageCore pageBuilder { pageBuilder { __typename ${fragments.map((f) => `...${f.name}`).join(" ")} } } }
    }
  }
  ${pageCore}
  ${fragments.map((fragment) => fragment.source).join("\n")}
`;
for (const error of validate(schema, parse(query))) problems.push(`composed page query: ${error.message}`);

const live = schema.getPossibleTypes(schema.getType(`${PREFIX}_Layout`)).map((type) => type.name.slice(PREFIX.length, -SUFFIX.length));
const unimplemented = live.filter((layout) => !registered.has(layout));

console.log(`${fragments.length} fragments, ${registered.size} registered sections, ${live.length} layouts in schema.`);
if (unimplemented.length > 0) console.log(`Layouts in WordPress without a component (skipped when used): ${unimplemented.join(", ")}`);
if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("Page-builder wiring OK.");
