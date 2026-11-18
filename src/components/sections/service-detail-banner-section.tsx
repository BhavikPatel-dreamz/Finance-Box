import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationHero } from "@/components/foundation/foundation-sections";
import { link, media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

export const serviceDetailBannerSection = defineSection<ServiceDetailBannerSectionFragment>({
  layout: "ServiceDetailBannerSection",
  hero: true,
  render: (data) => {
    const fallback = fallbackFoundationContent.banner;
    const titleParts = splitEmphasis(data.title);
    const bgImage = media(data.backgroundImage)?.url || fallback.backgroundImage;
    const cta = link(data.ctaButton, fallback.ctaButton);
    const rawDesc = multilineText(data.description) || fallback.description;
    const subTitle = text(data.subTitle, fallback.subTitle);

    const titleLead = titleParts
      ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
      : text(data.title, fallback.title);
    const titleHighlight = titleParts ? titleParts.emphasis : fallback.highlight;

    return (
      <FoundationHero
        subTitle={subTitle}
        title={titleLead}
        highlight={titleHighlight}
        description={rawDesc}
        backgroundImage={bgImage}
        ctaButton={cta}
      />
    );
  },
});
