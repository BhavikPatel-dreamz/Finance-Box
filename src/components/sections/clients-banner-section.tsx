import { defineSection } from "@/lib/page-builder/types";
import type { ClientsBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ClientsBanner } from "@/components/clients/clients-sections";
import { mergeClients } from "@/components/clients/merge";
import { clientsContent } from "@/content/clients";

/** `ClientsBannerSection` — Clients hero with proof and stats. */
export const clientsBannerSection = defineSection<ClientsBannerSectionFragment>({
  layout: "ClientsBannerSection",
  hero: true,
  render: (data, { header }) => {
    const content = fromSection(mergeClients, clientsContent, data);
    return <ClientsBanner hero={content.hero} header={header} />;
  },
});
