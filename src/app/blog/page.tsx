import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { BLOG_BASE } from "@/lib/wordpress/paths";

export const instant = false;

export const metadata: Metadata = {
  title: "Blogs",
  description: "Articles on finance operations, accounting and growth from Finance in a Box.",
  alternates: { canonical: BLOG_BASE },
};

export default function BlogRedirectPage() {
  permanentRedirect(BLOG_BASE);
}
