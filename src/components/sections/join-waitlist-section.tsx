import { defineSection } from "@/lib/page-builder/types";
import type { JoinWaitlistSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticWaitlist } from "@/components/agentic-ai/agentic-ai-sections";
import { KnowledgeHubNewsletter } from "@/components/knowledge-hub/knowledge-hub-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { agenticAiContent } from "@/content/agentic-ai";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import { CmsFormLoader, NEWSLETTER_FALLBACK_FIELDS, WAITLIST_FALLBACK_FIELDS } from "@/components/forms/cms-form-loader";

/**
 * `JoinWaitlistSection` — text with a sign-up form. "waitlist" (Agentic AI)
 * or "newsletter" (Knowledge Hub, adds a CTA button), from `section-variants.ts`.
 *
 * The form is the Contact Form 7 form in `formId` (fallback: 1338 waitlist,
 * 1414 newsletter). Its fields come from WordPress, so fields added in CF7 show
 * up here; submissions go to `/api/forms/{formId}`. See `src/lib/forms/cf7.ts`.
 */
export const joinWaitlistSection = defineSection<JoinWaitlistSectionFragment>({
  layout: "JoinWaitlistSection",
  render: (data, { variant }) => {
    if (variant === "newsletter") {
      const newsletter = fromSection(mergeKnowledgeHub, knowledgeHubContent, data).newsletter;
      return (
        <KnowledgeHubNewsletter
          newsletter={newsletter}
          form={<CmsFormLoader formId={newsletter.formId} fallback={NEWSLETTER_FALLBACK_FIELDS} appearance="newsletter" />}
        />
      );
    }
    const waitlist = fromSection(mergeAgenticAi, agenticAiContent, data).waitlist;
    return (
      <AgenticWaitlist
        waitlist={waitlist}
        form={<CmsFormLoader formId={waitlist.formId} fallback={WAITLIST_FALLBACK_FIELDS} appearance="waitlist" />}
      />
    );
  },
});
