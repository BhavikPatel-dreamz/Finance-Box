import { defineSection } from "@/lib/page-builder/types";
import type { HomeWhatMakesFiabDifferentSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HomeDifference } from "@/components/home/home-sections";
import { text } from "@/lib/wordpress/fields";

/** `HomeWhatMakesFiabDifferentSection` — Differentiator cards with outcome stat. */
export const homeWhatMakesFiabDifferentSection = defineSection<HomeWhatMakesFiabDifferentSectionFragment>({
  layout: "HomeWhatMakesFiabDifferentSection",
  render: (data) => {
    const cards = (data.cards ?? [])
      .map((card) => ({ title: text(card?.title), text: text(card?.content) }))
      .filter((card) => card.title || card.text);
    if (!text(data.title) || cards.length === 0) return null;
    return (
      <HomeDifference
        difference={{
          title: text(data.title),
          cards,
          statEyebrow: text(data.outcomeLabel),
          statValue: text(data.outcomeValue),
          statLabel: text(data.outcomeText),
        } as never}
      />
    );
  },
});
