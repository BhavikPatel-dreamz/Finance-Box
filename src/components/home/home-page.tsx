import { FounderMoments } from "@/components/home/founder-moments";
import { Leadership } from "@/components/home/leadership-team";
import { HomeHeader } from "@/components/home/home-header";
import { mergeHome } from "@/components/home/merge";
import type { HomeContent, HomeLogo } from "@/content/home";
import { homeContent } from "@/content/home";
import type { RawSection } from "@/lib/wordpress/content";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "@/components/ui/footer-hero";

export { Leadership };

export function HomePage({ sections }: { sections: RawSection[] }) {
  const content = mergeHome(homeContent, sections);

  return (
    <div id="top" className="min-h-screen bg-[#07090f] text-white">
      <HomeHeader header={content.header} />
      <main>
        <Hero hero={content.hero} />
        <LogoRow trust={content.trust} logos={content.logos} />
        <FounderMoments founders={content.founders} />
        <Difference difference={content.difference} />
        <Growth growth={content.growth} />
        <Partners partners={content.partners} />
        <Decisions decisions={content.decisions} />
        <Leadership leadership={content.leadership} />
        <Pressure pressure={content.pressure} />
      </main>
      <HomeFooter footer={content.footer} />
    </div>
  );
}

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section id="product" className="relative overflow-hidden bg-[#07110d]">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-[#3DDC84] uppercase">
            <span className="h-1.5 w-1.5 bg-[#3DDC84]" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-5 max-w-xl text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-6xl">
            {hero.title} <span className="text-[#3DDC84]">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-[#0c1612]/80 p-4 text-sm leading-6 text-white/75">
            {hero.text}
          </p>
          <div className="mt-6">
            <GreenButton
              label={hero.primary.label}
              href={hero.primary.url}
              bgColor="#ffffff"
              textColor="#07110d"
              size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
            />
          </div>
        </div>
        <div className="relative pb-8">
          <div className="grid gap-3 sm:grid-cols-[0.78fr_1.22fr]">
            <article className="rounded-2xl border border-white/10 bg-[#0c1c16] p-4">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-white/55 uppercase">{hero.closeLabel}</p>
              <p className="mt-3 text-4xl font-semibold text-[#3DDC84]">
                {hero.closeValue} <span className="text-base font-medium text-white/80">{hero.closeUnit}</span>
              </p>
              <p className="mt-2 text-xs text-[#3DDC84]">↓ {hero.closeTrend}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-[#0c1c16] p-4">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-white/55 uppercase">{hero.runwayLabel}</p>
              <p className="mt-3 text-4xl font-semibold text-[#3DDC84]">
                {hero.runwayValue} <span className="text-base font-medium text-white/80">{hero.runwayUnit}</span>
              </p>
              <p className="mt-2 text-xs text-[#3DDC84]">{hero.runwayTrend}</p>
            </article>
          </div>
          <CashChart title={hero.chartTitle} range={hero.chartRange} />
          <div className="mt-4 flex justify-end sm:absolute sm:right-0 sm:-bottom-2">
            <GreenButton
              label={hero.call.label}
              href={hero.call.url}
              bgColor="#23C55E"
              textColor="#07110d"
              size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CashChart({ title, range }: { title: string; range: string }) {
  const months = ["AUG", "NOV", "FEB", "MAY", "JUL"];
  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-[#071018] p-4">
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.14em] text-white/55 uppercase">
        <span>{title}</span>
        <span>{range}</span>
      </div>
      <svg viewBox="0 0 520 170" className="mt-2 h-36 w-full" role="img" aria-label={title}>
        {[36, 72, 108, 144].map((y) => (
          <line key={y} x1="16" x2="504" y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
        ))}
        {months.map((_, index) => (
          <line key={index} x1={40 + index * 112} x2={40 + index * 112} y1="16" y2="150" stroke="rgba(255,255,255,0.06)" />
        ))}
        <path d="M24 132 C 70 128, 90 118, 130 104 S 190 78, 230 76 S 290 84, 330 70 S 400 40, 496 28" fill="none" stroke="#f4f7fb" strokeWidth="2.4" />
      </svg>
      <div className="flex justify-between px-2 text-[10px] tracking-wide text-white/40">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
    </div>
  );
}

function logoRow(logos: HomeLogo[]) {
  if (logos.length === 0 || logos.length >= 6) return logos;
  const filled = [...logos];
  while (filled.length < 6) {
    const source = logos[filled.length % logos.length];
    filled.push({ ...source, name: `${source.name} ${filled.length + 1}` });
  }
  return filled;
}

export function LogoRow({ trust, logos }: { trust: HomeContent["trust"]; logos: HomeLogo[] }) {
  const row = logoRow(logos);
  return (
    <section aria-label="Customers" className="bg-white text-[#1c2430]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-7 md:flex-row md:items-center md:gap-8">
        <p className="w-[9.75rem] shrink-0 text-[13px] leading-[1.35] font-semibold">
          {trust.lead} <span className="text-[#21C65E]">{trust.stat}</span> {trust.detail}
        </p>
        <ul className="flex w-full flex-1 flex-wrap items-center justify-between gap-x-5 gap-y-4">
          {row.map((item) => (
            <li key={item.name} className="flex h-10 items-center">
              <img src={item.image.url} alt={item.image.alt || item.name} className="h-8 w-auto max-w-[7.5rem] object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const differenceIcons = [
  <svg key="coins" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <ellipse cx="12" cy="8" rx="6" ry="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 8v3.2c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 11.2v3.2c0 1.2 2.7 2.2 6 2.2s6-1 6-2.2v-3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 13.2v2.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="chart" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M5 19V11M12 19V6M19 19v-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>,
  <svg key="crown" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M4.5 16.5h15M6 16.5 7.2 9.5 12 13l4.8-3.5L18 16.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 6.5v2.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="5.4" r="0.9" fill="currentColor" />
  </svg>,
  <svg key="layers" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M12 4.5 19.5 8 12 11.5 4.5 8 12 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4.5 12 12 15.5 19.5 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M4.5 16 12 19.5 19.5 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>,
  <svg key="bot" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path d="M12 4.5v2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="4.2" r="0.8" fill="currentColor" />
    <rect x="6.5" y="7" width="11" height="9.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="11.5" r="0.9" fill="currentColor" />
    <circle cx="14" cy="11.5" r="0.9" fill="currentColor" />
    <path d="M9.2 14.4h5.6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
];

export function Difference({ difference }: { difference: HomeContent["difference"] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">{difference.title}</h2>
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/12 bg-white/12">
          <div className="grid gap-px lg:grid-cols-3">
            {difference.cards.map((card, index) => {
              const light = card.tone === "light";
              return (
                <article key={`${card.title}-${index}`} className={`flex min-h-[280px] flex-col p-8 ${light ? "bg-white text-[#16181d]" : "bg-[#10141c] text-white"}`}>
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${light ? "bg-[#e8f8ee] text-[#1ea85a]" : "border border-white/15 text-white"}`}>
                    {differenceIcons[index % differenceIcons.length]}
                  </span>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight">{card.title}</h3>
                  <p className={`mt-3 text-sm leading-6 ${light ? "text-[#5c6570]" : "text-white/65"}`}>{card.text}</p>
                </article>
              );
            })}
            <article className="flex min-h-[280px] flex-col justify-between bg-[#3DDC84] p-8 text-white">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase">{difference.statEyebrow}</p>
              <div>
                <p className="text-6xl leading-none font-semibold tracking-tight sm:text-7xl">{difference.statValue}</p>
                <p className="mt-3 text-base">{difference.statLabel}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Growth({ growth }: { growth: HomeContent["growth"] }) {
  return (
    <section id="pricing" className="px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#3DDC84] uppercase">— {growth.eyebrow}</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-[1.05] font-semibold tracking-tight text-white sm:text-5xl">{growth.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/70 lg:justify-self-end lg:pb-2">{growth.text}</p>
        </div>
        <figure className="relative mt-10 overflow-hidden rounded-[28px]">
          <img src={growth.image.url} alt={growth.image.alt} className="h-[280px] w-full object-cover sm:h-[460px]" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
            {growth.overlay ? <p className="max-w-md text-2xl font-semibold text-white sm:text-3xl">{growth.overlay}</p> : <span />}
            <ol className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold tracking-[0.14em] text-white uppercase">
              {growth.stages.map((stage, index) => (
                <li key={stage} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC84]" />
                  {String(index + 1).padStart(2, "0")} — {stage}
                </li>
              ))}
            </ol>
          </div>
        </figure>
        <ul className="mt-6 grid gap-4 lg:grid-cols-3">
          {growth.cards.map((card) => (
            <li key={card.title} className="rounded-2xl border border-white/12 bg-[#12161f] p-6">
              <h3 className="text-xl font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{card.text}</p>
              {card.items.length > 0 ? (
                <ul className="mt-6 rounded-xl bg-[#0b0f16] px-4 py-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 py-1.5 text-sm text-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#3DDC84]" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <GreenButton
            label={growth.cta.label}
            href={growth.cta.url}
            size={{
              width: "236px",
              height: "62px",
              paddingX: "30px",
              paddingY: "10px",
              fontSize: "16px"
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function Partners({ partners }: { partners: HomeContent["partners"] }) {
  return (
    <section id="partners" className="bg-white px-6 py-16 text-[#16181d]">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">{partners.title}</h2>
        <ul className="mt-12 flex flex-wrap items-start justify-between gap-x-6 gap-y-8">
          {partners.logos.map((item) => (
            <li key={item.name} className="flex w-[7.5rem] flex-col items-center text-center">
              {item.image ? (
                <img src={item.image.url} alt={item.image.alt || item.name} className="h-10 w-auto max-w-full object-contain" />
              ) : (
                <span className="flex h-10 items-center text-lg leading-none font-bold tracking-tight">{item.name}</span>
              )}
              {item.caption ? <span className="mt-2 text-[10px] leading-tight text-[#8b919a]">{item.caption}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Decisions({ decisions }: { decisions: HomeContent["decisions"] }) {
  return (
    <section id="insights" className="bg-white px-6 py-8 pb-20">
      <div className="mx-auto grid w-full max-w-6xl gap-3 rounded-[28px] bg-[#f3f4f1] p-3 lg:grid-cols-[0.92fr_1.08fr]">
        <article className="relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#1d2a22] p-8 text-white">
          {decisions.portrait ? (
            <img src={decisions.portrait.url} alt={decisions.portrait.alt || decisions.name} className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
          <p className="relative w-fit rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-[#16181d] uppercase">{decisions.badge}</p>
          <div className="relative">
            <p className="max-w-md text-2xl leading-snug font-semibold text-balance sm:text-3xl">“{decisions.quote}”</p>
            <p className="mt-6 text-sm font-semibold">{decisions.name}</p>
            <p className="text-sm text-white/75">{decisions.role}</p>
          </div>
        </article>
        <div className="flex flex-col justify-center px-4 py-8 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#8b919a] uppercase">— {decisions.eyebrow}</p>
          <h2 className="mt-4 max-w-md text-4xl leading-[1.05] font-semibold tracking-tight text-[#16181d] sm:text-5xl">{decisions.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#5c6570]">{decisions.text}</p>
          <ul className="mt-8 grid gap-3">
            {decisions.cards.map((card) => (
              <li key={card.title} className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4">
                <p className="w-[4.6rem] shrink-0 text-lg leading-tight font-semibold text-[#21C65E]">{card.title}</p>
                <p className="flex-1 text-sm leading-5 text-[#5c6570]">{card.text}</p>
                <a href={decisions.cta.url} aria-label={card.title} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6] text-[#9aa1ab]">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <GreenButton
              label={decisions.cta.label}
              href={decisions.cta.url}
              bgColor="#1c2128"
              textColor="#ffffff"
              size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pressure({ pressure }: { pressure: HomeContent["pressure"] }) {
  const emphasis = pressure.emphasis.trim();
  const parts = emphasis && pressure.title.includes(emphasis) ? pressure.title.split(emphasis) : null;
  
  const title = parts ? parts[0].trim() : pressure.title;
  const highlight = emphasis;

  return (
    <section id="contact" className="bg-white px-6 py-16">
      <FooterHero
        title={title}
        highlight={highlight}
        text={pressure.text}
        buttonLabel={pressure.cta.label}
        buttonUrl={pressure.cta.url}
      />
    </section>
  );
}

export function HomeFooter({ footer }: { footer: HomeContent["footer"] }) {
  return (
    <footer className="bg-[#07090f] text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 lg:grid-cols-[0.9fr_2.1fr]">
        <div>
          <img src={footer.logo.url} alt={footer.logo.alt} className="h-12 w-auto" />
          <p className="mt-6 max-w-[16rem] text-sm leading-6 text-white/70">{footer.text}</p>
          <a href={`mailto:${footer.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-white/80">
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M2 4.5 8 9l6-4.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            {footer.email}
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[11px] font-semibold tracking-[0.16em] text-white/80 uppercase">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {column.links.map((item) => (
                  <li key={item.label}>
                    <a href={item.url} className="inline-flex items-center gap-2 hover:text-white">
                      {item.label.toLowerCase() === "linkedin" ? <LinkedInMark /> : null}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl border-t border-white/10 px-6 py-6">
        <p className="text-center text-xs text-white/45">{footer.legal}</p>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
      in
    </span>
  );
}