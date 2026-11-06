import { defineSection } from "@/lib/page-builder/types";
import type { AboutAgenticSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticAbout } from "@/components/agentic-ai/agentic-ai-sections";
import { media, splitEmphasis, text } from "@/lib/wordpress/fields";

/** `AboutAgenticSection` — What agentic AI is, with feature images. */
export const aboutAgenticSection = defineSection<AboutAgenticSectionFragment>({
  layout: "AboutAgenticSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    return (
      <AgenticAbout
        whatIs={{
          eyebrow: text(data.subTitle),
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          text1: text(data.tagLine),
          text2: text(data.description),
          features: (data.aboutAgentics ?? []).map((feature) => ({
            image: media(feature?.image)?.url ?? "",
            title: text(feature?.title),
            text: text(feature?.content),
          })),
        }}
      />
    );
  },
});