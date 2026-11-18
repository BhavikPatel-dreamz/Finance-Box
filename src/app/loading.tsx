/**
 * Suspense boundary for every page below the root layout.
 *
 * Dynamic routes (`[[...slug]]`, `blog/[slug]`, …) have no generateStaticParams
 * and set `instant = false`, so their page body is postponed at prerender
 * time. Without a boundary that postponed hole sits outside any <Suspense>,
 * and when Next.js later asks React to render it in the browser, React aborts
 * the whole response ("client rendering was requested outside a Suspense
 * boundary"). This file gives React that boundary.
 *
 * The placeholder matches PageFrame's surface so nothing flashes while the
 * page streams in.
 */
export default function Loading() {
  return <div className="min-h-screen bg-[#07090f]" aria-busy="true" />;
}
