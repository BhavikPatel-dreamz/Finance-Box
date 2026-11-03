import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * The only place WordPress HTML may be turned into markup: post, case study
 * and team bodies. Everything outside a strict allowlist is removed — scripts,
 * styles, event handlers, iframes, forms, inline styles, classes and unknown
 * URL schemes — so editor content can never run code on the site.
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

/** Links pointing at the CMS host become site-relative, so readers stay on the Next.js site. */
function rewriteHref(href: string) {
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

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "hr", "h2", "h3", "h4", "h5", "h6", "strong", "b", "em", "i", "u", "s", "sub", "sup", "small",
    "ul", "ol", "li", "blockquote", "q", "cite", "code", "pre", "a", "img", "figure", "figcaption",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading", "decoding"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    ol: ["start", "reversed"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https", "http"] },
  allowProtocolRelative: false,
  // The page already has the h1 (the title).
  transformTags: {
    h1: "h2",
    a: (tagName, attribs) => {
      const href = attribs.href ? rewriteHref(attribs.href) : undefined;
      const external = href ? /^https?:\/\//.test(href) : false;
      return {
        tagName,
        attribs: {
          ...(href ? { href } : {}),
          ...(attribs.title ? { title: attribs.title } : {}),
          ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
        },
      };
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: "lazy", decoding: "async", alt: attribs.alt ?? "" },
    }),
  },
  // Drop the contents of dangerous elements, not just their tags.
  nonTextTags: ["script", "style", "textarea", "noscript", "iframe", "object", "embed", "template", "svg", "math"],
};

export function sanitizeRichText(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, OPTIONS).trim();
}

/** Plain-text word count of WordPress HTML, for reading-time estimates. */
export function wordCount(html: string | null | undefined) {
  if (!html) return 0;
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });
  return text.split(/\s+/).filter(Boolean).length;
}
