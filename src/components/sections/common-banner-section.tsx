import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { CareersBanner } from "@/components/careers/careers-sections";
import { AgenticBanner } from "@/components/agentic-ai/agentic-ai-sections";
import { KnowledgeHubBanner } from "@/components/knowledge-hub/knowledge-hub-sections";
import { PeopleOperationsBanner } from "@/components/people-operations/people-operations-sections";
import { mergeCareers } from "@/components/careers/merge";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { mergePeopleOperations } from "@/components/people-operations/merge";
import { careersContent } from "@/content/careers";
import { agenticAiContent } from "@/content/agentic-ai";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import { peopleOperationsContent } from "@/content/people-operations";
import type { VariantOf } from "@/components/page-builder/section-variants";
import { listItems, text } from "@/lib/wordpress/fields";

type Variant = VariantOf<"CommonBannerSection">;

/**
 * `CommonBannerSection` — shared inner-page hero. Four Figma designs exist for
 * it; `section-variants.ts` picks one per page (default: the Knowledge Hub
 * design, which shows the optional CTA button).
 */
export const commonBannerSection = defineSection<CommonBannerSectionFragment>({
  layout: "CommonBannerSection",
  hero: true,
  render: (data, { header, variant }) => {
    switch ((variant ?? "knowledge-hub") as Variant) {
      case "careers":
        return <CareersBanner hero={fromSection(mergeCareers, careersContent, data).hero} header={header} />;
      case "agentic-ai": {
        const { hero } = fromSection(mergeAgenticAi, agenticAiContent, data);
        // Editors enter the bullet points as a list in `description`; `tagLine` is the lead sentence.
        const bullets = listItems(data.description);
        return (
          <AgenticBanner
            hero={bullets.length > 0 ? { ...hero, bullets, text: text(data.tagLine, hero.text) } : hero}
            header={header}
          />
        );
      }
      case "people-operations":
        return (
          <PeopleOperationsBanner
            hero={fromSection(mergePeopleOperations, peopleOperationsContent, data).hero}
            header={header}
          />
        );
      default:
        return (
          <KnowledgeHubBanner hero={fromSection(mergeKnowledgeHub, knowledgeHubContent, data).hero} header={header} />
        );
    }
  },
});
