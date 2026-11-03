import { defineSection } from "@/lib/page-builder/types";
import type { ClientsTrustedCompaniesSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { ClientsTrustedCompanies } from "@/components/clients/clients-sections";
import { mergeClients } from "@/components/clients/merge";
import { clientsContent } from "@/content/clients";

/** `ClientsTrustedCompaniesSection` — Client logo grid. */
export const clientsTrustedCompaniesSection = defineSection<ClientsTrustedCompaniesSectionFragment>({
  layout: "ClientsTrustedCompaniesSection",
  render: (data) => {
    const content = fromSection(mergeClients, clientsContent, data);
    return <ClientsTrustedCompanies logosSection={content.logosSection} />;
  },
});
