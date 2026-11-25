import Container from "@/components/ui/container";

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
 * The placeholder is a skeleton of a page: a hero on the same navy surface and
 * with the same top offset as HeroSection, then a light content band, so the
 * real page fills in instead of appearing out of a blank screen.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-white" aria-busy="true" aria-label="Loading page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-blue pt-[81px] sm:pt-[97px] lg:pt-[112px]">
        <Container className="grid grid-cols-1 gap-10 py-10 sm:py-14 desktop:grid-cols-12 desktop:gap-6 desktop:py-16">
          <div className="desktop:col-span-7 animate-pulse motion-reduce:animate-none">
            <Bar className="h-3 w-56 max-w-full bg-brand-green/30" />
            <Bar className="mt-6 h-9 w-[85%] sm:h-12 lg:h-14" />
            <Bar className="mt-3 h-9 w-[65%] bg-brand-green/25 sm:h-12 lg:h-14" />
            <div className="mt-8 space-y-3 max-w-[550px]">
              <Bar className="h-3.5 w-full" />
              <Bar className="h-3.5 w-[92%]" />
              <Bar className="h-3.5 w-[70%]" />
            </div>
            <div className="mt-8 h-12 w-52 rounded-full bg-white/15 sm:h-14" />
          </div>

          {/* Dashboard-style panel, desktop only (matches the home hero's right column) */}
          <div className="hidden desktop:col-span-5 desktop:flex desktop:items-end animate-pulse motion-reduce:animate-none">
            <div className="h-[270px] w-full border border-white/10 bg-white/5" />
          </div>
        </Container>
      </section>

      {/* First content section */}
      <Container className="py-14 sm:py-20 animate-pulse motion-reduce:animate-none">
        <Bar className="h-3 w-40 bg-brand-blue/10" />
        <Bar className="mt-5 h-8 w-[60%] bg-brand-blue/10 sm:h-10" />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 desktop:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-44 rounded-[10px] bg-brand-blue/6 ${i === 2 ? "hidden desktop:block" : ""}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`rounded-full bg-white/10 ${className}`} />;
}
