"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { ProcessGrid, type ProcessStepItem } from "@/components/ui/process-grid";

/* -------------------------------------------------------------------------- */
/*                                1. HERO                                     */
/* -------------------------------------------------------------------------- */

export interface FoundationHeroProps {
  subTitle: string;
  title: string;
  highlight: string;
  description: string;
  backgroundImage: string;
  ctaButton: {
    label: string;
    url: string;
  };
}

export function FoundationHero({
  subTitle,
  title,
  highlight,
  description,
  backgroundImage,
  ctaButton,
}: FoundationHeroProps) {
  return (
    <section className="relative min-h-auto sm:min-h-115 lg:min-h-131.25 overflow-hidden bg-brand-blue text-white flex flex-col justify-center">
      {/* Background Mesh Image */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none opacity-90"
        />
        {/* Subtle Radial Green Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 sm:w-200 h-90 bg-brand-green/12 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-25 lg:pt-30 pb-10 sm:pb-12 lg:pb-15">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <Reveal immediate preset="slide-up" delay={60} distance={20}>
            <Eyebrow variant="no-dash" className="mb-4 sm:mb-6 text-white/70 font-mono tracking-[1.5px] text-[12px] sm:text-[14px] uppercase">
              {subTitle}
            </Eyebrow>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-4xl">
            <h1 className="text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-[-0.8px] text-white mb-7.5">
              {title}{" "} <br></br>
              <span className="block sm:inline text-brand-green">
                {highlight}
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal immediate preset="slide-up" delay={300} distance={20} className="max-w-2xl sm:max-w-198.5">
            <p className="text-[14px] md:text-[16px] text-white/80 font-light tracking-0 leading-[1.68] mb-6 sm:mb-8.5">
              {description}
            </p>
          </Reveal>

          {/* CTA Button */}
          {ctaButton.label && (
            <Reveal immediate preset="slide-up" delay={420} distance={20} className="flex justify-center">
              <Button
                variant="white"
                text={ctaButton.label}
                href={ctaButton.url}
              />
            </Reveal>
          )}
        </Container>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                2. INTRO                                    */
/* -------------------------------------------------------------------------- */

export interface HighlightCardItem {
  title: string;
  image: string;
  icon: string;
}

export interface FoundationIntroProps {
  subTitle: string;
  title: string;
  highlight: string;
  description: string;
  ctaButton: {
    label: string;
    url: string;
  };
  cards: HighlightCardItem[];
}

export function FoundationIntro({
  subTitle,
  title,
  highlight,
  description,
  ctaButton,
  cards,
}: FoundationIntroProps) {
  return (
    <section className="bg-white text-brand-dark py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden">
      <Container>
        {/* Top Row: Heading and Description/CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 items-start mb-8 lg:mb-12.5">
          {/* Left Column: Eyebrow + Title */}
          <Reveal preset="slide-up" delay={60} distance={20} className="max-w-[620px]">
            <Eyebrow variant="black-dash" className="mb-4 sm:mb-6 text-brand-blue/70 font-mono tracking-[1.5px] text-[12px] sm:text-[14px] uppercase">
              {subTitle}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium leading-[1.18] tracking-tight text-brand-blue">
              {title}{" "}
              <span className="text-brand-green italic font-bold">
                {highlight}
              </span>
            </h2>
          </Reveal>

          {/* Right Column: Paragraph + CTA */}
          <Reveal preset="slide-up" delay={180} distance={20} className="max-w-[492px] lg:pt-2">
            <p className="text-[15px] sm:text-[16px] text-brand-blue/70 font-light leading-[160%] tracking-0 mb-6 sm:mb-10">
              {description}
            </p>
            {ctaButton.label && (
              <Button
                variant="dark"
                text={ctaButton.label}
                href={ctaButton.url}
              />
            )}
          </Reveal>
        </div>

        {/* Bottom Row: 4 Highlight Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-3.75" staggerDelay={80}>
          {cards.map((card, index) => (
            <StaggerItem key={index} index={index}>
              <div className="h-full rounded-[16px] bg-brand-sand/40 p-3 sm:p-3.75 flex flex-col transition-all duration-300 hover:shadow-lg group">
                {/* Card Image */}
                <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden mb-3.75 bg-white">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Pill */}
                <div className="rounded-[10px] bg-white p-3 sm:p-3.5 flex items-center gap-3.5 shadow-sm mt-auto">
                  <div className="w-15 h-15 rounded-full bg-[#FFFFFF00] border border-[#1219280D] flex items-center justify-center shrink-0">
                    {card.icon ? (
                      <Image
                        src={card.icon}
                        alt=""
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <span className="text-[16px] sm:text-[18px] font-semibold text-brand-blue leading-snug max-w-[118px]">
                    {card.title}
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              3. SERVICES                                   */
/* -------------------------------------------------------------------------- */

export interface ServiceCardItem {
  title: string;
  tagLine: string;
  points: string[];
  icon: string;
}

export interface FoundationServicesProps {
  subTitle: string;
  title: string;
  highlight: string;
  ctaButton: {
    label: string;
    url: string;
  };
  cards: ServiceCardItem[];
}

export function FoundationServices({
  subTitle,
  title,
  highlight,
  ctaButton,
  cards,
}: FoundationServicesProps) {
  return (
    <section className="bg-brand-blue text-white pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-0 overflow-hidden relative">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <Reveal preset="slide-up" delay={60} distance={20}>
            <Eyebrow variant="no-dash" className="mb-4 sm:mb-6 uppercase text-brand-green font-mono tracking-[1.5px] text-[12px] sm:text-[14px]">
              {subTitle}
            </Eyebrow>
          </Reveal>

          <Reveal preset="slide-up" delay={160} distance={24}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
              {title}{" "}
              <span className="italic font-bold">
                {highlight}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* 2x2 Services Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8 sm:mb-10" staggerDelay={90}>
          {cards.map((card, index) => (
            <StaggerItem key={index} index={index}>
              <div className="automate-deliver-card group relative isolate overflow-hidden h-full p-5 sm:p-8 lg:p-10 flex flex-col justify-between">
                {/* Ellipse 12 Glow */}
                <div
                  aria-hidden="true"
                  className="automate-card-glow"
                />

                <div className="relative z-10">
                  {/* Card Header: Title + Circular Icon Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="min-w-0 max-w-[70%]">
                      <h3 className="text-xl md:text-[30px] font-semibold text-white transition-colors">
                        {card.title}
                      </h3>
                      {/* Tagline */}
                      <p className="text-[14px] uppercase tracking-[6%] text-white/70 mt-2 leading-relaxed">
                        {card.tagLine}
                      </p>                      
                    </div>
                    <div className="w-15 h-15 rounded-full border border-white/14 flex items-center justify-center shrink-0 transition-all">
                      {card.icon ? (
                        <Image
                          src={card.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain brightness-0 invert opacity-90"
                        />
                      ) : (
                        <span className="text-white font-mono text-sm">#</span>
                      )}
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5">
                    {card.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-3 text-[14px] sm:text-[16px] text-white font-medium leading-relaxed tracking-0">
                        <span className="w-1.5 h-1.5 bg-brand-green mt-2 shrink-0 rounded-none" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Bottom CTA Button */}
        {ctaButton.label && (
          <div className="flex justify-center">
            <Reveal preset="slide-up" delay={200} distance={20}>
              <Button
                variant="white"
                text={ctaButton.label}
                href={ctaButton.url}
              />
            </Reveal>
          </div>
        )}

        {/* Section Divider Line (Figma Line 105: 1280px, 1px solid #FFFFFF 10%) */}
        <div className="w-full border-t border-white/10 mt-14 sm:mt-16 lg:mt-20" aria-hidden="true" />
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               4. PROCESS                                   */
/* -------------------------------------------------------------------------- */

export type { ProcessStepItem } from "@/components/ui/process-grid";

export interface FoundationProcessProps {
  title: string;
  highlight: string;
  steps: ProcessStepItem[];
}

export function FoundationProcess({
  title,
  highlight,
  steps,
}: FoundationProcessProps) {
  return (
    <section className="bg-brand-blue text-white py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden relative">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Reveal preset="slide-up" delay={60} distance={20}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.18]">
              {title}{" "}
              <span className="italic font-bold block sm:inline text-brand-green">
                {highlight}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Common Process Grid with variant="icon" */}
        <ProcessGrid
          variant="icon"
          steps={steps}
        />
      </Container>
    </section>
  );
}
