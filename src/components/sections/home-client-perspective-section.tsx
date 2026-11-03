import { defineSection } from "@/lib/page-builder/types";
import type { HomeClientPerspectiveSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HomeDecisions } from "@/components/home/home-sections";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeClientPerspectiveSection` — Client quote with metrics. */
export const homeClientPerspectiveSection = defineSection<HomeClientPerspectiveSectionFragment>({
  layout: "HomeClientPerspectiveSection",
  render: (data) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <HomeDecisions decisions={content.decisions} />;
  },
});
