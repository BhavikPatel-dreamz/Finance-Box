import { useId } from "react";
import { z } from "zod";
import { ContactForm } from "@/components/forms/contact-form";
import type { SectionRegistration } from "@/components/sections/registry";

const contactSectionSchema = z
  .object({
    __typename: z.string().optional(),
    heading: z.string().nullable().optional(),
    intro: z.string().nullable().optional(),
  })
  .strip();

export type ContactFormSectionData = {
  heading: string;
  intro: string;
};

function ContactFormSection({ data }: { data: ContactFormSectionData }) {
  const headingId = useId();

  return (
    <section aria-labelledby={data.heading ? headingId : undefined} className="max-w-xl">
      {data.heading ? (
        <h2 id={headingId} className="text-2xl font-semibold tracking-tight">
          {data.heading}
        </h2>
      ) : null}
      {data.intro ? <p className="mt-3 text-muted">{data.intro}</p> : null}
      <div className={data.heading || data.intro ? "mt-6" : undefined}>
        <ContactForm />
      </div>
    </section>
  );
}

export const contactFormSection: SectionRegistration = {
  key: "contact_form",
  matchesType(typeName) {
    return /(?:^|_)ContactForm$/.test(typeName);
  },
  fields: ["heading", "intro"],
  render(value) {
    const parsed = contactSectionSchema.safeParse(value);
    if (!parsed.success) return { ok: false };
    return {
      ok: true,
      node: (
        <ContactFormSection
          data={{
            heading: parsed.data.heading?.trim() ?? "",
            intro: parsed.data.intro?.trim() ?? "",
          }}
        />
      ),
    };
  },
};
