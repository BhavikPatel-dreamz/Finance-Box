import { defineSection } from "@/lib/page-builder/types";
import type { HomeBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeBannerSection` — Home hero with stat cards and chart. */
export const homeBannerSection = defineSection<HomeBannerSectionFragment>({
  layout: "HomeBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeHome, homeContent, data);
    const hero = content.hero;
    return (
      <HeroSection
        page="home"
        headerNode={header}
        overrides={
          hero
            ? {
                eyebrow: hero.eyebrow,
                title: hero.title,
                highlight: hero.highlight,
                description: hero.text,
                primaryCta: hero.primary
                  ? { label: hero.primary.label, url: hero.primary.url, color: "white" }
                  : undefined,
                closeLabel: hero.closeLabel,
                closeValue: hero.closeValue,
                closeUnit: hero.closeUnit,
                closeTrend: hero.closeTrend,
                runwayLabel: hero.runwayLabel,
                runwayValue: hero.runwayValue,
                runwayUnit: hero.runwayUnit,
                runwayTrend: hero.runwayTrend,
                chartTitle: hero.chartTitle,
                floatingCta: hero.call
                  ? { label: hero.call.label, url: hero.call.url, color: "green", onDark: true }
                  : undefined,
              }
            : undefined
        }
      />
    );
  },
});
