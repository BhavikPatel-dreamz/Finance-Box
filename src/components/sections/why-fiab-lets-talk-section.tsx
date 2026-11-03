import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabLetsTalkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyTalk } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabLetsTalkSection` — Image with call to action. */
export const whyFiabLetsTalkSection = defineSection<WhyFiabLetsTalkSectionFragment>({
  layout: "WhyFiabLetsTalkSection",
  render: (data) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyTalk talk={content.talk} />;
  },
});
