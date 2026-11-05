import { defineSection } from "@/lib/page-builder/types";
import type { ServicesBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `ServicesBannerSection` — Services hero with tier cards. */
export const servicesBannerSection = defineSection<ServicesBannerSectionFragment>({
  layout: "ServicesBannerSection",
  hero: true,
  render: (data, { header }) => {
    const tierTitleParts = (raw: string | null) => {
      const value = text(raw, "");
      const parts = splitEmphasis(value);
      return {
        title: parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : value,
        highlight: parts ? parts.emphasis : "",
      };
    };

    const tiers = (data.tierCards ?? []).map((card, index) => {
      const { title, highlight } = tierTitleParts(card?.title ?? null);
      return {
        number: text(card?.label, ""),
        label: text(card?.label, ""),
        title,
        highlight,
        text: text(card?.description, ""),
      };
    });

    const heroTitleParts = splitEmphasis(data.title);
    return (
      <HeroSection
        page="services"
        headerNode={header}
        overrides={{
          eyebrow: text(data.subTitle, ""),
          title: heroTitleParts
            ? [heroTitleParts.before, heroTitleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title, ""),
          highlight: heroTitleParts ? heroTitleParts.emphasis : "",
          description: text(data.description, ""),
          primaryCta: data.primaryCtaButton
            ? {
                label: text(data.primaryCtaButton.title, ""),
                url: text(data.primaryCtaButton.url, ""),
                color: "white",
                bgColor: "#ffffff",
                textColor: "#07110d",
              }
            : undefined,
          tiers,
        }}
      />
    );
  },
});