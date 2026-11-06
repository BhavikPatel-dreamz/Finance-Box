import { defineSection } from "@/lib/page-builder/types";
import type { FaqSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FaqBlock } from "@/components/careers/careers-sections";
import { text } from "@/lib/wordpress/fields";

/** `FaqSection` — FAQ accordion (adapts dark container for Homepage, cream for Careers). */
export const faqSection = defineSection<FaqSectionFragment>({
  layout: "FaqSection",
  render: (data, { uri }) => {
    const isHome = uri === "/" || uri === "";
    return (
      <FaqBlock
        faq={{
          title: text(data.title),
          items: (data.faqs ?? []).map((faq) => ({
            question: text(faq?.question),
            answer: text(faq?.answer),
          })),
        }}
        variant={isHome ? "dark" : "light"}
      />
    );
  },
});