import { cacheLife } from "next/cache";

/**
 * Puts the current year into a copyright line:
 * - `{year}` anywhere in the text is replaced with the year,
 * - otherwise a year written after "©" ("© 2025 …") is updated,
 * - otherwise, if there is no "©" at all, "© <year> " is prepended.
 */
export function withCurrentYear(text: string, year: string): string {
  const value = text.trim();
  if (/\{\s*year\s*\}/i.test(value)) return value.replace(/\{\s*year\s*\}/gi, year);
  if (/©\s*\d{4}/.test(value)) return value.replace(/(©\s*)\d{4}/, `$1${year}`);
  if (!value.includes("©")) return `© ${year} ${value}`.trim();
  return value;
}

/**
 * Copyright text with the current year. Cached so it stays in the static shell
 * (Cache Components does not allow `new Date()` in uncached server code), and
 * refreshed daily so the year rolls over on its own.
 */
export async function CopyrightLine({ text }: { text: string }) {
  "use cache";
  cacheLife("days");
  return <>{withCurrentYear(text, String(new Date().getFullYear()))}</>;
}
