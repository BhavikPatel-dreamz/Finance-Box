// Builds ACF page-builder layouts from a short spec and prepares a safe import file.
//
//   pnpm acf:section build <spec.json>    expand a spec into a full ACF layout
//                                         (acf-json/layouts/<name>.json) and print
//                                         the GraphQL names + a draft fragment
//   pnpm acf:section import <name>...     merge built layouts into the live field
//                                         group export and write the file to import
//
// Why a merge: ACF → Tools → Import replaces a whole field group (matched by key).
// Importing a group that holds only the new layout would delete every other
// layout. So `import` starts from a fresh export of the live group
// (acf-json/group_fb_page_builder.json) and refuses to run when that export is
// missing layouts the live GraphQL schema has (i.e. it is stale).
//
// Spec format (acf-json/layouts/<name>.spec.json):
// {
//   "name": "pricing_comparison_section",      // snake_case, ends with _section
//   "label": "Pricing Comparison",
//   "fields": [
//     { "name": "eyebrow", "type": "text" },
//     { "name": "title", "type": "text", "instructions": "Wrap the italic words in *stars*." },
//     { "name": "description", "type": "textarea" },
//     { "name": "image", "type": "image" },
//     { "name": "cta_button", "type": "link" },
//     { "name": "variant", "type": "button_group", "choices": { "dark": "Dark", "light": "Light" }, "default": "dark" },
//     { "name": "plans", "type": "repeater", "label": "Plans", "button_label": "Add plan",
//       "sub_fields": [ { "name": "name", "type": "text" }, { "name": "price", "type": "text" } ] }
//   ]
// }
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LAYOUTS_DIR = path.join(ROOT, "acf-json/layouts");
const GROUP_PATH = path.join(ROOT, "acf-json/group_fb_page_builder.json");
const IMPORT_DIR = path.join(ROOT, "acf-json/import");
const SCHEMA_PATH = path.join(ROOT, "src/lib/wordpress/schema.graphql");

const SNAKE = /^[a-z][a-z0-9]*(?:_[a-z0-9]+)*$/;
const SCALAR_TYPES = new Set(["text", "textarea", "url", "email", "number", "true_false", "select", "radio", "button_group"]);
const OBJECT_TYPES = new Set(["image", "link"]);
const NESTED_TYPES = new Set(["repeater", "group"]);

function fail(message) {
  console.error(`acf-section: ${message}`);
  process.exit(1);
}

const pascal = (value) => value.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
const camel = (value) => {
  const p = pascal(value);
  return p ? p[0].toLowerCase() + p.slice(1) : p;
};
const titleCase = (value) => value.split("_").map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");

/* ---------------------------------- build --------------------------------- */

function baseField(spec, key) {
  return {
    key,
    label: spec.label ?? titleCase(spec.name),
    name: spec.name,
    "aria-label": "",
    type: spec.type,
    instructions: spec.instructions ?? "",
    required: spec.required ? 1 : 0,
    conditional_logic: 0,
    wrapper: { width: spec.width ?? "", class: "", id: "" },
    show_in_graphql: 1,
    graphql_field_name: camel(spec.name),
  };
}

function expandField(spec, parentKey, where) {
  if (!spec || typeof spec !== "object") fail(`${where}: field must be an object`);
  if (!SNAKE.test(spec.name ?? "")) fail(`${where}: field name "${spec.name}" must be snake_case`);
  const type = spec.type;
  if (!SCALAR_TYPES.has(type) && !OBJECT_TYPES.has(type) && !NESTED_TYPES.has(type)) {
    fail(`${where}.${spec.name}: unsupported type "${type}". Use text, textarea, url, email, number, true_false, select, radio, button_group, image, link, repeater or group (no wysiwyg: the site never renders WordPress HTML).`);
  }
  const key = `${parentKey}__${spec.name}`;
  const field = baseField(spec, key);

  switch (type) {
    case "text":
    case "email":
    case "url":
      Object.assign(field, { default_value: spec.default ?? "", maxlength: "", placeholder: spec.placeholder ?? "", prepend: "", append: "" });
      if (type !== "text") { delete field.maxlength; delete field.prepend; delete field.append; }
      break;
    case "textarea":
      Object.assign(field, { default_value: spec.default ?? "", maxlength: "", rows: spec.rows ?? 4, placeholder: spec.placeholder ?? "", new_lines: "" });
      break;
    case "number":
      Object.assign(field, { default_value: spec.default ?? "", min: "", max: "", step: "", placeholder: "", prepend: "", append: "" });
      break;
    case "true_false":
      Object.assign(field, { message: spec.message ?? "", default_value: spec.default ? 1 : 0, ui: 1, ui_on_text: "", ui_off_text: "" });
      break;
    case "select":
    case "radio":
    case "button_group": {
      if (!spec.choices || typeof spec.choices !== "object" || Object.keys(spec.choices).length === 0) fail(`${where}.${spec.name}: ${type} needs "choices"`);
      Object.assign(field, { choices: spec.choices, default_value: spec.default ?? Object.keys(spec.choices)[0], return_format: "value", allow_null: 0, layout: "horizontal" });
      if (type === "select") Object.assign(field, { multiple: 0, ui: 0, ajax: 0, placeholder: "" });
      if (type === "radio") Object.assign(field, { other_choice: 0, save_other_choice: 0 });
      break;
    }
    case "image":
      Object.assign(field, { return_format: "array", library: "all", min_width: "", min_height: "", min_size: "", max_width: "", max_height: "", max_size: "", mime_types: spec.mime_types ?? "", preview_size: "medium" });
      break;
    case "link":
      Object.assign(field, { return_format: "array" });
      break;
    case "repeater":
    case "group": {
      if (!Array.isArray(spec.sub_fields) || spec.sub_fields.length === 0) fail(`${where}.${spec.name}: ${type} needs "sub_fields"`);
      const sub = expandFields(spec.sub_fields, key, `${where}.${spec.name}`);
      if (type === "repeater") {
        Object.assign(field, { layout: "block", pagination: 0, min: spec.min ?? 0, max: spec.max ?? 0, collapsed: "", button_label: spec.button_label ?? "Add row", rows_per_page: 20, sub_fields: sub });
      } else {
        Object.assign(field, { layout: "block", sub_fields: sub });
      }
      break;
    }
  }
  return field;
}

function expandFields(list, parentKey, where) {
  const seen = new Set();
  return list.map((spec) => {
    if (seen.has(spec?.name)) fail(`${where}: duplicate field "${spec.name}"`);
    seen.add(spec?.name);
    return expandField(spec, parentKey, where);
  });
}

function fragmentLines(fields, indent) {
  return fields.map((field) => {
    const name = field.graphql_field_name;
    if (field.type === "image") return `${indent}${name} { node { sourceUrl altText mediaDetails { width height } } }`;
    if (field.type === "link") return `${indent}${name} { title url target }`;
    if (NESTED_TYPES.has(field.type)) return `${indent}${name} {\n${fragmentLines(field.sub_fields, indent + "  ").join("\n")}\n${indent}}`;
    return `${indent}${name}`;
  });
}

function graphqlPrefix() {
  // Live types look like PageBuilderPageBuilder<Key>Layout; read the prefix from the schema when possible.
  if (existsSync(SCHEMA_PATH)) {
    const match = readFileSync(SCHEMA_PATH, "utf8").match(/type (\w+?)HomeBannerSectionLayout\b/);
    if (match) return match[1];
  }
  return "PageBuilderPageBuilder";
}

function build(specPath) {
  if (!specPath) fail("usage: acf-section build <spec.json>");
  const spec = JSON.parse(readFileSync(path.resolve(specPath), "utf8"));
  if (!SNAKE.test(spec.name ?? "")) fail(`layout name "${spec.name}" must be snake_case`);
  if (!spec.name.endsWith("_section")) fail(`layout name "${spec.name}" should end with _section (house convention)`);
  if (!Array.isArray(spec.fields) || spec.fields.length === 0) fail("spec needs a non-empty \"fields\" array");

  const layoutKey = `layout_fb_${spec.name}`;
  const layout = {
    key: layoutKey,
    name: spec.name,
    label: spec.label ?? titleCase(spec.name),
    display: "block",
    sub_fields: expandFields(spec.fields, `field_fb_${spec.name}`, spec.name),
    min: "",
    max: "",
  };

  mkdirSync(LAYOUTS_DIR, { recursive: true });
  const out = path.join(LAYOUTS_DIR, `${spec.name}.json`);
  writeFileSync(out, JSON.stringify(layout, null, 2) + "\n");

  const key = pascal(spec.name);
  const typeName = `${graphqlPrefix()}${key}Layout`;
  console.log(`Wrote ${path.relative(ROOT, out)}\n`);
  console.log(`Layout key   ${key}`);
  console.log(`GraphQL type ${typeName}`);
  console.log(`Fragment     src/lib/wordpress/queries/sections/${key}.graphql\n`);
  console.log(`fragment ${key} on ${typeName} {\n  __typename\n${fragmentLines(layout.sub_fields, "  ").join("\n")}\n}`);
}

/* --------------------------------- import --------------------------------- */

function layoutsOf(flex) {
  return Array.isArray(flex.layouts) ? flex.layouts : Object.values(flex.layouts ?? {});
}

function liveLayoutKeys() {
  if (!existsSync(SCHEMA_PATH)) return null;
  const prefix = graphqlPrefix();
  const keys = new Set();
  for (const match of readFileSync(SCHEMA_PATH, "utf8").matchAll(new RegExp(`^type ${prefix}(\\w+)Layout implements`, "gm"))) keys.add(match[1]);
  return keys;
}

function importLayouts(names) {
  if (names.length === 0) fail("usage: acf-section import <layout_name> [...]");
  if (!existsSync(GROUP_PATH)) fail(`missing ${path.relative(ROOT, GROUP_PATH)}. Export the live "Page Builder" group (ACF → Tools → Export) and save it there.`);

  const groups = JSON.parse(readFileSync(GROUP_PATH, "utf8"));
  const list = Array.isArray(groups) ? groups : [groups];
  if (list.length !== 1) fail(`${path.relative(ROOT, GROUP_PATH)} must contain exactly the Page Builder field group (found ${list.length} groups)`);
  const group = list[0];
  const flex = (group.fields ?? []).find((field) => field.type === "flexible_content");
  if (!flex) fail("the exported group has no flexible content field");

  // Stale-export guard: every layout live in WordPress must be in the export.
  const exported = new Set(layoutsOf(flex).map((layout) => pascal(layout.name)));
  const live = liveLayoutKeys();
  if (!live || live.size === 0) fail("could not read live layouts from src/lib/wordpress/schema.graphql. Run `pnpm schema` first.");
  const missing = [...live].filter((key) => !exported.has(key));
  if (missing.length > 0) {
    fail(`the export is stale: it lacks ${missing.length} live layout(s) (${missing.slice(0, 5).join(", ")}${missing.length > 5 ? ", …" : ""}).\nImporting it would delete them. Export the live "Page Builder" group again (ACF → Tools → Export), save it as ${path.relative(ROOT, GROUP_PATH)}, run \`pnpm schema\`, then retry.`);
  }

  for (const name of names) {
    const file = path.join(LAYOUTS_DIR, `${name}.json`);
    if (!existsSync(file)) fail(`missing ${path.relative(ROOT, file)}. Run \`pnpm acf:section build\` first.`);
    const layout = JSON.parse(readFileSync(file, "utf8"));
    const current = layoutsOf(flex);
    const sameName = current.find((item) => item.name === layout.name);
    if (sameName && sameName.key !== layout.key) fail(`a different layout already uses the name "${layout.name}" (key ${sameName.key})`);
    if (live.has(pascal(layout.name)) && !sameName) fail(`"${layout.name}" is already live in WordPress but not in the export`);
    if (Array.isArray(flex.layouts)) {
      const index = flex.layouts.findIndex((item) => item.key === layout.key);
      if (index >= 0) flex.layouts[index] = layout;
      else flex.layouts.push(layout);
    } else {
      flex.layouts = { ...(flex.layouts ?? {}), [layout.key]: layout };
    }
    console.log(`${sameName ? "Updated" : "Added"} layout ${layout.name} (${layout.label})`);
  }

  group.modified = Math.floor(Date.now() / 1000);
  const json = JSON.stringify(Array.isArray(groups) ? [group] : group, null, 4) + "\n";
  writeFileSync(GROUP_PATH, json);
  mkdirSync(IMPORT_DIR, { recursive: true });
  const importPath = path.join(IMPORT_DIR, "page-builder.json");
  writeFileSync(importPath, json);
  console.log(`\nImport file: ${path.relative(ROOT, importPath)} (${layoutsOf(flex).length} layouts; all ${live.size} live layouts kept)`);
  console.log("WordPress: ACF → Tools → Import Field Groups → choose that file → Import JSON.");
}

const [command, ...args] = process.argv.slice(2);
if (command === "build") build(args[0]);
else if (command === "import") importLayouts(args);
else fail("usage: acf-section build <spec.json> | acf-section import <layout_name> [...]");
