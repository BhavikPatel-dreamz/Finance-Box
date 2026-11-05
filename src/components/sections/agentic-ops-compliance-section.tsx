import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOpsComplianceSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticOpsCompliance } from "@/components/agentic-ai/agentic-ai-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `AgenticOpsComplianceSection` — Ops and compliance image cards. */
export const agenticOpsComplianceSection = defineSection<AgenticOpsComplianceSectionFragment>({
  layout: "AgenticOpsComplianceSection",
  render: (data) => {
    return (
      <AgenticOpsCompliance
        opsCompliance={{
          title: text(data.title),
          cards: (data.agents ?? []).map((card) => ({
            image: media(card?.icon)?.url ?? "",
            title: text(card?.title),
            text: text(card?.content),
          })),
        }}
      />
    );
  },
});