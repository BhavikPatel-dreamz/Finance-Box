import { defineSection } from "@/lib/page-builder/types";
import type { TeamMemberExpertsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { TeamExperts } from "@/components/team/team-sections";
import { media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { teamPageContent, type TeamExpert } from "@/content/team";

export const teamMemberExpertsSection = defineSection<TeamMemberExpertsSectionFragment>({
  layout: "TeamMemberExpertsSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const title = titleParts ? titleParts.before.trim() : (text(data.title) || teamPageContent.experts.title);
    const highlight = titleParts ? titleParts.emphasis : teamPageContent.experts.highlight;
    const subtitle = text(data.subTitle, teamPageContent.experts.subtitle);
    const description = multilineText(data.description) || teamPageContent.experts.description;

    const rawExperts = data.experts?.nodes ?? [];
    const people: TeamExpert[] = [];
    for (const node of rawExperts) {
      if (!node || !("title" in node) || !node.title) continue;
      const img = media(node.featuredImage)?.url;
      people.push({
        name: text(node.title),
        role: text(node.excerpt),
        image: img && !img.includes("why-team-bg.svg") ? img : "/media/placeholder.svg",
        slug: node.slug ?? undefined,
      });
    }

    return (
      <TeamExperts
        experts={{
          title,
          highlight,
          subtitle,
          description,
          people: people.length > 0 ? people : teamPageContent.experts.people,
        }}
      />
    );
  },
});
