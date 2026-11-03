import type { MetadataRoute } from "next";
import { getCaseStudies, getPosts, getTeamMembers } from "@/lib/wordpress/collections";
import { getPublicPageUris } from "@/lib/wordpress/content";
import { BLOG_BASE, blogPath, CASE_STUDY_BASE, caseStudyPath, isSlug, TEAM_BASE, teamPath } from "@/lib/wordpress/paths";
import { canonicalUrl } from "@/lib/wordpress/text";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, posts, caseStudies, team] = await Promise.all([
    getPublicPageUris(),
    getPosts(),
    getCaseStudies(),
    getTeamMembers(),
  ]);

  const entry = (path: string, lastModified?: string | null): MetadataRoute.Sitemap[number] => ({
    url: canonicalUrl(path),
    ...(lastModified ? { lastModified } : {}),
  });

  const slugs = <T extends { slug?: string | null }>(result: { status: string; items?: T[] }) =>
    result.status === "ok" ? (result.items ?? []).filter((item): item is T & { slug: string } => isSlug(item.slug)) : [];

  return [
    ...pages.map((uri) => entry(uri)),
    entry(BLOG_BASE),
    ...slugs(posts).map((post) => entry(blogPath(post.slug), "date" in post ? (post.date as string | null) : null)),
    entry(CASE_STUDY_BASE),
    ...slugs(caseStudies).map((study) => entry(caseStudyPath(study.slug))),
    entry(TEAM_BASE),
    ...slugs(team).map((member) => entry(teamPath(member.slug))),
  ];
}
