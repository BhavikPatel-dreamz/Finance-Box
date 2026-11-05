import { defineSection } from "@/lib/page-builder/types";
import type { AgenticProvenArchitectureSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticProvenArchitecture } from "@/components/agentic-ai/agentic-ai-sections";
import { media, text } from "@/lib/wordpress/fields";

/** `AgenticProvenArchitectureSection` — Architecture cards. */
export const agenticProvenArchitectureSection = defineSection<AgenticProvenArchitectureSectionFragment>({
  layout: "AgenticProvenArchitectureSection",
  render: (data) => {
    return (
      <AgenticProvenArchitecture
        provenArchitecture={{
          title: text(data.title),
          highlight: text(data.highlightTitle),
          cards: (data.architectureCards ?? []).map((card) => ({
            image: media(card?.image)?.url ?? "",
            title: text(card?.title),
            text: text(card?.content),
            bullets: [],
          })),
        }}
      />
    );
  },
});