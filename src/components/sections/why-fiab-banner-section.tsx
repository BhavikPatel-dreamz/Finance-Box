import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { media, splitEmphasis, text, link } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

/** `WhyFiabBannerSection` — Why FIAB hero with highlights. */
export const whyFiabBannerSection = defineSection<WhyFiabBannerSectionFragment>({
  layout: "WhyFiabBannerSection",
  hero: true,
  render: (data) => {
    const parts = splitEmphasis(data.title);
    const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.title, "");
    const highlight = parts ? parts.emphasis : "";
    const backgroundImage = media(data.backgroundImage)?.url;
    const points = Array.isArray(data.highlights)
      ? data.highlights.map((p: any) => ({
          number: p?.number != null ? String(p.number).padStart(2, "0") : "",
          title: text(p?.title, ""),
        }))
      : [];
    return (
      <HeroSection
        page="why"
        overrides={{
          ...(backgroundImage ? { background: backgroundImage } : {}),
          eyebrow: text(data.subTitle, ""),
          title: title || "",
          highlight: highlight || "",
          description: text(data.description, ""),
          points,
          primaryCta: data.ctaButton
            ? { label: text(data.ctaButton.title, ""), url: text(data.ctaButton.url, ""), color: "white" }
            : undefined,
        }}
      />
    );
  },
});
