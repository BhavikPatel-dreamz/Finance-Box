import { defineSection } from "@/lib/page-builder/types";
import type { ContactConnectedSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ContactConnected } from "@/components/contact/contact-sections";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";

/** `ContactConnectedSection` — LinkedIn and newsletter cards. */
export const contactConnectedSection = defineSection<ContactConnectedSectionFragment>({
  layout: "ContactConnectedSection",
  render: (data) => {
    const content = fromSection(mergeContactUs, contactUsContent, data);
    return <ContactConnected socialSection={content.socialSection} />;
  },
});
