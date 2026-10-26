export function pageTag(uri: string) {
  return `page:${uri}`;
}

export function postTag(slug: string) {
  return `post:${slug}`;
}

export function menuTag(location: string) {
  return `menu:${location}`;
}

export function publicReadsAreCached() {
  return false;
}

export const settingsTag = "settings";
export const menusTag = "menus";
export const schemaTag = "schema";
export const sitemapTag = "sitemap";
