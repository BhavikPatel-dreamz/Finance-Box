import { defineSection } from "@/lib/page-builder/types";
import type { ContactFormSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ContactFormBlock } from "@/components/contact/contact-sections";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";

/** `ContactFormSection` — Contact details and form. */
export const contactFormSection = defineSection<ContactFormSectionFragment>({
  layout: "ContactFormSection",
  render: (data) => {
    const content = fromSection(mergeContactUs, contactUsContent, data);
    return <ContactFormBlock formSection={content.formSection} />;
  },
});
