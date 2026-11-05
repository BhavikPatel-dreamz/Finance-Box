import fs from "node:fs";
import path from "node:path";
import * as L from "./sections";

export type FieldKind = "text" | "image" | "link" | "repeater" | "group";

export function classifyField(field: L.GqlField, schema: L.Schema): FieldKind {
  const { name: ftName, modifiers } = L.unwrap(field.type);
  const isArray = modifiers.includes("LIST");
  const objType = L.findType(schema, ftName);
  const subFields = objType?.fields ?? [];
  if (!objType || objType.kind === "SCALAR" || objType.kind === "ENUM") return "text";
  if (L.isImageField(subFields)) return "image";
  if (L.isLinkField(subFields)) return "link";
  if (isArray) return "repeater";
  return "group";
}

export function kindSnippet(name: string, kind: FieldKind): string {
  switch (kind) {
    case "text":
      return `// TODO new field: ${name} (text) -> {${name} && <p>{${name}}</p>}`;
    case "image":
      return `// TODO new field: ${name} (image) -> {${name}?.node?.sourceUrl && <img src={${name}.node.sourceUrl} alt="" />}`;
    case "link":
      return `// TODO new field: ${name} (link) -> {${name} && <a href={${name}.url}>{${name}.title ?? ${name}.label}</a>}`;
    case "repeater":
      return `// TODO new field: ${name} (repeater) -> {${name}?.map((item, i) => (...))}`;
    default:
      return `// TODO new field: ${name} (group) -> {${name} && <pre>{JSON.stringify(${name})}</pre>}`;
  }
}

export interface UpdateResult {
  autoAreaMissing?: boolean;
  autoFieldsRendered?: string[];
  handledByJsx?: string[];
  fieldsAdded: string[];
  fieldsRemoved: string[];
  removedStillUsed: string[];
  usageLines: Record<string, number[]>;
  manual: boolean;
  manualReason?: string;
}

export function updateComponentDestructuring(
  componentPath: string,
  allFields: string[],
  added: string[],
  removed: string[],
  fieldKinds: Record<string, FieldKind>,
  fieldDefs: Record<string, L.GqlField>,
  schema: L.Schema,
): { original: string; next: string; result: UpdateResult } {
  const original = fs.readFileSync(componentPath, "utf8");
  const lines = original.split("\n");
  const marker = "// @section-fields (auto-updated by sync-sections, don't edit this line by hand)";

  const markerIdx = lines.findIndex((l) => l.trim() === marker);
  let destIdx = -1;
  if (markerIdx >= 0) {
    destIdx = markerIdx + 1;
  } else {
    const candidates = lines
      .map((l, i) => ({ l, i }))
      .filter(({ l }) => /^\s*const\s*\{\s*[^}]*\}\s*=\s*data\s*;\s*$/.test(l));
    if (candidates.length !== 1) {
      return {
        original,
        next: original,
        result: {
          fieldsAdded: added,
          fieldsRemoved: [],
          removedStillUsed: removed,
          usageLines: {},
          manual: true,
          manualReason:
            candidates.length === 0
              ? "no `const { ... } = data;` line found"
              : `found ${candidates.length} destructuring lines; expected exactly one`,
        },
      };
    }
    destIdx = candidates[0].i;
  }

  const destLine = lines[destIdx];
  const indent = (destLine.match(/^(\s*)/) || ["", ""])[1];
  const existingMatch = destLine.match(/const\s*\{\s*([^}]*)\}\s*=\s*data/);
  const existingFields = existingMatch
    ? existingMatch[1].split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  // fields removed only if not used anywhere else
  const removedStillUsed: string[] = [];
  const usageLines: Record<string, number[]> = {};
  const unusedRemoved: string[] = [];
  for (const r of removed) {
    const usedLines: number[] = [];
    lines.forEach((l, i) => {
      if (i === destIdx) return;
      const re = new RegExp("\\b" + r + "\\b");
      if (re.test(l)) usedLines.push(i + 1);
    });
    if (usedLines.length > 0) {
      removedStillUsed.push(r);
      usageLines[r] = usedLines;
    } else {
      unusedRemoved.push(r);
    }
  }

  const newFields = [...existingFields.filter((f) => !unusedRemoved.includes(f)), ...added.filter((f) => !existingFields.includes(f))];
  // unique
  const uniqueFields = [...new Set(newFields)];

  // Insert marker if missing
  let newLines = [...lines];
  let destIndex = destIdx;
  if (markerIdx < 0) {
    newLines.splice(destIdx, 0, indent + marker);
    destIndex = destIdx + 1;
  }

  newLines[destIndex] = indent + `const { ${uniqueFields.join(", ")} } = data;`;

  // TODO comments under destructure line
  const todoLines = added
    .filter((name) => !newLines.some((l) => l.includes(`// TODO new field: ${name}`)))
    .map((name) => indent + kindSnippet(name, fieldKinds[name] ?? "text"));

  // insert TODOs after destIndex + maybe existing
  if (todoLines.length) {
    newLines.splice(destIndex + 1, 0, ...todoLines);
  }

  // Auto-render area handling.
  const startMarker = "{/* @auto-fields:start (managed by sync-sections, don't edit inside) */}";
  const endMarker = "{/* @auto-fields:end */}";
  const startIndex = newLines.findIndex((l) => l.includes(startMarker));
  const endIndex = newLines.findIndex((l) => l.includes(endMarker));
  const hasAutoArea = startIndex >= 0 && endIndex > startIndex;

  let autoAreaMissing = false;
  const outsideLines = hasAutoArea ? newLines.slice(0, startIndex).concat(newLines.slice(endIndex + 1)) : [];
  const outsideText = outsideLines.join("\n");
  const usedOutside = hasAutoArea ? new Set(allFields.filter((name) => new RegExp("\\b" + name + "\\b").test(outsideText))) : new Set<string>();
  const autoFields = hasAutoArea ? allFields.filter((name) => !usedOutside.has(name)) : [];
  if (!hasAutoArea) {
    autoAreaMissing = true;
  } else {
    const autoLines = autoFields
      .filter((name) => fieldDefs[name])
      .flatMap((name) => autoLinesForField(fieldDefs[name], schema, "      "));
    const autoBlock = [startMarker, ...autoLines, endMarker].map((l) => (l === startMarker || l === endMarker) ? "      " + l : l);
    newLines.splice(startIndex, endIndex - startIndex + 1, ...autoBlock);
  }

  const next = newLines.join("\n");
  return {
    original,
    next,
    result: {
      fieldsAdded: added,
      fieldsRemoved: unusedRemoved,
      removedStillUsed,
      usageLines,
      autoAreaMissing,
      autoFieldsRendered: autoFields,
      handledByJsx: Array.from(usedOutside),
      manual: false,
    },
  };
}

export function isWysiwygName(name: string): boolean {
  return /content|html|description|wysiwyg|body|rich/i.test(name);
}

function autoLinesForRepeater(field: L.GqlField, schema: L.Schema, indent: string): string[] {
  const { name: ftName } = L.unwrap(field.type);
  const objType = L.findType(schema, ftName);
  const subFields = (objType?.fields ?? []).filter((f) => !f.name.startsWith("__"));
  const inner: string[] = [];
  for (const sub of subFields) {
    inner.push(...autoLinesForFieldWithName(`item.${sub.name}`, sub, schema, indent + "      "));
  }
  const lines: string[] = [];
  lines.push(`${indent}{${field.name}?.map((item, i) => (`);
  lines.push(`${indent}  <div key={i}>`);
  lines.push(...inner);
  lines.push(`${indent}  </div>`);
  lines.push(`${indent}))}`);
  return lines;
}

function autoLinesForFieldWithName(nameExpr: string, field: L.GqlField, schema: L.Schema, indent: string): string[] {
  // nameExpr may be "field" or "item.sub"
  const baseName = nameExpr.split(".").pop() || nameExpr;
  const kind = classifyField(field, schema);
  const wysiwyg = isWysiwygName(baseName);
  if (kind === "text") {
    if (wysiwyg) {
      return [`${indent}{${nameExpr} && <div dangerouslySetInnerHTML={{ __html: ${nameExpr} }} />}`];
    }
    return [`${indent}{${nameExpr} && <p>{${nameExpr}}</p>}`];
  }
  if (kind === "image") {
    return [`${indent}{${nameExpr}?.node?.sourceUrl && <img src={${nameExpr}.node.sourceUrl} alt={${nameExpr}.node.altText ?? ""} />}`];
  }
  if (kind === "link") {
    return [`${indent}{${nameExpr}?.url && <a href={${nameExpr}.url} target={${nameExpr}.target ?? undefined}>{${nameExpr}.title ?? ${nameExpr}.label}</a>}`];
  }
  if (kind === "true/false" as any) {
    return [`${indent}{${nameExpr} != null && <p>{String(${nameExpr})}</p>}`];
  }
  if (L.unwrap(field.type).modifiers.includes("LIST")) {
    return autoLinesForRepeater(field, schema, indent).map((l) => l.replace(new RegExp("\\b" + field.name + "\\b", "g"), nameExpr));
  }
  // group
  const { name: ftName } = L.unwrap(field.type);
  const objType = L.findType(schema, ftName);
  const subFields = (objType?.fields ?? []).filter((f) => !f.name.startsWith("__"));
  const lines: string[] = [];
  lines.push(`${indent}{${nameExpr} && (`);
  lines.push(`${indent}  <div>`);
  for (const sub of subFields) {
    lines.push(...autoLinesForFieldWithName(`${nameExpr}.${sub.name}`, sub, schema, indent + "    "));
  }
  lines.push(`${indent}  </div>`);
  lines.push(`${indent})}`);
  return lines;
}

export function autoLinesForField(field: L.GqlField, schema: L.Schema, indent = "    "): string[] {
  return autoLinesForFieldWithName(field.name, field, schema, indent);
}
