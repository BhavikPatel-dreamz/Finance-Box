import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { listItems, media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `CommonBannerSection` — shared inner-page hero. */
export const commonBannerSection = defineSection<CommonBannerSectionFragment>({
  layout: "CommonBannerSection",
  hero: true,
  render: (data, context) => {
    const titleParts = splitEmphasis(data.title);
    const backgroundImage = media(data.backgroundImage)?.url;
    return (
      <HeroSection
        page={page}
        overrides={{
          variant: "agentic-ai",
          // Use the WordPress "Background Image" when set; otherwise keep the
          // hero's existing default background.
          ...(backgroundImage ? { background: backgroundImage } : {}),
          eyebrow: text(data.subTitle),
          title: titleParts
            ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          titleMaxWidth,
          tagLine: text(data.tagLine),
          description: page === "careers" ? text(data.description) : "",
          bullets: listItems(data.description),
          rightDescription:
            page !== "careers" && listItems(data.description).length === 0 ? text(data.description) : "",
          primaryCta: data.ctaButton
            ? {
                label: text(data.ctaButton.title),
                url: text(data.ctaButton.url),
                color: "white",
                onDark: true,
              }
            : undefined,
        }}
      />
    );
  },
});