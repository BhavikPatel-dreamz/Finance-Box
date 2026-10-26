import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { mergeWhy } from "@/components/why/merge";
import { homeContent, type HomeContent } from "@/content/home";
import { whyContent, type WhyContent, type WhyLink } from "@/content/why-fiab";
import type { RawSection } from "@/lib/wordpress/content";

export function WhyPage({ sections }: { sections: RawSection[] }) {
  const content = mergeWhy(whyContent, sections);
  return (
    <div id="top" className="min-h-screen bg-[#07110d] text-white">
      <WhyHero hero={content.hero} header={homeContent.header} />
      <WhyCompare compare={content.compare} />
      <HomeFooter footer={siteFooter(homeContent.footer)} />
    </div>
  );
}

function withSiteLinks<T extends { url: string }>(value: T): T {
  return { ...value, url: value.url.startsWith("#") ? `/${value.url}` : value.url };
}

function siteHeader(header: HomeContent["header"]): HomeContent["header"] {
  return {
    ...header,
    links: header.links.map((link) => ({
      ...link,
      ...withSiteLinks(link),
      children: link.children.map(withSiteLinks),
    })),
    cta: withSiteLinks(header.cta),
  };
}

function siteFooter(footer: HomeContent["footer"]): HomeContent["footer"] {
  return {
    ...footer,
    columns: footer.columns.map((column) => ({
      ...column,
      links: column.links.map(withSiteLinks),
    })),
  };
}

function Pill({ link }: { link: WhyLink }) {
  return (
    <a href={link.url} className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102018]">
      {link.label}
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current">
        <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
          <path d="M4 8h8M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export function WhyHero({ hero, header }: { hero: WhyContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section className="relative overflow-hidden bg-[#07140f]">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: "url(/why/diamond.svg)", backgroundSize: "84px 84px" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_at_bottom,rgba(28,140,72,0.55),transparent_70%)]" />
      <div className="relative">
        <HomeHeader header={siteHeader(header)} surface="plain" logoHref="/" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-10 pb-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
              <span className="h-px w-6 bg-white/40" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl">
              {hero.title}
              <span className="block whitespace-pre-line text-[#3DDC84]">{hero.highlight}</span>
            </h1>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-6 text-white/75">{hero.text}</p>
            <div className="mt-6">
              <Pill link={hero.cta} />
            </div>
          </div>
        </div>
        <ol className="relative mx-auto grid w-full max-w-6xl gap-6 border-t border-white/15 px-6 py-8 sm:grid-cols-3">
          {hero.points.map((point) => (
            <li key={point.number} className="border-white/15 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#3DDC84] text-[11px] font-semibold text-[#3DDC84]">
                {point.number}
              </span>
              <p className="mt-4 text-sm font-semibold">{point.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Mark({ on }: { on: boolean }) {
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${on ? "bg-[#3DDC84] text-[#06210f]" : "bg-[#f3c3c3] text-[#c43b3b]"}`}>
      {on ? (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" role="img" aria-label="Included">
          <path d="M3.5 8.2 6.4 11 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" role="img" aria-label="Not included">
          <path d="M4.5 4.5 11.5 11.5M11.5 4.5 4.5 11.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </span>
  );
}

export function WhyCompare({ compare }: { compare: WhyContent["compare"] }) {
  return (
    <section className="bg-white px-6 py-20 text-[#16181d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
            {compare.title}
            <span className="mt-1 block font-serif text-[#3DDC84] italic">{compare.highlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#66707c]">{compare.text}</p>
        </div>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[880px] border-separate border-spacing-y-2 text-sm">
            <thead>
              <tr className="text-left">
                <th className="px-5 pb-4 font-semibold">{compare.featureLabel}</th>
                {compare.columns.map((column) => (
                  <th
                    key={column.label}
                    className={
                      column.featured
                        ? "rounded-t-[28px] bg-[#101820] px-4 pt-8 pb-6 text-center text-white"
                        : "px-4 pb-4 text-center font-semibold text-[#2a3038]"
                    }
                  >
                    {column.featured && column.logo ? (
                      <img src={column.logo.url} alt={column.logo.alt || column.label} className="mx-auto h-12 w-auto" />
                    ) : (
                      column.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((item, rowIndex) => (
                <tr key={item.label}>
                  <th className="rounded-l-full bg-[#f6f6f4] px-5 py-4 text-left font-medium text-[#3a414b]">{item.label}</th>
                  {compare.columns.map((column, index) => {
                    const last = rowIndex === compare.rows.length - 1;
                    return (
                      <td
                        key={column.label}
                        className={
                          column.featured
                            ? `bg-[#101820] px-4 py-4 text-center ${last ? "rounded-b-[28px] pb-8" : ""}`
                            : `bg-[#f6f6f4] px-4 py-4 text-center ${index === compare.columns.length - 1 ? "rounded-r-full" : ""}`
                        }
                      >
                        <Mark on={item.values[index] === true} />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
