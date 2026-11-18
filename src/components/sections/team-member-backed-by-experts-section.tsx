import { defineSection } from "@/lib/page-builder/types";
import type { TeamMemberBackedByExpertsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { TeamBanner } from "@/components/team/team-sections";
import { media, multilineText, text } from "@/lib/wordpress/fields";
import { teamPageContent } from "@/content/team";

export const teamMemberBackedByExpertsSection = defineSection<TeamMemberBackedByExpertsSectionFragment>({
  layout: "TeamMemberBackedByExpertsSection",
  render: (data) => {
    const title = text(data.title, teamPageContent.banner.title);
    const description = multilineText(data.description) || teamPageContent.banner.description;
    const img = media(data.image)?.url;

    return (
      <TeamBanner
        banner={{
          title,
          description,
          image: img || "/team/backed-by-experts.png",
        }}
      />
    );
  },
});
