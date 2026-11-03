import { defineSection } from "@/lib/page-builder/types";
import type { AgenticProvenArchitectureSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticProvenArchitecture } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";

/** `AgenticProvenArchitectureSection` — Architecture cards. */
export const agenticProvenArchitectureSection = defineSection<AgenticProvenArchitectureSectionFragment>({
  layout: "AgenticProvenArchitectureSection",
  render: (data) => {
    const content = fromSection(mergeAgenticAi, agenticAiContent, data);
    return <AgenticProvenArchitecture provenArchitecture={content.provenArchitecture} />;
  },
});
