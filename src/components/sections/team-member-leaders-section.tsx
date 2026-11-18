import { defineSection } from "@/lib/page-builder/types";
import type { TeamMemberLeadersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { TeamLeaders } from "@/components/team/team-sections";
import { media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { teamPageContent, type TeamLeader } from "@/content/team";

export const teamMemberLeadersSection = defineSection<TeamMemberLeadersSectionFragment>({
  layout: "TeamMemberLeadersSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const title = titleParts ? titleParts.before.trim() : (text(data.title) || teamPageContent.leaders.title);
    const highlight = titleParts ? titleParts.emphasis : teamPageContent.leaders.highlight;
    const subtitle = multilineText(data.description) || teamPageContent.leaders.subtitle;

    const rawLeaders = data.leaders?.nodes ?? [];
    const people: TeamLeader[] = [];
    for (const node of rawLeaders) {
      if (!node || !("title" in node) || !node.title) continue;
      const img = media(node.featuredImage)?.url;
      people.push({
        name: text(node.title),
        role: text(node.excerpt),
        image: img && !img.includes("why-team-bg.svg") ? img : "/media/placeholder.svg",
        slug: node.slug ?? undefined,
        linkedin: node.teamMemberOptions?.linkedinLink ?? undefined,
        twitter: node.teamMemberOptions?.twitterLink ?? undefined,
      });
    }

    return (
      <TeamLeaders
        leaders={{
          title,
          highlight,
          subtitle,
          people: people.length > 0 ? people : teamPageContent.leaders.people,
        }}
      />
    );
  },
});
