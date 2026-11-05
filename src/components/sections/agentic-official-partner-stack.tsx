import { defineSection } from "@/lib/page-builder/types";
import type { AgenticOfficialPartnerStackFragment } from "@/lib/wordpress/generated/graphql";
import { PartnersSection } from "@/components/ui/partners-section";
import { AgenticPartners } from "@/components/agentic-ai/agentic-ai-sections";
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
    const simpleLogos = (data.officialPartners ?? []).map((partner) => {
      const image = media(partner?.logo);
      return {
        image,
        name: image?.alt ?? "Partner",
        caption: "",
      };
    });

    if (data.logoView === "boxed") {
      const logos = (data.officialPartners ?? []).map((partner) => {
        const image = media(partner?.logo);
        return {
          name: image?.alt ?? "Partner",
          logo: image?.url ?? "",
        };
      });
      return <AgenticPartners partners={{ title: text(data.title), logos }} />;
    }

    return (
      <PartnersSection
        title={text(data.title)}
        highlight="Partners"
        logos={simpleLogos}
      />
    );
  },
});