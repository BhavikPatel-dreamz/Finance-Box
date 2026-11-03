import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabHowWeWorkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyHowWeWork } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabHowWeWorkSection` — Numbered work cards. */
export const whyFiabHowWeWorkSection = defineSection<WhyFiabHowWeWorkSectionFragment>({
  layout: "WhyFiabHowWeWorkSection",
  render: (data) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyHowWeWork howWeWork={content.howWeWork} />;
  },
});
