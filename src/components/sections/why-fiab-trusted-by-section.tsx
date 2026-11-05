import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabTrustedBySectionFragment } from "@/lib/wordpress/generated/graphql";
import { TrustedBy, type TrustedLogo } from "@/components/home/trusted-by";
import { media, nameFromFileUrl, splitEmphasis, text } from "@/lib/wordpress/fields";

/**
 * `WhyFiabTrustedBySection` — "Trusted by 40+ …" strip with a logo carousel.
 * Wrap the number in `<span>` in the ACF title to highlight it.
 */
export const whyFiabTrustedBySection = defineSection<WhyFiabTrustedBySectionFragment>({
  layout: "WhyFiabTrustedBySection",
  render: (data) => {
    const parts = splitEmphasis(data.title);
    const titleText = text(data.title);
    if (!titleText && !parts) return null;
    const trust = parts
      ? { lead: parts.before, stat: parts.emphasis, detail: parts.after }
      : { lead: titleText, stat: "", detail: "" };

    const logos = (data.logos ?? []).flatMap((row, index): TrustedLogo[] => {
      const image = media(row?.logo);
      return image ? [{ src: image.url, name: image.alt || nameFromFileUrl(image.url) || `Client logo ${index + 1}` }] : [];
    });

    return <TrustedBy trust={trust} logos={logos} />;
  },
});
