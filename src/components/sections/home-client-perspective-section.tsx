import { defineSection } from "@/lib/page-builder/types";
import type { HomeClientPerspectiveSectionFragment } from "@/lib/wordpress/generated/graphql";
import { HomeDecisions } from "@/components/home/home-sections";
import { link, media, text } from "@/lib/wordpress/fields";

/** `HomeClientPerspectiveSection` — Client quote with metrics. */
export const homeClientPerspectiveSection = defineSection<HomeClientPerspectiveSectionFragment>({
  layout: "HomeClientPerspectiveSection",
  render: (data) => {
    const portrait = media(data.image);
    if (!portrait || !text(data.quote) || !text(data.name)) return null;
    const metrics = (data.metrics ?? []).map((row) => ({ icon: null, title: text(row?.value), text: text(row?.description) })).filter((row) => row.title || row.text);
    return (
      <HomeDecisions
        decisions={{
          badge: text(data.imageLabel),
          quote: text(data.quote),
          name: text(data.name),
          role: text(data.designation),
          portrait,
          eyebrow: text(data.subTitle),
          title: "Built for Better Business Decisions.",
          text: text(data.description),
          cards: metrics,
          cta: link(data.ctaButton, { label: "", url: "" }),
        }}
      />
    );
  },
});
