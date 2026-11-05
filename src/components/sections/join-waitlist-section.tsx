import { defineSection } from "@/lib/page-builder/types";
import type { JoinWaitlistSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AgenticWaitlist } from "@/components/agentic-ai/agentic-ai-sections";
import { CmsFormLoader, WAITLIST_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";
import { splitEmphasis, text } from "@/lib/wordpress/fields";

/** `JoinWaitlistSection` — text with a sign-up form (waitlist design). */
export const joinWaitlistSection = defineSection<JoinWaitlistSectionFragment>({
  layout: "JoinWaitlistSection",
  render: (data) => {
    const titleParts = splitEmphasis(data.title);
    const formId = typeof data.formId === "string" ? data.formId.trim() : "";
    const resolvedFormId = /^\d+$/.test(formId) ? formId : "";
    return (
      <AgenticWaitlist
        waitlist={{
          title: titleParts ? [titleParts.before, titleParts.after].filter(Boolean).join(" ").trim() : text(data.title),
          highlight: titleParts ? titleParts.emphasis : "",
          text: text(data.description),
          formId: resolvedFormId,
        }}
        form={<CmsFormLoader formId={resolvedFormId} fallback={WAITLIST_FALLBACK_FIELDS} appearance="waitlist" />}
      />
    );
  },
});