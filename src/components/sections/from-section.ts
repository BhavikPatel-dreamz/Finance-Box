import type { RawSection } from "@/lib/wordpress/content";

/**
 * Applies one section's WordPress data to a page's default content using that
 * page's existing `merge*` mapper. Fields WordPress leaves empty keep their
 * default values, so a half-filled section still renders as designed.
 */
export function fromSection<TContent>(
  merge: (base: TContent, sections: RawSection[]) => TContent,
  defaults: TContent,
  data: object,
): TContent {
  return merge(defaults, [data as RawSection]);
}
