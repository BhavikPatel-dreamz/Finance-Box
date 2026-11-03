/** Cache tags for WordPress data. Invalidated by `src/app/api/revalidate/route.ts`. */

export function pageTag(uri: string) {
  return `page:${uri}`;
}

export function menuTag(location: string) {
  return `menu:${location}`;
}

/**
 * Public WordPress reads use `"use cache"` in production builds. Development
 * always reads live content. Set `WORDPRESS_CACHE=off` to disable caching in
 * production too (for example on a staging server editors refresh manually).
 */
export function publicReadsAreCached() {
  if (process.env.WORDPRESS_CACHE?.trim().toLowerCase() === "off") return false;
  return process.env.NODE_ENV === "production";
}

/** Every page entry. Used for slug changes and deletions, where the old URI is unknown. */
export const pagesTag = "pages";
export const settingsTag = "settings";
export const menusTag = "menus";
export const schemaTag = "schema";
export const sitemapTag = "sitemap";
