import type { ReactNode } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import Section from "@/components/ui/section";
import Container from "../ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type { PeopleOperationsContent } from "@/content/people-operations";

export function PeopleOperationsBanner({ hero, header }: { hero: PeopleOperationsContent["hero"]; header: ReactNode }) {
  // 1. Hero Section
  return (
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:h-[525px] overflow-hidden bg-[#121826] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
      />

      <div className="relative flex flex-col h-full">
        {header}

        <div className="flex-1 flex items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-0 pb-10 sm:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
            <Reveal immediate preset="slide-up" delay={80} distance={24}>
              <Eyebrow variant="dark" className="mb-4 sm:mb-6">
                {hero.eyebrow}
              </Eyebrow>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6">
                {hero.title}
                <span className="text-[#23C55E]">{hero.highlight}</span>
              </h1>
            </Reveal>
            <Reveal immediate preset="slide-up" delay={260} distance={24} className="max-w-md lg:justify-self-end">
              <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] lg:leading-[160%] text-white/80 mb-6 sm:mb-8">
                {hero.text}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PeopleOperationsIntro({ intro }: { intro: PeopleOperationsContent["intro"] }) {
  // 2. Intro Section
  return (
    <Section theme="light" spacing="both">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 xl:gap-20">
          <Reveal preset="slide-left" distance={20} className="group card-hover w-full max-w-[460px] mx-auto lg:max-w-none lg:w-[554px] shrink-0 relative aspect-[554/643] rounded-[14px] sm:rounded-[16px] overflow-hidden">
            <Image
              src={intro.image}
              alt="FIAB People Operations"
              fill
              className="object-cover image-hover-zoom"
              sizes="(max-width: 1024px) 100vw, 554px"
            />
          </Reveal>
          <Reveal preset="slide-right" distance={20} className="w-full lg:flex-1">
            <h2 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-medium leading-[1.25] lg:leading-[1.3] tracking-[-0.8px] mb-4 sm:mb-6">
              {(() => {
                let title = intro.title;
                const hl = intro.highlight;
                if (title && hl && title.endsWith(hl)) {
                  title = title.slice(0, -hl.length).trim();
                }
                return (
                  <>
                    {title}{" "}
                    {hl && (
                      <span className="font-bold italic text-[#23C55E]">
                        {hl}
                      </span>
                    )}
                  </>
                );
              })()}
            </h2>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-[#16181d]/70">
              {intro.text}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

export function PeopleOperationsWhatWeDo({ whatWeDo }: { whatWeDo: PeopleOperationsContent["whatWeDo"] }) {
  // 3. What We Do Section
  return (
    <Section theme="dark" spacing="both">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-12 lg:mb-16">
            {whatWeDo.title}
          </h2>
        </Reveal>

        <div className="flex flex-col gap-6 sm:gap-8">
          {whatWeDo.items.map((card, idx) => (
            <Reveal
              key={idx}
              preset="slide-up"
              distance={24}
              delay={idx * 60}
              className={`group card-hover relative bg-[#191F2D] rounded-[16px] overflow-hidden flex flex-col lg:min-h-[592px] ${card.reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
            >
              {/* Background Gradient Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={card.bgImage}
                  alt="Background Gradient"
                  fill
                  className="object-cover opacity-100"
                />
              </div>

              {/* Content Container */}
              <div className="relative min-w-0 w-full lg:w-1/2 p-6 sm:p-8 md:p-10 xl:p-16 flex flex-col justify-center">
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
                      <span className="min-w-0 text-[14px] sm:text-[15px] lg:text-[16px] font-medium leading-[1.35] lg:leading-[1.2] text-white/90">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Container: on top when stacked, beside the text from lg up */}
              <div className="relative order-first lg:order-none w-full lg:w-1/2 aspect-[640/480] sm:aspect-[640/420] lg:aspect-auto min-h-[240px] sm:min-h-[300px] lg:min-h-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover image-hover-zoom"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </Section>
  );
}

export function PeopleOperationsWhereWeHelp({ whereWeHelp }: { whereWeHelp: PeopleOperationsContent["whereWeHelp"] }) {
  // 4. Where we help Section
  return (
    <Section theme="light" spacing="top">
      <Container>

        <Reveal preset="slide-up" distance={20}>
          <h2 className="text-center text-3xl sm:text-4xl lg:text-[50px] font-medium tracking-[-0.8px] leading-[1.15] lg:leading-[1.05] mb-8 sm:mb-10 lg:mb-12.5">
            {(() => {
              let title = whereWeHelp.title;
              const hl = whereWeHelp.highlight;
              if (title && hl && title.endsWith(hl)) {
                title = title.slice(0, -hl.length).trim();
              }
              return (
                <>
                  {title}{" "}
                  {hl && <span className="font-extrabold italic">{hl}</span>}
                </>
              );
            })()}
          </h2>
        </Reveal>

        <StaggerGroup staggerDelay={150} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {whereWeHelp.cards.map((card, idx) => (
            <StaggerItem
              key={idx}
              index={idx}
              className="card-hover bg-[#EDE9E6] rounded-[10px] py-6 px-5 sm:py-8 sm:px-6 lg:py-10 lg:px-7 min-h-[120px] sm:min-h-[135px] lg:min-h-[145px] flex flex-col justify-center border border-[#FFFFFF24]"
            >
              <h3 className="text-[22px] sm:text-[26px] lg:text-[30px] font-semibold leading-[1.2] lg:leading-[1.1] mb-1.5 sm:mb-2">
                {card.title}
              </h3>
              <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[150%] text-[#121826]/70">
                {card.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </Container>
    </Section>
  );
}