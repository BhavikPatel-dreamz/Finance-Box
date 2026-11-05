import { defineSection } from "@/lib/page-builder/types";
import type { ClientsBannerSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HeroSection } from "@/components/hero";
import { splitEmphasis, text } from "@/lib/wordpress/fields";

/** `ClientsBannerSection` — Clients hero with proof and stats. */
export const clientsBannerSection = defineSection<ClientsBannerSectionFragment>({
  layout: "ClientsBannerSection",
  hero: true,
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const proof = text(data.clientProof, "");
    const clientProofItems = proof
      ? proof.split(/\n+/).map((line) => line.replace(/^[-•*]\s*/, "").trim()).filter(Boolean)
      : [];
    return (
      <HeroSection
        page="clients"
        overrides={{
          eyebrow: text(data.subTitle),
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          description: text(data.description),
          clientProofTitle: proof ? "CLIENT PROOF" : "",
          clientProofItems,
          stats: (data.stats ?? []).map((stat) => ({
            value: text(stat?.number),
            label: text(stat?.label),
          })),
        }}
      />
    );
  },
});