import { defineSection } from "@/lib/page-builder/types";
import type { FaqSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { FaqBlock } from "@/components/careers/careers-sections";
import { mergeCareers } from "@/components/careers/merge";
import { careersContent } from "@/content/careers";

/** `FaqSection` — FAQ accordion (adapts dark container for Homepage, cream for Careers). */
export const faqSection = defineSection<FaqSectionFragment>({
  layout: "FaqSection",
  render: (data, { uri }) => {
    const content = fromSection(mergeCareers, careersContent, data);
    const isHome = uri === "/" || uri === "";
    return <FaqBlock faq={content.faq} variant={isHome ? "dark" : "light"} />;
  },
});
