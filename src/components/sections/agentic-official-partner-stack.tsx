import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOfficialPartnerStackFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { PartnersSection } from "@/components/ui/partners-section";
import { AgenticPartners } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeHome } from "@/components/home/merge";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { homeContent } from "@/content/home";
import { agenticAiContent } from "@/content/agentic-ai";

/**
 * `AgenticOfficialPartnerStack` — scrolling partner logos.
 *
 * Editors choose the design with the ACF `logoView` field:
 * "simple" (plain logos, default) or "boxed" (each logo in a bordered card).
 */
export const agenticOfficialPartnerStack = defineSection<AgenticOfficialPartnerStackFragment>({
  layout: "AgenticOfficialPartnerStack",
  render: (data) => {
    if (data.logoView === "boxed") {
      return <AgenticPartners partners={fromSection(mergeAgenticAi, agenticAiContent, data).partners} />;
    }
    const { partners } = fromSection(mergeHome, homeContent, data);
    return <PartnersSection title={partners.title} highlight="Partners" logos={partners.logos} />;
  },
});
