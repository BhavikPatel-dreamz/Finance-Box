import { draftMode } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getPreviewPage } from "@/lib/wordpress/content";
import { uriFromSlug } from "@/lib/wordpress/uri";

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const secret = process.env.PREVIEW_SECRET || process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, message: "Preview is not configured." }, { status: 503 });
  }

  const url = new URL(request.url);
  const provided = url.searchParams.get("secret") ?? "";
  const rawId = url.searchParams.get("id")?.trim() ?? "";
  const id =
    rawId === "/" ? "/" : uriFromSlug(rawId.replace(/^\/|\/$/g, "").split("/").filter(Boolean));
  if (!rawId || !safeEqual(provided, secret) || !id) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const preview = await getPreviewPage(id);
  if (preview.status === "unconfigured") {
    return NextResponse.json({ ok: false, message: "Preview credentials are not configured." }, { status: 503 });
  }
  if (preview.status !== "ok") {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(new URL(preview.page.uri, url.origin));
}
