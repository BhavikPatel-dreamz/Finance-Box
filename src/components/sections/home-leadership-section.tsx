import { defineSection } from "@/lib/page-builder/types";
import type { HomeLeadershipSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { Leadership } from "@/components/home/leadership";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";

/** `HomeLeadershipSection` — Leadership slider and team. */
export const homeLeadershipSection = defineSection<HomeLeadershipSectionFragment>({
  layout: "HomeLeadershipSection",
  render: (data) => {
    const content = fromSection(mergeHome, homeContent, data);
    return <Leadership leadership={content.leadership} />;
  },
});
