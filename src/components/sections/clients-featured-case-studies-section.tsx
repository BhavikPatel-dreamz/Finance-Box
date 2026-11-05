import { defineSection } from "@/lib/page-builder/types";
import type { ClientsFeaturedCaseStudiesSectionFragment } from "@/lib/wordpress/generated/graphql";
import type { CaseStudyCardFragment } from "@/lib/wordpress/generated/graphql";
import { ClientsCaseStudies } from "@/components/clients/clients-sections";
import { caseStudyCardFromNode } from "@/lib/wordpress/cards";
import { text } from "@/lib/wordpress/fields";

/** `ClientsFeaturedCaseStudiesSection` — Featured case studies (CaseStudy post type). */
export const clientsFeaturedCaseStudiesSection = defineSection<ClientsFeaturedCaseStudiesSectionFragment>({
  layout: "ClientsFeaturedCaseStudiesSection",
  render: (data) => {
    const items = (data.caseStudies?.nodes ?? []).map((node) =>
      caseStudyCardFromNode(node as CaseStudyCardFragment),
    );
    return (
      <ClientsCaseStudies
        caseStudies={{
          title: text(data.title),
          items,
        }}
      />
    );
  },
});