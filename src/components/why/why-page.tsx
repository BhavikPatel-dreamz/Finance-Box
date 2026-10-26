import Image from "next/image";
import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { mergeWhy } from "@/components/why/merge";
import { homeContent, type HomeContent } from "@/content/home";
import { whyContent, type WhyContent, type WhyLink, type WhyTeamMember } from "@/content/why-fiab";
import type { RawSection } from "@/lib/wordpress/content";

export function WhyPage({ sections }: { sections: RawSection[] }) {
  const content = mergeWhy(whyContent, sections);
  return (
    <div id="top" className="min-h-screen bg-white text-[#16181d]">
      <WhyHero hero={content.hero} header={homeContent.header} />
      <WhyCompare compare={content.compare} />
      <WhyHowWeWork howWeWork={content.howWeWork} />
      <WhyCtaBanner ctaSection={content.ctaSection} />
      <WhyAbout aboutSection={content.aboutSection} />
      <WhyTeam team={content.team} />
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

function Pill({ link, dark }: { link: WhyLink; dark?: boolean }) {
  return (
    <a href={link.url} className={`inline-flex items-center gap-3 rounded-full px-6 py-4 text-[16px] font-semibold ${dark ? "bg-[#121826] text-white" : "bg-white text-[#102018]"}`}>
      {link.label}
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M4 8h8M9 4.5 12.5 8 9 11.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

export function WhyHero({ hero, header }: { hero: WhyContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section className="relative overflow-hidden bg-[#07140f] text-white">
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

export function WhyHowWeWork({ howWeWork }: { howWeWork: WhyContent["howWeWork"] }) {
  return (
    <section className="bg-[#121826] px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-[50px] font-medium tracking-[-0.8px] text-white leading-[110%] mb-12 sm:text-4xl">
          {howWeWork.title}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.cards.map((card) => (
            <div key={card.number} className="flex flex-col rounded-[20px] bg-[#1c2333] p-8 border border-white/5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#23C55E] text-[14px] font-semibold text-[#23C55E]">
                {card.number}
              </span>
              <h3 className="mt-6 text-[22px] font-semibold text-white leading-[140%]">
                {card.title}
              </h3>
              <p className="mt-4 text-[16px] font-normal leading-[140%] text-white/70">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyCtaBanner({ ctaSection }: { ctaSection: WhyContent["ctaSection"] }) {
  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-[10px] bg-[#f4f4f2] text-[#16181d] min-h-[428px] flex items-center">
          
          <div className="absolute inset-0 z-0">
            <Image 
              src={ctaSection.image} 
              alt="CTA Graphic" 
              fill 
              className="object-cover object-right" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f4f2] via-[#f4f4f2]/90 to-transparent w-full md:w-3/4" />
          </div>

          <div className="relative z-10 p-10 md:p-16 max-w-xl">
            <h2 className="text-[54px] font-medium leading-[105%] tracking-[-0.8px]">
              {ctaSection.title}
              <span className="block font-black italic text-[#23C55E]">{ctaSection.highlight}</span>
            </h2>
            <p className="mt-6 text-[16px] font-light leading-[160%] opacity-80">
              {ctaSection.text}
            </p>
            <div className="mt-8">
              <Pill link={ctaSection.button} dark />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export function WhyAbout({ aboutSection }: { aboutSection: WhyContent["aboutSection"] }) {
  return (
    <section className="bg-white px-6 pb-24">
      <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="relative overflow-hidden rounded-[24px] min-h-[630px] flex items-end">
          <Image 
            src={aboutSection.image} 
            alt="Team" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07110d] via-[#07110d]/80 to-transparent" />
          
          <div className="relative z-10 p-10 w-full">
            <h3 className="text-[50px] font-medium leading-[110%] tracking-[-0.8px] text-white">
              {aboutSection.title}
            </h3>
            <p className="mt-6 text-[16px] font-light leading-[160%] text-white/90">
              {aboutSection.text}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[24px] min-h-[630px] flex items-center p-10 lg:p-16">
          <Image 
            src={aboutSection.bgImage} 
            alt="Background" 
            fill 
            className="object-cover" 
          />
          
          <div className="relative z-10 max-w-md">
            <p className="text-[15px] font-medium tracking-[1.5px] uppercase text-[#23C55E] flex items-center gap-3">
              <span className="h-px w-6 bg-[#23C55E]" />
              {aboutSection.missionLabel}
            </p>
            <p className="mt-8 text-[40px] font-medium leading-[125%] text-white">
              {aboutSection.missionText}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Naya Section: Team (The People Behind the Work) ---
export function WhyTeam({ team }: { team: WhyContent["team"] }) {
  return (
    <section className="bg-[#0b1120] px-6 py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-center text-[50px] font-medium tracking-[-0.8px] text-white leading-[110%] mb-16">
          {team.title}
        </h2>
        
        <div className="flex flex-col gap-12">
          {team.members.map((member) => (
            <WhyTeamCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Pill link={team.cta} />
        </div>
      </div>
    </section>
  );
}

function WhyTeamCard({ member }: { member: WhyTeamMember }) {
  const isImageRight = member.imagePosition === "right";
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col lg:flex-row min-h-[715px]">
      
      <div className={`relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full ${isImageRight ? "lg:order-last" : ""}`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className={`relative z-10 flex flex-col justify-center p-10 md:p-16 w-full lg:w-1/2 text-white ${isImageRight ? "lg:order-first" : ""}`}>
        <div>
          <h3 className="text-[28px] font-bold leading-[110%] tracking-[-0.8px]">
            {member.name}
          </h3>
          <p className="mt-2 text-[14px] font-normal uppercase tracking-wide text-[#23C55E] font-mono">
            {member.role}
          </p>
        </div>

        <div className="mt-8">
          <p className="text-[24px] font-normal leading-[120%] text-white">
            {member.quote}
          </p>
          <p className="mt-4 text-[16px] font-light leading-[145%] text-white/80">
            {member.bio}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {member.focusTitle && member.focusText && (
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white">{member.focusTitle}</h4>
              <p className="mt-1 text-[14px] text-white/70">{member.focusText}</p>
            </div>
          )}
          {member.partnerships && (
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white whitespace-pre-line">{member.partnerships.split('\n')[0]}</h4>
              <p className="mt-1 text-[14px] text-white/70">{member.partnerships.split('\n')[1]}</p>
            </div>
          )}
          {member.work && (
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white">NOTABLE WORK:</h4>
              <p className="mt-1 text-[14px] text-white/70">{member.work}</p>
            </div>
          )}
          {member.tools && (
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white">TOOLS & PLATFORMS:</h4>
              <p className="mt-1 text-[14px] text-white/70">{member.tools}</p>
            </div>
          )}
          {member.industries && (
            <div>
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-white">INDUSTRIES:</h4>
              <p className="mt-1 text-[14px] text-white/70">{member.industries}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}