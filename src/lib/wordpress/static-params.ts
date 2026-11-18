import "server-only";
import { POSTS_PER_PAGE } from "@/components/blog/blog-archive";
import { getCaseStudies, getPosts, getTeamMembers, type ListResult } from "@/lib/wordpress/collections";
import { getPublicPageUris } from "@/lib/wordpress/content";
import { isSlug } from "@/lib/wordpress/paths";
import { uriFromSlug } from "@/lib/wordpress/uri";

/**
 * Params for `generateStaticParams`, so `next build` prerenders every page that
 * exists in WordPress at build time as complete HTML. Pages published later are
 * still rendered on their first request and then cached (dynamicParams stays on).
 *
 * With Cache Components a dynamic route must return at least one param. When
 * WordPress has nothing for a route (or is unreachable during the build), a
 * placeholder slug is returned; it renders the route's not-found page, which
 * keeps the build going instead of failing the deploy.
 */
const PLACEHOLDER_SLUG = "placeholder";

function atLeastOne<T>(params: T[], placeholder: T, route: string): T[] {
  if (params.length > 0) return params;
  console.warn(`[wordpress] no static params for ${route}; prerendering a placeholder only`);
  return [placeholder];
}

function slugsOf<T extends { slug?: string | null }>(result: ListResult<T>): string[] {
  if (result.status !== "ok") return [];
  return [...new Set(result.items.map((item) => item.slug).filter(isSlug))];
}

/** `[[...slug]]`: every published WordPress page, plus the home page. */
export async function pageStaticParams(): Promise<{ slug?: string[] }[]> {
  // The home page is `slug: []`. `undefined` would be read as "param not given"
  // and only produce the generic fallback shell, not a prerendered `/`.
  const params: { slug?: string[] }[] = [{ slug: [] }];
  const seen = new Set<string>(["/"]);

  for (const uri of await getPublicPageUris()) {
    const segments = uri.split("/").filter(Boolean);
    // Skip anything the catch-all route would not answer for (reserved or malformed paths).
    if (segments.length === 0 || uriFromSlug(segments) !== uri || seen.has(uri)) continue;
    seen.add(uri);
    params.push({ slug: segments });
  }

  return params;
}

export async function postStaticParams() {
  const slugs = slugsOf(await getPosts());
  return atLeastOne(slugs.map((slug) => ({ slug })), { slug: PLACEHOLDER_SLUG }, "/blog/[slug]");
}

/** `/blog/page/<n>`: page 1 is `/blog`, so this covers pages 2..N. */
export async function blogPageStaticParams() {
  const result = await getPosts();
  const total = result.status === "ok" ? Math.ceil(result.items.length / POSTS_PER_PAGE) : 0;
  const pages = Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({ page: String(index + 2) }));
  return atLeastOne(pages, { page: "2" }, "/blog/page/[page]");
}

export async function caseStudyStaticParams() {
  const slugs = slugsOf(await getCaseStudies());
  return atLeastOne(slugs.map((slug) => ({ slug })), { slug: PLACEHOLDER_SLUG }, "/case-study/[slug]");
}

import { getAllTeamMemberSlugs } from "@/content/team-members-data";

export async function teamStaticParams() {
  const wpSlugs = slugsOf(await getTeamMembers());
  const localSlugs = getAllTeamMemberSlugs();
  const allSlugs = Array.from(new Set([...wpSlugs, ...localSlugs]));
  return allSlugs.map((slug) => ({ slug }));
}
