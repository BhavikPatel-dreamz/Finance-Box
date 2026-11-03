import { defineSection } from "@/lib/page-builder/types";
import type { CaseStudySectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { KnowledgeHubCaseStudies } from "@/components/knowledge-hub/knowledge-hub-sections";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";

/** `CaseStudySection` — Selected case studies. */
export const caseStudySection = defineSection<CaseStudySectionFragment>({
  layout: "CaseStudySection",
  render: (data) => {
    const content = fromSection(mergeKnowledgeHub, knowledgeHubContent, data);
    return <KnowledgeHubCaseStudies caseStudy={content.caseStudy} />;
  },
});
