"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

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
    <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] overflow-hidden bg-[#07090F] text-white flex flex-col justify-center">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[360px] bg-brand-green/12 blur-[130px] rounded-full pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-[100px] sm:pt-[125px] lg:pt-[140px] pb-16 sm:pb-20 lg:pb-24">
        <Container className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <Reveal immediate preset="slide-up" delay={60} distance={20}>
            <Eyebrow variant="no-dash" className="mb-4 sm:mb-6 text-white/80 font-mono tracking-[0.2em] text-[12px] sm:text-[13px] uppercase">
              {subTitle}
            </Eyebrow>
          </Reveal>

          {/* Title */}
          <Reveal immediate preset="slide-up" delay={180} distance={24} className="max-w-4xl">
            <h1 className="text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-6">
              {title}{" "}
              <span className="block sm:inline text-brand-green">
                {highlight}
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal immediate preset="slide-up" delay={300} distance={20} className="max-w-2xl sm:max-w-3xl">
            <p className="text-[15px] sm:text-[17px] md:text-[18px] text-white/80 font-light leading-[1.68] mb-8 sm:mb-10">
              {description}
            </p>
          </Reveal>

          {/* CTA Button */}
          {ctaButton.label && (
            <Reveal immediate preset="slide-up" delay={420} distance={20}>
              <Link
                href={ctaButton.url}
                className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-[#0A0D14] text-[14px] sm:text-[15px] font-semibold hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/30 group"
              >
                <span>{ctaButton.label}</span>
                <span className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-[#0A0D14] stroke-[1.75]"
                  >
                    <path d="M3.5 1.5L7 5L3.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
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
    <section className="bg-white text-brand-dark py-16 sm:py-20 lg:py-28 overflow-hidden">
      <Container>
        {/* Top Row: Heading and Description/CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-12 lg:gap-16 items-start mb-12 sm:mb-16 lg:mb-20">
          {/* Left Column: Eyebrow + Title */}
          <Reveal preset="slide-up" delay={60} distance={20} className="max-w-[620px]">
            <Eyebrow variant="brand-dash" className="mb-4 sm:mb-6 uppercase text-slate-500 font-mono tracking-widest text-[12px] sm:text-[13px]">
              {subTitle}
            </Eyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-medium leading-[1.18] tracking-tight text-[#0A0D14]">
              {title}{" "}
              <span className="text-brand-green italic font-normal">
                {highlight}
              </span>
            </h2>
          </Reveal>

          {/* Right Column: Paragraph + CTA */}
          <Reveal preset="slide-up" delay={180} distance={20} className="max-w-xl lg:pt-2">
            <p className="text-[15px] sm:text-[16px] text-slate-600 font-light leading-[1.7] mb-6 sm:mb-8">
              {description}
            </p>
            {ctaButton.label && (
              <Link
                href={ctaButton.url}
                className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 rounded-full bg-[#0D1527] text-white text-[14px] sm:text-[15px] font-medium hover:bg-[#18233c] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group shadow-md"
              >
                <span>{ctaButton.label}</span>
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-white stroke-[1.75]"
                  >
                    <path d="M3.5 1.5L7 5L3.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            )}
          </Reveal>
        </div>

        {/* Bottom Row: 4 Highlight Cards Grid */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6" staggerDelay={80}>
          {cards.map((card, index) => (
            <StaggerItem key={index} index={index}>
              <div className="h-full rounded-[22px] bg-[#F4F5F7] p-3 sm:p-3.5 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                {/* Card Image */}
                <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden mb-3 bg-slate-200">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info Pill */}
                <div className="rounded-[14px] bg-white p-3 sm:p-3.5 flex items-center gap-3.5 shadow-sm mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#F4F5F7] flex items-center justify-center shrink-0">
                    {card.icon ? (
                      <Image
                        src={card.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <span className="text-[14px] sm:text-[15px] font-semibold text-[#0A0D14] leading-snug">
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
    <section className="bg-[#090E1A] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 overflow-hidden relative">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Reveal preset="slide-up" delay={60} distance={20}>
            <Eyebrow variant="white-dash" className="mb-3 uppercase text-brand-green font-mono tracking-[0.2em] text-[12px] sm:text-[13px]">
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
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16" staggerDelay={90}>
          {cards.map((card, index) => (
            <StaggerItem key={index} index={index}>
              <div className="h-full rounded-[24px] bg-[#101726]/80 border border-white/10 p-7 sm:p-9 lg:p-10 flex flex-col justify-between hover:border-brand-green/30 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
                <div>
                  {/* Card Header: Title + Circular Icon Badge */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-green transition-colors">
                      {card.title}
                    </h3>
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-white/25 transition-all">
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

                  {/* Tagline */}
                  <p className="text-[11px] sm:text-[12px] font-mono uppercase tracking-[0.12em] text-slate-400 mb-6 leading-relaxed">
                    {card.tagLine}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-3.5">
                    {card.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-3 text-[14px] sm:text-[15px] text-slate-300 font-light leading-relaxed">
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
              <Link
                href={ctaButton.url}
                className="inline-flex items-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-white text-[#0A0D14] text-[14px] sm:text-[15px] font-semibold hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/30 group"
              >
                <span>{ctaButton.label}</span>
                <span className="w-6 h-6 rounded-full border border-black/20 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-[#0A0D14] stroke-[1.75]"
                  >
                    <path d="M3.5 1.5L7 5L3.5 8.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               4. PROCESS                                   */
/* -------------------------------------------------------------------------- */

function getStepIcon(index: number) {
  switch (index % 5) {
    case 0: // Discover: Search / Magnifier
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 1: // Design: Document / List
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 2: // Implement: Settings / Cog
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 3: // Stabilize: Dashboard / Sliders / Layout
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="9" y1="12" x2="21" y2="12" />
        </svg>
      );
    case 4: // Hand off: Thumbs Up
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      );
  }
}

export interface ProcessStepItem {
  title: string;
  description: string;
}

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
    <section className="bg-[#090E1A] text-white pt-10 sm:pt-16 pb-20 sm:pb-28 lg:pb-32 overflow-hidden relative">
      <Container>
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Reveal preset="slide-up" delay={60} distance={20}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.18]">
              {title}{" "}
              <span className="italic font-bold block sm:inline">
                {highlight}
              </span>
            </h2>
          </Reveal>
        </div>

        {/* 5 Process Steps Container */}
        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-white/10 rounded-[24px] bg-[#0E1525]/70 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden shadow-2xl shadow-black/30"
          staggerDelay={80}
        >
          {steps.map((step, index) => (
            <StaggerItem key={index} index={index} className="h-full">
              <div className="p-6 sm:p-7 lg:p-8 flex flex-col justify-start h-full hover:bg-white/[0.03] transition-colors group">
                {/* Top Accent Row: Green Vertical Bar + Circle Icon */}
                <div className="flex items-center gap-3.5 mb-6">
                  <span className="w-[3px] h-6 bg-brand-green rounded-full shrink-0" aria-hidden="true" />
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-brand-green/40 transition-all">
                    {getStepIcon(index)}
                  </div>
                </div>

                {/* Step Title */}
                <h3 className="text-[18px] sm:text-[20px] font-bold text-white mb-2 tracking-tight group-hover:text-brand-green transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[13px] sm:text-[14px] text-slate-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
