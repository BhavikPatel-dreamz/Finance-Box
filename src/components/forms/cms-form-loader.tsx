import { CmsForm, type Appearance } from "@/components/forms/cms-form";
import { getFormDefinition } from "@/lib/forms/cf7";
import type { FormField } from "@/lib/forms/types";

/** Server component: loads the CF7 form's fields and renders the client form. */
export async function CmsFormLoader({
  formId,
  fallback,
  appearance,
  submitLabel,
}: {
  formId: string;
  /** Rendered when WordPress cannot be reached; should match the CF7 form. */
  fallback: FormField[];
  appearance: Appearance;
  submitLabel?: string;
}) {
  let form = await getFormDefinition(formId, fallback);
  if (form.source === "schema") {
    // 1. Maintain the design's intended field order from fallback
    if (fallback.length > 0) {
      const order = new Map(fallback.map((field, i) => [field.name, i]));
      const sorted = [...form.fields].sort((a, b) => {
        const idxA = order.has(a.name) ? order.get(a.name)! : 999;
        const idxB = order.has(b.name) ? order.get(b.name)! : 999;
        return idxA - idxB;
      });
      form = { ...form, fields: sorted };
    }

    // 2. The public schema has no placeholders; keep the design's wording for fields it already knows.
    const design = new Map(fallback.map((field) => [field.name, field.label]));
    form = { ...form, fields: form.fields.map((field) => ({ ...field, label: design.get(field.name) ?? field.label })) };
  }

  if (submitLabel) {
    form = { ...form, submitLabel };
  }

  return <CmsForm form={form} appearance={appearance} />;
}

function field(name: string, type: FormField["type"], label: string, required: boolean): FormField {
  return { name, type, label, required, options: [], multiple: false };
}

/** Fields of CF7 form 1338 (Agentic AI waitlist) when WordPress is unreachable. */
export const WAITLIST_FALLBACK_FIELDS: FormField[] = [
  field("your-name", "text", "Name", true),
  field("your-email", "email", "Work E-mail", true),
  field("your-company", "text", "Company", true),
  field("your-message", "textarea", "Write your message...", false),
];

/** Fields of CF7 form 1284 (Contact page) when WordPress is unreachable. */
export const CONTACT_FALLBACK_FIELDS: FormField[] = [
  field("your-name", "text", "Your name", true),
  field("your-email", "email", "Write your email", true),
  field("your-company", "text", "Your company", true),
  field("your-message", "textarea", "Write your notes...", false),
];
