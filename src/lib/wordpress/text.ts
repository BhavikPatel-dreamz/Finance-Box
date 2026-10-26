export function plainText(value: string | null | undefined) {
  if (!value) return "";
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function siteOrigin() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
}

export function canonicalUrl(uri: string) {
  const origin = siteOrigin().replace(/\/$/, "");
  if (uri === "/") return `${origin}/`;
  return `${origin}${uri.startsWith("/") ? uri : `/${uri}`}`;
}
