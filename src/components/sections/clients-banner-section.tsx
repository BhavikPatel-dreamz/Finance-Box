import { defineSection } from "@/lib/page-builder/types";
import type { ClientsBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";
import { clientsContent } from "@/content/clients";

/** `ClientsBannerSection` — Clients hero with proof and stats. */
export const clientsBannerSection = defineSection<ClientsBannerSectionFragment>({
  layout: "ClientsBannerSection",
  hero: true,
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const backgroundImage = media(data.backgroundImage)?.url;
    const rawProof = text(data.clientProof, "").trim();

    // Check if rawProof has actual list items (e.g. multiple lines or HTML list items)
    let parsedItems: string[] = [];
    if (rawProof.includes("<li")) {
      parsedItems = [...rawProof.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
        .map((m) => m[1].replace(/<[^>]*>/g, "").trim())
        .filter(Boolean);
    } else if (rawProof.includes("\n")) {
      parsedItems = rawProof
        .split(/\n+/)
        .map((line) => line.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean);
    }

    // Filter out if any item is just the header "CLIENT PROOF"
    parsedItems = parsedItems.filter((item) => item.toLowerCase() !== "client proof");

    const stats = (data.stats ?? []).map((stat) => ({
      value: text(stat?.number),
      label: text(stat?.label),
    }));

    let clientProofItems: string[] = parsedItems;
    if (clientProofItems.length === 0) {
      if (stats.length > 0) {
        clientProofItems = stats
          .map((s) => {
            const val = s.value.trim();
            const lbl = s.label.trim();
            if (!val && !lbl) return "";
            if (!val) return lbl;
            if (!lbl) return val;
            const formattedLabel = lbl.charAt(0).toLowerCase() + lbl.slice(1);
            return `${val} ${formattedLabel}`;
          })
          .filter(Boolean);
      } else {
        clientProofItems = clientsContent.hero.clientProofItems;
      }
    }

    return (
      <HeroSection
        page="clients"
        overrides={{
          ...(backgroundImage ? { background: backgroundImage } : {}),
          eyebrow: text(data.subTitle),
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          description: text(data.description),
          clientProofTitle: "CLIENT PROOF",
          clientProofItems,
          stats,
        }}
      />
    );
  },
});