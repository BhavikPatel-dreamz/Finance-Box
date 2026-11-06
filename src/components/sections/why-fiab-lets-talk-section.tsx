import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabLetsTalkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyTalk } from "@/components/why/why-sections";
import { media, splitEmphasis, text, link } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";
import { WhyLink } from "@/content/why-fiab";

/** `WhyFiabLetsTalkSection` — Image with call to action. */
export const whyFiabLetsTalkSection = defineSection<WhyFiabLetsTalkSectionFragment>({
  layout: "WhyFiabLetsTalkSection",
  render: (data) => {
    const parts = splitEmphasis(data.title);
    const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.title);
    const highlight = parts ? parts.emphasis : "";
    const talk: WhyContent["talk"] = {
      title: title || "",
      highlight: highlight || "",
      text: text(data.description, ""),
      image: media(data.image)?.url || "",
      cta: link(data.ctaButton, { label: "", url: "" }),
    };
    return <WhyTalk talk={talk} />;
  },
});
