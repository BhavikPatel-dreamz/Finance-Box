import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { formTag, formsTag, publicReadsAreCached } from "@/lib/cache/tags";
import type { FormDefinition, FormField, FormFieldType } from "@/lib/forms/types";
import { isFormId } from "@/lib/forms/types";

/**
 * Reads a Contact Form 7 form's fields from WordPress so that fields an admin
 * adds, removes or reorders in CF7 show up on the site without code changes.
 *
 * 1. `GET /wp-json/financebox/v1/forms/{id}`: full field list (type, placeholder,
 *    options, submit label). Needs the snippet in `wordpress/financebox-cf7-fields.php`.
 * 2. `GET /wp-json/contact-form-7/v1/contact-forms/{id}/feedback/schema`: CF7's
 *    public validation schema. Gives names, required, email/tel/url/number/date
 *    and lengths, so fields still appear, with placeholders derived from names.
 * 3. The caller's fallback fields, when WordPress cannot be reached.
 */

const TIMEOUT_MS = 10_000;

export function wordpressSiteUrl() {
  return process.env.WORDPRESS_URL?.trim().replace(/\/$/, "") || null;
}

const FIELD_TYPES = new Set<FormFieldType>([
  "text",
  "email",
  "tel",
  "url",
  "number",
  "date",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "acceptance",
]);

/** Placeholders the design uses for the common CF7 field names. */
const KNOWN_LABELS: Record<string, string> = {
  name: "Name",
  email: "Work E-mail",
  "email-address": "Work E-mail",
  company: "Company",
  role: "Role",
  phone: "Phone",
  subject: "Subject",
  message: "Write your message...",
};

/** `your-company-name` → `Company name`. */
export function labelFromName(name: string) {
  const key = name.replace(/\[\]$/, "").replace(/^your-/, "");
  if (KNOWN_LABELS[key]) return KNOWN_LABELS[key];
  const words = key.replace(/[-_]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : name;
}

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function stringOf(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/* ------------------------------ 1. Plugin ------------------------------ */

function pluginField(raw: unknown): FormField | null {
  if (!raw || typeof raw !== "object") return null;
  const item = raw as Record<string, unknown>;
  const name = stringOf(item.name);
  const type = stringOf(item.type) as FormFieldType;
  if (!name || !FIELD_TYPES.has(type)) return null;

  const options = Array.isArray(item.options) ? item.options.map(stringOf).filter(Boolean) : [];
  if ((type === "select" || type === "radio" || type === "checkbox") && options.length === 0) return null;

  const maxLength = Number(item.maxLength);
  return {
    name,
    type,
    label: stringOf(item.label) || stringOf(item.placeholder) || labelFromName(name),
    required: item.required === true,
    options,
    multiple: item.multiple === true,
    maxLength: Number.isFinite(maxLength) && maxLength > 0 ? maxLength : undefined,
  };
}

async function fromPlugin(site: string, id: string): Promise<FormDefinition | null> {
  let body: unknown;
  try {
    body = await getJson(`${site}/wp-json/financebox/v1/forms/${id}`);
  } catch {
    return null; // Endpoint not installed (404) or unreachable: try the schema.
  }
  if (!body || typeof body !== "object" || !Array.isArray((body as { fields?: unknown }).fields)) return null;

  const data = body as { fields: unknown[]; submitLabel?: unknown };
  const fields = data.fields.map(pluginField).filter((field): field is FormField => field !== null);
  if (fields.length === 0) return null;
  return { id, fields, submitLabel: stringOf(data.submitLabel) || undefined, source: "plugin" };
}

/* ------------------------------ 2. Schema ------------------------------ */

type SchemaRule = { rule?: unknown; field?: unknown; threshold?: unknown; accept?: unknown };

const RULE_TYPES: Record<string, FormFieldType> = {
  email: "email",
  tel: "tel",
  url: "url",
  number: "number",
  date: "date",
};

async function fromSchema(site: string, id: string): Promise<FormDefinition | null> {
  const body = (await getJson(`${site}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback/schema`)) as {
    rules?: SchemaRule[];
  };
  if (!Array.isArray(body?.rules)) return null;

  // Fields in the order CF7 lists their first rule, which is the order in the form.
  const fields = new Map<string, FormField>();
  for (const rule of body.rules) {
    const rawName = stringOf(rule.field);
    const kind = stringOf(rule.rule);
    if (!rawName || !kind) continue;
    if (kind === "file" || kind === "requiredfile" || kind.includes("filesize")) continue; // Uploads are not proxied.

    const name = rawName.replace(/\[\]$/, "");
    let field = fields.get(name);
    if (!field) {
      field = { name, type: "text", label: labelFromName(name), required: false, options: [], multiple: rawName.endsWith("[]") };
      fields.set(name, field);
    }

    if (kind === "required") field.required = true;
    else if (RULE_TYPES[kind]) field.type = RULE_TYPES[kind];
    else if (kind === "maxlength") field.maxLength = Number(rule.threshold) || undefined;
    else if (kind === "enum" && Array.isArray(rule.accept)) {
      field.type = field.multiple ? "checkbox" : "select";
      field.options = rule.accept.map(stringOf).filter(Boolean);
    }
  }

  for (const field of fields.values()) {
    // CF7's default textarea limit is 2000, text inputs default to 400.
    if (field.type === "text" && ((field.maxLength ?? 0) > 400 || /message|comment|details/.test(field.name))) {
      field.type = "textarea";
    }
  }

  if (fields.size === 0) return null;
  return { id, fields: [...fields.values()], source: "schema" };
}

/* ------------------------------- Loader -------------------------------- */

async function readForm(id: string): Promise<FormDefinition | null> {
  const site = wordpressSiteUrl();
  if (!site || !isFormId(id)) return null;
  try {
    return (await fromPlugin(site, id)) ?? (await fromSchema(site, id));
  } catch (error) {
    console.warn(`[forms] could not load form ${id}: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

async function cachedForm(id: string) {
  "use cache";
  // Form edits in CF7 show up within minutes; `/api/revalidate` type "form" expires them at once.
  cacheLife("minutes");
  cacheTag(formTag(id), formsTag);
  return readForm(id);
}

/**
 * Field list of a CF7 form. Never throws: returns `fallback` (marked
 * `source: "fallback"`) when the form cannot be read.
 */
export const getFormDefinition = cache(async (id: string, fallback: FormField[]): Promise<FormDefinition> => {
  const form = publicReadsAreCached() ? await cachedForm(id) : await readForm(id);
  return form ?? { id, fields: fallback, source: "fallback" };
});
