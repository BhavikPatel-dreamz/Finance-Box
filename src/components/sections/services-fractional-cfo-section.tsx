import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFractionalCfoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesCfo } from "@/components/services/services-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `ServicesFractionalCfoSection` — Fractional CFO deliverables. */
export const servicesFractionalCfoSection = defineSection<ServicesFractionalCfoSectionFragment>({
  layout: "ServicesFractionalCfoSection",
  render: (data) => {
    const cards = (data.deliverables ?? []).map((card) => ({
      title: text(card?.label),
      text: text(card?.description),
      image: media(card?.image),
    }));
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