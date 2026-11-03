import { defineSection } from "@/lib/page-builder/types";
import type { AgenticPeopleOpsPayrollItSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticPeopleOps } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";

/** `AgenticPeopleOpsPayrollItSection` — People Ops, payroll and IT agents. */
export const agenticPeopleOpsPayrollItSection = defineSection<AgenticPeopleOpsPayrollItSectionFragment>({
  layout: "AgenticPeopleOpsPayrollItSection",
  render: (data) => {
    const content = fromSection(mergeAgenticAi, agenticAiContent, data);
    return <AgenticPeopleOps peopleOps={content.peopleOps} />;
  },
});
