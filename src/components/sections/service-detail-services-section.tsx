import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailServicesSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationServices } from "@/components/foundation/foundation-sections";
import { link, listItems, media, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

export const serviceDetailServicesSection = defineSection<ServiceDetailServicesSectionFragment>({
  layout: "ServiceDetailServicesSection",
  render: (data) => {
    const fallback = fallbackFoundationContent.services;
    const titleParts = splitEmphasis(data.title);
    const subTitle = text(data.subTitle, fallback.subTitle);
    const cta = link(data.ctaButton, fallback.ctaButton);

    const titleLead = titleParts
      ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
      : text(data.title, fallback.title);
    const titleHighlight = titleParts ? titleParts.emphasis : fallback.highlight;

    const cards = (data.serviceCards && data.serviceCards.length > 0
      ? data.serviceCards
      : fallback.serviceCards
    ).map((card, idx) => {
      const fb = fallback.serviceCards[idx % fallback.serviceCards.length];
      const cardTitle = text(card?.title, fb.title);
      const cardTagline = text(card?.tagLine, fb.tagLine);
      const points = card?.points ? listItems(card.points) : fb.points;
      const cardIcon = media(card?.icon)?.url || fb.icon;
      return {
        title: cardTitle,
        tagLine: cardTagline,
        points: points.length > 0 ? points : fb.points,
        icon: cardIcon,
      };
    });

    return (
      <FoundationServices
        subTitle={subTitle}
        title={titleLead}
        highlight={titleHighlight}
        ctaButton={cta}
        cards={cards}
      />
    );
  },
});
