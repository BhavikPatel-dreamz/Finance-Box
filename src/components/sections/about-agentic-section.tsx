import { defineSection } from "@/lib/page-builder/types";
import type { AboutAgenticSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticAbout } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";

/** `AboutAgenticSection` — What agentic AI is, with feature images. */
export const aboutAgenticSection = defineSection<AboutAgenticSectionFragment>({
  layout: "AboutAgenticSection",
  render: (data) => {
    const content = fromSection(mergeAgenticAi, agenticAiContent, data);
    return <AgenticAbout whatIs={content.whatIs} />;
  },
});
