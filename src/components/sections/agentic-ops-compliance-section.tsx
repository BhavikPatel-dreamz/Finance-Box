import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOpsComplianceSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticOpsCompliance } from "@/components/agentic-ai/agentic-ai-sections";
import { media, text } from "@/lib/wordpress/fields";
import { agenticAiContent } from "@/content/agentic-ai";

/** `AgenticOpsComplianceSection` — Ops and compliance image cards. */
export const agenticOpsComplianceSection = defineSection<AgenticOpsComplianceSectionFragment>({
  layout: "AgenticOpsComplianceSection",
  render: (data) => {
    return (
      <AgenticOpsCompliance
        opsCompliance={{
          title: text(data.title) || agenticAiContent.opsCompliance.title,
          cards: (data.agents ?? []).map((card, idx) => ({
            image:
              media(card?.icon)?.url ||
              agenticAiContent.opsCompliance.cards[idx]?.image ||
              "",
            title:
              text(card?.title) ||
              agenticAiContent.opsCompliance.cards[idx]?.title ||
              "",
            text:
              text(card?.content) ||
              agenticAiContent.opsCompliance.cards[idx]?.text ||
              "",
          })),
        }}
      />
    );
  },
});
