import type { ReactNode } from "react";
import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { InvestorSlider } from "@/components/services/investor-slider";
import { mergeServices } from "@/components/services/merge";
import { servicesContent, type ServicesContent, type ServicesDetail, type ServicesLink, type ServicesStage } from "@/content/services";
import { homeContent, type HomeContent } from "@/content/home";
import type { RawSection } from "@/lib/wordpress/content";

export function ServicesPage({ sections }: { sections: RawSection[] }) {
  const content = mergeServices(servicesContent, sections);

  return (
    <div id="top" className="min-h-screen bg-[#07110d] text-white">
      <div className="relative overflow-hidden bg-[#07110d]">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{ backgroundImage: "url(/services/hex.svg)", backgroundSize: "84px 96px" }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,rgba(24,110,62,0.45),transparent_70%)]" />
        <div className="relative">
          <HomeHeader header={servicesHeader(homeContent.header)} surface="plain" logoHref="/" />
          <ServicesHero hero={content.hero} />
        </div>
      </div>
      <ServicesStages stages={content.stages} />
      <ServicesDepth depth={content.depth} />
      {content.details.map((detail) => (
        <ServicesDetail key={detail.anchor} detail={detail} />
      ))}
      <ServicesCfo cfo={content.cfo} />
      <ServicesProcess process={content.process} />
      <ServicesInvestors investors={content.investors} />
      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}

function servicesHeader(header: HomeContent["header"]): HomeContent["header"] {
  const fix = (url: string) => (url.startsWith("#") ? `/${url}` : url);
  return {
    ...header,
    links: header.links.map((link) => ({
      ...link,
      url: link.label === "Services" ? "/services/" : fix(link.url),
      children: link.children.map((child) => ({ ...child, url: fix(child.url) })),
    })),
    cta: { ...header.cta, url: fix(header.cta.url) },
  };
}

function Arrow() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current">
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
        <path d="M4 8h8M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Pill({ link, tone }: { link: ServicesLink; tone: "light" | "dark" | "ink" }) {
  const className =
    tone === "light" ? "bg-white text-[#102018]" : tone === "ink" ? "bg-[#121820] text-white" : "bg-[#3DDC84] text-[#06210f]";
  return (
    <a href={link.url} className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold ${className}`}>
      {link.label}
      <Arrow />
    </a>
  );
}

export function ServicesHero({ hero }: { hero: ServicesContent["hero"] }) {
  return (
    <section id="tiers" className="relative px-6 pt-8 pb-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            <span className="h-px w-6 bg-white/40" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl text-5xl leading-[0.98] font-semibold tracking-tight text-balance sm:text-6xl">
            {hero.title} <span className="text-[#3DDC84]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-6 text-white/75">{hero.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Pill link={hero.primary} tone="light" />
            <a href={hero.secondary.url} className="inline-flex items-center gap-3 text-sm font-semibold text-white">
              {hero.secondary.label}
              <Arrow />
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-4 bottom-4 left-0 w-px bg-[#3DDC84]" />
          <ol className="space-y-4 pl-5">
            {hero.tiers.map((tier) => (
              <li key={tier.number} className="rounded-2xl border border-white/10 bg-[#101820]/90 p-5">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-xs text-white/80">
                    {tier.number}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-white/45 uppercase">{tier.label}</p>
                    <h2 className="mt-1 text-lg font-semibold">
                      {tier.title} <span className="text-[#3DDC84]">{tier.highlight}</span>
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">{tier.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const stageIcons: Record<ServicesStage["icon"], ReactNode> = {
  gear: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <circle cx="8" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 17c.6-2 2.2-3 3.5-3s2.9 1 3.5 3M12.5 17c.6-2 2.2-3 3.5-3s2.9 1 3.5 3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.5 17.5c.7-2.3 2.4-3.4 4.5-3.4s3.8 1.1 4.5 3.4M17 7.5h3M18.5 6v3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3.5V6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function ServicesStages({ stages }: { stages: ServicesContent["stages"] }) {
  return (
    <section id="stages" className="bg-white px-6 py-20 text-[#16181d]">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#6d7580] uppercase">
              <span className="h-px w-6 bg-[#6d7580]" />
              {stages.eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-5xl leading-[0.98] font-semibold tracking-tight">{stages.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#5d6570] lg:justify-self-end">{stages.text}</p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {stages.cards.map((card) => (
            <li key={card.title} className="rounded-3xl bg-[#121820] p-7 text-white">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight">{card.title}</h3>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
                  {stageIcons[card.icon]}
                </span>
              </div>
              <p className="mt-3 max-w-sm text-[11px] font-semibold tracking-[0.12em] text-white/45 uppercase">{card.label}</p>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/70">{card.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesDetail({ detail }: { detail: ServicesDetail }) {
  return (
    <section id={detail.anchor} className="border-t border-white/10 bg-[#0c1218] px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#3DDC84] text-xs font-semibold text-[#3DDC84]">
            {detail.number}
          </span>
          <h2 className="mt-5 max-w-sm text-4xl leading-[1.05] font-semibold tracking-tight">{detail.title}</h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">{detail.text}</p>
          <div className="mt-8">
            <Pill link={detail.cta} tone="dark" />
          </div>
        </div>
        <ul className="grid overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2">
          {detail.items.map((item, index) => {
            const span = index === detail.items.length - 1 && detail.items.length % 2 === 1;
            const lastRowStart = span ? detail.items.length - 1 : Math.max(detail.items.length - 2, 0);
            const border = [
              index < lastRowStart ? "border-b" : "",
              !span && index % 2 === 0 ? "sm:border-r" : "",
              "border-white/10",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li key={item.title} className={`p-6 ${span ? "sm:col-span-2" : ""} ${border}`}>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/55">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ServicesCfo({ cfo }: { cfo: ServicesContent["cfo"] }) {
  return (
    <section id="cfo" className="bg-[#f4f3ef] px-6 py-16 text-[#14181f] sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <h2 className="max-w-[12ch] text-5xl leading-[0.96] font-semibold tracking-tight whitespace-pre-line sm:text-6xl">
            {cfo.title}
          </h2>
          <div className="max-w-sm lg:justify-self-end lg:pt-2">
            <p className="text-sm leading-6 text-[#6a717c]">{cfo.text}</p>
            <div className="mt-6">
              <Pill link={cfo.cta} tone="ink" />
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cfo.cards.map((card) => (
            <article key={card.title}>
              {card.image ? (
                <img src={card.image.url} alt={card.image.alt || card.title} className="h-64 w-full rounded-[22px] object-cover" />
              ) : (
                <div className="h-64 rounded-[22px] bg-[#d7dbd6]" />
              )}
              <div className="relative z-10 -mt-16 mx-3 rounded-[18px] bg-[#141b24] px-5 py-5 text-white">
                <h3 className="text-[13px] font-semibold tracking-[0.16em] uppercase">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesProcess({ process }: { process: ServicesContent["process"] }) {
  return (
    <section id="cadence" className="bg-[#0c1218] px-6 py-20 text-center">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{process.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65">{process.text}</p>
        <ol className="mt-12 grid overflow-hidden rounded-xl border border-white/10 text-left md:grid-cols-5">
          {process.steps.map((step) => (
            <li key={step.number} className="border-b border-white/10 p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
              <div className="flex items-center gap-3">
                <span className="h-7 w-0.5 bg-[#3DDC84]" />
                <span className="text-3xl font-semibold">{step.number}</span>
              </div>
              <h3 className="mt-8 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function italicTitle(title: string, highlight: string) {
  const index = highlight ? title.toLowerCase().indexOf(highlight.toLowerCase()) : -1;
  if (index < 0) return title;
  return (
    <>
      {title.slice(0, index)}
      <em className="font-serif italic">{title.slice(index, index + highlight.length)}</em>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function ServicesInvestors({ investors }: { investors: ServicesContent["investors"] }) {
  return (
    <section id="investors" className="overflow-hidden bg-[#070b12] py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.18em] text-[#3DDC84] uppercase">
              <span className="h-px w-6 bg-[#3DDC84]" />
              {investors.eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-5xl leading-[0.96] font-semibold tracking-tight whitespace-pre-line sm:text-6xl">
              {italicTitle(investors.title, investors.highlight)}
            </h2>
          </div>
          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-6 text-white/70">{investors.text}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Pill link={investors.primary} tone="light" />
              <a href={investors.secondary.url} className="inline-flex items-center gap-3 text-sm font-semibold">
                {investors.secondary.label}
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 pr-0 pl-[max(1.5rem,calc((100%-72rem)/2))]">
        <InvestorSlider cards={investors.cards} />
      </div>
    </section>
  );
}

export function ServicesDepth({ depth }: { depth: ServicesContent["depth"] }) {
  return (
    <section className="bg-[#0c1218] px-6 py-24 text-center">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#3DDC84] uppercase">{depth.eyebrow}</p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{depth.title}</h2>
        <div className="mt-8">
          <Pill link={depth.cta} tone="light" />
        </div>
      </div>
    </section>
  );
}
