import { defineSection } from "@/lib/page-builder/types";
import type { TeamMembersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyTeam } from "@/components/why/why-sections";
import { mapTeamMember } from "@/components/team/team-member";
import { text, link } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

/** `TeamMembersSection` — Team members (Team post type). */
export const teamMembersSection = defineSection<TeamMembersSectionFragment>({
  layout: "TeamMembersSection",
  render: (data) => {
    const members = Array.isArray(data.teamMembers?.nodes)
      ? data.teamMembers.nodes.map((node: any) => mapTeamMember(node))
      : [];
    const team: WhyContent["team"] = {
      title: text(data.title, ""),
      members,
      cta: link(data.ctaButton, { label: "", url: "" }),
    };
    return <WhyTeam team={team} />;
  },
});
