import Image from "next/image";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent, type HomeContent } from "@/content/home";
import { mergePeopleOperations } from "./merge";
import { peopleOperationsContent } from "@/content/people-operations";
import type { RawSection } from "@/lib/wordpress/content";
import { FooterHero } from "../ui/footer-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";

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

export function PeopleOperationsPage({ sections }: { sections: RawSection[] }) {
  const content = mergePeopleOperations(peopleOperationsContent, sections);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d] overflow-x-clip">

      {/* 1. Hero Section */}
      <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:h-[525px] overflow-hidden bg-[#121826] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
        />

        <div className="relative flex flex-col h-full">
          <HomeHeader header={siteHeader(homeContent.header)} surface="plain" logoHref="/" />

          <div className="flex-1 flex items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-0 pb-10 sm:pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
              <div>
                <Eyebrow variant="dark" className="mb-4 sm:mb-6">
                  {content.hero.eyebrow}
                </Eyebrow>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6">
                  {content.hero.title}
                  <span className="text-[#23C55E]">{content.hero.highlight}</span>
                </h1>
              </div>
              <div className="max-w-md lg:justify-self-end">
                <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] lg:leading-[160%] text-white/80 mb-6 sm:mb-8">
                  {content.hero.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <Section theme="light" spacing="both">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 xl:gap-20">
            <div className="w-full max-w-[460px] mx-auto lg:max-w-none lg:w-[554px] shrink-0 relative aspect-[554/643] rounded-[14px] sm:rounded-[16px] overflow-hidden">
              <Image
                src={content.intro.image}
                alt="FIAB People Operations"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 554px"
              />
            </div>
            <div className="w-full lg:flex-1">
              <h2 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium leading-[1.25] lg:leading-[1.3] tracking-[-0.8px] mb-4 sm:mb-6">
                {content.intro.title}
                <span className="font-bold italic text-[#23C55E]">{content.intro.highlight}</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
                {content.intro.text}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. What We Do Section */}
      <Section theme="dark" spacing="both">
        <Container>

          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-12 lg:mb-16">
            {content.whatWeDo.title}
          </h2>

          <div className="flex flex-col gap-6 sm:gap-8">
            {content.whatWeDo.items.map((card, idx) => (
              <div
                key={idx}
                className={`relative bg-[#191F2D] rounded-[16px] overflow-hidden min-h-0 lg:min-h-[592px] flex flex-col flex-col-reverse ${card.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Background Gradient Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.bgImage}
                    alt="Background Gradient"
                    fill
                    className="object-cover opacity-100"
                  />
                </div>

                {/* Content Container */}
                <div className="relative p-6 sm:p-8 md:p-10 lg:p-16 flex flex-col justify-center lg:w-1/2">
                  <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold leading-[1.25] lg:leading-[1.2] mb-3 sm:mb-4">
                    {card.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] font-light leading-[150%] text-white/70 mb-6 sm:mb-8">
                    {card.text}
                  </p>

                  <ul className="space-y-2.5 sm:space-y-3">
                    {card.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 sm:gap-3">
                        <span className="mt-1.5 sm:mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                        <span className="text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.35] lg:leading-[1.2] text-white/90">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Container */}
                <div className="relative w-full lg:w-1/2 aspect-[640/480] sm:aspect-[640/420] lg:aspect-auto min-h-[240px] sm:min-h-[300px] lg:min-h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>

        </Container>
      </Section>

      {/* 4. Where we help Section */}
      <Section theme="light" spacing="top">
        <Container>

          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-10 lg:mb-12.5">
            {content.whereWeHelp.title}
            <span className="font-extrabold italic">{content.whereWeHelp.highlight}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.whereWeHelp.cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#EDE9E6] rounded-[10px] py-6 px-5 sm:py-8 sm:px-6 lg:py-10 lg:px-7 min-h-[120px] sm:min-h-[135px] lg:min-h-[145px] flex flex-col justify-center border border-[#FFFFFF24]"
              >
                <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold leading-[1.2] lg:leading-[1.1] mb-1.5 sm:mb-2">
                  {card.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[150%] text-[#121826]/70">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

        </Container>
      </Section>

      {/* 👇 5. Reusable Footer Hero — DYNAMIC from WordPress */}
      <FooterHero
        variant="people-operations"
        title={content.pressure.title}
        highlight={content.pressure.emphasis}
        text={content.pressure.text}
        buttonLabel={content.pressure.cta.label}
        buttonUrl={content.pressure.cta.url}
      />

      <HomeFooter footer={siteFooter(homeContent.footer)} />
    </div>
  );
}