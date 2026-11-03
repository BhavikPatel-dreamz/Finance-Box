/**
 * Where each WordPress content type lives on this site. WordPress itself puts
 * posts at the root (`/<slug>/`); the site serves them under `/blog/`.
 * Used for links, canonical URLs, the sitemap and redirects, so change routes here only.
 */
export const BLOG_BASE = "/blog/";
export const CASE_STUDY_BASE = "/case-study/";
export const TEAM_BASE = "/team/";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isSlug(value: string | null | undefined): value is string {
  return typeof value === "string" && SLUG.test(value);
}

export function blogPath(slug: string) {
  return `${BLOG_BASE}${slug}/`;
}

export function blogArchivePath(page = 1) {
  return page <= 1 ? BLOG_BASE : `${BLOG_BASE}page/${page}/`;
}

export function caseStudyPath(slug: string) {
  return `${CASE_STUDY_BASE}${slug}/`;
}

export function teamPath(slug: string) {
  return `${TEAM_BASE}${slug}/`;
}

/** Last path segment of a WordPress URI: `/case-study/deepscribe/` → `deepscribe`. */
export function slugFromUri(uri: string | null | undefined) {
  const slug = (uri ?? "").split(/[?#]/)[0].split("/").filter(Boolean).pop() ?? "";
  return isSlug(slug) ? slug : null;
}

/** A WordPress link value is unset when editors leave the "#" placeholder or nothing. */
export function isPlaceholderUrl(url: string | null | undefined) {
  const value = (url ?? "").trim();
  return value === "" || value === "#";
}
