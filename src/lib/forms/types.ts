/**
 * A Contact Form 7 form as the frontend renders it. Built on the server by
 * `src/lib/forms/cf7.ts` and rendered by `src/components/forms/cms-form.tsx`.
 */

export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "acceptance";

export type FormField = {
  /** CF7 field name, e.g. `your-name`. Sent to CF7 as-is and used for its error messages. */
  name: string;
  type: FormFieldType;
  /** Shown as the placeholder for inputs, or next to checkboxes / radios / acceptance. */
  label: string;
  required: boolean;
  /** Choices for select, checkbox and radio. */
  options: string[];
  /** Checkbox groups and `select multiple` submit several values. */
  multiple: boolean;
  maxLength?: number;
};

export type FormDefinition = {
  /** CF7 form ID (post ID of the form in WordPress). */
  id: string;
  fields: FormField[];
  /** Text of the CF7 `[submit]` tag, when the form defines one. */
  submitLabel?: string;
  /**
   * - `plugin`:   full field list from the Financebox form endpoint (types, placeholders, options).
   * - `schema`:   inferred from CF7's public validation schema (names, required, email, length).
   * - `fallback`: WordPress unreachable; the fields the design was built with.
   */
  source: "plugin" | "schema" | "fallback";
};

export type FormValues = Record<string, string | string[]>;

/** CF7 form IDs are WordPress post IDs. */
export function isFormId(value: unknown): value is string {
  return typeof value === "string" && /^\d{1,10}$/.test(value);
}
