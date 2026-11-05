import { defineSection } from "@/lib/page-builder/types";
import type { CareersWhyWorkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { CareersWhyWork } from "@/components/careers/careers-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `CareersWhyWorkSection` — Image with reasons to join. */
export const careersWhyWorkSection = defineSection<CareersWhyWorkSectionFragment>({
  layout: "CareersWhyWorkSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <CareersWhyWork
        whyWork={{
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          image: media(data.image)?.url ?? "",
          points: (data.points ?? []).map((point) => text(point?.content)).filter(Boolean),
        }}
      />
    );
  },
});