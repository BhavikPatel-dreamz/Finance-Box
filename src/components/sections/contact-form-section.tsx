import { defineSection } from "@/lib/page-builder/types";
import type { ContactFormSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ContactFormBlock } from "@/components/contact/contact-sections";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";
import { CmsFormLoader, CONTACT_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";

/**
 * `ContactFormSection` — Contact details and the Contact Form 7 form in `formId`
 * (fallback 1284). Fields come from WordPress; see `src/lib/forms/cf7.ts`.
 */
export const contactFormSection = defineSection<ContactFormSectionFragment>({
  layout: "ContactFormSection",
  render: (data) => {
    const content = fromSection(mergeContactUs, contactUsContent, data);
    return (
      <ContactFormBlock
        formSection={content.formSection}
        form={<CmsFormLoader formId={content.formSection.formId} fallback={CONTACT_FALLBACK_FIELDS} appearance="contact" />}
      />
    );
  },
});
