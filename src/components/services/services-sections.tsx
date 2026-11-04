"use client";
import { useEffect, useRef, useState, type ReactNode } from "react"; 
import { GreenButton } from "@/components/ui/green-button";
import { type ServicesContent } from "@/content/services";
import { Eyebrow } from "@/components/ui/eyebrow";
import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import { ArrowIcon } from "../ui/button";
import { InvestorSlider } from "@/components/services/investor-slider";
import { ProcessGrid } from "@/components/ui/process-grid";
import Section from "../ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";


export function ServicesBanner({ hero, header }: { hero: ServicesContent["hero"]; header: ReactNode }) {
  // Hero Section
  return (
    <section className="hero-section relative overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/services/services-hero-bg.svg)" }}
      />
      <div className="relative z-1">
        {header}
        <Container>
          <div className="flex-1 grid grid-cols-1 min-[890px]:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center py-10 sm:py-14 md:py-12 lg:py-20">
            <div className="max-w-2xl">
              <Reveal immediate preset="slide-up" delay={80} distance={18}>
                <Eyebrow variant="dark">
                  {hero.eyebrow}
                </Eyebrow>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={220} distance={32}>
                <h1 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.15] lg:leading-[1.12] font-medium tracking-tight text-white">
                  {hero.title}
                  <span className="whitespace-pre-line text-[#23C55E]"> {hero.highlight}</span>
                </h1>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={380} distance={24}>
                <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/90 mt-4 sm:mt-5 lg:max-w-[508px]">
                  {hero.text}
                </p>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={540} distance={20}>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                  <GreenButton
                    label={hero.primary.label}
                    href={hero.primary.url}
                    bgColor="#ffffff"
                    textColor="#07110d"
                  />
                  <link href="#" className="flex items-center gap-3 text-base sm:text-lg hover:text-[#23C55E] font-semibold transition-all duration-300 py-1">See How an Engagement Works <ArrowIcon /></link>
                </div>
              </Reveal>
            </div>

            <StaggerGroup immediate staggerDelay={140} className="relative w-full flex flex-col gap-3.5 sm:gap-4 max-w-2xl min-[890px]:max-w-[506px] lg:justify-self-end">
              {/* Vertical Gradient Divider Line matching Figma specs */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute -left-5 xl:-left-6 -top-7 w-[1.5px] h-[510px] pointer-events-none bg-[linear-gradient(180deg,#23C55E_0%,rgba(35,197,94,0)_89.31%)]"
                style={{
                  borderLeft: "1.5px solid transparent",
                  borderImageSource: "linear-gradient(180deg, #23C55E 0%, rgba(35, 197, 94, 0) 89.31%)",
                  borderImageSlice: 1,
                }}
              />
              {hero.tiers.map((tier, idx) => (
                <StaggerItem
                  key={idx}
                  index={idx}
                  className="card-hover w-full min-h-[110px] h-auto lg:h-[125px] bg-[#050D1F] border border-white/8 rounded-[15px] p-4 sm:p-4.5 flex items-start gap-3.5 sm:gap-4.5 relative overflow-hidden group hover:border-[#23C55E]/50 transition-colors"
                >
                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#232835] bg-[#121826] text-[14px] font-semibold text-[#23C55E]">
                    {tier.number}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[12px] font-mono font-medium tracking-[1.5px] text-white/70 uppercase mb-1">
                      {tier.label}
                    </p>
                    <h3 className="text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[30px] text-white">
                      {(() => {
                        let title = tier.title;
                        const hl = tier.highlight;
                        if (title && hl && title.endsWith(hl)) {
                          title = title.slice(0, -hl.length).trim();
                        }
                        return (
                          <>
                            {title}{" "}
                            {hl && (
                              <span className="font-semibold text-[#23C55E]">
                                {hl}
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] font-normal leading-[18px] sm:leading-[16px] text-white/60 mt-1">
                      {tier.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Container>
      </div>
    </section>
  );
}

// --- Component: Stages ---
export function ServicesStages({ stages }: { stages: ServicesContent["stages"] }) {
  const iconMap = {
    gear: "/icons/set-the-foundation.png",
    people: "/icons/build-momentum.png",
    person: "/icons/lead-with-foresight.png",
    target: "/icons/optimize-and-expand.png",
  };

  return (
    <Section theme="light" spacing="both" className="find-stage-section">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <Eyebrow variant="light">
                {stages.eyebrow}
              </Eyebrow>
              <h2 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-[46px] lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
                {stages.title.split("Company")[0]}
                <br />
                <span className="font-black italic">Company Today?</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] sm:text-[16px] font-light leading-[160%] text-[#121826]/80">
              {stages.text}
            </p>
          </div>
        </Reveal>

        <StaggerGroup staggerDelay={140} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {stages.cards.map((card, idx) => {
            const iconSrc = iconMap[card.icon] || "/icons/set-the-foundation.png";

            return (
              <StaggerItem
                key={idx}
                index={idx}
                className="card-hover bg-[#121826] rounded-[16px] p-6 sm:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[226px] h-full relative group border border-white/5"
              >
                <div className="flex justify-between items-start gap-4 mb-5 sm:mb-6">
                  <div className="flex flex-col gap-y-3.75">
                    <h3 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold leading-[1.2] text-white">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] font-medium tracking-[0.06em] uppercase text-white/70 mb-3 sm:mb-4 max-w-[85%] sm:max-w-[80%] leading-[129%]">
                      {card.label}
                    </p>
                  </div>
                  <div className="flex size-13 sm:size-15 shrink-0 items-center justify-center rounded-full border border-white/14 transition-colors duration-300 group-hover:bg-[#23C55E] group-hover:border-[#23C55E]">
                    <Image
                      src={iconSrc}
                      alt={card.title}
                      width={22}
                      height={22}
                      className="object-contain group-hover:invert transition-colors duration-300"
                    />
                  </div>
                </div>



                <p className="text-[15px] sm:text-[16px] lg:text-[18px] font-normal leading-[150%] text-white/70">
                  {card.text}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}

// --- Component: Depth Intro ---
export function ServicesDepthIntro({ depth }: { depth: ServicesContent["depth"] }) {
  return (
    <Section theme="dark" spacing="space60" className="services-depth-intro">
      <Container>
        <Reveal preset="slide-up" distance={20} className="flex flex-col items-center text-center px-4">
          <Eyebrow variant="green" dashVariant="no-dash">
            {depth.eyebrow}
          </Eyebrow>

          <h2 className="mt-5.5 sm:mt-7.5 text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
            <span className="font-medium">What&apos;s</span>
            <span className="font-extrabold italic"> Inside Each Tier</span>
          </h2>

          <GreenButton
            label={depth.cta.label}
            href={depth.cta.url}
            bgColor="#ffffff"
            textColor="#121826"
            className="mt-8 sm:mt-10"
          />
        </Reveal>
      </Container>
    </Section>
  );
}

// --- Component: Details ---
type ServiceDetail = ServicesContent["details"][number];
type ServiceItem = ServiceDetail["items"][number] & { description?: string };

/**
 * Pinned block offset to accommodate the fixed header on desktop/laptop.
 */
const STICKY_OFFSET = 92;

/**
 * Pins the block on desktop/laptop screens (>= 1024px).
 * On smaller screens (tablets & mobile), sticky positioning is disabled,
 * and inline styles are cleared to prevent negative offset overlapping.
 */
function useStickyTop(offset: number) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      // Disable sticky calculation on mobile & tablet (< 1024px)
      if (window.innerWidth < 1024) {
        el.style.top = "";
        return;
      }

      const headerOffset = offset || 92;
      const minTop = window.innerHeight - el.offsetHeight;

      // When the card fits comfortably within the viewport
      if (el.offsetHeight + headerOffset <= window.innerHeight) {
        el.style.top = `${headerOffset}px`;
      } else {
        // When viewport height is constrained on laptops (e.g. 768px height),
        // ensure top heading isn't cut off behind header
        const clampedTop = Math.max(headerOffset - 40, minTop);
        el.style.top = `${clampedTop}px`;
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [offset]);

  return ref;
}

// Card: dark by default, turns white on hover/tap and reveals the detailed description
function ServiceCard({
  item,
  className,
}: {
  item: ServiceItem;
  className: string;
}) {
  const hasHover = Boolean(item.description);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      tabIndex={hasHover ? 0 : undefined}
      role={hasHover ? "button" : undefined}
      aria-expanded={hasHover ? isOpen : undefined}
      onClick={() => {
        if (hasHover) setIsOpen((prev) => !prev);
      }}
      onKeyDown={(e) => {
        if (hasHover && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }
      }}
      className={`group relative overflow-hidden bg-[#121826] p-5 sm:p-6 lg:p-5 xl:p-7 2xl:p-8 flex flex-col justify-start min-h-[160px] sm:min-h-[175px] md:min-h-[180px] lg:min-h-[175px] xl:min-h-[195px] 2xl:min-h-[205px] outline-none transition-all duration-300 ease-out select-none ${
        hasHover
          ? "cursor-pointer hover:bg-white focus-visible:bg-white active:bg-white"
          : "cursor-default"
      } ${isOpen ? "bg-white" : ""} ${className}`}
    >
      {/* Default content: fades up and out on hover or active */}
      <div
        className={`transition-all duration-300 ease-out ${
          hasHover
            ? `group-hover:-translate-y-1 group-hover:opacity-0 group-focus-visible:-translate-y-1 group-focus-visible:opacity-0 ${
                isOpen ? "-translate-y-1 opacity-0 pointer-events-none" : ""
              }`
            : ""
        }`}
      >
        <h3 className="text-[17px] sm:text-[19px] md:text-[20px] lg:text-[18px] xl:text-[21px] 2xl:text-[22px] font-semibold leading-[1.25] sm:leading-[1.2] mb-1.5 sm:mb-2 text-white">
          {item.title}
        </h3>
        <p className="text-[13px] sm:text-[14px] md:text-[14.5px] lg:text-[13.5px] xl:text-[15px] 2xl:text-[16px] font-normal leading-[140%] text-white/70">
          {item.text}
        </p>
      </div>

      {/* Hover & touch active content: reveals description with clean typography & scroll protection */}
      {hasHover && (
        <div
          className={`absolute inset-0 p-5 sm:p-6 lg:p-5 xl:p-7 2xl:p-8 flex flex-col justify-start overflow-y-auto transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-1 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-active:translate-y-0 group-active:opacity-100"
          }`}
        >
          <p className="text-[12.5px] sm:text-[13.5px] md:text-[14px] lg:text-[13px] xl:text-[14.5px] 2xl:text-[15.5px] font-normal leading-[150%] xl:leading-[160%] text-[#121826]">
            {item.description}
          </p>
        </div>
      )}
    </div>
  );
}

// One tier block. Pins at the top on desktop/laptop; the next block slides over it
function DetailBlock({ detail, idx }: { detail: ServiceDetail; idx: number }) {
  const ref = useStickyTop(STICKY_OFFSET);
  const total = detail.items.length;
  const isOdd = total % 2 !== 0;

  return (
    <div
      ref={ref}
      id={detail.anchor}
      className={`relative bg-inherit py-8 sm:py-10 md:py-12 lg:py-10 xl:py-14 scroll-mt-20 lg:scroll-mt-24 lg:sticky lg:after:pointer-events-none lg:after:absolute lg:after:inset-x-0 lg:after:top-full lg:after:h-screen lg:after:bg-inherit lg:after:content-[''] ${
        idx > 0 ? "border-t border-white/12" : ""
      }`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-7 sm:gap-9 lg:gap-8 xl:gap-14 2xl:gap-20 items-start">
          <div className="w-full max-w-2xl lg:max-w-md min-w-0">
            <div className="flex size-8 lg:size-8.5 items-center justify-center rounded-full border border-white/10 bg-[#121826] text-[13px] lg:text-[14px] font-semibold text-[#23C55E] tabular-nums">
              {String(idx + 1).padStart(2, "0")}
            </div>
            <h2 className="text-[26px] sm:text-[30px] md:text-[32px] lg:text-[28px] xl:text-[34px] 2xl:text-[36px] font-medium leading-[1.18] sm:leading-[1.12] tracking-[-0.8px] text-white my-3.5 sm:my-5 lg:my-4 xl:my-6">
              {detail.title}
            </h2>
            <p className="text-[14px] sm:text-[15px] xl:text-[16px] font-light leading-[160%] text-white/80">
              {detail.text}
            </p>
            <GreenButton
              label={detail.cta.label}
              href={detail.cta.url}
              bgColor="#23C55E"
              textColor="#121826"
              onDark={true}
              className="mt-5 sm:mt-6 lg:mt-6 xl:mt-8"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-white/12 rounded-[10px] overflow-hidden bg-[#121826]">
            {detail.items.map((item: ServiceItem, itemIdx: number) => {
              const isLastItem = itemIdx === total - 1;
              const isFullWidth = isOdd && isLastItem;
              const isLeftCol = itemIdx % 2 === 0;

              const isLastRowSm = isOdd ? isLastItem : itemIdx >= total - 2;
              const isLastRowMobile = isLastItem;

              const borders = `
                ${isFullWidth ? "sm:col-span-2 sm:border-r-0" : isLeftCol ? "sm:border-r sm:border-white/12" : "sm:border-r-0"}
                ${isLastRowMobile ? "border-b-0" : "border-b border-white/12"}
                ${isLastRowSm ? "sm:border-b-0" : "sm:border-b sm:border-white/12"}
              `;

              return <ServiceCard key={itemIdx} item={item} className={borders} />;
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}

export function ServicesDetails({ details }: { details: ServicesContent["details"] }) {
  return (
    <Section theme="lightblue" spacing="none" className="services-details">
      {/* overflow-clip (not overflow-hidden, which would break sticky) stops the cover strip under the
          last block from painting over the sections that follow. */}
      <div className="overflow-clip bg-inherit">
        {details.map((detail, idx) => (
          <DetailBlock key={detail.anchor} detail={detail} idx={idx} />
        ))}

        {/* Keeps the last block pinned while the next section (ServicesCfo) slides up over it.
            Must match the negative top margin on ServicesCfo (-mt-[100svh]). */}
        <div aria-hidden="true" className="hidden lg:block h-[100svh]" />
      </div>
    </Section>
  );
}

// --- Component: Fractional CFO ---
export function ServicesCfo({ cfo }: { cfo: ServicesContent["cfo"] }) {
  const images = [
    "/services/cfo-img-01.png",
    "/services/cfo-img-02.png",
    "/services/cfo-img-03.png",
  ];

  return (
    <Section theme="light" spacing="both" className="services-cfo-section relative z-1 lg:-mt-[100svh]">
      <Container>
        <div className="bg-[#EDE9E6] rounded-[10px] p-6 sm:p-10 md:px-12.5 md:py-20 text-[#121826]">

          <Reveal preset="slide-up" distance={20}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-10 sm:mb-16">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
                  {cfo.title.split("\n")[0]}
                  <br />
                  <span className="font-extrabold italic">{cfo.title.split("\n")[1]}</span>
                </h2>
              </div>
              <div className="max-w-md">
                <p className="text-[14px] sm:text-[16px] font-normal leading-[150%] text-[#121826]/70 mb-6 sm:mb-8">
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
          </Reveal>

          <StaggerGroup staggerDelay={140} className="cfo-cards grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {cfo.cards.map((card, idx) => (
              <StaggerItem
                key={idx}
                index={idx}
                className="group card-hover relative w-full h-[340px] sm:h-[400px] md:h-[420px] lg:h-[430px] xl:h-[490px] rounded-[12px] overflow-hidden bg-[#EDE9E6]"
              >
                <Image
                  src={images[idx] || card.image?.url || ""}
                  alt={card.title}
                  fill
                  className="object-cover image-hover-zoom"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Bottom-left cutout wrapper matching Figma geometry */}
                <div className="absolute bottom-0 left-0 bg-[#EDE9E6] pt-2.5 pr-2.5 sm:pt-3 sm:pr-3 xl:pt-3.5 xl:pr-3.5 rounded-tr-[12px] w-[calc(100%-45px)] sm:w-[calc(100%-55px)] xl:w-[calc(100%-75px)] max-w-[315px]">
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
                  <div className="bg-[#121826] group-hover:bg-[#23C55E] text-white rounded-[8px] p-3.5 sm:p-4.5 xl:p-6 flex flex-col justify-start min-h-[130px] sm:min-h-[145px] xl:min-h-[160px] transition-all duration-300">
                    <h3 className="text-[14px] sm:text-[15px] xl:text-[18px] font-extrabold uppercase tracking-[0.8px] xl:tracking-[1px] leading-[18px] sm:leading-[20px] mb-1.5 sm:mb-2 xl:mb-3 text-white group-hover:text-[#0B0D0C] transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="text-[12px] sm:text-[12.5px] xl:text-[14px] font-normal leading-[140%] text-white/70 group-hover:text-[#0B0D0C] transition-all duration-300">
                      {card.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

        </div>
      </Container>
    </Section>
  );
}

// --- Component: Process ---
export function ServicesProcess({ process }: { process: ServicesContent["process"] }) {
  return (
    <Section theme="dark" spacing="top" className="services-process-section">
      <Container>

        {/* Header */}
        <Reveal preset="slide-up" distance={20} className="flex flex-col items-center text-center mb-8 sm:mb-12.5">
          <h2 className="text-3xl sm:text-4xl md:text-[50px] font-medium leading-[1.15] sm:leading-[1.1] tracking-[-0.8px] mb-3 sm:mb-4">
            {process.title}
          </h2>
          <p className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/70 max-w-[680px] px-2">
            {process.text}
          </p>
        </Reveal>

        {/* Cards Grid */}
        <ProcessGrid steps={process.steps} />

      </Container>
    </Section>
  );
}

// --- Component: Investors ---
export function ServicesInvestors({ investors }: { investors: ServicesContent["investors"] }) {
  return (
    <Section theme="dark" spacing="both" className="services-process-section">
      <Container>
        {/* Header Area - Contained */}
        <Reveal preset="slide-up" distance={20} className="mx-auto w-full mb-10 sm:mb-14 lg:mb-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-10 lg:gap-16">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-3 text-[14px] font-mono font-medium tracking-[1.5px] uppercase text-[#23C55E] mb-5 sm:mb-6">
                <span className="h-px w-6 bg-[#23C55E]" />
                {investors.eyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.1] sm:leading-[1.05] tracking-[-0.8px] text-white">
                {investors.title.split("\n")[0]}
                <br />
                {investors.title.split("\n")[1]}{" "}
                <span className="font-extrabold italic">{investors.highlight}</span>
                <br />
                <span className="font-extrabold italic">{investors.title.split("\n")[2]}</span>
              </h2>
            </div>

            <div className="max-w-xl lg:pb-2">
              <p className="text-[15px] sm:text-[16px] font-light leading-[160%] text-white/80 mb-6 sm:mb-8">
                {investors.text}
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <GreenButton
                  label={investors.primary.label}
                  href={investors.primary.url}
                  bgColor="#ffffff"
                  textColor="#121826"
                />
                <Link
                  href={investors.secondary.url}
                  className="group inline-flex items-center gap-3 text-[15px] sm:text-[16px] font-semibold text-white hover:text-[#23C55E] transition-colors duration-300 py-2"
                >
                  <span>{investors.secondary.label}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Full-bleed slider wisely aligned with container on left */}
      <InvestorSlider cards={investors.cards} />
    </Section>
  );
}