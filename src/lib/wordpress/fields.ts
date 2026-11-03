import { plainText } from "@/lib/wordpress/text";
import { siteHref } from "@/lib/wordpress/links";

/**
 * Safe readers for ACF values returned by WPGraphQL. Each returns `null` (or
 * the fallback) for missing or empty values so components never receive
 * `undefined` image URLs or empty links. HTML is reduced to text: WordPress
 * markup is never injected into the page.
 */

export function text(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return plainText(value) || fallback;
}

export type CmsLink = { label: string; url: string };

export function link(value: unknown, fallback: CmsLink): CmsLink {
  if (!value || typeof value !== "object") return fallback;
  const item = value as { title?: unknown; url?: unknown };
  return { label: text(item.title, fallback.label), url: siteHref(text(item.url, fallback.url)) };
}

export type CmsMedia = { url: string; alt: string };

/**
 * Reads an ACF image (`{ node { sourceUrl altText } }`). When the media item
 * has no alt text in WordPress, `fallbackAlt` is used.
 */
export function media(value: unknown, fallbackAlt = ""): CmsMedia | null {
  if (!value || typeof value !== "object") return null;
  const node = (value as { node?: { sourceUrl?: unknown; altText?: unknown } | null }).node;
  if (!node || typeof node.sourceUrl !== "string" || !node.sourceUrl) return null;
  const alt = typeof node.altText === "string" ? node.altText.trim() : "";
  return { url: node.sourceUrl, alt: alt || fallbackAlt };
}

/** "…/uploads/2026/10/american-robotics.svg" → "American Robotics". For logos uploaded without alt text. */
export function nameFromFileUrl(url: string) {
  const file = decodeURIComponent(url.split(/[?#]/)[0].split("/").pop() ?? "");
  const words = file.replace(/\.[a-z0-9]+$/i, "").replace(/-\d+x\d+$/, "").split(/[-_\s]+/).filter(Boolean);
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

/**
 * Splits a title whose emphasised phrase is wrapped in `<span>`, `<b>` or
 * `<strong>`: "Trusted by <span>40+</span> companies" → before / emphasis / after.
 */
export function splitEmphasis(value: unknown): { before: string; emphasis: string; after: string } | null {
  if (typeof value !== "string") return null;
  const match = value.match(/^([\s\S]*?)<(span|b|strong)\b[^>]*>([\s\S]*?)<\/\2>([\s\S]*)$/i);
  if (!match) return null;
  return { before: plainText(match[1]), emphasis: plainText(match[3]), after: plainText(match[4]) };
}

/** Text of each `<li>` in an ACF WYSIWYG value; empty when the value has no list. */
export function listItems(value: unknown): string[] {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)].map((match) => plainText(match[1])).filter(Boolean);
}
