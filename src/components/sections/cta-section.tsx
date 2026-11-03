import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { FooterHero, type FooterHeroVariant } from "@/components/ui/footer-hero";
import { HomePressure } from "@/components/home/home-sections";
import { WhyFooterCta } from "@/components/why/why-sections";
import { mergeHome } from "@/components/home/merge";
import { mergeServices } from "@/components/services/merge";
import { mergeWhy } from "@/components/why/merge";
import { mergeCareers } from "@/components/careers/merge";
import { mergeClients } from "@/components/clients/merge";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { mergePeopleOperations } from "@/components/people-operations/merge";
import { homeContent } from "@/content/home";
import { servicesContent } from "@/content/services";
import { whyContent } from "@/content/why-fiab";
import { careersContent } from "@/content/careers";
import { clientsContent } from "@/content/clients";
import { agenticAiContent } from "@/content/agentic-ai";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import { peopleOperationsContent } from "@/content/people-operations";
import type { RawSection } from "@/lib/wordpress/content";
import type { VariantOf } from "@/components/page-builder/section-variants";

type Variant = VariantOf<"CtaSection">;
type Pressure = { title: string; emphasis: string; text: string; cta: { label: string; url: string } };

/** Each design keeps its own page's fallback copy for fields WordPress leaves empty. */
const pressureFor: Partial<Record<Variant, (data: RawSection) => Pressure>> = {
  services: (data) => fromSection(mergeServices, servicesContent, data).pressure,
  clients: (data) => fromSection(mergeClients, clientsContent, data).pressure,
  careers: (data) => fromSection(mergeCareers, careersContent, data).pressure,
  "agentic-ai": (data) => fromSection(mergeAgenticAi, agenticAiContent, data).pressure,
  "knowledge-hub": (data) => fromSection(mergeKnowledgeHub, knowledgeHubContent, data).pressure,
  "people-operations": (data) => fromSection(mergePeopleOperations, peopleOperationsContent, data).pressure,
};

/**
 * `CtaSection` — closing call-to-action band, used on most pages.
 *
 * The title's `<b>…</b>` / `<strong>…</strong>` part becomes the highlighted
 * phrase. The variant (see `section-variants.ts`) only tunes title line breaks.
 */
export const ctaSection = defineSection<CtaSectionFragment>({
  layout: "CtaSection",
  render: (data, { variant }) => {
    const style = (variant ?? "default") as Variant;

    if (style === "home") {
      return <HomePressure pressure={fromSection(mergeHome, homeContent, data).pressure} />;
    }
    if (style === "why") {
      return <WhyFooterCta cta={fromSection(mergeWhy, whyContent, data).cta} />;
    }

    const pressure = (pressureFor[style] ?? pressureFor.careers!)(data as RawSection);

    return (
      <FooterHero
        variant={style as FooterHeroVariant}
        title={pressure.title}
        highlight={pressure.emphasis}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    );
  },
});
