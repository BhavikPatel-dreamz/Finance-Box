import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { GreenButton } from "@/components/ui/green-button";
import { FooterHero } from "@/components/ui/footer-hero"; // Import FooterHero
import { servicesContent, type ServicesContent } from "@/content/services";
import { homeContent } from "@/content/home";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { RawSection } from "@/lib/wordpress/content";
import Image from "next/image";
import Container from "../ui/container";
import { ArrowIcon } from "../ui/button";

export function ServicesPage({ sections }: { sections?: RawSection[] } = {}) {
  const content = servicesContent;

  return (
    <div id="top" className="min-h-screen flex flex-col bg-white text-[#16181d]">

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden bg-[#121826] text-white">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url(/services/services-hero-bg.svg)" }}
        />
        <div className="relative z-10">
          <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />
          <Container>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  py-14 sm:py-16 lg:py-20">
              <div className="max-w-2xl">
                <Eyebrow variant="dark">
                  {content.hero.eyebrow}
                </Eyebrow>
                <h1 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                  {content.hero.title}
                  <span className="whitespace-pre-line text-[#23C55E]"> {content.hero.highlight}</span>
                </h1>
                <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/90 mt-5 lg:max-w-[508px]">
                  {content.hero.text}
                </p>
                <div className="flex flex-wrap items-center gap-6 mt-10">
                  <GreenButton
                    label={content.hero.primary.label}
                    href={content.hero.primary.url}
                    bgColor="#ffffff"
                    textColor="#07110d"
                    size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "16px" }}
                  />
                  <a href="#" className="flex items-center gap-3 text-lg hover:text-[#23C55E] font-semibold transition-all duration-300">See How an Engagement Works <ArrowIcon /></a>
                </div>
              </div>

              <div className="relative w-full flex flex-col gap-4 max-w-[506px] lg:justify-self-end">
                {content.hero.tiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="w-full h-[125px] bg-[#050D1F] border border-white/8 rounded-[15px] p-4.5 flex items-start gap-4.5 relative overflow-hidden group hover:border-[#23C55E]/50 transition-colors"
                  >
                    <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#232835] bg-[#121826] text-[14px] font-semibold text-[#23C55E]">
                      {tier.number}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[12px] font-mono font-medium tracking-[1.5px] text-white/50 uppercase mb-1">
                        {tier.label}
                      </p>
                      <h3 className="text-[20px] font-semibold leading-[30px] text-white">
                        {tier.title} <span className="font-semibold text-[#23C55E]">{tier.highlight}</span>
                      </h3>
                      <p className="text-[14px] font-normal leading-[16px] text-white/60 mt-1">
                        {tier.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </section>

      <ServicesStages stages={content.stages} />
      <ServicesDepthIntro depth={content.depth} />
      <ServicesDetails details={content.details} />
      <ServicesCfo cfo={content.cfo} />
      <ServicesProcess process={content.process} />

      {/* Naya Section: Investors */}
      <ServicesInvestors investors={content.investors} />

      {/* NAYA SECTION: Reusable Footer Hero */}
      <FooterHero
        title="Tell Us Where"
        highlight="The Pressure Is"
        text="A 30-minute discovery call is enough to map where your finance function is leaking time or cash, and what to fix first."
        buttonLabel="Join the Talent Network"
        buttonUrl="/contact-us"
      />

      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}

// ... (Baaki saare components: Stages, DepthIntro, Details, Cfo, Process, Investors waise hi rahenge)

// --- Component: Stages ---
function ServicesStages({ stages }: { stages: ServicesContent["stages"] }) {
  const iconMap = {
    gear: "/icons/set-the-foundation.png",
    people: "/icons/build-momentum.png",
    person: "/icons/lead-with-foresight.png",
    target: "/icons/optimize-and-expand.png",
  };

  return (
    <section className="find-stage-section bg-white  py-14 sm:py-16 lg:py-20 text-[#121826]">
      <Container>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <Eyebrow variant="light">
              {stages.eyebrow}
            </Eyebrow>
            <h2 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
              {stages.title.split("Company")[0]}
              <br />
              <span className="font-black italic">Company Today?</span>
            </h2>
          </div>
          <p className="max-w-md text-[16px] font-light leading-[160%] text-[#121826]/80">
            {stages.text}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stages.cards.map((card, idx) => {
            const iconSrc = iconMap[card.icon] || "/icons/set-the-foundation.png";

            return (
              <div
                key={idx}
                className="bg-[#121826] rounded-[16px] p-8 flex flex-col justify-between min-h-[226px] relative group border border-white/5"
              >
                <div className="flex justify-between items-start gap-4 mb-6">
                  <h3 className="text-[30px] font-semibold leading-[1.2] text-white">
                    {card.title}
                  </h3>
                  <div className="flex size-15 shrink-0 items-center justify-center rounded-full border border-white/14 transition-colors duration-300 group-hover:border-[#23C55E]">
                    <Image
                      src={iconSrc}
                      alt={card.title}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-[14px] font-medium tracking-[0.06em] uppercase text-white/70 mb-4 max-w-[80%] leading-[129%]">
                  {card.label}
                </p>

                <p className="text-[18px] font-normal leading-[150%] text-white/70">
                  {card.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

// --- Component: Depth Intro ---
function ServicesDepthIntro({ depth }: { depth: ServicesContent["depth"] }) {
  return (
    <section className="services-depth-intro bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>
        <div className="flex flex-col items-center text-center">

          <Eyebrow variant="green">
            {depth.eyebrow}
          </Eyebrow>

          <h2 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
            <span className="font-medium">What's</span>
            <span className="font-extrabold italic"> Inside Each Tier</span>
          </h2>

          <GreenButton
            label={depth.cta.label}
            href={depth.cta.url}
            bgColor="#ffffff"
            textColor="#121826"
            size={{ width: "auto", height: "62px", paddingX: "30px", paddingY: "10px", fontSize: "18px" }}
            className="mt-10"
          />
        </div>
      </Container>
    </section>
  );
}

// --- Component: Details ---
function ServicesDetails({ details }: { details: ServicesContent["details"] }) {
  return (
    <section className="services-details bg-[#191F2D] text-white">
      {details.map((detail, idx) => (
        <div
          key={detail.anchor}
          id={detail.anchor}
          className={`py-16 sm:py-20 lg:py-24 scroll-mt-20 lg:scroll-mt-24 ${idx > 0 ? "border-t border-white/12" : ""
            }`}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
              <div className="max-w-md">
                <div className="flex size-8.5 items-center justify-center rounded-full border border-white/7 bg-[#121826] text-[14px] font-semibold text-[#23C55E]">
                  {detail.number}
                </div>
                <h2 className="text-[36px] font-medium leading-[1.1] tracking-[-0.8px] text-white my-6">
                  {detail.title}
                </h2>
                <p className="text-[16px] font-light leading-[160%] text-white/80">
                  {detail.text}
                </p>
                <GreenButton
                  label={detail.cta.label}
                  href={detail.cta.url}
                  bgColor="#23C55E"
                  textColor="#121826"
                  onDark={true}
                  size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
                  className="mt-10 hover:!bg-white hover:!text-[#121826]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/12 rounded-[9px] overflow-hidden bg-[#121826]">
                {detail.items.map((item, itemIdx) => {
                  const total = detail.items.length;
                  const isOdd = total % 2 !== 0;
                  const isLastItem = itemIdx === total - 1;
                  const isFullWidth = isOdd && isLastItem;
                  const isLeftCol = itemIdx % 2 === 0;

                  // In desktop view (2-col):
                  // If odd total, only the last item is in the last row.
                  // If even total, the last two items are in the last row.
                  const isLastRowSm = isOdd ? itemIdx === total - 1 : itemIdx >= total - 2;
                  const isLastRowMobile = itemIdx === total - 1;

                  return (
                    <div
                      key={itemIdx}
                      className={`bg-[#121826] p-8 flex flex-col justify-start min-h-[191px] 
                        ${isFullWidth ? "sm:col-span-2 sm:border-r-0" : isLeftCol ? "sm:border-r sm:border-white/12" : "sm:border-r-0"} 
                        ${isLastRowMobile ? "border-b-0" : "border-b border-white/12"} 
                        ${isLastRowSm ? "sm:border-b-0" : "sm:border-b sm:border-white/12"}
                      `}
                    >
                      <h3 className="text-[22px] font-semibold leading-[1.2] mb-3 text-white">
                        {item.title}
                      </h3>
                      <p className="text-[16px] font-normal leading-[140%] text-white/70">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </div>
      ))}
    </section>
  );
}

// --- Component: Fractional CFO ---
function ServicesCfo({ cfo }: { cfo: ServicesContent["cfo"] }) {
  const images = [
    "/services/cfo-img-01.png",
    "/services/cfo-img-02.png",
    "/services/cfo-img-03.png",
  ];

  return (
    <section className="services-cfo-section bg-white py-14 sm:py-16 lg:py-20 text-[#121826]">
      <Container>
        <div className="bg-[#EDE9E6] rounded-[10px] p-10 md:px-12.5 md:py-20 text-[#121826]">

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
                {cfo.title.split("\n")[0]}
                <br />
                <span className="font-extrabold italic">{cfo.title.split("\n")[1]}</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[14px] sm:text-[16px] font-normal leading-[150%] text-[#121826]/70 mb-8">
                {cfo.text}
              </p>
              <GreenButton
                label={cfo.cta.label}
                href={cfo.cta.url}
                bgColor="#121826"
                textColor="#ffffff"
              />
            </div>
          </div>

          <div className="cfo-cards grid grid-cols-1 md:grid-cols-3 gap-5">
            {cfo.cards.map((card, idx) => (
              <div
                key={idx}
                className="relative w-full h-[490px] rounded-[12px] overflow-hidden bg-[#EDE9E6]"
              >
                <Image
                  src={images[idx] || card.image?.url || ""}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Bottom-left cutout wrapper matching Figma geometry */}
                <div className="absolute bottom-0 left-0 bg-[#EDE9E6] pt-3.5 pr-3.5 rounded-tr-[12px] w-[calc(100%-65px)] sm:w-[calc(100%-75px)] max-w-[315px]">
                  {/* Top-left corner radius for upper photo */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="absolute left-0 bottom-full pointer-events-none"
                    aria-hidden="true"
                  >
                    <path d="M 0 0 A 20 20 0 0 0 20 20 H 0 V 0 Z" fill="#EDE9E6" />
                  </svg>

                  {/* Bottom-left corner radius for right photo strip */}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="absolute left-full bottom-0 pointer-events-none"
                    aria-hidden="true"
                  >
                    <path d="M 0 0 A 20 20 0 0 0 20 20 H 0 V 0 Z" fill="#EDE9E6" />
                  </svg>

                  {/* Dark Box */}
                  <div className="bg-[#121826] text-white rounded-[8px] p-6 flex flex-col justify-start min-h-[160px]">
                    <h3 className="text-[18px] font-extrabold uppercase tracking-[1px] leading-[20px] mb-3 text-white">
                      {card.title}
                    </h3>
                    <p className="text-[14px] font-normal leading-[140%] text-white/70">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}

// --- Component: Process ---
function ServicesProcess({ process }: { process: ServicesContent["process"] }) {
  return (
    <section className="services-process-section bg-[#121826] py-14 sm:py-16 lg:py-20 text-white">
      <Container>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12.5">
          <h2 className="text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-4">
            {process.title}
          </h2>
          <p className="text-[16px] font-light leading-[160%] text-white/70 max-w-2xl">
            {process.text}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-l border-white/10">
          {process.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative py-10 border-r border-b border-white/10 flex flex-col bg-[#191F2D] min-h-[311px]"
            >
              {/* TOP PART: Number with short green line on the left */}
              <div className="h-[80px] shrink-0 flex items-start gap-6.5">
                {/* Short Green Line (equal to number height) */}
                <div className="w-[3px] h-[50px] bg-[#23C55E] -ml-[1px]" />

                <span className="text-[40px] font-extrabold leading-none">
                  {step.number}
                </span>
              </div>

              {/* BOTTOM PART: Title & Text (Aligned to bottom) */}
              <div className="px-6.5 flex flex-col flex-grow justify-end">
                <h3 className="text-[30px] font-semibold mb-2 leading-none">
                  {step.title}
                </h3>
                <p className="text-[16px] font-normal leading-[150%] text-white/70">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}

// --- Component: Investors (Updated Images & Contained Scroll) ---
function ServicesInvestors({ investors }: { investors: ServicesContent["investors"] }) {
  const cardImages = [
    "/services/scroll/portfolio-1.png",
    "/services/scroll/portfolio-2.png",
    "/services/scroll/portfolio-3.png",
    "/services/scroll/portfolio-4.png",
    "/services/scroll/portfolio-5.png",
    "/services/scroll/portfolio-6.png"
  ];

  return (
    <section className="services-investors bg-[#121826] pt-5 pb-14 sm:pb-16 lg:pb-20 text-white overflow-hidden">
      <Container>
        {/* Header Area - Contained */}
        <div className="mx-auto w-full mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="max-w-2xl">              
              <Eyebrow variant="green">
                {investors.eyebrow}
              </Eyebrow>
              <h2 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
                {investors.title.split("\n")[0]}<br />
                {investors.title.split("\n")[1]}{" "}
                <span className="font-black italic">{investors.highlight}</span><br />
                {investors.title.split("\n")[2]}
              </h2>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-[16px] font-light leading-[160%] text-white/70 mb-8">
                {investors.text}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <GreenButton
                  label={investors.primary.label}
                  href={investors.primary.url}
                  bgColor="#ffffff"
                  textColor="#121826"
                  size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
                />
                <GreenButton
                  label={investors.secondary.label}
                  href={investors.secondary.url}
                  bgColor="transparent"
                  textColor="#ffffff"
                  className="border border-white/30 hover:bg-white/10"
                  size={{ width: "auto", height: "50px", paddingX: "20px", paddingY: "10px", fontSize: "14px" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontally Scrollable Cards - Contained within max-w */}
        <div className="mx-auto w-full">
          <div
            className="w-full overflow-x-auto overflow-y-hidden flex gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style dangerouslySetInnerHTML={{ __html: `.overflow-x-auto::-webkit-scrollbar { display: none; }` }} />

            <div className="flex gap-6 min-w-max pr-6">
              {cardImages.map((imgSrc, idx) => {
                const card = investors.cards[idx] || { title: "", text: "" };

                return (
                  <div
                    key={idx}
                    className="relative w-[400px] h-[490px] rounded-[14px] overflow-hidden shrink-0 group"
                  >
                    <Image
                      src={imgSrc}
                      alt={card.title || `Portfolio Card ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0C] via-[#0B0D0C]/60 to-transparent opacity-90" />

                    {(card.title || card.text) && (
                      <div className="absolute bottom-0 left-0 w-full p-8 text-white z-10">
                        <h3 className="text-[22px] font-semibold leading-[24px] mb-3">
                          {card.title}
                        </h3>
                        <p className="text-[14px] font-normal leading-[140%] text-white/80">
                          {card.text}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}