import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailIntroSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationIntro } from "@/components/foundation/foundation-sections";
import { link, media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

export const serviceDetailIntroSection = defineSection<ServiceDetailIntroSectionFragment>({
  layout: "ServiceDetailIntroSection",
  render: (data) => {
    const fallback = fallbackFoundationContent.intro;
    const titleParts = splitEmphasis(data.title);
    const subTitle = text(data.subTitle, fallback.subTitle);
    const rawDesc = multilineText(data.description) || fallback.description;
    const cta = link(data.ctaButton, fallback.ctaButton);

    const titleLead = titleParts
      ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
      : text(data.title, fallback.title);
    const titleHighlight = titleParts ? titleParts.emphasis : fallback.highlight;

    const cards = (data.highlightCards && data.highlightCards.length > 0
      ? data.highlightCards
      : fallback.highlightCards
    ).map((card, idx) => {
      const fb = fallback.highlightCards[idx % fallback.highlightCards.length];
      const cardTitle = text(card?.title, fb.title);
      const cardImage = media(card?.image)?.url || fb.image;
      const cardIcon = media(card?.icon)?.url || fb.icon;
      return {
        title: cardTitle,
        image: cardImage,
        icon: cardIcon,
      };
    });

    return (
      <FoundationIntro
        subTitle={subTitle}
        title={titleLead}
        highlight={titleHighlight}
        description={rawDesc}
        ctaButton={cta}
        cards={cards}
      />
    );
  },
});
