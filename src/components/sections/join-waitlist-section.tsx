import { defineSection } from "@/lib/page-builder/types";
import type { JoinWaitlistSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticWaitlist } from "@/components/agentic-ai/agentic-ai-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { agenticAiContent } from "@/content/agentic-ai";
import { CmsFormLoader, WAITLIST_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";

/** `JoinWaitlistSection` — text with a sign-up form (waitlist design). */
export const joinWaitlistSection = defineSection<JoinWaitlistSectionFragment>({
  layout: "JoinWaitlistSection",
  render: (data) => {
    const waitlist = fromSection(mergeAgenticAi, agenticAiContent, data).waitlist;
    return (
      <AgenticWaitlist
        waitlist={waitlist}
        form={<CmsFormLoader formId={waitlist.formId} fallback={WAITLIST_FALLBACK_FIELDS} appearance="waitlist" />}
      />
    );
  },
});
