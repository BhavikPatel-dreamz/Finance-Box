"use client";

import { useId, useState } from "react";
import { GreenButton } from "@/components/ui/green-button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import type { FormDefinition, FormField, FormValues } from "@/lib/forms/types";

/**
 * Renders a Contact Form 7 form from its field list (`getFormDefinition`) and
 * submits it to `/api/forms/{id}`. Fields added in CF7 appear automatically.
 */

export type Appearance = "waitlist" | "newsletter" | "contact";

type Theme = {
  form: string;
  /** Two columns from `sm`: short inputs pair up, an unpaired one and long fields take the full row. */
  grid?: boolean;
  input: string;
  textarea: string;
  /** Colours shared by inputs, textareas and selects. */
  base: string;
  border: string;
  choice: string;
  legend: string;
  option: string;
  button: { bgColor: string; textColor?: string; size?: "50" };
  actions: string;
  success: string;
  error: string;
  submitLabel: string;
  loadingLabel: string;
};

const DARK_BASE =
  "w-full border bg-[#121826] text-white placeholder:text-white/40 focus:outline-none focus:border-[#23C55E] transition-colors duration-200";

const THEMES: Record<Appearance, Theme> = {
  waitlist: {
    form: "flex flex-col gap-4",
    input: "h-[50px] rounded-[8px] px-4 text-[14px]",
    textarea: "rounded-[8px] p-4 text-[14px]",
    base: DARK_BASE,
    border: "border-white/10",
    choice: "text-white/80",
    legend: "text-white/70",
    option: "bg-[#121826]",
    button: { bgColor: "#ffffff", textColor: "#0B0D0C" },
    actions: "mt-2 flex flex-col gap-3",
    success: "text-green-400",
    error: "text-red-400",
    submitLabel: "Submit",
    loadingLabel: "Submitting...",
  },
  newsletter: {
    form: "flex flex-col gap-3.5 sm:gap-4",
    input: "h-[46px] sm:h-[50px] rounded-[10px] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base",
    textarea: "rounded-[10px] py-3 sm:py-4 px-4 sm:px-5 text-[15px] sm:text-base",
    base: DARK_BASE,
    border: "border-white/10",
    choice: "text-white/80",
    legend: "text-white/70",
    option: "bg-[#121826]",
    button: { bgColor: "#ffffff", size: "50" },
    actions: "mt-2 flex flex-col gap-3",
    success: "text-green-400",
    error: "text-red-400",
    submitLabel: "Submit",
    loadingLabel: "Submitting...",
  },
  contact: {
    form: "grid grid-cols-1 sm:grid-cols-2 gap-4",
    grid: true,
    input: "h-[48px] sm:h-[50px] rounded-[10px] px-4 sm:px-5 text-[14px]",
    textarea: "rounded-[10px] py-3.5 sm:py-4 px-4 sm:px-5 text-[14px]",
    base: "w-full border bg-white text-[#121826] placeholder:text-[#121826]/70 focus:outline-none focus:border-[#23C55E] transition-colors duration-200",
    border: "border-[#747C761A]",
    choice: "text-[#121826]/80",
    legend: "text-[#121826]/70",
    option: "bg-white",
    button: { bgColor: "#121826", textColor: "#ffffff" },
    actions: "mt-2 sm:mt-4 flex flex-col justify-start items-start gap-3",
    success: "text-green-600",
    error: "text-red-600",
    submitLabel: "Send Message",
    loadingLabel: "Sending...",
  },
};

const SHORT_TYPES = new Set<FormField["type"]>(["text", "email", "tel", "url", "number", "date", "select"]);

/** Fields that take the whole row in a two-column form. */
function wideFields(fields: FormField[]) {
  const wide = new Set<string>();
  let run: FormField[] = [];
  const flush = () => {
    if (run.length % 2 === 1) wide.add(run[run.length - 1].name);
    run = [];
  };
  for (const field of fields) {
    if (SHORT_TYPES.has(field.type) && !field.multiple) {
      run.push(field);
    } else {
      flush();
      wide.add(field.name);
    }
  }
  flush();
  return wide;
}

function emptyValues(fields: FormField[]): FormValues {
  return Object.fromEntries(fields.map((field) => [field.name, field.multiple ? [] : ""]));
}

export function CmsForm({ form, appearance }: { form: FormDefinition; appearance: Appearance }) {
  const uid = useId();
  const styles = THEMES[appearance];
  const wide = styles.grid ? wideFields(form.fields) : null;
  const [values, setValues] = useState<FormValues>(() => emptyValues(form.fields));
  const { status, message, errors, submitForm } = useFormSubmit();

  const setValue = (name: string, value: string | string[]) => setValues((current) => ({ ...current, [name]: value }));

  const toggle = (name: string, option: string, checked: boolean) => {
    const current = values[name];
    const list = Array.isArray(current) ? current : [];
    setValue(name, checked ? [...list, option] : list.filter((item) => item !== option));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;
    const success = await submitForm(`/api/forms/${form.id}`, { fields: values });
    if (success) setValues(emptyValues(form.fields));
  };

  const renderField = (field: FormField) => {
    const id = `${uid}-${field.name}`;
    const error = errors[field.name];
    const errorId = error ? `${id}-error` : undefined;
    const border = error ? "border-red-500" : styles.border;
    // Required fields show "*" in their placeholder / label, e.g. "Name *".
    const label = field.required ? `${field.label} *` : field.label;
    const value = values[field.name];
    const common = {
      id,
      name: field.name,
      "aria-label": field.label,
      "aria-required": field.required || undefined,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": errorId,
    };

    let control: React.ReactNode;
    switch (field.type) {
      case "textarea":
        control = (
          <textarea
            {...common}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={label}
            maxLength={field.maxLength}
            rows={5}
            className={`${styles.base} ${border} ${styles.textarea} resize-none`}
          />
        );
        break;
      case "select":
        control = (
          <select
            {...common}
            multiple={field.multiple}
            value={value}
            onChange={(e) =>
              setValue(
                field.name,
                field.multiple ? Array.from(e.target.selectedOptions, (option) => option.value) : e.target.value,
              )
            }
            className={`${styles.base} ${border} ${styles.input} ${field.multiple ? "h-auto py-2" : ""}`}
          >
            {!field.multiple && (
              <option value="" disabled>
                {label}
              </option>
            )}
            {field.options.map((option) => (
              <option key={option} value={option} className={styles.option}>
                {option}
              </option>
            ))}
          </select>
        );
        break;
      case "checkbox":
      case "radio":
        control = (
          <fieldset aria-describedby={errorId} className="flex flex-col gap-2">
            <legend className={`mb-2 text-[14px] ${styles.legend}`}>{label}</legend>
            {field.options.map((option) => {
              const checked = Array.isArray(value) ? value.includes(option) : value === option;
              return (
                <label key={option} className={`flex items-center gap-2 text-[14px] ${styles.choice}`}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={option}
                    checked={checked}
                    onChange={(e) =>
                      field.type === "radio" ? setValue(field.name, option) : toggle(field.name, option, e.target.checked)
                    }
                    className="accent-[#23C55E]"
                  />
                  {option}
                </label>
              );
            })}
          </fieldset>
        );
        break;
      case "acceptance":
        control = (
          <label className={`flex items-start gap-2 text-[14px] ${styles.choice}`}>
            <input
              {...common}
              type="checkbox"
              checked={value === "1"}
              onChange={(e) => setValue(field.name, e.target.checked ? "1" : "")}
              className="mt-1 accent-[#23C55E]"
            />
            {label}
          </label>
        );
        break;
      default:
        control = (
          <input
            {...common}
            type={field.type}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={label}
            maxLength={field.maxLength}
            autoComplete={field.type === "email" ? "email" : undefined}
            className={`${styles.base} ${border} ${styles.input}`}
          />
        );
    }

    return (
      <div key={field.name} className={wide?.has(field.name) ? "sm:col-span-2" : undefined}>
        {control}
        {error && (
          <p id={errorId} className="text-red-500 text-xs mt-1 ml-1">
            {error}
          </p>
        )}
      </div>
    );
  };

  // Errors for fields this form does not render (e.g. a field CF7 added that we skip) go in the global message.
  const unshownError = Object.keys(errors).some((name) => !form.fields.some((field) => field.name === name));

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      {form.fields.map(renderField)}

      <div className={`${styles.actions} ${styles.grid ? "sm:col-span-2" : ""}`}>
        <GreenButton
          type="submit"
          label={status === "loading" ? styles.loadingLabel : form.submitLabel || styles.submitLabel}
          disabled={status === "loading"}
          {...styles.button}
        />

        <div aria-live="polite">
          {status === "success" && <p className={`text-sm font-medium ${styles.success}`}>{message}</p>}
          {status === "error" && (Object.keys(errors).length === 0 || unshownError) && (
            <p className={`text-sm font-medium ${styles.error}`}>{message}</p>
          )}
        </div>
      </div>
    </form>
  );
}
