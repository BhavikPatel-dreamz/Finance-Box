import { Fragment, type ReactNode } from "react";
import { getSectionDefinition } from "@/components/page-builder/section-registry";
import { reportSectionProblem, SectionFallback } from "@/components/page-builder/section-fallback";

import { StandaloneHeader } from "@/components/layout/site-header";
import { layoutFromTypename } from "@/lib/page-builder/layout";
import type { SectionData } from "@/lib/page-builder/types";

/**
 * Renders WordPress Flexible Content rows in the order WordPress returned them.
 *
 * - Each row is matched to a registered definition by exact layout name.
 * - Unregistered layouts and rows whose mapping throws are skipped (with a
 *   development-only notice), so one bad section never breaks the page.
 * - The shared header is handed to the first section when it is a hero;
 *   otherwise it is rendered on a dark band above the sections.
 */
export function SectionRenderer({ sections, uri, header }: { sections: SectionData[]; uri: string; header: ReactNode }) {
  const firstLayout = sections.length > 0 ? layoutFromTypename(sections[0].__typename) : null;
  const firstIsHero = firstLayout ? getSectionDefinition(firstLayout)?.hero === true : false;

  return (
    <>
      {firstIsHero ? null : <StandaloneHeader>{header}</StandaloneHeader>}
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
            header: index === 0 && definition.hero ? header : null,
          });
        } catch (error) {
          reportSectionProblem("render-error", layout, uri, index, error);
          return (
            <Fragment key={key}>
              {/* A failed leading hero must not take the site header with it. */}
              {index === 0 && definition.hero ? <StandaloneHeader>{header}</StandaloneHeader> : null}
              <SectionFallback problem="render-error" layout={layout} />
            </Fragment>
          );
        }

        return <Fragment key={key}>{node}</Fragment>;
      })}
    </>
  );
}
