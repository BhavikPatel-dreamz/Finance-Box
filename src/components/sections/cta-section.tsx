import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FooterHero, type FooterHeroVariant } from "@/components/ui/footer-hero";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";
import { slugFromUri } from "@/lib/wordpress/paths";

function resolveCtaVariant(uri?: string): FooterHeroVariant {
  const slug = slugFromUri(uri);
  if (slug === "clients") return "clients";
  if (slug === "services") return "services";
  if (slug === "why-fiab" || slug === "why") return "why-fiab";
  if (slug === "careers") return "careers";
  if (slug === "agentic-ai") return "agentic-ai";
  if (slug === "knowledge-hub") return "knowledge-hub";
  if (slug === "people-operations") return "people-operations";
  if (!slug || slug === "home") return "home";
  return "default";
}

export const ctaSection = defineSection<CtaSectionFragment>({
  layout: "CtaSection",
  render: (data, context) => {
    const variant = resolveCtaVariant(context?.uri);
    const titleParts = splitEmphasis(data.title);
    let title = text(data.title);
    let highlight = "";

    if (titleParts) {
      title = [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim();
      highlight = titleParts.emphasis;
    } else if (variant === "clients") {
      const targetEmphasis = "the next case study";
      if (title.toLowerCase().includes(targetEmphasis)) {
        const idx = title.toLowerCase().indexOf(targetEmphasis);
        highlight = title.slice(idx, idx + targetEmphasis.length);
        title = title.slice(0, idx).trim();
      }
    }

    return (
      <FooterHero
        variant={variant}
        title={title}
        highlight={highlight}
        text={text(data.description)}
        buttonLabel={link(data.ctaButton, { label: "", url: "" }).label}
        buttonUrl={link(data.ctaButton, { label: "", url: "" }).url}
      />
    );
  },
});
