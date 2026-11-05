import { defineSection } from "@/lib/page-builder/types";
import type { ContactFormSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ContactFormBlock } from "@/components/contact/contact-sections";
import { CmsFormLoader, CONTACT_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";
import { media, text } from "@/lib/wordpress/fields";

/**
 * `ContactFormSection` — Contact details and the Contact Form 7 form in `formId`
 * (fallback 1284). Fields come from WordPress; see `src/lib/forms/cf7.ts`.
 */
export const contactFormSection = defineSection<ContactFormSectionFragment>({
  layout: "ContactFormSection",
  render: (data) => {
    const formId = typeof data.formId === "string" ? data.formId.trim() : "";
    return (
      <ContactFormBlock
        formSection={{
          title: text(data.formTitle),
          subtitle: text(data.formDescription),
          image: media(data.contactImage)?.url ?? "",
          contactTitle: "",
          contactSubtitle: "",
          email: { label: "", value: text(data.contactEmail), icon: "" },
          formId: /^\d+$/.test(formId) ? formId : "",
          form: { fields: [], notesPlaceholder: "", submitLabel: "" },
        }}
        form={
          <CmsFormLoader
            formId={/^\d+$/.test(formId) ? formId : ""}
            fallback={CONTACT_FALLBACK_FIELDS}
            appearance="contact"
          />
        }
      />
    );
  },
});