import { Fragment } from "react";
import Image from "next/image";
import { HomeFooter } from "@/components/home/home-page";
import { HomeHeader } from "@/components/home/home-header";
import { TrustedBy } from "@/components/home/trusted-by";
import { mergeWhy } from "@/components/why/merge";
import { homeContent, type HomeContent } from "@/content/home";
import { whyContent, type WhyContent, type WhyTeamMember } from "@/content/why-fiab";
import type { RawSection } from "@/lib/wordpress/content";
import { FooterHero } from "@/components/ui/footer-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "../ui/container";

export function WhyPage({ sections }: { sections: RawSection[] }) {
  const content = mergeWhy(whyContent, sections);
  return (
    <div id="top" className="min-h-screen bg-white text-[#16181d]">
      <WhyHero hero={content.hero} header={homeContent.header} />
      <TrustedBy trust={homeContent.trust} />
      <WhyCompare compare={content.compare} />
      <WhyHowWeWork howWeWork={content.howWeWork} />
      <WhyAbout aboutSection={content.aboutSection} />
      <WhyTeam team={content.team} />

      <FooterHero
        title="See What an Embedded"
        highlight="Finance Team Changes"
        text="A 30-minute discovery call maps where your finance function is leaking time or cash, and what to fix first."
        buttonLabel="Join the Talent Network"
        buttonUrl="/#contact"
      />

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

export function WhyHero({ hero, header }: { hero: WhyContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section className="relative overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/why/why-bg-img.svg)" }}
      />
      <div className="relative">
        <HomeHeader header={siteHeader(header)} surface="plain" logoHref="/" />
        <div className="container w-full max-w-[1096px] mx-auto px-4 sm:px-6">
          <div className="grid items-start gap-8 pt-16 pb-10 sm:pt-20 sm:pb-10 lg:pt-[84px] lg:pb-[60px] lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow variant="dark">
                {hero.eyebrow}
              </Eyebrow>
              <h1 className="mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                {hero.title}
                <span className="block whitespace-pre-line text-[#23C55E]">{hero.highlight}</span>
              </h1>
            </div>
            <div className="max-w-[460px] lg:justify-self-end lg:pt-2.5">
              <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white">
                {hero.text}
              </p>
              <div className="mt-8">
                <Button color="white" text={hero.cta.label} href={hero.cta.url} />
              </div>
            </div>
          </div>
          <div className="relative pb-16 sm:pb-24">
            <div
              className="w-full border-y border-white/10 bg-[rgba(0,0,0,0.03)] backdrop-blur-[3px]"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            >
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-white/10">
                {hero.points.map((point) => (
                  <div
                    key={point.number}
                    className="flex min-h-[50px] md:h-[110px] md:flex-col lg:justify-between lg:items-start items-center p-4 sm:px-5 sm:py-4 lg:gap-0 gap-x-4"
                  >
                    <span className="point-number inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#121826] border border-white/7 text-[14px] font-semibold text-[#23C55E]">
                      {point.number}
                    </span>
                    <p className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-snug">
                      {point.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mark({ on }: { on: boolean }) {
  return on ? (
    <img
      src="/icons/right-icon.svg"
      alt="Included"
      width={23}
      height={23}
      className="h-[23px] w-[23px] inline-block object-contain"
    />
  ) : (
    <img
      src="/icons/close-icon.svg"
      alt="Not included"
      width={22}
      height={22}
      className="h-[22px] w-[22px] inline-block object-contain"
    />
  );
}

export function WhyCompare({ compare }: { compare: WhyContent["compare"] }) {
  const featuredColIdx = compare.columns.findIndex((col) => col.featured);
  const featuredGridCol = featuredColIdx >= 0 ? featuredColIdx + 2 : 2;
  const totalCols = compare.columns.length + 1;
  const totalRows = compare.rows.length + 1;

  return (
    <section className="why-compare bg-white py-16 sm:py-24 text-[#121826]">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
            {compare.title}
            <span className="mt-1 block font-black text-[#23C55E] italic">{compare.highlight}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-sm sm:text-base leading-[1.6] text-[#66707c]">
            {compare.text}
          </p>
        </div>

        <div className="table-wrapper overflow-hidden">
          <div className="mt-5 sm:mt-16 overflow-x-auto pt-11 pb-9 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[1280px]">
              <div
                role="table"
                aria-label="Features Comparison"
                className="relative rounded-[10px] bg-[#EDE9E6] grid items-stretch"
                style={{
                  gridTemplateColumns: `minmax(240px, 1.4fr) minmax(200px, 1.15fr) repeat(${Math.max(1, compare.columns.length - 1)}, minmax(160px, 1fr))`,
                  gridTemplateRows: `96px repeat(${compare.rows.length}, 68px)`,
                }}
              >
                {/* Layer 1: Alternating white rows with rounded-[10px] */}
                {compare.rows.map((_, rowIndex) => {
                  if (rowIndex % 2 === 0) {
                    return (
                      <div
                        key={`white-row-${rowIndex}`}
                        className="bg-[#FFFFFF] rounded-[10px] pointer-events-none z-0"
                        style={{
                          gridColumn: `1 / ${totalCols + 1}`,
                          gridRow: rowIndex + 2,
                        }}
                      />
                    );
                  }
                  return null;
                })}

                {/* Layer 2: Vertical divider lines between non-featured columns */}
                {compare.columns.map((_, idx) => {
                  const gridCol = idx + 2;
                  if (gridCol > featuredGridCol + 1) {
                    return (
                      <div
                        key={`divider-${gridCol}`}
                        className="border-l border-[#121826]/10 pointer-events-none z-[5]"
                        style={{
                          gridColumn: gridCol,
                          gridRow: `1 / ${totalRows + 1}`,
                        }}
                      />
                    );
                  }
                  return null;
                })}

                {/* Layer 3: Featured Column Dark Pillar (#121826) */}
                <div
                  className="bg-[#121826] rounded-[14px] pointer-events-none z-[10] -mt-8 sm:-mt-9 -mb-6 sm:-mb-7"
                  style={{
                    gridColumn: featuredGridCol,
                    gridRow: `1 / ${totalRows + 1}`,
                  }}
                />

                {/* Layer 4: Content Cells */}
                {/* Column 1 Header: Features */}
                <div
                  role="columnheader"
                  className="relative z-[20] flex items-center justify-start pl-6 sm:pl-8 pr-4 font-semibold text-[20px] sm:text-[22px] text-[#121826] tracking-tight"
                  style={{ gridColumn: 1, gridRow: 1 }}
                >
                  {compare.featureLabel}
                </div>

                {/* Header Columns */}
                {compare.columns.map((column, colIdx) => {
                  const gridCol = colIdx + 2;
                  const isFeatured = column.featured;

                  if (isFeatured) {
                    return (
                      <div
                        key={column.label}
                        role="columnheader"
                        className="relative z-[20] flex flex-col items-center justify-center px-4 -mt-8 sm:-mt-9 border-b border-white/[0.14]"
                        style={{ gridColumn: gridCol, gridRow: 1 }}
                      >
                        {column.logo ? (
                          <img
                            src={column.logo.url}
                            alt={column.logo.alt || column.label}
                            className="h-11 sm:h-12 w-auto max-w-[145px] object-contain drop-shadow-sm"
                          />
                        ) : (
                          <span className="text-[20px] font-bold text-white tracking-tight">{column.label}</span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={column.label}
                      role="columnheader"
                      className="relative z-[20] flex items-center justify-center px-4 text-center font-semibold text-[16px] sm:text-[22px] text-[#121826] leading-snug"
                      style={{ gridColumn: gridCol, gridRow: 1 }}
                    >
                      {column.label}
                    </div>
                  );
                })}

                {/* Data Rows Content */}
                {compare.rows.map((rowItem, rowIndex) => {
                  const gridRow = rowIndex + 2;

                  return (
                    <Fragment key={rowItem.label}>
                      {/* Feature Label Cell */}
                      <div
                        role="rowheader"
                        className="relative z-[20] flex items-center justify-start pl-6 sm:pl-8 pr-4 text-[15px] sm:text-[16px] font-medium text-[#121826] leading-snug"
                        style={{ gridColumn: 1, gridRow }}
                      >
                        {rowItem.label}
                      </div>

                      {/* Data Cells */}
                      {compare.columns.map((column, colIdx) => {
                        const gridCol = colIdx + 2;
                        const isFeatured = column.featured;
                        const isIncluded = rowItem.values[colIdx] === true;

                        return (
                          <div
                            key={column.label}
                            role="cell"
                            className={`relative z-[20] flex items-center justify-center px-4 ${isFeatured && rowIndex < compare.rows.length - 1
                              ? "border-b border-white/[0.14]"
                              : ""
                              }`}
                            style={{ gridColumn: gridCol, gridRow }}
                          >
                            <Mark on={isIncluded} />
                          </div>
                        );
                      })}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhyHowWeWork({ howWeWork }: { howWeWork: WhyContent["howWeWork"] }) {
  return (
    <section className="how-we-work bg-[#121826] py-20">
      <Container>
        <h2 className="text-center sm:text-[50px] text-4xl font-medium tracking-[-0.8px] text-white leading-[110%] mb-12 ">
          {howWeWork.title}
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.cards.map((card) => (
            <div key={card.number} className="flex flex-col rounded-[20px] bg-[rgba(255,255,255,0.06)] sm:px-7.5 sm:py-10 p-5 border border-[rgba(255,255,255,0.07)]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold text-[#23C55E] bg-[#121826]">
                {card.number}
              </span>
              <h3 className="mt-6 text-[22px] font-semibold text-white leading-[148%]">
                {card.title}
              </h3>
              <p className="mt-4 text-[16px] font-normal leading-[140%] text-white/70">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhyAbout({ aboutSection }: { aboutSection: WhyContent["aboutSection"] }) {
  return (
    <section className="why-about bg-white py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="relative overflow-hidden rounded-[24px] h-[630px] min-h-[630px] flex items-end">
            <Image src={aboutSection.image} alt="Team" fill className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,38,0)_13.73%,rgba(18,24,38,0.662784)_52.12%,rgba(18,24,38,0.866393)_77.6%,#121826_100%)]" />

            <div className="relative z-10 p-10 w-full">
              <h3 className="text-[50px] font-medium leading-[110%] tracking-[-0.8px] text-white">
                {aboutSection.title}
              </h3>
              <p className="mt-7 text-[16px] font-light leading-[160%] text-white/90">
                {aboutSection.text}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[24px] h-[630px] min-h-[630px] flex flex-col justify-between p-6 lg:p-12.5 lg:pr-17.5 ">
            <Image src={aboutSection.bgImage} alt="Background" fill className="object-cover" />

            <div className="relative z-10">
              <Eyebrow variant="green">
                {aboutSection.missionLabel}
              </Eyebrow>
            </div>

            <div className="relative z-10">
              <p className="text-[30px] sm:text-[36px] lg:text-[40px] font-medium leading-[125%] tracking-[-0.8px] text-white">
                {aboutSection.missionText}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhyTeam({ team }: { team: WhyContent["team"] }) {
  return (
    <section className="why-team bg-[#121826] py-20">
      <Container>
        <h2 className="text-center text-[50px] font-medium tracking-[-0.8px] text-white leading-[110%]">
          {team.title}
        </h2>

        <div className="flex flex-col gap-10 mt-15">
          {team.members.map((member) => (
            <WhyTeamCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            color="green"
            text={team.cta.label}
            href={team.cta.url}
          />
        </div>
      </Container>
    </section>
  );
}

function WhyTeamCard({ member }: { member: WhyTeamMember }) {
  const isImageRight = member.imagePosition === "right";
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col lg:flex-row min-h-[715px]">

      <div className={`relative w-full lg:w-1/2 min-h-[400px] lg:min-h-full ${isImageRight ? "lg:order-last" : ""}`}>
        <Image src={member.image} alt={member.name} fill className="object-cover object-center" />
      </div>

      <div className={`relative z-10 flex flex-col justify-center p-8 md:p-11 w-full lg:w-1/2 text-white bg-[rgba(255,255,255,0.04)] ${isImageRight ? "lg:order-first" : ""}`}>
        <div>
          <h3 className="text-[28px] font-bold leading-[110%] tracking-[-0.8px]">
            {member.name}
          </h3>
          <p className="mt-2 text-[14px] font-normal uppercase tracking-wide text-white/60 font-mono">
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
              <h4 className="text-[14px] font-medium uppercase tracking-wider text-white font-mono">{member.focusTitle}</h4>
              <p className="mt-1 text-[14px] text-white/70 font-light">{member.focusText}</p>
            </div>
          )}
          {member.partnerships && (
            <div>
              <h4 className="text-[14px] font-medium uppercase tracking-wider text-white font-mono whitespace-pre-line">{member.partnerships.split('\n')[0]}</h4>
              <p className="mt-1 text-[14px] text-white/70 font-light">{member.partnerships.split('\n')[1]}</p>
            </div>
          )}
          {member.work && (
            <div>
              <h4 className="text-[14px] font-medium uppercase tracking-wider text-white font-mono">NOTABLE WORK:</h4>
              <p className="mt-1 text-[14px] text-white/70 font-light">{member.work}</p>
            </div>
          )}
          {member.tools && (
            <div>
              <h4 className="text-[14px] font-medium uppercase tracking-wider text-white font-mono">TOOLS & PLATFORMS:</h4>
              <p className="mt-1 text-[14px] text-white/70 font-light">{member.tools}</p>
            </div>
          )}
          {member.industries && (
            <div>
              <h4 className="text-[14px] font-medium uppercase tracking-wider text-white font-mono">INDUSTRIES:</h4>
              <p className="mt-1 text-[14px] text-white/70 font-light">{member.industries}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}