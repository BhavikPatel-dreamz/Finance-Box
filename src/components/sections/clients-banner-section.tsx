import { defineSection } from "@/lib/page-builder/types";
import type { ClientsBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { HeroSection } from "@/components/hero";
import { mergeClients } from "@/components/clients/merge";
import { clientsContent } from "@/content/clients";

/** `ClientsBannerSection` — Clients hero with proof and stats. */
export const clientsBannerSection = defineSection<ClientsBannerSectionFragment>({
  layout: "ClientsBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeClients, clientsContent, data);
    return (
      <HeroSection
        page="clients"
        headerNode={header}
        overrides={{
          eyebrow: content.hero.eyebrow,
          title: content.hero.title,
          highlight: content.hero.highlight,
          description: content.hero.text,
          clientProofTitle: content.hero.clientProofTitle,
          clientProofItems: content.hero.clientProofItems,
          stats: content.hero.stats,
        }}
      />
    );
  },
});
