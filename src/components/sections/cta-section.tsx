import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FooterHero } from "@/components/ui/footer-hero";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

export const ctaSection = defineSection<CtaSectionFragment>({
  layout: "CtaSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <FooterHero
        variant="default"
        title={titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title)}
        highlight={titleParts ? titleParts.emphasis : ""}
        text={text(data.description)}
        buttonLabel={link(data.ctaButton, { label: "", url: "" }).label}
        buttonUrl={link(data.ctaButton, { label: "", url: "" }).url}
      />
    );
  },
});