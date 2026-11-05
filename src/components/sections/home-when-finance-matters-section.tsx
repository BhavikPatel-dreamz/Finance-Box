import { defineSection } from "@/lib/page-builder/types";
import type { HomeWhenFinanceMattersSectionFragment } from "@/lib/wordpress/generated/graphql";
import { Founders } from "@/components/home/founders";
import { link, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `HomeWhenFinanceMattersSection` — Founder moments accordion. */
export const homeWhenFinanceMattersSection = defineSection<HomeWhenFinanceMattersSectionFragment>({
  layout: "HomeWhenFinanceMattersSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const cards = (data.moments ?? []).map((moment) => ({
      icon: null,
      title: text(moment?.title),
      text: text(moment?.content),
    }));
    return (
      <Founders
        founders={{
          eyebrow: text(data.subTitle),
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          text: text(data.description),
          cta: link(data.ctaButton, { label: "", url: "" }),
          cards,
        }}
      />
    );
  },
});