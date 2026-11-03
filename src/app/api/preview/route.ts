import { cookies, draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { getPreviewPage, getPublicPage } from "@/lib/wordpress/content";
import { encodePreviewTarget, PREVIEW_COOKIE, previewSecret, safeEqual } from "@/lib/wordpress/preview";
import { normalizeUri } from "@/lib/wordpress/uri";

/**
 * Enters Draft Mode for one WordPress page.
 *
 *   /api/preview?secret=<PREVIEW_SECRET>&id=<page database ID>
 *
 * WordPress preview links carry the post ID (`preview_id` / `p` / `page_id`),
 * which also works for drafts that have no URI yet. For backwards
 * compatibility `id` may also be a published page URI such as `/about/`.
 * Draft content is fetched with server-only credentials; the browser never
 * sees them, and Draft Mode responses are never cached.
 */
export async function GET(request: Request) {
  const secret = previewSecret();
  if (!secret) {
    return NextResponse.json({ ok: false, message: "Preview is not configured." }, { status: 503 });
  }

  const url = new URL(request.url);
  const provided = url.searchParams.get("secret") ?? "";
  if (!safeEqual(provided, secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const rawId = (
    url.searchParams.get("id") ??
    url.searchParams.get("preview_id") ??
    url.searchParams.get("page_id") ??
    url.searchParams.get("p") ??
    ""
  ).trim();

  let databaseId = /^\d+$/.test(rawId) ? Number(rawId) : null;
  if (databaseId === null) {
    // A URI: resolve the published page to its ID first.
    const uri = rawId ? normalizeUri(rawId) : null;
    const published = uri ? await getPublicPage(uri) : null;
    if (published?.status === "ok") databaseId = published.page.databaseId;
  }
  if (!databaseId) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }

  const preview = await getPreviewPage(databaseId);
  if (preview.status === "unconfigured") {
    return NextResponse.json({ ok: false, message: "Preview credentials are not configured." }, { status: 503 });
  }
  if (preview.status === "unavailable") {
    return NextResponse.json({ ok: false, message: "WordPress is unavailable." }, { status: 502 });
  }
  if (preview.status !== "ok" || !preview.path) {
    return NextResponse.json({ ok: false, message: "Unknown page." }, { status: 404 });
  }

  (await draftMode()).enable();
  (await cookies()).set(PREVIEW_COOKIE, encodePreviewTarget({ id: databaseId, path: preview.path }), {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    path: "/",
  });

  const response = NextResponse.redirect(new URL(preview.path, url.origin));
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
