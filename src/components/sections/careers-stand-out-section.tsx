import { defineSection } from "@/lib/page-builder/types";
import type { CareersStandOutSectionFragment } from "@/lib/wordpress/generated/graphql";
import { CareersStandOut } from "@/components/careers/careers-sections";
import { media, text } from "@/lib/wordpress/fields";

function extractPoints(value: unknown): string[] {
  const raw = typeof value === "string" ? value : "";
  const items = [...raw.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((match) => text(match[1]))
    .filter(Boolean);
  if (items.length > 0) return items;
  return text(raw).split(/\n+/).map((line) => line.trim()).filter(Boolean);
}

/** `CareersStandOutSection` — Image cards. */
export const careersStandOutSection = defineSection<CareersStandOutSectionFragment>({
  layout: "CareersStandOutSection",
  render: (data) => {
    const cards = (data.cards ?? []).map((card) => ({
      image: media(card?.backgroundImage)?.url ?? "",
      title: text(card?.title),
      text: text(card?.content),
      points: extractPoints(card?.hoverContent),
    }));
    return (
      <CareersStandOut
        standOut={{
          title: text(data.title),
          cards,
        }}
      />
    );
  },
});