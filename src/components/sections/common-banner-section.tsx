import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
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
    const { hero } = fromSection(mergeKnowledgeHub, knowledgeHubContent, data);
    return (
      <HeroSection
        page="agentic-ai"
        headerNode={header}
        overrides={{
          eyebrow: hero.eyebrow,
          title: hero.title,
          highlight: hero.highlight,
          tagLine: text(data.tagLine),
          description: "",
          bullets: listItems(data.description),
          rightDescription: listItems(data.description).length === 0 ? text(data.description) : "",
          primaryCta: hero.cta
            ? {
                label: hero.cta.label,
                url: hero.cta.url,
                color: "green",
                onDark: true,
              }
            : undefined,
        }}
      />
    );
  },
});
