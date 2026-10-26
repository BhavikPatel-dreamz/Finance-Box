const SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function uriFromSlug(slug: string[] | undefined) {
  if (!slug || slug.length === 0) return "/";
  if (slug.length > 6) return null;
  if (!slug.every((segment) => SEGMENT.test(segment))) return null;
  return `/${slug.join("/")}/`;
}

export function isPublicUri(value: string) {
  return value === "/" || /^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*\/$/.test(value);
}
