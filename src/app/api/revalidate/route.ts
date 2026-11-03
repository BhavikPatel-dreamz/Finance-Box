import { revalidatePath, revalidateTag } from "next/cache";
import { collectionTag, itemTag, menuTag, menusTag, pageTag, pagesTag, schemaTag, settingsTag, sitemapTag, type ContentType } from "@/lib/cache/tags";
import { blogPath, caseStudyPath, isSlug, slugFromUri, teamPath } from "@/lib/wordpress/paths";
import { safeEqual } from "@/lib/wordpress/preview";
import { normalizeUri } from "@/lib/wordpress/uri";

/**
 * WordPress → Next.js cache invalidation webhook.
 *
 *   POST /api/revalidate
 *   Header `x-revalidate-secret: <REVALIDATE_SECRET>` (or `secret` in the body)
 *   Body: { "type": "page" | "post" | "case-study" | "team" | "menu" | "settings" | "schema" | "all",
 *           "uri": "/about/", "oldUri": "/old-about/", "slug": "my-post", "oldSlug": "old-post" }
 *
 * - page:     publish, update, delete, slug change. Expires the page's URI and
 *             old URI, every page entry (a slug change or deletion can leave a
 *             stale entry under a URI WordPress no longer reports) and the sitemap.
 * - post, case-study, team: the item (by `slug`, `oldSlug`, or the last segment
 *             of `uri`), its type's lists and the sitemap, plus every page entry
 *             because pages embed posts (Knowledge Hub, Clients, Why FIAB team).
 * - menu:     header/footer navigation.
 * - settings: site title and other global settings (header/footer).
 * - schema:   ACF field group changes (layouts added or removed).
 * - all, or no/unknown type: everything (the behaviour before typed events).
 *
 * Every call is idempotent, so WordPress may retry or send duplicates safely.
 * Expiry is immediate (`expire: 0`): the next visitor gets fresh content.
 */

type Body = { secret?: unknown; type?: unknown; uri?: unknown; oldUri?: unknown; slug?: unknown; oldSlug?: unknown };

const IMMEDIATE = { expire: 0 } as const;

function expire(tags: Set<string>, paths: Set<string>) {
  for (const tag of tags) revalidateTag(tag, IMMEDIATE);
  for (const path of paths) revalidatePath(path);
}

function uriFrom(value: unknown) {
  return typeof value === "string" && value.trim() ? normalizeUri(value) : null;
}

function routePath(uri: string) {
  return uri === "/" ? "/" : uri.replace(/\/$/, "");
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return Response.json({ ok: false, message: "Revalidation is not configured." }, { status: 500 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, message: "Invalid JSON." }, { status: 400 });
  }

  const provided = request.headers.get("x-revalidate-secret") ?? (typeof body.secret === "string" ? body.secret : "");
  if (!provided || !safeEqual(provided, secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const type = typeof body.type === "string" ? body.type.toLowerCase() : "all";
  const tags = new Set<string>();
  const paths = new Set<string>();

  const pageEvent = () => {
    for (const uri of [uriFrom(body.uri), uriFrom(body.oldUri)]) {
      if (!uri) continue;
      tags.add(pageTag(uri));
      paths.add(routePath(uri));
    }
    tags.add(pagesTag);
    tags.add(sitemapTag);
  };
  const contentEvent = (contentType: ContentType) => {
    const path = { post: blogPath, "case-study": caseStudyPath, team: teamPath }[contentType];
    const candidates = [body.slug, body.oldSlug, typeof body.uri === "string" ? slugFromUri(body.uri) : null];
    for (const value of candidates) {
      if (typeof value !== "string" || !isSlug(value)) continue;
      tags.add(itemTag(contentType, value));
      paths.add(routePath(path(value)));
    }
    tags.add(collectionTag(contentType));
    tags.add(pagesTag);
    tags.add(sitemapTag);
  };
  const allContent = () => (["post", "case-study", "team"] as const).forEach(contentEvent);
  const menuEvent = () => {
    tags.add(menusTag);
    tags.add(menuTag("PRIMARY"));
    tags.add(menuTag("FOOTER"));
  };
  const settingsEvent = () => tags.add(settingsTag);
  const schemaEvent = () => tags.add(schemaTag);

  switch (type) {
    case "page":
      pageEvent();
      break;
    case "post":
      contentEvent("post");
      break;
    case "case-study":
    case "case_study":
      contentEvent("case-study");
      break;
    case "team":
      contentEvent("team");
      break;
    case "menu":
      menuEvent();
      break;
    case "settings":
    case "options":
      settingsEvent();
      break;
    case "schema":
      schemaEvent();
      pageEvent();
      break;
    default:
      pageEvent();
      allContent();
      menuEvent();
      settingsEvent();
      schemaEvent();
  }

  try {
    expire(tags, paths);
  } catch (error) {
    console.error(`[revalidate] failed: ${error instanceof Error ? error.message : String(error)}`);
    return Response.json({ ok: false, message: "Revalidation failed." }, { status: 500 });
  }

  return Response.json({ ok: true, type, tags: [...tags], paths: [...paths] });
}
