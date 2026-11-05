import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { FooterHero, type FooterHeroVariant } from "@/components/ui/footer-hero";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";

function getCtaVariant(uri?: string): FooterHeroVariant {
  if (!uri) return "default";
  if (uri.includes("why-fiab") || uri.includes("why")) return "why-fiab";
  if (uri.includes("services")) return "services";
  if (uri.includes("clients")) return "clients";
  if (uri.includes("careers")) return "careers";
  if (uri.includes("agentic-ai")) return "agentic-ai";
  if (uri.includes("knowledge-hub")) return "knowledge-hub";
  if (uri.includes("people-operations")) return "people-operations";
  if (uri === "/") return "home";
  return "default";
}

export const ctaSection = defineSection<CtaSectionFragment>({
  layout: "CtaSection",
  render: (data, context) => {
    const pressure = fromSection(mergeKnowledgeHub, knowledgeHubContent, data).pressure;
    return (
      <FooterHero
        variant={getCtaVariant(context?.uri)}
        title={pressure.title}
        highlight={pressure.emphasis}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    );
  },
});
