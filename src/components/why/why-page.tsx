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
import { Container } from "@/components/ui/container";

export function WhyPage({ sections }: { sections: RawSection[] }) {
  const content = mergeWhy(whyContent, sections);

  return (
    <div id="top" className="min-h-screen bg-white text-[#16181d] overflow-x-clip">
      <WhyHero hero={content.hero} header={homeContent.header} />
      <TrustedBy trust={homeContent.trust} />
      <WhyCompare compare={content.compare} />
      <WhyHowWeWork howWeWork={content.howWeWork} />
      <WhyTalk talk={content.talk} />
      <WhyAbout aboutSection={content.aboutSection} />
      <WhyTeam team={content.team} />

      {/* CTA Section dynamic */}
      <WhyFooterCta cta={content.cta} />

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

export function WhyFooterCta({ cta }: { cta: WhyContent["cta"] }) {
  return (
    <FooterHero
      title={cta.title}
      highlight={cta.highlight}
      text={cta.text}
      buttonLabel={cta.buttonLabel}
      buttonUrl={cta.buttonUrl}
    />
  );
}

export function WhyHero({ hero, header }: { hero: WhyContent["hero"]; header: HomeContent["header"] }) {
  return (
    <section className="hero-section relative overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/why/why-bg-img.svg)" }}
      />
      <div className="relative">
        <HomeHeader header={siteHeader(header)} surface="plain" logoHref="/" />
        <Container>
          <div className="w-full">
            <div className="grid items-start gap-6 sm:gap-8 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-[84px] lg:pb-[60px] lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Eyebrow variant="dark">
                  {hero.eyebrow}
                </Eyebrow>
                <h1 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                  {hero.title}
                  <span className="block whitespace-pre-line text-[#23C55E]">{hero.highlight}</span>
                </h1>
              </div>
              <div className="lg:max-w-[460px] lg:justify-self-end lg:pt-2.5">
                <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/90">
                  {hero.text}
                </p>
                <div className="mt-6 sm:mt-8">
                  <Button color="white" text={hero.cta.label} href={hero.cta.url} />
                </div>
              </div>
            </div>
            <div className="relative pb-12 sm:pb-16 lg:pb-24">
              <div
                className="w-full rounded-[12px] sm:rounded-none overflow-hidden border border-white/10 sm:border-x-0 sm:border-y sm:border-white/10 bg-[rgba(0,0,0,0.03)] backdrop-blur-[3px]"
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
                      className="flex min-h-[50px] md:h-[110px] md:flex-col lg:justify-between lg:items-start items-center p-3.5 sm:px-5 sm:py-4 lg:gap-0 gap-x-4"
                    >
                      <span className="point-number inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-full bg-[#121826] border border-white/7 text-[13px] sm:text-[14px] font-semibold text-[#23C55E]">
                        {point.number}
                      </span>
                      <p className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-white tracking-tight leading-snug">
                        {point.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
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
      className="h-[20px] w-[20px] sm:h-[23px] sm:w-[23px] inline-block object-contain"
    />
  ) : (
    <img
      src="/icons/close-icon.svg"
      alt="Not included"
      width={22}
      height={22}
      className="h-[19px] w-[19px] sm:h-[22px] sm:w-[22px] inline-block object-contain"
    />
  );
}

export function WhyCompare({ compare }: { compare: WhyContent["compare"] }) {
  const featuredColIdx = compare.columns.findIndex((col) => col.featured);
  const featuredGridCol = featuredColIdx >= 0 ? featuredColIdx + 2 : 2;
  const totalCols = compare.columns.length + 1;
  const totalRows = compare.rows.length + 1;

  return (
    <section className="compare-section bg-white py-14 sm:py-20 lg:py-24 text-[#121826] overflow-hidden">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
            {compare.title}
            <span className="mt-1 block font-black text-[#23C55E] italic">{compare.highlight}</span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-[680px] text-sm sm:text-base leading-[1.6] text-[#66707c]">
            {compare.text}
          </p>
        </div>

        <div className="table-wrapper mt-5 sm:mt-12 lg:mt-16">
          <div className="overflow-x-auto pt-10 pb-8 sm:pt-11 sm:pb-9 -mx-4 px-4 sm:mx-0 sm:px-0 touch-scroll">
            <div className="min-w-[680px] sm:min-w-[820px] md:min-w-[960px] lg:min-w-[1096px] xl:min-w-[1280px]">
              <div
                role="table"
                aria-label="Features Comparison"
                className="why-compare-table relative rounded-[10px] bg-[#EDE9E6] grid items-stretch"
                style={{
                  gridTemplateColumns: `var(--col-first, minmax(240px, 1.4fr)) var(--col-featured, minmax(200px, 1.15fr)) repeat(${Math.max(1, compare.columns.length - 1)}, var(--col-other, minmax(160px, 1fr)))`,
                  gridTemplateRows: `var(--header-row-height, 96px) repeat(${compare.rows.length}, 68px)`,
                }}
              >
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

                <div
                  className="bg-[#121826] rounded-[14px] pointer-events-none z-[10] -mt-7 sm:-mt-9 -mb-5 sm:-mb-7"
                  style={{
                    gridColumn: featuredGridCol,
                    gridRow: `1 / ${totalRows + 1}`,
                  }}
                />

                <div
                  role="columnheader"
                  className="relative z-[20] flex items-center justify-start pl-4 sm:pl-8 pr-3 sm:pr-4 font-semibold text-[17px] sm:text-[22px] text-[#121826] tracking-tight"
                  style={{ gridColumn: 1, gridRow: 1 }}
                >
                  {compare.featureLabel}
                </div>

                {compare.columns.map((column, colIdx) => {
                  const gridCol = colIdx + 2;
                  const isFeatured = column.featured;

                  if (isFeatured) {
                    return (
                      <div
                        key={column.label}
                        role="columnheader"
                        className="relative z-[20] flex flex-col items-center justify-center px-3 sm:px-4 -mt-7 sm:-mt-9 border-b border-white/[0.14]"
                        style={{ gridColumn: gridCol, gridRow: 1 }}
                      >
                        {column.logo ? (
                          <img
                            src={column.logo.url}
                            alt={column.logo.alt || column.label}
                            className="h-9 sm:h-12 w-auto max-w-[130px] sm:max-w-[145px] object-contain drop-shadow-sm"
                          />
                        ) : (
                          <span className="text-[17px] sm:text-[20px] font-bold text-white tracking-tight">{column.label}</span>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={column.label}
                      role="columnheader"
                      className="relative z-[20] flex items-center justify-center px-2 sm:px-4 text-center font-semibold text-[14px] sm:text-[18px] lg:text-[22px] text-[#121826] leading-snug"
                      style={{ gridColumn: gridCol, gridRow: 1 }}
                    >
                      {column.label}
                    </div>
                  );
                })}

                {compare.rows.map((rowItem, rowIndex) => {
                  const gridRow = rowIndex + 2;

                  return (
                    <Fragment key={rowItem.label}>
                      <div
                        role="rowheader"
                        className="relative z-[20] flex items-center justify-start pl-4 sm:pl-8 pr-3 sm:pr-4 text-[13.5px] sm:text-[15px] lg:text-[16px] font-medium text-[#121826] leading-snug"
                        style={{ gridColumn: 1, gridRow }}
                      >
                        {rowItem.label}
                      </div>

                      {compare.columns.map((column, colIdx) => {
                        const gridCol = colIdx + 2;
                        const isFeatured = column.featured;
                        const isIncluded = rowItem.values[colIdx] === true;

                        return (
                          <div
                            key={column.label}
                            role="cell"
                            className={`relative z-[20] flex items-center justify-center px-2 sm:px-4 ${isFeatured && rowIndex < compare.rows.length - 1
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
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#66707c] lg:hidden">
            <span>←</span>
            <span>Scroll horizontally to view all options</span>
            <span>→</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhyHowWeWork({ howWeWork }: { howWeWork: WhyContent["howWeWork"] }) {
  return (
    <section className="how-we-work bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>
        <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] text-white leading-[110%] mb-8 sm:mb-12">
          {howWeWork.title}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howWeWork.cards.map((card) => (
            <div
              key={card.number}
              className="flex flex-col rounded-[20px] bg-[rgba(255,255,255,0.06)] p-6 sm:px-7 sm:py-9 lg:px-7.5 lg:py-10 border border-[rgba(255,255,255,0.07)]"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-semibold text-[#23C55E] bg-[#121826]">
                {card.number}
              </span>
              <h3 className="mt-5 sm:mt-6 text-[20px] sm:text-[22px] font-semibold text-white leading-[140%]">
                {card.title}
              </h3>
              <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] font-normal leading-[150%] text-white/70">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhyTalk({ talk }: { talk: WhyContent["talk"] }) {
  return (
    <section className="pt-20">
      <Container>
        <div className="rounded-[24px] bg-[#F5F3F2] border border-[#E8E6E3] pl-8 md:pl-12 lg:pl-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 overflow-hidden">
          <div className="max-w-[600px] relative z-10">
            <h2 className="text-[36px] sm:text-[44px] lg:text-[54px] font-medium leading-[105%] tracking-[-0.8px] text-[#121826]">
              {talk.title}
              <br />
              <span className="block font-black italic text-[#23C55E]">
                {talk.highlight}
              </span>
            </h2>
            <p className="mt-6 text-[14px] sm:text-[16px] font-light leading-[160%] text-[#66707c]">
              {talk.text}
            </p>
            <div className="mt-8">
              <Button color="dark" text={talk.cta.label} href={talk.cta.url} />
            </div>
          </div>

          <div className="relative w-full max-w-[599px] shrink-0 aspect-[599/455]">
            <div className="absolute inset-y-0 left-0 w-32 lg:w-48 bg-gradient-to-r from-[#F5F3F2] to-transparent z-10 pointer-events-none" />
            <Image
              src={talk.image}
              alt="Coins representing business growth"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 599px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WhyAbout({ aboutSection }: { aboutSection: WhyContent["aboutSection"] }) {
  return (
    <section className="about-grid-section bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] min-h-[440px] sm:min-h-[500px] lg:h-[630px] lg:min-h-[630px] flex items-end">
            <Image
              src={aboutSection.image}
              alt="Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,24,38,0)_13.73%,rgba(18,24,38,0.662784)_52.12%,rgba(18,24,38,0.866393)_77.6%,#121826_100%)]" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10 w-full">
              <h3 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[110%] tracking-[-0.8px] text-white">
                {aboutSection.title}
              </h3>
              <p className="mt-4 sm:mt-6 lg:mt-7 text-[15px] sm:text-[16px] font-light leading-[160%] text-white/90">
                {aboutSection.text}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[24px] min-h-[380px] sm:min-h-[480px] lg:h-[630px] lg:min-h-[630px] flex flex-col justify-between p-6 sm:p-8 lg:p-12.5 lg:pr-17.5">
            <Image
              src={aboutSection.bgImage}
              alt="Background"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="relative z-10">
              <Eyebrow variant="green">
                {aboutSection.missionLabel}
              </Eyebrow>
            </div>

            <div className="relative z-10 mt-10 sm:mt-12 lg:mt-0">
              <p className="text-[22px] sm:text-[30px] md:text-[36px] lg:text-[40px] font-medium leading-[125%] tracking-[-0.8px] text-white">
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
    <section className="team-section bg-[#121826] py-14 sm:py-16 lg:py-20">
      <Container>
        <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] text-white leading-[110%]">
          {team.title}
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 mt-8 sm:mt-12 lg:mt-15">
          {team.members.map((member) => (
            <WhyTeamCard key={member.name} member={member} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <Button
            color="green"
            text={team.cta.label}
            href={team.cta.url}
            onDark={true}
          />
        </div>
      </Container>
    </section>
  );
}

function WhyTeamCard({ member }: { member: WhyTeamMember }) {
  const isImageRight = member.imagePosition === "right";
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col lg:flex-row lg:min-h-[715px]">

      <div
        className={`relative w-full lg:w-1/2 min-h-[380px] sm:min-h-[480px] lg:min-h-full overflow-hidden flex items-end justify-center ${
          isImageRight ? "lg:order-last" : ""
        }`}
      >
        <div
          className={`absolute inset-0 bg-cover bg-no-repeat bg-center ${
            isImageRight ? "" : "-scale-x-100"
          }`}
          style={{ backgroundImage: "url(/why/why-team-bg.svg)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full h-full min-h-[380px] sm:min-h-[480px] lg:min-h-full flex items-end justify-center">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>

      <div className={`relative z-10 flex flex-col justify-center p-6 sm:p-8 md:p-11 w-full lg:w-1/2 text-white bg-[rgba(255,255,255,0.04)] ${isImageRight ? "lg:order-first" : ""}`}>
        <div>
          <h3 className="text-[24px] sm:text-[28px] font-bold leading-[110%] tracking-[-0.8px]">
            {member.name}
          </h3>
          <p className="mt-2 text-[13px] sm:text-[14px] font-normal uppercase tracking-wide text-white/60 font-mono">
            {member.role}
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <p className="text-[19px] sm:text-[22px] lg:text-[24px] font-normal leading-[125%] text-white">
            {member.quote}
          </p>
          <p className="mt-3 sm:mt-4 text-[14px] sm:text-[16px] font-light leading-[150%] text-white/80">
            {member.bio}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
          {member.focusTitle && member.focusText && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">{member.focusTitle}</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.focusText}</p>
            </div>
          )}
          {member.partnerships && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono whitespace-pre-line">{member.partnerships.split('\n')[0]}</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.partnerships.split('\n')[1]}</p>
            </div>
          )}
          {member.work && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">NOTABLE WORK:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.work}</p>
            </div>
          )}
          {member.tools && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">TOOLS & PLATFORMS:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.tools}</p>
            </div>
          )}
          {member.industries && (
            <div>
              <h4 className="text-[13px] sm:text-[14px] font-medium uppercase tracking-wider text-white font-mono">INDUSTRIES:</h4>
              <p className="mt-1 text-[13px] sm:text-[14px] text-white/70 font-light">{member.industries}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}