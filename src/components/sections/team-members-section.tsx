import { defineSection } from "@/lib/page-builder/types";
import type { TeamMembersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyTeam } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `TeamMembersSection` — Team members (Team post type). */
export const teamMembersSection = defineSection<TeamMembersSectionFragment>({
  layout: "TeamMembersSection",
  render: (data) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyTeam team={content.team} />;
  },
});
