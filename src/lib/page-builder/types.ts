import type { ReactNode } from "react";
import type { LayoutOf } from "@/lib/page-builder/layout";

/** A Flexible Content row as returned by WPGraphQL, before it is matched to a definition. */
export type SectionData = { __typename: string; [field: string]: unknown };

export type SectionContext = {
  /** URI of the page being rendered, e.g. `/` or `/services/`. */
  uri: string;
  /** Position of this section on the page (0-based). */
  index: number;
  /**
   * The shared site header. Set only for the first section when its
   * definition is a `hero`, because the fixed header overlays the hero's
   * background. Hero components must render it at the top of that background.
   */
  header: ReactNode;
};

export type SectionDefinition<TData extends { __typename: string } = SectionData> = {
  /** Layout name: the GraphQL type name without `PageBuilderPageBuilder` / `Layout`. */
  layout: LayoutOf<TData>;
  /** Hero sections receive the shared header when they are first on the page. */
  hero?: boolean;
  /**
   * Maps the GraphQL data to the section component. Runs on the server.
   * Throwing here skips only this section, never the whole page.
   */
  render: (data: TData, context: SectionContext) => ReactNode;
};

/**
 * Declares a page-builder section. `TData` is the codegen fragment type, so the
 * `layout` name is checked against the fragment's `__typename` at compile time:
 *
 *   defineSection<CtaSectionFragment>({ layout: "CtaSection", render: … })
 */
export function defineSection<TData extends { __typename: string }>(definition: SectionDefinition<TData>) {
  return definition as unknown as SectionDefinition & { layout: string };
}
