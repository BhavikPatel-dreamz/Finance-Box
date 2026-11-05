import { defineSection } from "@/lib/page-builder/types";
import type { ClientsWhereFiabWorksSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ClientsWhereFiabWorks } from "@/components/clients/clients-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `ClientsWhereFiabWorksSection` — industries with image, then the portfolio-company call to action. */
export const clientsWhereFiabWorksSection = defineSection<ClientsWhereFiabWorksSectionFragment>({
  layout: "ClientsWhereFiabWorksSection",
  render: (data) => {
    const image = media(data.image);
    const portfolioImage = media(data.portfolioImage);
    if (!text(data.title) || !image || !text(data.portfolioTitle) || !portfolioImage) {
      return null;
    }
    const industries = (data.industries ?? []).map((row) => text(row?.title)).filter(Boolean);
    return (
      <ClientsWhereFiabWorks
        works={{
          title: text(data.title),
          text: text(data.description),
          industries,
          image,
          portfolio: {
            title: text(data.portfolioTitle),
            text: text(data.portfolioDescription),
            image: portfolioImage,
            cta: link(data.portfolioCtaButton, { label: "", url: "" }),
          },
        }}
      />
    );
  },
});
