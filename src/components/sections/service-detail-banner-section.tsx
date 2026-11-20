import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationHero } from "@/components/foundation/foundation-sections";
import { link, media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

/**
 * Per-page hero layout configuration matching Figma designs.
 * Easily adjust title and paragraph max-widths per page here without affecting other pages:
 * - foresight: Title ~520px (2 lines), Paragraph ~565px (2 lines breaking at "scenario plans,")
 * - partner-with-us: Title ~960px (2 lines), Paragraph ~880px (3 lines breaking at "Power BI," and "implement,")
 * - momentum / foundation: Defaults to max-w-[700px] / max-w-[660px]
 */
export const SERVICE_HERO_CONFIG: Record<string, { titleMaxWidth: string; descriptionMaxWidth: string }> = {
  foresight: {
    titleMaxWidth: "max-w-[620px]",
    descriptionMaxWidth: "max-w-[565px]",
  },
  "partner-with-us": {
    titleMaxWidth: "max-w-[960px]",
    descriptionMaxWidth: "max-w-[880px]",
  },
  momentum: {
    titleMaxWidth: "max-w-[780px]",
    descriptionMaxWidth: "max-w-[660px]",
  },
  foundation: {
    titleMaxWidth: "max-w-[960px]",
    descriptionMaxWidth: "max-w-[800px]",
  },
  blogs: {
    titleMaxWidth: "max-w-[1240px]",
    descriptionMaxWidth: "max-w-[780px]",
  },
};

function resolveHeroConfig(uri?: string | null) {
  if (!uri) return SERVICE_HERO_CONFIG.foundation;
  const clean = uri.toLowerCase();
  if (clean.includes("foresight")) return SERVICE_HERO_CONFIG.foresight;
  if (clean.includes("partner")) return SERVICE_HERO_CONFIG["partner-with-us"];
  if (clean.includes("momentum")) return SERVICE_HERO_CONFIG.momentum;
  if (clean.includes("blog")) return SERVICE_HERO_CONFIG.blogs;
  return SERVICE_HERO_CONFIG.foundation;
}

export const serviceDetailBannerSection = defineSection<ServiceDetailBannerSectionFragment>({
  layout: "ServiceDetailBannerSection",
  hero: true,
  render: (data, context) => {
    const fallback = fallbackFoundationContent.banner;
    const titleParts = splitEmphasis(data.title);
    const heroConfig = resolveHeroConfig(context?.uri);
    const isBlog = Boolean(context?.uri?.includes("blog"));

    let defaultBg = fallback.backgroundImage;
    if (context?.uri?.includes("foresight")) {
      defaultBg = "/foundation/foundation-foresight-hero-bg.jpg";
    } else if (context?.uri?.includes("momentum")) {
      defaultBg = "/foundation/foundation-momentum-hero-bg.jpg";
    } else if (context?.uri?.includes("partner")) {
      defaultBg = "/foundation/partner-with-us-hero-bg.jpg";
    } else if (isBlog) {
      defaultBg = "/foundation/foundation-foresight-hero-bg.jpg";
    }

    const bgImage = media(data.backgroundImage)?.url || defaultBg;
    const cta = isBlog
      ? (data.ctaButton ? link(data.ctaButton, { label: "", url: "" }) : { label: "", url: "" })
      : link(data.ctaButton, fallback.ctaButton);
    const rawDesc = multilineText(data.description) || fallback.description;
    const subTitle = text(data.subTitle, isBlog ? "Our Blogs" : fallback.subTitle);

    const titleLead = titleParts
      ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
      : text(data.title, fallback.title);
    const titleHighlight = titleParts ? titleParts.emphasis : (isBlog ? "Businesses Forward" : fallback.highlight);

    return (
      <FoundationHero
        subTitle={subTitle}
        title={titleLead}
        highlight={titleHighlight}
        description={rawDesc}
        backgroundImage={bgImage}
        ctaButton={cta}
        titleMaxWidth={heroConfig.titleMaxWidth}
        descriptionMaxWidth={heroConfig.descriptionMaxWidth}
        breakLine={!isBlog}
      />
    );
  },
});
