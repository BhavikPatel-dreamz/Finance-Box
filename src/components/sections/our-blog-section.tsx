import { defineSection } from "@/lib/page-builder/types";
import type { OurBlogSectionFragment } from "@/lib/wordpress/generated/graphql";
import { fromSection } from "@/components/sections/from-section";
import { KnowledgeHubBlogs } from "@/components/knowledge-hub/knowledge-hub-sections";
import { mergeKnowledgeHub } from "@/components/knowledge-hub/merge";
import { knowledgeHubContent } from "@/content/knowledge-hub";

/** `OurBlogSection` — Selected blog posts. */
export const ourBlogSection = defineSection<OurBlogSectionFragment>({
  layout: "OurBlogSection",
  render: (data) => {
    const content = fromSection(mergeKnowledgeHub, knowledgeHubContent, data);
    return <KnowledgeHubBlogs blogs={content.blogs} />;
  },
});
