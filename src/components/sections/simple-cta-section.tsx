import { defineSection } from "@/lib/page-builder/types";
import type { SimpleCtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { KnowledgeHubResources } from "@/components/knowledge-hub/knowledge-hub-sections";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";

/** `SimpleCtaSection` — Inline call-to-action band. */
export const simpleCtaSection = defineSection<SimpleCtaSectionFragment>({
  layout: "SimpleCtaSection",
  render: (data) => {
    const content = fromSection(mergeKnowledgeHub, knowledgeHubContent, data);
    return <KnowledgeHubResources resources={content.resources} />;
  },
});
