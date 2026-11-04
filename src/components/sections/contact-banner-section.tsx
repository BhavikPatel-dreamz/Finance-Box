import { defineSection } from "@/lib/page-builder/types";
import type { ContactBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeContactUs } from "@/components/contact/merge";
import { contactUsContent } from "@/content/contact-us";

/** `ContactBannerSection` — Contact hero. */
export const contactBannerSection = defineSection<ContactBannerSectionFragment>({
  layout: "ContactBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeContactUs, contactUsContent, data);
    return (
      <HeroSection
        page="contact"
        headerNode={header}
        overrides={{
          eyebrow: content.hero.eyebrow,
          title: content.hero.title,
          highlight: content.hero.highlight,
          description: content.hero.text,
        }}
      />
    );
  },
});
