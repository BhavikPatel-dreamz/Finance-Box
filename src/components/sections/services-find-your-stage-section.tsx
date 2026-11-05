import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFindYourStageSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesStages } from "@/components/services/services-sections";
import { mapStageIcon } from "@/components/services/merge";
import { text } from "@/lib/wordpress/fields";

/** `ServicesFindYourStageSection` — Company-stage cards. */
export const servicesFindYourStageSection = defineSection<ServicesFindYourStageSectionFragment>({
  layout: "ServicesFindYourStageSection",
  render: (data) => {
    const cards = (data.stageCards ?? []).map((card) => ({
      title: text(card?.title),
      label: text(card?.stageLabel),
      text: text(card?.description),
      icon: mapStageIcon(card as Record<string, unknown>),
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
