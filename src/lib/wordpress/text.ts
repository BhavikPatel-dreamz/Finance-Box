const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  ndash: "–", mdash: "—", hellip: "…", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

/** Decodes HTML entities, including the numeric ones WordPress emits (`&#8217;`, `&#038;`). */
export function decodeEntities(value: string) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/** WordPress HTML → plain text (tags removed, entities decoded, whitespace collapsed). */
export function plainText(value: string | null | undefined) {
  if (!value) return "";
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
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
