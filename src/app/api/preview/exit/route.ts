import { cookies, draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { PREVIEW_COOKIE } from "@/lib/wordpress/preview";

/** Leaves Draft Mode and returns to the published page that was being previewed (or the homepage). */
export async function GET(request: Request) {
  (await draftMode()).disable();
  const store = await cookies();
  store.delete(PREVIEW_COOKIE);

  const url = new URL(request.url);
  const back = url.searchParams.get("redirect") ?? "/";
  // Only same-site paths, never an open redirect.
  const target = back.startsWith("/") && !back.startsWith("//") ? back : "/";

  const response = NextResponse.redirect(new URL(target, url.origin));
  response.headers.set("Cache-Control", "no-store");
  return response;
}
