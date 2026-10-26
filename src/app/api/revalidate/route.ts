import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { menuTag, menusTag, pageTag, schemaTag, settingsTag, sitemapTag } from "@/lib/cache/tags";
import { isPublicUri } from "@/lib/wordpress/uri";

type RevalidateBody = {
  secret?: string;
  slug?: string;
  type?: string;
  uri?: string;
};

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { ok: false, message: "Revalidation is not configured." },
      { status: 500 },
    );
  }

  let body: RevalidateBody;
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!body.secret || !safeEqual(body.secret, secret)) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const uri = body.uri?.trim() ?? "";
  if (uri && isPublicUri(uri)) {
    revalidateTag(pageTag(uri), { expire: 0 });
    revalidatePath(uri === "/" ? "/" : uri.replace(/\/$/, ""));
    revalidatePath(uri);
  }

  revalidateTag(settingsTag, { expire: 0 });
  revalidateTag(menusTag, { expire: 0 });
  revalidateTag(menuTag("PRIMARY"), { expire: 0 });
  revalidateTag(menuTag("FOOTER"), { expire: 0 });
  revalidateTag(schemaTag, { expire: 0 });
  revalidateTag(sitemapTag, { expire: 0 });

  return Response.json({ ok: true });
}
