import { defineSection } from "@/lib/page-builder/types";
import type { CommonBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import { listItems, text } from "@/lib/wordpress/fields";


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