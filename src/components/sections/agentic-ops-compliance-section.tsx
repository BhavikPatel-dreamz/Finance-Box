import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOpsComplianceSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticOpsCompliance } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";

/** `AgenticOpsComplianceSection` — Ops and compliance image cards. */
export const agenticOpsComplianceSection = defineSection<AgenticOpsComplianceSectionFragment>({
  layout: "AgenticOpsComplianceSection",
  render: (data) => {
    const content = fromSection(mergeAgenticAi, agenticAiContent, data);
    return <AgenticOpsCompliance opsCompliance={content.opsCompliance} />;
  },
});
