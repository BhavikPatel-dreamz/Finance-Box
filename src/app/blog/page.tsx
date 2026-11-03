import type { Metadata } from "next";
import { BlogArchive } from "@/components/blog/blog-archive";
import { BLOG_BASE } from "@/lib/wordpress/paths";

export const instant = false;

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on finance operations, accounting and growth from Finance in a Box.",
  alternates: { canonical: BLOG_BASE },
};

export default function BlogPage() {
  return <BlogArchive page={1} />;
}
