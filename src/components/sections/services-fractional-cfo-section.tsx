import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFractionalCfoSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesCfo } from "@/components/services/services-sections";
import { link, media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** Shown when a deliverable has no image in WordPress. */
const CFO_PLACEHOLDER_IMAGE = "/media/placeholder.svg";

/** `ServicesFractionalCfoSection` — Fractional CFO deliverables. */
export const servicesFractionalCfoSection = defineSection<ServicesFractionalCfoSectionFragment>({
  layout: "ServicesFractionalCfoSection",
  render: (data) => {
    const rawTitle = data.title ?? "";
    const parts = splitEmphasis(rawTitle);

    let titleBefore = "";
    let highlight = "";
    let titleAfter = "";

    if (parts) {
      titleBefore = parts.before;
      highlight = parts.emphasis;
      titleAfter = parts.after;
    } else if (rawTitle.includes("\n")) {
      const lines = rawTitle.split("\n");
      titleBefore = text(lines[0]);
      highlight = text(lines.slice(1).join(" "));
    } else if (/<br\s*\/?>/i.test(rawTitle)) {
      const lines = rawTitle.split(/<br\s*\/?>/i);
      titleBefore = text(lines[0]);
      highlight = text(lines.slice(1).join(" "));
    } else {
      const plain = text(rawTitle);
      const target = "CFOs Deliver";
      if (plain.toLowerCase().includes(target.toLowerCase())) {
        const idx = plain.toLowerCase().indexOf(target.toLowerCase());
        titleBefore = plain.slice(0, idx).trim();
        highlight = plain.slice(idx, idx + target.length);
        titleAfter = plain.slice(idx + target.length).trim();
      } else {
        titleBefore = plain;
      }
    }

    const cards = (data.deliverables ?? []).map((card) => {
      const img = media(card?.image);
      return {
        title: text(card?.label),
        text: text(card?.description),
        image: img?.url ? img : { url: CFO_PLACEHOLDER_IMAGE, alt: text(card?.label) },
      };
    });
    return (
      <ServicesCfo
        cfo={{
          title: highlight ? `${titleBefore}\n${highlight}${titleAfter ? ` ${titleAfter}` : ""}` : titleBefore,
          titleBefore,
          highlight,
          titleAfter,
          text: text(data.description),
          cta: link(data.ctaButton, { label: "", url: "" }),
          cards,
        }}
      />
    );
  },
});