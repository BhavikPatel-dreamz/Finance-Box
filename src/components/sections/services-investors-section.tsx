import { defineSection } from "@/lib/page-builder/types";
import type { ServicesInvestorsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesInvestors } from "@/components/services/services-sections";
import { link, media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `ServicesInvestorsSection` — Investor cards slider. */
export const servicesInvestorsSection = defineSection<ServicesInvestorsSectionFragment>({
  layout: "ServicesInvestorsSection",
  render: (data) => {
    const rawTitle = data.title ?? "";
    const parts = splitEmphasis(rawTitle);

    let line1 = "";
    let line2 = "";
    let highlight = "";
    let line3 = "";

    if (parts) {
      const before = parts.before.replace(/<br\s*\/?>/gi, "\n").trim();
      const emphasis = parts.emphasis.replace(/<br\s*\/?>/gi, "\n").trim();

      if (before.includes("\n")) {
        const bLines = before.split("\n").map((s) => s.trim()).filter(Boolean);
        line1 = bLines[0] || "";
        line2 = bLines.slice(1).join(" ");
      } else if (before.toLowerCase().startsWith("why investors")) {
        line1 = before.slice(0, 13).trim();
        line2 = before.slice(13).trim();
      } else {
        const words = before.split(/\s+/);
        line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
        line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
      }

      if (emphasis.includes("\n")) {
        const eLines = emphasis.split("\n").map((s) => s.trim()).filter(Boolean);
        highlight = eLines[0] || "";
        line3 = eLines.slice(1).join(" ");
      } else {
        const words = emphasis.split(/\s+/);
        if (words.length > 1) {
          highlight = words[0];
          line3 = words.slice(1).join(" ");
        } else {
          highlight = emphasis;
          line3 = "";
        }
      }
    } else {
      const plain = text(rawTitle).replace(/<br\s*\/?>/gi, "\n").trim();
      if (plain.includes("\n")) {
        const pLines = plain.split("\n").map((s) => s.trim()).filter(Boolean);
        line1 = pLines[0] || "";
        line2 = pLines[1] || "";
        line3 = pLines.slice(2).join(" ") || "";
      } else {
        const target = "their portfolio";
        if (plain.toLowerCase().includes(target)) {
          const idx = plain.toLowerCase().indexOf(target);
          const before = plain.slice(0, idx).trim();
          if (before.toLowerCase().startsWith("why investors")) {
            line1 = before.slice(0, 13).trim();
            line2 = before.slice(13).trim();
          } else {
            line1 = before;
            line2 = "";
          }
          highlight = "their";
          line3 = "portfolio";
        } else {
          line1 = plain;
        }
      }
    }

    const cards = (data.investorCards ?? []).map((card) => ({
      title: text(card?.title),
      text: text(card?.description),
      image: media(card?.image),
    }));

    const title = [line1, line2, line3].filter(Boolean).join("\n");

    return (
      <ServicesInvestors
        investors={{
          eyebrow: text(data.subTitle),
          title,
          highlight,
          text: text(data.description),
          primary: link(data.primaryCtaButton, { label: "", url: "" }),
          secondary: link(data.secondaryCtaButton, { label: "", url: "" }),
          cards,
        }}
      />
    );
  },
});