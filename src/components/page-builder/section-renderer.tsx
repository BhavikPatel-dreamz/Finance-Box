import { Fragment, type ReactNode } from "react";
import { getSectionDefinition } from "@/components/page-builder/section-registry";
import { reportSectionProblem, SectionFallback } from "@/components/page-builder/section-fallback";

import { layoutFromTypename } from "@/lib/page-builder/layout";
import type { SectionData } from "@/lib/page-builder/types";

/**
 * Renders WordPress Flexible Content rows in the order WordPress returned them.
 *
 * - Each row is matched to a registered definition by exact layout name.
 * - Unregistered layouts and rows whose mapping throws are skipped (with a
 *   development-only notice), so one bad section never breaks the page.
 * - Header is provided globally in RootLayout. If the first section is not
 *   a hero, a top dark spacer ensures the non-hero section doesn't slip under the header.
 */
export function SectionRenderer({ sections, uri }: { sections: SectionData[]; uri: string }) {
  const firstLayout = sections.length > 0 ? layoutFromTypename(sections[0].__typename) : null;
  const firstIsHero = firstLayout ? getSectionDefinition(firstLayout)?.hero === true : false;

  return (
    <>
      {firstIsHero ? null : (
        <div className="h-[81px] sm:h-[97px] lg:h-[112px] bg-[#121826]" aria-hidden="true" />
      )}
      {sections.map((data, index) => {
        const layout = layoutFromTypename(data.__typename) ?? String(data.__typename);
        const key = `${index}-${layout}`;
        const definition = getSectionDefinition(layout);

        if (!definition) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(`[section-renderer] No component for layout "${layout}" (page ${uri}); rendering nothing.`);
          }
          return null;
        }

        let node: ReactNode;
        try {
          node = definition.render(data, {
            uri,
            index,
          });
        } catch (error) {
          reportSectionProblem("render-error", layout, uri, index, error);
          return (
            <Fragment key={key}>
              <SectionFallback problem="render-error" layout={layout} />
            </Fragment>
          );
        }

        return <Fragment key={key}>{node}</Fragment>;
      })}
    </>
  );
}
