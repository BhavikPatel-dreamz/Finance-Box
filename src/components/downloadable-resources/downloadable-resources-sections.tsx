"use client";

import React from "react";
import Image from "next/image";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import type {
  DownloadableResource,
  DownloadableResourcesContent,
} from "@/content/downloadable-resources";

/** Hero banner matching other hero sections in the project */
export function DownloadableResourcesHero({
  title,
  backgroundImage = "/knowledge-hub/knowledge-hub-hero-bg.webp",
}: {
  title: string;
  backgroundImage?: string;
}) {
  return (
    <section className="hero-section relative overflow-hidden bg-brand-blue text-white flex flex-col">
      {/* Background Image matching other pages */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom pointer-events-none select-none opacity-85"
        />
        {/* Subtle gradient overlay to match other hero sections */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#121826]/75 via-[#121826]/40 to-[#121826]/85 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* Content Flow matching site header offset and other hero sections */}
      <div className="relative z-10 flex flex-col justify-center w-full min-h-[auto] sm:min-h-[360px] lg:min-h-[400px] pt-[81px] sm:pt-[97px] lg:pt-[112px] pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <Reveal immediate preset="slide-up" delay={80} distance={20}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-white leading-[1.12]">
                {title}
              </h1>
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

/** Individual resource card: clean, minimal, matching live site with project theme */
export function DownloadableResourceCard({
  item,
}: {
  item: DownloadableResource;
}) {
  return (
    <a
      href={item.downloadUrl}
      download={item.fileName}
      className="group relative flex flex-col justify-between h-full bg-white border border-[#C1C1C1]/60 rounded-[20px] p-6 sm:p-7 transition-all duration-300 hover:border-brand-green hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
      aria-label={`Download ${item.title} (${item.badge})`}
    >
      <div>
        {/* Top: Format badge & subtle download indicator */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-brand-green text-white text-xs font-mono font-medium tracking-wider">
            {item.badge}
          </span>
          <span className="text-brand-blue/30 group-hover:text-brand-green transition-colors duration-200">
            <svg
              className="w-5 h-5 transition-transform duration-200 group-hover:translate-y-0.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10 3v9m0 0l-3-3M10 12l3-3M4 15v1a1 1 0 001 1h10a1 1 0 001-1v-1"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-[22px] font-semibold text-brand-blue leading-snug group-hover:text-brand-green transition-colors duration-200">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[15px] sm:text-[16px] font-light leading-[150%] text-brand-blue/70">
          {item.description}
        </p>
      </div>
    </a>
  );
}

/** Main content grid with section title and cards */
export function DownloadableResourcesGrid({
  title,
  resources,
}: {
  title: string;
  resources: DownloadableResource[];
}) {
  return (
    <Section theme="light" spacing="both" className="bg-white">
      <Container>
        {/* Section Heading like live site */}
        <Reveal preset="slide-up" distance={20} className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-medium tracking-tight text-brand-blue">
            {title}
          </h2>
        </Reveal>

        {/* 6 Cards Grid */}
        <StaggerGroup
          staggerDelay={100}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {resources.map((item, idx) => (
            <StaggerItem key={item.id} index={idx} className="h-full">
              <DownloadableResourceCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}

/** Full page view assembling banner and resources grid */
export function DownloadableResourcesPageContent({
  content,
}: {
  content: DownloadableResourcesContent;
}) {
  return (
    <>
      <DownloadableResourcesHero
        title={content.bannerTitle}
        backgroundImage={content.backgroundImage}
      />
      <DownloadableResourcesGrid
        title={content.sectionTitle}
        resources={content.resources}
      />
    </>
  );
}
