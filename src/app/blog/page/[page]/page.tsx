import { permanentRedirect } from "next/navigation";
import { blogArchivePath } from "@/lib/wordpress/paths";
import { blogPageStaticParams } from "@/lib/wordpress/static-params";

export const instant = false;
export const generateStaticParams = blogPageStaticParams;

export default async function LegacyBlogPagedRedirect({ params }: PageProps<"/blog/page/[page]">) {
  const { page } = await params;
  permanentRedirect(blogArchivePath(Number(page) || 1));
}
