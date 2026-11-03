import { defineSection } from "@/lib/page-builder/types";
import type { HomeBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HomeHero } from "@/components/home/home-sections";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeBannerSection` — Home hero with stat cards and chart. */
export const homeBannerSection = defineSection<HomeBannerSectionFragment>({
  layout: "HomeBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <HomeHero hero={content.hero} header={header} />;
  },
});
