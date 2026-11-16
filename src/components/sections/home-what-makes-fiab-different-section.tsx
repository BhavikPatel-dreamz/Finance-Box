import { defineSection } from "@/lib/page-builder/types";
import type { HomeWhatMakesFiabDifferentSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HomeDifference } from "@/components/home/home-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

const DEFAULT_DIFFERENCE_ICONS = [
  "/icons/one-finace-team.svg",
  "/icons/build-for-growing.svg",
  "/icons/scale-with-company.svg",
  "/icons/cost-intelligence.svg",
  "/icons/automation.svg",
];

function mapDifferenceIcon(title?: string | null, index = 0): string {
  const t = (title ?? "").toLowerCase();
  if (t.includes("finance team") || t.includes("function") || t.includes("one")) return "/icons/one-finace-team.svg";
  if (t.includes("growing") || t.includes("built")) return "/icons/build-for-growing.svg";
  if (t.includes("scale") || t.includes("company")) return "/icons/scale-with-company.svg";
  if (t.includes("cost") || t.includes("intelligence")) return "/icons/cost-intelligence.svg";
  if (t.includes("automation") || t.includes("finops") || t.includes("platform") || t.includes("ai")) return "/icons/automation.svg";
  return DEFAULT_DIFFERENCE_ICONS[index % DEFAULT_DIFFERENCE_ICONS.length];
}

/** `HomeWhatMakesFiabDifferentSection` — Differentiator cards with outcome stat. */
export const homeWhatMakesFiabDifferentSection = defineSection<HomeWhatMakesFiabDifferentSectionFragment>({
  layout: "HomeWhatMakesFiabDifferentSection",
  render: (data) => {
    const rawTitle = data.title ?? "";
    const parts = splitEmphasis(rawTitle);
    const plain = text(rawTitle);

    let titleBefore = "";
    let highlight = "";
    let titleAfter = "";

    if (parts) {
      titleBefore = parts.before;
      highlight = parts.emphasis;
      titleAfter = parts.after;
    } else if (plain.includes("FIAB")) {
      const idx = plain.indexOf("FIAB");
      titleBefore = plain.slice(0, idx).trim();
      highlight = "FIAB";
      titleAfter = plain.slice(idx + 4).trim();
    } else {
      titleBefore = plain;
    }

    const cards = (data.cards ?? [])
      .map((card, idx) => ({
        icon: media(card?.backgroundImage)?.url || mapDifferenceIcon(card?.title, idx),
        tone: idx === 0 ? ("light" as const) : ("dark" as const),
        title: text(card?.title),
        text: text(card?.content),
      }))
      .filter((card) => card.title || card.text);

    if (!plain || cards.length === 0) return null;

    return (
      <HomeDifference
        difference={{
          title: plain,
          titleBefore,
          highlight,
          titleAfter,
          cards,
          statEyebrow: text(data.outcomeLabel),
          statValue: text(data.outcomeValue),
          statLabel: text(data.outcomeText),
        }}
      />
    );
  },
});

