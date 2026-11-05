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
    switch ((variant ?? "knowledge-hub") as Variant) {
      case "careers": {
        const { hero } = fromSection(mergeCareers, careersContent, data);
        return (
          <HeroSection
            page="careers"
            headerNode={header}
            overrides={{
              eyebrow: hero.eyebrow,
              title: hero.title,
              highlight: hero.highlight,
              highlight2: hero.highlight2,
              description: hero.text,
              primaryCta: hero.cta
                ? { label: hero.cta.label, url: hero.cta.url, color: "white" }
                : undefined,
            }}
          />
        );
      }
      case "agentic-ai": {
        const { hero } = fromSection(mergeAgenticAi, agenticAiContent, data);
        // Editors enter the bullet points as a list in `description`; `tagLine` is the lead sentence.
        const rawBullets = listItems(data.description);
        const descriptionText = rawBullets.length > 0 ? text(data.tagLine, hero.text) : hero.text;
        const bullets = rawBullets.length > 0 ? rawBullets : (hero.bullets ?? []);
        return (
          <HeroSection
            page="agentic-ai"
            headerNode={header}
            overrides={{
              eyebrow: hero.eyebrow,
              title: hero.title,
              highlight: hero.highlight,
              description: descriptionText,
              bullets,
              primaryCta: hero.cta
                ? {
                    label: hero.cta.label,
                    url: hero.cta.url,
                    color: "white",
                    bgColor: "#ffffff",
                    textColor: "#07110d",
                  }
                : undefined,
            }}
          />
        );
      }
      case "people-operations": {
        const { hero } = fromSection(mergePeopleOperations, peopleOperationsContent, data);
        return (
          <HeroSection
            page="people-operations"
            headerNode={header}
            overrides={{
              eyebrow: hero.eyebrow,
              title: hero.title,
              highlight: hero.highlight,
              description: hero.text,
            }}
          />
        );
      }
      default: {
        const { hero } = fromSection(mergeKnowledgeHub, knowledgeHubContent, data);
        return (
          <HeroSection
            page="knowledge-hub"
            headerNode={header}
            overrides={{
              eyebrow: hero.eyebrow,
              title: hero.title,
              highlight: hero.highlight,
              titleMaxWidth: "lg:max-w-[400px]",
              description: hero.text,
              primaryCta: hero.cta
                ? {
                    label: hero.cta.label,
                    url: hero.cta.url,
                    color: "white",
                    bgColor: "#ffffff",
                    textColor: "#07110d",
                  }
                : undefined,
            }}
          />
        );
      }
    }
  },
});
