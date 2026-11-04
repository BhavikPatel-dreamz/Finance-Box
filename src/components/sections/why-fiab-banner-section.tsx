import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabBannerSection` — Why FIAB hero with highlights. */
export const whyFiabBannerSection = defineSection<WhyFiabBannerSectionFragment>({
  layout: "WhyFiabBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeWhy, whyContent, data);
    const hero = content.hero;
    return (
      <HeroSection
        page="why"
        headerNode={header}
        overrides={
          hero
            ? {
                eyebrow: hero.eyebrow,
                title: hero.title,
                highlight: hero.highlight,
                description: hero.text,
                primaryCta: hero.cta
                  ? { label: hero.cta.label, url: hero.cta.url, color: "white" }
                  : undefined,
                points: hero.points,
              }
            : undefined
        }
      />
    );
  },
});
