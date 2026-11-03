const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_DEPTH = 6;

/**
 * First path segments that belong to the Next.js app, never to WordPress.
 * Static app routes (e.g. `/privacy-policy`) already win over the catch-all
 * route; this list stops the catch-all from ever answering for them.
 */
export const RESERVED_SEGMENTS: ReadonlySet<string> = new Set([
  "api",
  "_next",
  "preview",
  "privacy-policy",
  "terms-conditions",
  "terms-and-conditions",
  "404",
]);

/**
 * Converts catch-all route params to a WordPress URI: `undefined` → `/`,
 * `["services", "web-development"]` → `/services/web-development/`.
 * Returns null for anything WordPress cannot own (reserved, malformed, too deep).
 */
export function uriFromSlug(slug: string[] | undefined) {
  if (!slug || slug.length === 0) return "/";
  if (slug.length > MAX_DEPTH) return null;
  const segments = slug.map((segment) => {
    try {
      return decodeURIComponent(segment).toLowerCase();
    } catch {
      return "";
    }
  });
  if (!segments.every((segment) => SEGMENT.test(segment))) return null;
  if (RESERVED_SEGMENTS.has(segments[0])) return null;
  return `/${segments.join("/")}/`;
}

/** Normalises any path or WordPress URI to the `/a/b/` form used as cache keys. */
export function normalizeUri(value: string) {
  const path = value.trim().split(/[?#]/)[0] ?? "";
  const segments = path.split("/").filter(Boolean);
  return uriFromSlug(segments);
}

export function isPublicUri(value: string) {
  return normalizeUri(value) === value;
}
