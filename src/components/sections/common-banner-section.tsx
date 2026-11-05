import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { listItems, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `CommonBannerSection` — shared inner-page hero. */
export const commonBannerSection = defineSection<CommonBannerSectionFragment>({
  layout: "CommonBannerSection",
  hero: true,
  render: (data, { header }) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <HeroSection
        page="knowledge-hub"
        headerNode={header}
        overrides={{
          eyebrow: text(data.subTitle),
          title: titleParts
            ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
            : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          titleMaxWidth: "lg:max-w-[587px]",
          tagLine: text(data.tagLine),
          description: "",
          bullets: listItems(data.description),
          rightDescription:
            listItems(data.description).length === 0 ? text(data.description) : "",
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