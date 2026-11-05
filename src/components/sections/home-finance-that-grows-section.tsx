import { defineSection } from "@/lib/page-builder/types";
import type { HomeFinanceThatGrowsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HomeGrowth } from "@/components/home/home-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `HomeFinanceThatGrowsSection` — Growth image with tier cards. */
export const homeFinanceThatGrowsSection = defineSection<HomeFinanceThatGrowsSectionFragment>({
  layout: "HomeFinanceThatGrowsSection",
  render: (data) => {
    const image = media(data.image);
    if (!image || !text(data.title)) return null;
    const growth = {
      eyebrow: text(data.subTitle),
      title: text(data.title),
      text: text(data.description),
      image,
      overlay: text(data.imageTitle),
      stages: (data.imageSteps ?? []).map((row) => text(row?.label)).filter(Boolean),
      cards: (data.tiers ?? []).map((tier) => ({
        icon: null,
        title: text(tier?.title),
        text: text(tier?.description),
        items: [],
      })),
      cta: link(data.ctaButton, { label: "", url: "" }),
    };
    return <HomeGrowth growth={growth as never} />;
  },
});
