/**
 * Presentation variants for layouts that WordPress reuses on several pages
 * with different designs, but that have no ACF field to pick the design.
 *
 * This is the only place page URIs appear in the rendering code, and it only
 * selects styling. Section order and content always come from WordPress.
 *
 * Layouts with an editor-controlled variant field do not belong here:
 *   - ServicesOperatingCadenceSection → `sectionSetting` ("up-down" | "side-by-side")
 *   - AgenticOfficialPartnerStack     → `logoView` ("simple" | "boxed")
 *
 * To hand a layout below to editors, add an ACF "Select" field named `variant`
 * with these values to the layout, add `variant` to its fragment, and read it
 * in the section's `render` before falling back to `context.variant`.
 */
export const sectionVariants = {
  CtaSection: {
    default: "default",
    byUri: {
      "/": "home",
      "/services/": "services",
      "/why-fiab/": "why",
      "/clients/": "clients",
      "/careers/": "careers",
      "/agentic-ai/": "agentic-ai",
      "/knowledge-hub/": "knowledge-hub",
      "/people-operations/": "people-operations",
    },
  },
  CommonBannerSection: {
    default: "knowledge-hub",
    byUri: {
      "/careers/": "careers",
      "/agentic-ai/": "agentic-ai",
      "/knowledge-hub/": "knowledge-hub",
      "/people-operations/": "people-operations",
    },
  },
  JoinWaitlistSection: {
    default: "waitlist",
    byUri: {
      "/agentic-ai/": "waitlist",
      "/knowledge-hub/": "newsletter",
    },
  },
} as const satisfies Record<string, { default: string; byUri: Record<string, string> }>;

type VariantLayouts = typeof sectionVariants;
export type VariantOf<L extends keyof VariantLayouts> =
  | VariantLayouts[L]["default"]
  | VariantLayouts[L]["byUri"][keyof VariantLayouts[L]["byUri"]];

export function resolveVariant(layout: string, uri: string): string | undefined {
  const config = (sectionVariants as Record<string, { default: string; byUri: Record<string, string> }>)[layout];
  if (!config) return undefined;
  return config.byUri[uri] ?? config.default;
}
