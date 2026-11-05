import { defineSection } from "@/lib/page-builder/types";
import type { AgenticPeopleOpsPayrollItSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticPeopleOps } from "@/components/agentic-ai/agentic-ai-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `AgenticPeopleOpsPayrollItSection` — People Ops, payroll and IT agents. */
export const agenticPeopleOpsPayrollItSection = defineSection<AgenticPeopleOpsPayrollItSectionFragment>({
  layout: "AgenticPeopleOpsPayrollItSection",
  render: (data) => {
    return (
      <AgenticPeopleOps
        peopleOps={{
          title: text(data.title),
          agents: (data.agents ?? []).map((agent) => ({
            icon: media(agent?.icon)?.url ?? "",
            title: text(agent?.title),
            text: text(agent?.content),
            greatFor: text(agent?.greatFor),
          })),
        }}
      />
    );
  },
});