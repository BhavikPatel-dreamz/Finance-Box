import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { siteOrigin } from "@/lib/wordpress/text";

export async function GET() {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(new URL("/", siteOrigin()));
}
