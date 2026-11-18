import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailProcessSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationProcess } from "@/components/foundation/foundation-sections";
import { multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

export const serviceDetailProcessSection = defineSection<ServiceDetailProcessSectionFragment>({
  layout: "ServiceDetailProcessSection",
  render: (data) => {
    const fallback = fallbackFoundationContent.process;
    const titleParts = splitEmphasis(data.title);

    const titleLead = titleParts
      ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim()
      : text(data.title, fallback.title);
    const titleHighlight = titleParts ? titleParts.emphasis : fallback.highlight;

    const steps = (data.steps && data.steps.length > 0 ? data.steps : fallback.steps).map((step, idx) => {
      const fb = fallback.steps[idx % fallback.steps.length];
      const stepTitle = text(step?.title, fb.title);
      const stepDesc = multilineText(step?.description) || fb.description;
      return {
        title: stepTitle,
        description: stepDesc,
      };
    });

    return (
      <FoundationProcess
        title={titleLead}
        highlight={titleHighlight}
        steps={steps}
      />
    );
  },
});
