"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { GreenButton } from "@/components/ui/green-button";
import { Accordion } from "../ui/accordion";
import { PartnersSection } from "@/components/ui/partners-section";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { AgenticAiContent } from "@/content/agentic-ai";

// Needs a parent with `group relative isolate overflow-hidden`. Same motion as the button circle.
function CardFill({ className = "bg-[#23C55E]/[0.13]" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 left-0 -z-10 aspect-square w-full rounded-full [transform:translate(-50%,50%)_scale(0)] transition-transform duration-[900ms] ease-in-out group-hover:[transform:translate(-50%,50%)_scale(3.5)] motion-reduce:transition-none ${className}`}
    />
  );
}

const ICON_CHIP =
  "flex h-[60px] w-[60px] items-center justify-center rounded-full transition-[background-color,transform] duration-500 group-hover:bg-[#23C55E] motion-reduce:transition-none";
const ICON_IMG =
  "relative w-6 h-6 transition-[filter] duration-500 group-hover:brightness-0 group-hover:invert";

// Needs a parent with `group relative isolate overflow-hidden`
function RiseGlow() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 translate-y-[20%] bg-[linear-gradient(to_top,rgba(35,197,94,0.26),transparent_65%)] opacity-0 transition-[opacity,transform] duration-[600ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
    />
  );
}

const ICON_CHIP_LIFT =
  "flex h-[60px] w-[60px] items-center justify-center rounded-full transition-[background-color,transform] duration-500 group-hover:bg-[#23C55E] motion-reduce:transition-none";

export function AgenticBanner({ hero, header }: { hero: AgenticAiContent["hero"]; header: ReactNode }) {
  // Hero Section (Header + Hero = 525px)
  return (
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:min-h-[525px] overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/clients/client-hero-bg.svg)" }}
      />

      <div className="relative z-10 flex flex-col justify-center h-full">
        {header}

        <Container>
          <div className="flex-1 flex items-center pb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

              <Reveal immediate preset="slide-up" delay={80} distance={24}>
                <Eyebrow variant="dark" className="mb-6">
                  {hero.eyebrow}
                </Eyebrow>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-6 lg:max-w-[400px]">
                  {hero.title}
                  <span className="text-[#23C55E]">{hero.highlight}</span>
                </h1>
                <p className="text-[16px] font-light leading-[160%] text-white/80 max-w-md">
                  {hero.text}
                </p>
              </Reveal>

              <div className="max-w-md lg:justify-self-end">
                <StaggerGroup immediate staggerDelay={120} className="space-y-6 mb-10">
                  {hero.bullets.map((bullet, idx) => (
                    <StaggerItem key={idx} index={idx} className="flex items-start gap-4">
                      <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                      <span className="text-[16px] font-light leading-[160%] text-white/80">{bullet}</span>
                    </StaggerItem>
                  ))}
                </StaggerGroup>

                <Reveal immediate preset="slide-up" delay={480} distance={20}>
                  <GreenButton
                    label={hero.cta.label}
                    href={hero.cta.url}
                    bgColor="#ffffff"
                  />
                </Reveal>
              </div>

            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function AgenticAbout({ whatIs }: { whatIs: AgenticAiContent["whatIs"] }) {
  // 2. What is Agentic AI Section
  return (
    <Section theme="light" spacing="both">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
            <div className="max-w-xl">
              <Eyebrow variant="light" className="mb-6">
                {whatIs.eyebrow}
              </Eyebrow>
              <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-6">
                {(() => {
                  let title = whatIs.title;
                  const hl = whatIs.highlight;
                  if (title && hl && title.endsWith(hl)) {
                    title = title.slice(0, -hl.length).trim();
                  }
                  return (
                    <>
                      {title}{" "}
                      {hl && <span className="font-bold italic">{hl}</span>}
                    </>
                  );
                })()}
              </h2>
              <p className="text-[16px] font-light leading-[160%] text-[#0B0D0C]">
                {whatIs.text1}
              </p>
            </div>
            <div className="max-w-[492px] lg:pt-12">
              <p className="text-[16px] font-light leading-[160%] text-[#16181d]/70">
                {whatIs.text2}
              </p>
            </div>
          </div>
        </Reveal>

        <StaggerGroup staggerDelay={140} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {whatIs.features.map((feature, idx) => (
            <StaggerItem key={idx} index={idx} className="group flex flex-col">
              <div>
                <div className="relative w-full xl:h-[420px] h-[350px] overflow-hidden mb-6">
                  <Image src={feature.image} alt={feature.title} fill className="object-cover image-hover-zoom" />
                </div>
                <h3 className="text-[18px] font-semibold leading-[1.2] mb-2">{feature.title}</h3>
                <p className="text-[16px] font-normal leading-[140%] text-[#121826]/80">{feature.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </Container>
    </Section>
  );
}

export function AgenticBuildYourOwn({
  buildYourOwn,
}: {
  buildYourOwn: AgenticAiContent["buildYourOwn"];
}) {
  return (
    <section className="build-agentic-ai-section bg-white text-[#121826] pb-24">
      <Container>
        <div className="rounded-[10px] bg-[#EDE9E6]/50 px-6 py-10 text-center md:p-7.5 xl:p-20">

          <Reveal preset="slide-up" distance={20}>
            <h2 className="mb-4 text-3xl font-medium leading-[1.15] tracking-[-0.8px] text-[#121826] sm:text-4xl lg:text-[54px]">
              {(() => {
                let title = buildYourOwn.title;
                const hl = buildYourOwn.highlight;

                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }

                return (
                  <>
                    {title}{" "}
                    {hl && (
                      <span className="font-black italic text-[#23C55E]">
                        {hl}
                      </span>
                    )}
                  </>
                );
              })()}
            </h2>

            <p className="mx-auto mb-10 text-[16px] font-light leading-[160%] text-[#16181d]/70 lg:max-w-[706px]">
              {buildYourOwn.text}
            </p>
          </Reveal>

          <StaggerGroup
            staggerDelay={140}
            className="grid grid-cols-1 overflow-hidden rounded-[10px] text-left divide-y divide-[#121826]/[0.08] md:grid-cols-2 md:divide-y-0 md:divide-x lg:grid-cols-4"
          >
            {buildYourOwn.agents.map((agent, idx) => (
              <StaggerItem
                key={idx}
                index={idx}
                className="group relative isolate flex min-h-[255px] flex-col overflow-hidden bg-white p-8 transition-colors duration-500 ease-in-out hover:bg-[#121826]"
              >
                {/* Default Card Content */}
                <div className="flex h-full flex-col transition-all duration-300 ease-in-out group-hover:translate-y-[-5px] group-hover:opacity-0">
                  <div
                    className={`${ICON_CHIP} mb-6 border border-[#1219280D] bg-white`}
                  >
                    <div className={ICON_IMG}>
                      <Image
                        src={agent.icon}
                        alt={agent.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <h3 className="mb-3 text-[18px] font-semibold leading-[1.2] text-[#121826]">
                    {agent.title}
                  </h3>

                  <p className="text-[14px] font-normal leading-[160%] text-[#121826]/70">
                    {agent.text}
                  </p>
                </div>

                {/* Hover Content */}
                {agent.greatFor && (
                  <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-start bg-[#121826] p-8 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    <h4 className="mb-4 translate-y-2 text-[16px] font-semibold leading-[1.2] text-white transition-transform duration-500 ease-in-out group-hover:translate-y-0">
                      Great for:
                    </h4>

                    <p className="translate-y-2 text-[14px] font-medium leading-[160%] text-white/90 transition-transform delay-75 duration-500 ease-in-out group-hover:translate-y-0">
                      {agent.greatFor}
                    </p>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerGroup>

        </div>
      </Container>
    </section>
  );
}

export function AgenticPeopleOps({ peopleOps }: { peopleOps: AgenticAiContent["peopleOps"] }) {
  // 4. People Ops, Payroll & IT Section
  return (
    <Section theme="dark" spacing="both" className="people-ops-section">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] lg:mb-12.5 mb-10">
            {peopleOps.title}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={120} className="grid grid-cols-1 md:grid-cols-3 bg-[#191f2c] rounded-[10px] border border-white/5 overflow-hidden">
          {peopleOps.agents.map((agent, idx) => {
            const total = peopleOps.agents.length;
            const totalRows = Math.ceil(total / 3);
            const currentRow = Math.floor(idx / 3);
            const isLastRow = currentRow === totalRows - 1;
            const isLastCol = (idx + 1) % 3 === 0;
            const isLastItem = idx === total - 1;

            const borderBottomClass = !isLastRow
              ? "border-b"
              : !isLastItem
                ? "border-b md:border-b-0"
                : "border-b-0";

            const borderRightClass = !isLastCol
              ? "border-r-0 md:border-r"
              : "border-r-0";

            return (
              <StaggerItem
                key={idx}
                index={idx}
                className={`group relative isolate overflow-hidden p-10 flex flex-col min-h-[286px] border-white/5 ${borderRightClass} ${borderBottomClass}`}
              >
                <div className="flex flex-col h-full transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:pointer-events-none">
                  <div className={`${ICON_CHIP_LIFT} border border-white/10 mb-8.5`}>
                    <div className={ICON_IMG}>
                      <Image src={agent.icon} alt={agent.title} fill className="object-contain" />
                    </div>
                  </div>
                  <h3 className="text-[22px] font-semibold leading-[1.2] mb-3 text-white">{agent.title}</h3>
                  <p className="text-[16px] font-normal leading-[150%] text-white/70">{agent.text}</p>
                </div>

                {agent.greatFor && (
                  <div className="absolute inset-0 z-10 p-10 flex flex-col justify-start bg-white text-[#121826] rounded-[10px] shadow-2xl opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto">
                    <h4 className="text-[18px] sm:text-[20px] font-bold leading-[1.2] mb-4 text-[#121826]">
                      Great for:
                    </h4>
                    <p className="text-[15px] font-normal leading-[160%] text-[#121826]/80">
                      {agent.greatFor}
                    </p>
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

export function AgenticOpsCompliance({ opsCompliance }: { opsCompliance: AgenticAiContent["opsCompliance"] }) {
  // 5. Ops & Compliance Section
  return (
    <Section theme="light" spacing="top">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] lg:mb-16 mb-8">
            {opsCompliance.title}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {opsCompliance.cards.map((card, idx) => (
            <StaggerItem key={idx} index={idx} >
              <div className="group card-hover relative rounded-[10px] overflow-hidden lg:min-h-[633px] md:min-h-[450px] min-h-[350px] flex items-end">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover image-hover-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/90 via-[#121826]/20 to-transparent" />

                <div className="relative isolate p-8 w-full text-white">
                  {/* Gradient panel behind the text: fades in and slides up on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 -top-12 -z-10 translate-y-4 bg-[linear-gradient(to_top,rgba(18,24,38,0.96)_0%,rgba(18,24,38,0.82)_55%,rgba(18,24,38,0)_100%)] opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
                  />
                  <h3 className="text-[24px] font-semibold leading-[1.2] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-[16px] font-normal leading-[150%] text-white/80 transition-colors duration-500 group-hover:text-white/90">
                    {card.text}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </Container>
    </Section>
  );
}

export function AgenticPartners({ partners }: { partners: AgenticAiContent["partners"] }) {
  // 6. Official Partner Stack
  return (
    <PartnersSection
      title={partners.title}
      logos={partners.logos}
      variant="bordered"
    />
  );
}

export function AgenticProvenArchitecture({ provenArchitecture }: { provenArchitecture: AgenticAiContent["provenArchitecture"] }) {
  // 7. Proven Architecture
  return (
    <Section theme="light" spacing="bottom" className="proven-architecture">
      <Container>

        <Reveal preset="slide-up" distance={20} className="text-center md:mb-16 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px]">
            {provenArchitecture.title}
          </h2>
          <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-black leading-[1.15] tracking-[-0.8px] text-[#23C55E] italic">
            {provenArchitecture.highlight}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {provenArchitecture.cards.map((card, idx) => (
            <StaggerItem
              key={idx}
              index={idx}
              className="group relative overflow-hidden bg-[#EDE9E680] rounded-[10px] p-6 flex flex-col"
            >
              <div className="relative w-full h-[320px] rounded-[10px] overflow-hidden mb-6">
                <Image src={card.image} alt={card.title} fill className="object-cover image-hover-zoom" />
              </div>

              <div className="mb-6">
                <h3 className="text-[24px] font-semibold leading-[1.0] mb-2">{card.title}</h3>
                {card.text && <p className="text-[16px] font-normal leading-[150%] text-[#121826]">{card.text}</p>}
              </div>

              <ul className="space-y-3">
                {card.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                    <span className="text-[16px] leading-[1.2] text-[#121826]">
                      <span className="font-medium">{bullet.boldText}</span>
                      <span className="font-light">{bullet.normalText}</span>
                    </span>
                  </li>
                ))}
              </ul>

              {/* Bottom line: grows left to right on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[4px] w-full origin-left scale-x-0 bg-[#23C55E] transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

      </Container>
    </Section>
  );
}

export function AgenticWaitlist({ waitlist, form }: { waitlist: AgenticAiContent["waitlist"]; form: ReactNode }) {
  return (
    <Section theme="dark" spacing="both" className="waitlist-section">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <Reveal preset="slide-left" distance={20} className="max-w-md lg:pt-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[54px] font-medium leading-[1.15] tracking-[-0.8px] mb-6">
              {(() => {
                let title = waitlist.title;
                const hl = waitlist.highlight;
                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }
                return (
                  <>
                    {title}{" "}
                    {hl && <span className="font-black italic">{hl}</span>}
                  </>
                );
              })()}
            </h2>
            <p className="text-[16px] font-light leading-[160%] text-white/70">
              {waitlist.text}
            </p>
          </Reveal>

          <Reveal preset="slide-right" distance={20} className="w-full bg-[#191F2D] rounded-[16px] p-8 md:p-10 border border-white/5">
            {form}
          </Reveal>

        </div>
      </Container>
    </Section>
  );
}

export function AgenticFaq({ faq }: { faq: AgenticAiContent["faq"] }) {
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