import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFindYourStageSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesStages } from "@/components/services/services-sections";
import { text } from "@/lib/wordpress/fields";

function mapStageIcon(card: { title?: string | null }): "gear" | "people" | "person" | "target" {
  const title = (card?.title ?? "").toLowerCase();
  if (title.includes("foundation") || title.includes("set")) return "gear";
  if (title.includes("momentum") || title.includes("build")) return "people";
  if (title.includes("foresight") || title.includes("lead")) return "person";
  if (title.includes("optimize") || title.includes("expand")) return "target";
  return "gear";
}

/** `ServicesFindYourStageSection` — Company-stage cards. */
export const servicesFindYourStageSection = defineSection<ServicesFindYourStageSectionFragment>({
  layout: "ServicesFindYourStageSection",
  render: (data) => {
    const cards = (data.stageCards ?? []).map((card) => ({
      title: text(card?.title),
      label: text(card?.stageLabel),
      text: text(card?.description),
      icon: mapStageIcon({ title: card?.title }),
    }));
    if (!text(data.title) || cards.length === 0) return null;
    return (
      <ServicesStages
        stages={{
          eyebrow: text(data.subTitle),
          title: text(data.title),
          text: text(data.description),
          cards,
        }}
      />
    );
  },
});