import { defineSection } from "@/lib/page-builder/types";
import type { ClientsFeaturedCaseStudiesSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ClientsCaseStudies } from "@/components/clients/clients-sections";
import { mergeClients } from "@/components/clients/merge";
import { clientsContent } from "@/content/clients";

/** `ClientsFeaturedCaseStudiesSection` — Featured case studies (CaseStudy post type). */
export const clientsFeaturedCaseStudiesSection = defineSection<ClientsFeaturedCaseStudiesSectionFragment>({
  layout: "ClientsFeaturedCaseStudiesSection",
  render: (data) => {
    const content = fromSection(mergeClients, clientsContent, data);
    return <ClientsCaseStudies caseStudies={content.caseStudies} />;
  },
});
