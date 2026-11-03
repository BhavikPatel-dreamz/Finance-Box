import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { BlogArchive } from "@/components/blog/blog-archive";
import { blogArchivePath } from "@/lib/wordpress/paths";

export const instant = false;

function pageNumber(value: string) {
  return /^\d{1,4}$/.test(value) ? Number(value) : NaN;
}

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const page = pageNumber((await params).page);
  return { title: `Blog — page ${page}`, alternates: { canonical: blogArchivePath(page) } };
}

export default async function BlogPagedPage({ params }: PageProps<"/blog/page/[page]">) {
  const page = pageNumber((await params).page);
  // /blog/page/1/ is the same as /blog/.
  if (page === 1) permanentRedirect(blogArchivePath(1));
  return <BlogArchive page={page} />;
}
