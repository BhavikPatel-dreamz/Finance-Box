import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOfficialPartnerStackFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { PartnersSection } from "@/components/ui/partners-section";
import { AgenticPartners } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";
import { media, text } from "@/lib/wordpress/fields";

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
    const logos = (data.officialPartners ?? []).map((partner) => {
      const image = media(partner?.logo);
      return {
        image,
        name: image?.alt ?? "Partner",
        caption: "",
      };
    });
    return <PartnersSection title={text(data.title)} highlight="Partners" logos={logos} />;
  },
});