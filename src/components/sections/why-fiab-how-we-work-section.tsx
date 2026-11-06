import { defineSection } from "@/lib/page-builder/types";
import type { WhyFiabHowWeWorkSectionFragment } from "@/lib/wordpress/generated/graphql";
import { WhyHowWeWork } from "@/components/why/why-sections";
import { text } from "@/lib/wordpress/fields";
import type { WhyContent } from "@/content/why-fiab";

export const whyFiabHowWeWorkSection = defineSection<WhyFiabHowWeWorkSectionFragment>({
  layout: "WhyFiabHowWeWorkSection",
  render: (data) => {
    const cards = Array.isArray(data.workCards)
      ? data.workCards.map((c: any) => ({
          number: c?.number != null ? String(c.number).padStart(2, "0") : "",
          title: text(c?.title, ""),
          text: text(c?.description, ""),
        }))
      : [];
    return <WhyHowWeWork howWeWork={{ title: text(data.title, ""), cards }} />;
  },
});
