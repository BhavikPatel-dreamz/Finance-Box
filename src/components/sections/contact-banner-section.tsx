import { defineSection } from "@/lib/page-builder/types";
import type { ContactBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { splitEmphasis, text } from "@/lib/wordpress/fields";
import type { ContactUsContent } from "@/content/contact-us";

/** `ContactBannerSection` — hero. */
export const contactBannerSection = defineSection<ContactBannerSectionFragment>({
  layout: "ContactBannerSection",
  hero: true,
  render: (data, { header }) => {
    const parts = splitEmphasis(data.title);
    const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.title, "");
    const highlight = parts ? parts.emphasis : "";
    return (
      <HeroSection
        page="contact"
        headerNode={header}
        overrides={{
          eyebrow: text(data.subtitle, ""),
          title: title || "",
          highlight: highlight || "",
          description: text(data.description, ""),
        }}
      />
    );
  },
});
