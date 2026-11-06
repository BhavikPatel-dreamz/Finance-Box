import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFractionalCfoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesCfo } from "@/components/services/services-sections";
import { link, media, text } from "@/lib/wordpress/fields";

const CFO_FALLBACK_IMAGES = [
  "/services/cfo-dilivers-1.png",
  "/services/cfo-dilivers-2.png",
  "/services/cfo-dilivers-3.png",
];

/** `ServicesFractionalCfoSection` — Fractional CFO deliverables. */
export const servicesFractionalCfoSection = defineSection<ServicesFractionalCfoSectionFragment>({
  layout: "ServicesFractionalCfoSection",
  render: (data) => {
    const cards = (data.deliverables ?? []).map((card, idx) => {
      const fallback = CFO_FALLBACK_IMAGES[idx] || "/media/placeholder.svg";
      const img = media(card?.image);
      return {
        title: text(card?.label),
        text: text(card?.description),
        image: img?.url ? img : { url: fallback, alt: text(card?.label) },
      };
    });
    return (
      <ServicesCfo
        cfo={{
          title: text(data.title),
          text: text(data.description),
          cta: link(data.ctaButton, { label: "", url: "" }),
          cards,
        }}
      />
    );
  },
});