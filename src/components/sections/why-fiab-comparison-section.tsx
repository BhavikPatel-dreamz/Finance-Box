import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabComparisonSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { WhyCompare } from "@/components/why/why-sections";
import { mergeWhy } from "@/components/why/merge";
import { whyContent } from "@/content/why-fiab";

/** `WhyFiabComparisonSection` — Comparison table. */
export const whyFiabComparisonSection = defineSection<WhyFiabComparisonSectionFragment>({
  layout: "WhyFiabComparisonSection",
  render: (data) => {
    const content = fromSection(mergeWhy, whyContent, data);
    return <WhyCompare compare={content.compare} />;
  },
});
