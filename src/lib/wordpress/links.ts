/**
 * WordPress returns internal links as absolute URLs on the CMS host
 * (e.g. https://cms.example.com/wordpress/site/services/). Those would leave the
 * Next.js site, so they are rewritten to site-relative paths ("/services/").
 * Media under wp-content stays on the CMS host. Other URLs are returned unchanged.
 */

function wordpressOrigins() {
  const origins = new Set<string>();
  for (const value of [process.env.WORDPRESS_URL, process.env.WORDPRESS_GRAPHQL_URL]) {
    try {
      if (value) origins.add(new URL(value).origin);
    } catch {
      // ignore malformed env values
    }
  }
  return origins;
}

function wordpressBasePath() {
  try {
    return new URL(process.env.WORDPRESS_URL ?? "").pathname.replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function siteHref(href: string) {
  try {
    const url = new URL(href);
    if (!wordpressOrigins().has(url.origin)) return href;
    const base = wordpressBasePath();
    if (url.pathname.startsWith("/wp-content/") || url.pathname.startsWith(`${base}/wp-content/`)) return href;
    const path = base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) || "/" : url.pathname;
    return `${path}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}
