import type { ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { Accordion } from "../ui/accordion";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { ProcessGrid } from "@/components/ui/process-grid";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { CareersContent } from "@/content/careers";

export function CareersBanner({ hero, header }: { hero: CareersContent["hero"]; header: ReactNode }) {
  // 1. Hero Section
  return (
    <section className="hero-section relative overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/careers/careers-page-hero-bg.svg)" }}
        aria-hidden="true"
      />

      <div className="relative w-full min-h-[auto] lg:min-h-[660px] xl:min-h-[660px] z-1 flex items-center justify-center flex-col h-full">
        {header}

        <Container>
          <div className="flex-1 flex items-center pb-12 sm:pb-16 lg:pb-24 pt-8 sm:pt-12 lg:pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
              <Reveal immediate preset="slide-up" delay={80} distance={24}>
                <Eyebrow variant="dark" className="mb-4 sm:mb-6">
                  {hero.eyebrow}
                </Eyebrow>
                <h1 className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                  Build the operating<br />
                  system <span className="text-[#23C55E]">{hero.highlight}</span><br />
                  <span className="text-[#23C55E]">{hero.highlight2}</span>
                </h1>
              </Reveal>

              <Reveal immediate preset="slide-up" delay={260} distance={24} className="max-w-md lg:justify-self-end">
                <p className="text-[15px] sm:text-[16px] font-light leading-[160%] text-white/80 mb-6 sm:mb-8">
                  {hero.text}
                </p>
                <div>
                  <Button
                    color="white"
                    text={hero.cta.label}
                    href={hero.cta.url}
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function CareersWhyWork({ whyWork }: { whyWork: CareersContent["whyWork"] }) {
  // 2. Why work at FIAB Section
  return (
    <Section theme="light" spacing="both" className="why-work-section bg-white">
      <Container>
        <div className="rounded-[10px] bg-[#F5F3F2] text-[#121826] overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Column (Image) */}
            <Reveal preset="slide-left" distance={20} className="group card-hover w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] xl:min-h-[624px] overflow-hidden shrink-0">
              <Image
                src={whyWork.image}
                alt="Why work at FIAB"
                fill
                className="object-cover image-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </Reveal>

            {/* Right Column (Text & Points) */}
            <Reveal preset="slide-right" distance={20} className="w-full lg:w-1/2 flex flex-col justify-center px-15 py-20">
              <h2 className="text-[30px] sm:text-[38px] lg:text-[46px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6 sm:mb-10 lg:mb-20 text-[#121826]">
                {(() => {
                  let title = whyWork.title;
                  const hl = whyWork.highlight;
                  if (title && hl && title.endsWith(hl)) {
                    title = title.slice(0, -hl.length).trim();
                  }
                  return (
                    <>
                      {title}{" "}
                      {hl && (
                        <span className="text-[#23C55E] font-black italic">
                          {hl}
                        </span>
                      )}
                    </>
                  );
                })()}
              </h2>

              <StaggerGroup staggerDelay={130} className="flex flex-col gap-3.5 sm:gap-4">
                {whyWork.points.map((point, idx) => (
                  <StaggerItem
                    key={idx}
                    index={idx}
                    className="card-hover bg-white rounded-[12px] sm:rounded-[14px] p-5 sm:p-6 border border-[#E8E6E3]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <p className="text-[14px] sm:text-[16px] font-normal leading-[160%] text-[#121826]/80">
                      {point}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function CareersStandOut({ standOut }: { standOut: CareersContent["standOut"] }) {
  // 3. What Makes FIAB Stand Out Section
  return (
    <Section theme="light" spacing="both" className="why-fiab-section bg-white pt-0 sm:pt-0 lg:pt-0">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-[30px] sm:text-[38px] lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16 text-[#121826]">
            {standOut.title}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {standOut.cards.map((card, idx) => {
            const hasPoints = Boolean(card.points && card.points.length > 0);

            return (
              <StaggerItem
                key={idx}
                index={idx}
                className="group card-hover relative rounded-[16px] overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[620px] flex items-end shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#23C55E]"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover image-hover-zoom"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Default bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050D1F] via-[#050D1F]/70 to-transparent pointer-events-none" />

                {/* Hover full-card dark overlay */}
                <div
                  className={`absolute inset-0 bg-[#050D1F]/75 opacity-0 transition-opacity duration-500 ease-in-out pointer-events-none motion-reduce:transition-none ${
                    hasPoints ? "group-hover:opacity-100 group-focus-within:opacity-100" : ""
                  }`}
                />

                {/* Default content (slides up and fades out smoothly on hover) */}
                <div
                  className={`relative z-1 p-6 sm:p-7 lg:p-8 w-full text-white transition-all duration-500 ease-in-out motion-reduce:transition-none ${
                    hasPoints
                      ? "group-hover:opacity-0 group-hover:-translate-y-2 group-hover:pointer-events-none group-focus-within:opacity-0 group-focus-within:-translate-y-2 group-focus-within:pointer-events-none"
                      : ""
                  }`}
                >
                  <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-semibold leading-[1.25] mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] lg:text-[15px] font-light leading-[150%] text-white/85">
                    {card.text}
                  </p>
                </div>

                {/* Hover content (bullet points slide in and fade in smoothly) */}
                {hasPoints && (
                  <div className="absolute inset-x-0 bottom-0 z-1 p-6 sm:p-7 lg:p-8 w-full text-white opacity-0 translate-y-3 transition-all duration-500 ease-in-out pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto motion-reduce:transition-none">
                    <ul className="space-y-4 sm:space-y-5 lg:space-y-6">
                      {card.points!.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 sm:gap-3.5">
                          <span
                            className="mt-[6px] h-2 w-2 shrink-0 bg-[#23C55E]"
                            aria-hidden="true"
                          />
                          <span className="text-[13px] sm:text-[14px] lg:text-[15px] font-normal leading-[150%] text-white/95">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}

export function CareersBenefits({ benefits }: { benefits: CareersContent["benefits"] }) {
  // 4. Benefits & Perks Section
  return (
    <Section theme="dark" spacing="both" className="benefits-section bg-[#121826]">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-[30px] sm:text-[38px] lg:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16 text-white">
            {benefits.title}
          </h2>
        </Reveal>

        <div className="rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#121826] overflow-hidden">
          <StaggerGroup staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.items.map((benefit, idx) => (
              <StaggerItem
                key={idx}
                index={idx}
                className={twMerge(
                  "card-hover p-7 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[200px] sm:min-h-[220px] lg:min-h-[234px]",
                  // Mobile (1 col)
                  idx < 5 ? "border-b border-white/10" : "",
                  // Tablet (2 cols)
                  idx < 4 ? "sm:border-b sm:border-white/10" : "sm:border-b-0",
                  idx % 2 === 0 ? "sm:border-r sm:border-white/10" : "sm:border-r-0",
                  // Desktop (3 cols)
                  idx < 3 ? "lg:border-b lg:border-white/10" : "lg:border-b-0",
                  idx % 3 !== 2 ? "lg:border-r lg:border-white/10" : "lg:border-r-0"
                )}
              >
                <div>
                  <div className="inline-flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 mb-5 sm:mb-6">
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[150%] text-white/70">
                    {benefit.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}

export function CareersHowWeHire({ howWeHire }: { howWeHire: CareersContent["howWeHire"] }) {
  // 5. How We Hire Section
  return (
    <section className="how-hire-section bg-[#121826] pb-16 sm:pb-20 lg:pb-24 pt-0 sm:pt-6 text-white">
      <Container>
        <Reveal preset="slide-up" distance={20} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-[32px] sm:text-[42px] lg:text-[54px] font-medium leading-[1.05] tracking-[-0.8px] text-white">
            {howWeHire.title}
          </h2>
          <p className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/70 max-w-md text-left lg:text-right">
            {howWeHire.text}
          </p>
        </Reveal>

        <ProcessGrid steps={howWeHire.steps} />
      </Container>
    </section>
  );
}

export function FaqBlock({ faq }: { faq: CareersContent["faq"] }) {
  // 9. Naya Section: FAQ
  return (
    <Section theme="faq" spacing="both" className="faq-section">
      <Container>
        <div className="mx-auto w-full max-w-[880px]">
          <Reveal preset="slide-up" distance={20}>
            <h2 className="text-center text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] md:mb-12 mb-6">
              {faq.title}
            </h2>
          </Reveal>

          <Accordion items={faq.items} />
        </div>
      </Container>
    </Section>
  );
}