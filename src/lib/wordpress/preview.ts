import "server-only";
import { timingSafeEqual } from "node:crypto";

/** Cookie set by `/api/preview` alongside Next.js Draft Mode: which page is being previewed, and at which path. */
export const PREVIEW_COOKIE = "fb_preview";

export type PreviewTarget = { id: number; path: string };

export function previewSecret() {
  return process.env.PREVIEW_SECRET?.trim() || process.env.REVALIDATE_SECRET?.trim() || "";
}

export function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function encodePreviewTarget(target: PreviewTarget) {
  return `${target.id}|${target.path}`;
}

export function decodePreviewTarget(value: string | undefined): PreviewTarget | null {
  if (!value) return null;
  const [rawId, path] = value.split("|");
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0 || !path?.startsWith("/")) return null;
  return { id, path };
}
