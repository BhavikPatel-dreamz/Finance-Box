import { defineSection } from "@/lib/page-builder/types";
import type { AllBlogsSectionFragment } from "@/lib/wordpress/generated/graphql";
import { AllBlogsGrid } from "@/components/blog/all-blogs-grid";

/** `AllBlogsSection` — Renders the complete dynamic blog archive grid matching Figma design. */
export const allBlogsSection = defineSection<AllBlogsSectionFragment>({
  layout: "AllBlogsSection",
  render: () => {
    return <AllBlogsGrid page={1} />;
  },
});
