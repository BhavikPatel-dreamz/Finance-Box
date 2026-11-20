import type { Metadata } from "next";
import WordPressPage, { generateMetadata as generateWpMetadata } from "@/app/[[...slug]]/page";

export const instant = false;

type BlogsPageProps = {
  params?: Promise<{ slug?: string[] }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(props: BlogsPageProps): Promise<Metadata> {
  return generateWpMetadata({
    params: Promise.resolve({ slug: ["blogs"] }),
    searchParams: props.searchParams ?? Promise.resolve({}),
  });
}

export default async function BlogsPage(props: BlogsPageProps) {
  return WordPressPage({
    params: Promise.resolve({ slug: ["blogs"] }),
    searchParams: props.searchParams ?? Promise.resolve({}),
  });
}
