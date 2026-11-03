import { defineSection } from "@/lib/page-builder/types";
import type { JoinWaitlistSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { AgenticWaitlist } from "@/components/agentic-ai/agentic-ai-sections";
import { KnowledgeHubNewsletter } from "@/components/knowledge-hub/knowledge-hub-sections";
import { mergeAgenticAi } from "@/components/agentic-ai/merge";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { agenticAiContent } from "@/content/agentic-ai";
import { knowledgeHubContent } from "@/content/knowledge-hub";

/**
 * `JoinWaitlistSection` — text with a sign-up form. "waitlist" (Agentic AI)
 * or "newsletter" (Knowledge Hub, adds a CTA button), from `section-variants.ts`.
 *
 * Known issue: neither form submits anywhere yet, and `formShortcode`
 * (a WordPress form plugin shortcode) is not rendered, because shortcodes
 * cannot be executed outside WordPress.
 */
export const joinWaitlistSection = defineSection<JoinWaitlistSectionFragment>({
  layout: "JoinWaitlistSection",
  render: (data, { variant }) => {
    if (variant === "newsletter") {
      return <KnowledgeHubNewsletter newsletter={fromSection(mergeKnowledgeHub, knowledgeHubContent, data).newsletter} />;
    }
    return <AgenticWaitlist waitlist={fromSection(mergeAgenticAi, agenticAiContent, data).waitlist} />;
  },
});
