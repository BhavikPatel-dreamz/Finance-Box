import { defineSection } from "@/lib/page-builder/types";
import type { OurBlogSectionFragment } from "@/lib/wordpress/generated/graphql";
import type { PostCardFragment } from "@/lib/wordpress/generated/graphql";
import { KnowledgeHubBlogs } from "@/components/knowledge-hub/knowledge-hub-sections";
import { blogCardFromPost } from "@/lib/wordpress/cards";
import { blogArchivePath, isPlaceholderUrl } from "@/lib/wordpress/paths";
import { link, text } from "@/lib/wordpress/fields";

/** `OurBlogSection` — Selected blog posts. */
export const ourBlogSection = defineSection<OurBlogSectionFragment>({
  layout: "OurBlogSection",
  render: (data) => {
    const cta = link(data.allBlogCta, { label: "", url: "" });
    if (isPlaceholderUrl(cta.url)) cta.url = blogArchivePath();

    return (
      <KnowledgeHubBlogs
        blogs={{
          title: text(data.title),
          items: (data.selectBlog?.nodes ?? []).map((post) =>
            blogCardFromPost(post as PostCardFragment),
          ),
          cta,
        }}
      />
    );
  },
});