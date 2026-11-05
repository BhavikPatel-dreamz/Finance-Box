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
  fieldsAdded: string[];
  fieldsRemoved: string[];
  removedStillUsed: string[];
  usageLines: Record<string, number[]>;
  manual: boolean;
  manualReason?: string;
}

export function updateComponentDestructuring(
  componentPath: string,
  added: string[],
  removed: string[],
  fieldKinds: Record<string, FieldKind>,
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

  const next = newLines.join("\n");
  return {
    original,
    next,
    result: {
      fieldsAdded: added,
      fieldsRemoved: unusedRemoved,
      removedStillUsed,
      usageLines,
      manual: false,
    },
  };
}
