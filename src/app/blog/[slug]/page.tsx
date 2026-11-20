import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { blogPath } from "@/lib/wordpress/paths";
import { postStaticParams } from "@/lib/wordpress/static-params";
import { generateMetadata as generateBlogsMetadata } from "@/app/blogs/[slug]/page";

export const instant = false;
export const generateStaticParams = postStaticParams;

export async function generateMetadata({ params, searchParams }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogsMetadata({ params: Promise.resolve({ slug }), searchParams });
}

export default async function LegacyBlogSlugRedirect({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  permanentRedirect(blogPath(slug));
}
