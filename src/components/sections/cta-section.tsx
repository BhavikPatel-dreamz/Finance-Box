import { defineSection } from "@/lib/page-builder/types";
import type { CtaSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FooterHero } from "@/components/ui/footer-hero";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

function getCtaVariant(uri?: string): FooterHeroVariant {
  if (!uri) return "default";
  if (uri.includes("why-fiab") || uri.includes("why")) return "why-fiab";
  if (uri.includes("services")) return "services";
  if (uri.includes("clients")) return "clients";
  if (uri.includes("careers")) return "careers";
  if (uri.includes("agentic-ai")) return "agentic-ai";
  if (uri.includes("knowledge-hub")) return "knowledge-hub";
  if (uri.includes("people-operations")) return "people-operations";
  if (uri === "/") return "home";
  return "default";
}

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