import { defineSection } from "@/lib/page-builder/types";
import type { ServiceDetailProcessSectionFragment } from "@/lib/wordpress/generated/graphql";
import { FoundationProcess } from "@/components/foundation/foundation-sections";
import { media, multilineText, splitEmphasis, text } from "@/lib/wordpress/fields";
import { fallbackFoundationContent } from "@/content/foundation";

export const serviceDetailProcessSection = defineSection<ServiceDetailProcessSectionFragment>({
  layout: "ServiceDetailProcessSection",
  render: (data, context) => {
    const fallback = fallbackFoundationContent.process;
    const titleParts = splitEmphasis(data.title);
    const isMomentum = context?.uri?.includes("momentum");

    let titleLead = fallback.title;
    let titleHighlight = fallback.highlight;

    if (data.title) {
      if (titleParts) {
        titleLead = [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim();
        titleHighlight = titleParts.emphasis;
      } else {
        titleLead = text(data.title);
        titleHighlight = "";
      }
    }

    const tags = data.tags?.map((t) => text(t?.title)).filter(Boolean) || [];
    const description = text(data.description);

    const rawSteps =
      data.processSteps && data.processSteps.length > 0
        ? data.processSteps
        : fallback.steps;

    const steps = rawSteps.map((step, idx) => {
      const fb = fallback.steps[idx % fallback.steps.length];
      const stepTitle = text(step?.title, fb.title);
      const stepDesc = multilineText(step?.description) || fb.description;
      const stepIcon =
        (step && "icon" in step && step.icon
          ? media(step.icon)?.url || (typeof step.icon === "string" ? step.icon : null)
          : null) || fb.icon;

      return {
        title: stepTitle,
        description: stepDesc,
        icon: stepIcon,
      };
    });

    return (
      <FoundationProcess
        title={titleLead}
        highlight={titleHighlight}
        highlightClassName={isMomentum ? "text-white" : "text-brand-green"}
        description={description}
        tags={tags}
        steps={steps}
      />
    );
  },
});
