/**
 * ACF Flexible Content layout names as WPGraphQL for ACF exposes them.
 *
 * The flexible field `pageBuilder.pageBuilder` returns objects whose
 * `__typename` is `PageBuilderPageBuilder<Layout>Layout`, for example
 * `PageBuilderPageBuilderHomeBannerSectionLayout` → `HomeBannerSection`.
 * The registry is keyed by that `<Layout>` part.
 */
export const LAYOUT_TYPE_PREFIX = "PageBuilderPageBuilder";
export const LAYOUT_TYPE_SUFFIX = "Layout";
export const LAYOUT_INTERFACE = "PageBuilderPageBuilder_Layout";

const LAYOUT_NAME = /^[A-Z][A-Za-z0-9]*$/;

export type LayoutTypename<L extends string = string> = `${typeof LAYOUT_TYPE_PREFIX}${L}${typeof LAYOUT_TYPE_SUFFIX}`;

/** Extracts the layout name from a GraphQL layout type, e.g. `HomeBannerSection`. */
export type LayoutOf<T> = T extends { __typename: `${typeof LAYOUT_TYPE_PREFIX}${infer L}${typeof LAYOUT_TYPE_SUFFIX}` }
  ? L
  : never;

export function layoutFromTypename(typename: unknown): string | null {
  if (typeof typename !== "string") return null;
  if (!typename.startsWith(LAYOUT_TYPE_PREFIX) || !typename.endsWith(LAYOUT_TYPE_SUFFIX)) return null;
  const layout = typename.slice(LAYOUT_TYPE_PREFIX.length, -LAYOUT_TYPE_SUFFIX.length);
  return LAYOUT_NAME.test(layout) ? layout : null;
}

export function typenameFromLayout(layout: string): LayoutTypename {
  return `${LAYOUT_TYPE_PREFIX}${layout}${LAYOUT_TYPE_SUFFIX}`;
}
