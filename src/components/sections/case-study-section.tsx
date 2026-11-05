import { defineSection } from "@/lib/page-builder/types";
import type { CaseStudySectionFragment } from "@/lib/wordpress/generated/graphql";
import type { CaseStudyCardFragment } from "@/lib/wordpress/generated/graphql";
import { KnowledgeHubCaseStudies } from "@/components/knowledge-hub/knowledge-hub-sections";
import { caseStudyCardFromNode } from "@/lib/wordpress/cards";
import { isPlaceholderUrl } from "@/lib/wordpress/paths";
import { link, text } from "@/lib/wordpress/fields";

/** `CaseStudySection` — Selected case studies. */
export const caseStudySection = defineSection<CaseStudySectionFragment>({
  layout: "CaseStudySection",
  render: (data) => {
    const cta = link(data.allCaseStudy, { label: "", url: "" });
    if (isPlaceholderUrl(cta.url)) cta.url = "/case-study/";

    const items = (data.selectCaseStudy?.nodes ?? []).map((post) => {
      const card = caseStudyCardFromNode(post as CaseStudyCardFragment);
      return {
        image: card.image,
        title: text(post.title),
        text: text(post.excerpt),
        url: card.ctaUrl,
      };
    });

    return (
      <KnowledgeHubCaseStudies
        caseStudy={{
          title: text(data.title),
          items,
          cta,
        }}
      />
    );
  },
});