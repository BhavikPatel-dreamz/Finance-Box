"use client";

import { useId, useState } from "react";
import type { ContactFieldErrors } from "@/lib/validation/contact";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string; errors?: ContactFieldErrors };

const fieldClassName =
  "mt-1 w-full border border-border bg-background px-3 py-2 text-foreground outline-none focus-visible:border-foreground";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          companyWebsite: data.get("companyWebsite"),
        }),
      });
      const body = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: ContactFieldErrors;
      };

      if (!response.ok || !body.ok) {
        setStatus({
          state: "error",
          message: body.message || "The message could not be sent.",
          errors: body.errors,
        });
        return;
      }

      form.reset();
      setStatus({ state: "success" });
    } catch {
      setStatus({ state: "error", message: "The message could not be sent." });
    }
  }

  const errors = status.state === "error" ? status.errors : undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input id={`${formId}-company`} name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" ? (
        <p role="alert" className="text-sm text-foreground">
          {status.message}
        </p>
      ) : null}
      {status.state === "success" ? (
        <p role="status" className="text-sm text-foreground">
          Your message has been sent.
        </p>
      ) : null}

      <div>
        <label htmlFor={`${formId}-name`}>Name</label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors?.name ? true : undefined}
          aria-describedby={errors?.name ? `${formId}-name-error` : undefined}
          className={fieldClassName}
        />
        {errors?.name ? (
          <p id={`${formId}-name-error`} className="mt-1 text-sm">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-email`}>Email</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors?.email ? true : undefined}
          aria-describedby={errors?.email ? `${formId}-email-error` : undefined}
          className={fieldClassName}
        />
        {errors?.email ? (
          <p id={`${formId}-email-error`} className="mt-1 text-sm">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-subject`}>Subject</label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          autoComplete="off"
          aria-invalid={errors?.subject ? true : undefined}
          aria-describedby={errors?.subject ? `${formId}-subject-error` : undefined}
          className={fieldClassName}
        />
        {errors?.subject ? (
          <p id={`${formId}-subject-error`} className="mt-1 text-sm">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-message`}>Message</label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={6}
          required
          aria-invalid={errors?.message ? true : undefined}
          aria-describedby={errors?.message ? `${formId}-message-error` : undefined}
          className={fieldClassName}
        />
        {errors?.message ? (
          <p id={`${formId}-message-error`} className="mt-1 text-sm">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="w-fit border border-foreground bg-foreground px-4 py-2 text-background disabled:opacity-60"
      >
        {status.state === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
