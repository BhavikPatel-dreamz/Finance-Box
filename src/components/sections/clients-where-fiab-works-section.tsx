import { defineSection } from "@/lib/page-builder/types";
import type { ClientsWhereFiabWorksSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ClientsWhereFiabWorks, clientsWhereFiabWorksDefaults as defaults } from "@/components/clients/clients-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `ClientsWhereFiabWorksSection` — industries with image, then the portfolio-company call to action. */
export const clientsWhereFiabWorksSection = defineSection<ClientsWhereFiabWorksSectionFragment>({
  layout: "ClientsWhereFiabWorksSection",
  render: (data) => {
    const industries = (data.industries ?? []).map((row) => text(row?.title)).filter(Boolean);
    return (
      <ClientsWhereFiabWorks
        works={{
          title: text(data.title, defaults.title),
          text: text(data.description, defaults.text),
          industries: industries.length > 0 ? industries : defaults.industries,
          image: media(data.image, defaults.image.alt) ?? defaults.image,
          portfolio: {
            title: text(data.portfolioTitle, defaults.portfolio.title),
            text: text(data.portfolioDescription, defaults.portfolio.text),
            image: media(data.portfolioImage, defaults.portfolio.image.alt) ?? defaults.portfolio.image,
            cta: link(data.portfolioCtaButton, defaults.portfolio.cta),
          },
        }}
      />
    );
  },
});
