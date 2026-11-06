import { defineSection } from "@/lib/page-builder/types";
import type { ContactFormSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ContactFormBlock } from "@/components/contact/contact-sections";
import { CmsFormLoader, CONTACT_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";
import { media, text } from "@/lib/wordpress/fields";
import { contactUsContent } from "@/content/contact-us";

function parseContactInformation(raw: unknown): { title: string; subtitle: string } {
  const str = typeof raw === "string" ? raw.trim() : "";
  if (!str) {
    return {
      title: contactUsContent.formSection.contactTitle,
      subtitle: contactUsContent.formSection.contactSubtitle,
    };
  }
  const titleMatch = str.match(/<(h[1-6]|strong|b)[^>]*>([\s\S]*?)<\/\1>/i);
  const pMatch = str.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (titleMatch || pMatch) {
    const title = titleMatch ? text(titleMatch[2], "") : "";
    const subtitle = pMatch ? text(pMatch[1], "") : "";
    return {
      title: title || contactUsContent.formSection.contactTitle,
      subtitle: subtitle || contactUsContent.formSection.contactSubtitle,
    };
  }
  const lines = str.split(/\n+/).map((l) => text(l, "")).filter(Boolean);
  return {
    title: lines[0] || contactUsContent.formSection.contactTitle,
    subtitle: lines.slice(1).join(" ") || contactUsContent.formSection.contactSubtitle,
  };
}

/**
 * `ContactFormSection` — Contact details and the Contact Form 7 form in `formId`
 * (fallback 1284). Fields come from WordPress; see `src/lib/forms/cf7.ts`.
 */
export const contactFormSection = defineSection<ContactFormSectionFragment>({
  layout: "ContactFormSection",
  render: (data) => {
    const formId = typeof data.formId === "string" ? data.formId.trim() : "";
    const contactInfo = parseContactInformation(data.contactInformation);
    return (
      <ContactFormBlock
        formSection={{
          title: text(data.formTitle) || contactUsContent.formSection.title,
          subtitle: text(data.formDescription) || contactUsContent.formSection.subtitle,
          image: media(data.contactImage)?.url || contactUsContent.formSection.image,
          contactTitle: contactInfo.title,
          contactSubtitle: contactInfo.subtitle,
          email: {
            label: "Email",
            value: text(data.contactEmail) || contactUsContent.formSection.email.value,
            icon: "",
          },
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