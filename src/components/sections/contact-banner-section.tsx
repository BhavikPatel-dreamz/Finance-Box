import { defineSection } from "@/lib/page-builder/types";
import type { ContactBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";
import type { ContactUsContent } from "@/content/contact-us";

/** `ContactBannerSection` — hero. */
export const contactBannerSection = defineSection<ContactBannerSectionFragment>({
  layout: "ContactBannerSection",
  hero: true,
  render: (data) => {
    const parts = splitEmphasis(data.title);
    const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.title, "");
    const highlight = parts ? parts.emphasis : "";
    const backgroundImage = media(data.backgroundImage)?.url;
    return (
      <HeroSection
        page="contact"
        overrides={{
          ...(backgroundImage ? { background: backgroundImage } : {}),
          eyebrow: text(data.subtitle, ""),
          title: title || "",
          highlight: highlight || "",
          description: text(data.description, ""),
        }}
      />
    );
  },
});
