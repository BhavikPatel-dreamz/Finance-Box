import { defineSection } from "@/lib/page-builder/types";
import type { ServicesFindYourStageSectionFragment } from "@/lib/wordpress/generated/graphql";
import { ServicesStages } from "@/components/services/services-sections";
import { media, text } from "@/lib/wordpress/fields";

const DEFAULT_STAGE_ICONS = [
  "/icons/set-the-foundation.svg",
  "/icons/build-momentum.svg",
  "/icons/lead-with-foresight.svg",
  "/icons/optimize-and-expand.svg",
];

function mapStageIcon(title?: string | null, index = 0): string {
  const t = (title ?? "").toLowerCase();
  if (t.includes("foundation") || t.includes("set")) return "/icons/set-the-foundation.svg";
  if (t.includes("momentum") || t.includes("build")) return "/icons/build-momentum.svg";
  if (t.includes("foresight") || t.includes("lead")) return "/icons/lead-with-foresight.svg";
  if (t.includes("optimize") || t.includes("expand")) return "/icons/optimize-and-expand.svg";
  return DEFAULT_STAGE_ICONS[index % DEFAULT_STAGE_ICONS.length];
}

/** `ServicesFindYourStageSection` — Company-stage cards. */
export const servicesFindYourStageSection = defineSection<ServicesFindYourStageSectionFragment>({
  layout: "ServicesFindYourStageSection",
  render: (data) => {
    const cards = (data.stageCards ?? []).map((card, idx) => ({
      title: text(card?.title),
      label: text(card?.stageLabel),
      text: text(card?.description),
      icon: media(card?.icon)?.url || mapStageIcon(card?.title, idx),
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
