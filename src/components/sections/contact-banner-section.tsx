import { defineSection } from "@/lib/page-builder/types";
import type { ContactBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ContactBanner } from "@/components/contact/contact-sections";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";

/** `ContactBannerSection` — Contact hero. */
export const contactBannerSection = defineSection<ContactBannerSectionFragment>({
  layout: "ContactBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeContactUs, contactUsContent, data);
    return <ContactBanner hero={content.hero} header={header} />;
  },
});
