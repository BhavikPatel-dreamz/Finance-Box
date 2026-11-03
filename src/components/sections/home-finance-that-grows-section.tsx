import { defineSection } from "@/lib/page-builder/types";
import type { HomeFinanceThatGrowsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HomeGrowth } from "@/components/home/home-sections";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeFinanceThatGrowsSection` — Growth image with tier cards. */
export const homeFinanceThatGrowsSection = defineSection<HomeFinanceThatGrowsSectionFragment>({
  layout: "HomeFinanceThatGrowsSection",
  render: (data) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <HomeGrowth growth={content.growth} />;
  },
});
