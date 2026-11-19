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

    let titleLead = fallback.title;
    let titleHighlight = fallback.highlight;

    if (data.title) {
      if (titleParts) {
        titleLead = [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim();
        titleHighlight = titleParts.emphasis;
      } else {
        const rawTitle = text(data.title).trim();
        const targetPhrases = ["Automate & Deliver", "accurate, compliant, audit-ready", "seamless compliance."];
        let found = false;
        for (const phrase of targetPhrases) {
          if (rawTitle.toLowerCase().includes(phrase.toLowerCase())) {
            const idx = rawTitle.toLowerCase().indexOf(phrase.toLowerCase());
            titleLead = rawTitle.slice(0, idx).trim();
            titleHighlight = rawTitle.slice(idx, idx + phrase.length).trim();
            found = true;
            break;
          }
        }
        if (!found) {
          titleLead = rawTitle;
          titleHighlight = "";
        }
      }
    }

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
