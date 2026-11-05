import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { FooterHero } from "@/components/ui/footer-hero";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";

export const ctaSection = defineSection<CtaSectionFragment>({
  layout: "CtaSection",
  render: (data) => {
    const pressure = fromSection(mergeKnowledgeHub, knowledgeHubContent, data).pressure;
    return (
      <FooterHero
        variant="default"
        title={pressure.title}
        highlight={pressure.emphasis}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    );
  },
});
