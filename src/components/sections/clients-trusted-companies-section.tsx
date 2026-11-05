import { defineSection } from "@/lib/page-builder/types";
import type { ClientsTrustedCompaniesSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ClientsTrustedCompanies } from "@/components/clients/clients-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `ClientsTrustedCompaniesSection` — Client logo grid. */
export const clientsTrustedCompaniesSection = defineSection<ClientsTrustedCompaniesSectionFragment>({
  layout: "ClientsTrustedCompaniesSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const title1 = titleParts ? titleParts.before : text(data.title);
    const highlight1 = titleParts ? titleParts.emphasis : "";
    const title2 = titleParts ? titleParts.after : "";
    const logos = (data.logos ?? []).map((item) => {
      const image = media(item?.logo);
      return {
        name: image?.alt ?? "Client",
        image: image?.url ?? "",
      };
    });
    return (
      <ClientsTrustedCompanies
        logosSection={{
          title1: text(title1),
          highlight1: text(highlight1),
          title2: text(title2),
          logos,
        }}
      />
    );
  },
});