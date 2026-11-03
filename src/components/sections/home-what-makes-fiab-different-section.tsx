import { defineSection } from "@/lib/page-builder/types";
import type { HomeWhatMakesFiabDifferentSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HomeDifference } from "@/components/home/home-sections";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeWhatMakesFiabDifferentSection` — Differentiator cards with outcome stat. */
export const homeWhatMakesFiabDifferentSection = defineSection<HomeWhatMakesFiabDifferentSectionFragment>({
  layout: "HomeWhatMakesFiabDifferentSection",
  render: (data) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <HomeDifference difference={content.difference} />;
  },
});
