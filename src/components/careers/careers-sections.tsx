"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Accordion } from "../ui/accordion";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { ProcessGrid } from "@/components/ui/process-grid";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { CareersContent } from "@/content/careers";


export function CareersWhyWork({ whyWork }: { whyWork: CareersContent["whyWork"] }) {
  // 2. Why work at FIAB Section
  return (
    <Section theme="light" spacing="both" className="why-work-section bg-white text-[#121826] py-10 sm:py-14 md:py-16 lg:py-20">
      <Container>
        <div className="rounded-[10px] bg-[#EDE9E6]/50 text-[#121826] overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Column (Image) */}
            <Reveal
              preset="slide-left"
              distance={20}
              className="group card-hover w-full lg:w-1/2 relative min-h-[260px] xs:min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[624px] overflow-hidden shrink-0"
            >
              {whyWork.image && <Image
                src={whyWork.image}
                alt="Why work at FIAB"
                fill
                className="object-cover image-hover-zoom"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />}
            </Reveal>

            {/* Right Column (Text & Points) */}
            <Reveal
              preset="slide-right"
              distance={20}
              className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-10 xl:px-14 xl:py-16 2xl:px-15 2xl:py-18"
            >
              <h2 className="text-[26px] xs:text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-5 sm:mb-8 lg:mb-10 xl:mb-20 text-[#121826]">
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

              <StaggerGroup staggerDelay={130} className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
                {whyWork.points.map((point, idx) => (
                  <StaggerItem
                    key={idx}
                    index={idx}
                    className="card-hover bg-white rounded-[10px] sm:rounded-[12px] p-4 sm:p-5 lg:p-5 xl:p-6 border border-[#E8E6E3]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                  >
                    <p className="text-[14px] xl:text-[16px] font-light leading-[160%] text-[#121826]/80">
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
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const toggleCard = (idx: number) => {
    setActiveCard((current) => (current === idx ? null : idx));
  };

  return (
    <Section theme="light" spacing="both" className="why-fiab-section bg-white pt-0 sm:pt-0 lg:pt-0 pb-12 sm:pb-16 lg:pb-20">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-[26px] xs:text-[30px] sm:text-[36px] md:text-[42px] lg:text-[46px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-6 sm:mb-10 lg:mb-12 xl:mb-16 text-[#121826]">
            {standOut.title}
          </h2>
        </Reveal>

        <StaggerGroup
          staggerDelay={150}
          className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-3 xl:gap-4"
        >
          {standOut.cards.map((card, idx) => {
            const hasPoints = Boolean(card.points && card.points.length > 0);
            const isFlipped = activeCard === idx;

            return (
              <StaggerItem key={idx} index={idx} className="h-full flex">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleCard(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleCard(idx);
                    }
                  }}
                  className={twMerge(
                    "group card-hover relative rounded-[10px] overflow-hidden min-h-[400px] sm:min-h-[460px] md:min-h-[480px] lg:min-h-[540px] xl:min-h-[620px] w-full flex items-end shadow-sm cursor-pointer outline-none select-none focus-visible:ring-2 focus-visible:ring-[#23C55E]",
                    isFlipped && "is-flipped"
                  )}
                >
                  {card.image && <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover image-hover-zoom"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />}

                  {/* Single Figma gradient anchored to the bottom. On hover only its height grows,
                      so the gradient stretches upward and the dark area rises smoothly. */}
                  <div
                    className={twMerge(
                      "absolute inset-x-0 bottom-0 h-full pointer-events-none",
                      "bg-[linear-gradient(180deg,rgba(18,24,38,0)_23.47%,rgba(18,24,38,0.771381)_48.73%,rgba(18,24,38,0.829427)_61.13%,rgba(18,24,38,0.857097)_74.41%,#121826_93.31%)]",
                      "transition-[height] duration-[700ms] ease-[cubic-bezier(0.45,0,0.25,1)] motion-reduce:transition-none",
                      hasPoints && "group-hover:duration-[1000ms] group-hover:h-[300%] group-focus-within:duration-[1000ms] group-focus-within:h-[300%]",
                      isFlipped && "duration-[1000ms] h-[300%]"
                    )}
                  />

                  {/* Default content: rises 60px and fades out */}
                  <div
                    className={twMerge(
                      "relative z-10 p-5 sm:p-6 md:p-4.5 lg:p-6 xl:p-[34px] w-full text-white will-change-[opacity,transform,translate] motion-reduce:transition-none",
                      "transition-[opacity,transform,translate] duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
                      hasPoints && "group-hover:duration-500 group-hover:opacity-0 group-hover:-translate-y-[60px] group-hover:pointer-events-none group-focus-within:duration-500 group-focus-within:opacity-0 group-focus-within:-translate-y-[60px] group-focus-within:pointer-events-none",
                      isFlipped && "duration-500 opacity-0 -translate-y-[60px] pointer-events-none"
                    )}
                  >
                    <h3 className="text-[18px] sm:text-[20px] md:text-[17px] lg:text-[19px] xl:text-[22px] font-semibold leading-[1.25] xl:leading-[148%] mb-2 sm:mb-2.5 lg:mb-3 xl:mb-6 text-white xl:max-w-[330px]">
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] md:text-[12px] lg:text-[13.5px] xl:text-[16px] font-normal leading-[140%] text-white/70 xl:max-w-[330px]">
                      {card.text}
                    </p>
                  </div>

                  {/* Hover content: slides up 90px from below and fades in, at the same time */}
                  {hasPoints && (
                    <div
                      className={twMerge(
                        "absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6 md:p-4.5 lg:p-6 xl:p-[34px] xl:pb-[44px] w-full text-white pointer-events-none opacity-0 translate-y-[90px] will-change-[opacity,transform,translate] motion-reduce:transition-none",
                        "transition-[opacity,transform,translate] duration-[400ms] ease-[cubic-bezier(0.33,1,0.68,1)]",
                        "group-hover:duration-500 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
                        "group-focus-within:duration-500 group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto",
                        isFlipped && "duration-500 opacity-100 translate-y-0 pointer-events-auto"
                      )}
                    >
                      <ul className="space-y-3 sm:space-y-4 md:space-y-2.5 lg:space-y-3.5 xl:max-w-[284px]">
                        {card.points!.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 sm:gap-3 lg:gap-3.5">
                            <span
                              className="mt-[5px] xl:mt-[7px] h-[6px] w-[6px] md:h-[5px] md:w-[5px] xl:h-[6px] xl:w-[6px] shrink-0 bg-[#23C55E]"
                              aria-hidden="true"
                            />
                            <span className="text-[13px] sm:text-[14px] md:text-[12px] lg:text-[13px] xl:text-[16px] font-medium leading-[130%] text-white">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
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
    <Section theme="dark" spacing="both" className="benefits-section bg-[#121826] py-12 sm:py-16 lg:py-20">
      <Container>
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-[26px] xs:text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[50px] font-medium leading-[1.1] tracking-[-0.8px] mb-8 sm:mb-12 lg:mb-16 text-white">
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
                  "card-hover p-6 sm:p-7 md:p-8 lg:p-9 xl:p-10 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] md:min-h-[210px] lg:min-h-[234px] bg-[#191F2D]",
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
                  <div className="inline-flex h-[46px] w-[46px] sm:h-[54px] sm:w-[54px] lg:h-[60px] lg:w-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 mb-4 sm:mb-5 lg:mb-6">
                    {benefit.icon && <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />}
                  </div>
                  <h3 className="text-[17px] sm:text-[19px] md:text-[20px] lg:text-[22px] font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-light leading-[150%] text-white/70">
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
    <section className="how-hire-section bg-[#121826] pb-14 sm:pb-18 md:pb-20 lg:pb-24 pt-4 sm:pt-6 text-white">
      <Container>
        <Reveal preset="slide-up" distance={20} className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-14 xl:mb-16">
          <h2 className="text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-medium leading-[1.05] tracking-[-0.8px] text-white">
            {howWeHire.title}
          </h2>
          <p className="text-[13.5px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/70 max-w-md text-left lg:text-right">
            {howWeHire.text}
          </p>
        </Reveal>

        <ProcessGrid steps={howWeHire.steps} />
      </Container>
    </section>
  );
}

export function FaqBlock({
  faq,
  variant = "light",
}: {
  faq: CareersContent["faq"];
  variant?: "light" | "dark";
}) {
  if (variant === "dark") {
    return (
      <Section theme="light" spacing="both" className="faq-section bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="rounded-[20px] sm:rounded-[24px] bg-[#121826] text-white p-6 sm:p-10 lg:p-14 xl:p-16">
            <Reveal preset="slide-up" distance={20}>
              <h2 className="text-center text-[26px] xs:text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[50px] font-medium leading-[1.15] tracking-[-0.8px] mb-8 sm:mb-10 lg:mb-12 text-white">
                {faq.title}
              </h2>
            </Reveal>
            <div className="mx-auto w-full max-w-[940px]">
              <Accordion items={faq.items} theme="dark" />
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section theme="cream" spacing="both" className="faq-section bg-[#F6F5F3] py-12 sm:py-16 lg:py-20">
      <Container size="narrow">
        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-[26px] xs:text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-6 sm:mb-8 md:mb-12 text-[#121826]">
            {faq.title}
          </h2>
        </Reveal>

        <Accordion items={faq.items} theme="light" />
      </Container>
    </Section>
  );
}