import { defineSection } from "@/lib/page-builder/types";
import type { YourOwnAgenticSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticBuildYourOwn } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";

/** `YourOwnAgenticSection` — Build-your-own agent cards. */
export const yourOwnAgenticSection = defineSection<YourOwnAgenticSectionFragment>({
  layout: "YourOwnAgenticSection",
  render: (data) => {
    const content = fromSection(mergeAgenticAi, agenticAiContent, data);
    return <AgenticBuildYourOwn buildYourOwn={content.buildYourOwn} />;
  },
});
