"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { CmsForm } from "@/components/forms/cms-form";
import type { FormDefinition } from "@/lib/forms/types";
import type { TeamPageContent, TeamLeader, TeamExpert } from "@/content/team";

/* -------------------------------------------------------------------------- */
/*                                1. HERO                                     */
/* -------------------------------------------------------------------------- */

export function TeamHero({ hero }: { hero: TeamPageContent["hero"] }) {
  return (
    <section className="hero-section relative min-h-[auto] sm:min-h-[460px] lg:min-h-[520px] xl:min-h-[560px] overflow-hidden bg-brand-blue text-white flex flex-col">
      {/* Background Image: team-members-hero-bg.webp */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={hero.backgroundImage || "/team-members-hero-bg.webp"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom pointer-events-none select-none"
        />
      </div>

      <div className="relative z-1 flex-1 flex flex-col justify-center pt-[90px] sm:pt-[110px] lg:pt-[130px] pb-12 sm:pb-16 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 sm:gap-10 lg:gap-12 items-center w-full">
            {/* Left Column */}
            <Reveal immediate preset="slide-up" delay={80} distance={24} className="w-full max-w-[620px]">
              <Eyebrow variant="white-dash" className="mb-4 sm:mb-5 lg:mb-6 text-white/70">
                {hero.eyebrow}
              </Eyebrow>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
                {hero.title}{" "}
                <span className="block whitespace-pre-line text-brand-green">
                  {hero.highlight}
                </span>
              </h1>
            </Reveal>

            {/* Right Column */}
            <Reveal
              immediate
              preset="slide-up"
              delay={260}
              distance={24}
              className="max-w-md lg:justify-self-end space-y-4"
            >
              {hero.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/80"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            2. MEET OUR LEADERS                             */
/* -------------------------------------------------------------------------- */

export function TeamLeaders({ leaders }: { leaders: TeamPageContent["leaders"] }) {
  return (
    <section className="bg-white text-brand-blue py-10 sm:py-14 lg:py-20 overflow-hidden">
      <Container>
        <div className="flex flex-col xl:flex-row items-start justify-between gap-8 sm:gap-10 xl:gap-16">
          {/* Left Column: Heading and Subtitle */}
          <Reveal preset="slide-up" distance={20} className="w-full xl:w-auto xl:max-w-[400px] shrink-0">
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-medium leading-[1.15] sm:leading-[1.12] tracking-[-0.8px] text-brand-blue whitespace-normal">
              {leaders.title}{" "}
              <span className="font-bold italic text-brand-blue">{leaders.highlight}</span>
            </h2>
            <p className="text-[13px] sm:text-[15px] font-light leading-relaxed text-[#121826]/60 mt-2 sm:mt-3 lg:mt-4">
              {leaders.subtitle}
            </p>
          </Reveal>

          {/* Right Column: Two Leader Cards Side by Side */}
          <div className="w-full flex-1 max-w-[760px]">
            <StaggerGroup
              staggerDelay={150}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-6.5"
            >
              {leaders.people.map((leader, index) => (
                <StaggerItem key={leader.name} index={index}>
                  <div className="group flex flex-col w-full">
                    {/* Portrait Card Container */}
                    <div className="relative w-full aspect-[360/444] rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#050D1F] border border-white/10 select-none shadow-sm">
                      {/* Background vector / gradient pattern */}
                      <div
                        className="absolute inset-0 bg-[url('/team/leaders-bg.svg')] bg-cover bg-center pointer-events-none"
                        aria-hidden="true"
                      />

                      {/* Leader Portrait Image */}
                      {leader.slug ? (
                        <Link
                          href={`/team-members/${leader.slug}`}
                          className="absolute inset-0 z-10 flex items-end justify-center overflow-hidden cursor-pointer"
                          aria-label={`View ${leader.name}'s profile`}
                        >
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            className="object-contain object-bottom origin-bottom image-hover-zoom pointer-events-none scale-[1.04]"
                            priority={index === 0}
                          />
                        </Link>
                      ) : (
                        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                          <Image
                            src={leader.image}
                            alt={leader.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                            className="object-contain object-bottom origin-bottom image-hover-zoom pointer-events-none scale-[1.04]"
                            priority={index === 0}
                          />
                        </div>
                      )}

                      {/* Top-Right Social Icon Buttons (Vertical Stack) */}
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 flex flex-col items-center gap-2 sm:gap-2.5">
                        <a
                          href={leader.linkedin || "https://www.linkedin.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${leader.name} on LinkedIn`}
                          className="flex h-8 w-8 sm:h-10.5 sm:w-10.5 items-center justify-center rounded-full bg-black/45 border border-white/20 backdrop-blur-md text-white transition-all duration-300 hover:bg-brand-green hover:border-brand-green hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        >
                          <Image
                            src="/icons/linkedin-icon.svg"
                            alt=""
                            width={14}
                            height={14}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                            aria-hidden="true"
                          />
                        </a>
                        <a
                          href={leader.twitter || "https://x.com/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${leader.name} on X (Twitter)`}
                          className="flex h-8 w-8 sm:h-10.5 sm:w-10.5 items-center justify-center rounded-full bg-black/45 border border-white/20 backdrop-blur-md text-white transition-all duration-300 hover:bg-brand-green hover:border-brand-green hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        >
                          <Image
                            src="/icons/twiter-icon.svg"
                            alt=""
                            width={14}
                            height={14}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>

                    {/* Name and Role Below Card */}
                    <div className="mt-4 sm:mt-5 text-left">
                      <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-brand-blue leading-tight tracking-tight">
                        {leader.slug ? (
                          <Link
                            href={`/team-members/${leader.slug}`}
                            className="hover:text-brand-green transition-colors duration-300"
                          >
                            {leader.name}
                          </Link>
                        ) : (
                          leader.name
                        )}
                      </h3>
                      <p className="mt-1.5 font-mono text-[11px] sm:text-[12px] uppercase tracking-[1.5px] text-[#121826]/60">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                            3. MEET OUR EXPERTS                             */
/* -------------------------------------------------------------------------- */

export function TeamExperts({ experts }: { experts: TeamPageContent["experts"] }) {
  return (
    <section className="bg-brand-blue text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      <Container>
        {/* Centered Heading and Intro */}
        <Reveal preset="slide-up" distance={20} className="text-center max-w-[850px] mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-medium leading-[1.12] tracking-[-0.8px] text-white">
            {experts.title}{" "}
            <span className="text-brand-green font-extrabold italic">{experts.highlight}</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] font-light text-white/60 mt-2 sm:mt-3">
            {experts.subtitle}
          </p>
          <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/70 mt-4 sm:mt-6 max-w-[850px] mx-auto">
            {experts.description}
          </p>
        </Reveal>

        {/* 5-Column Grid of Experts */}
        <div className="mt-12.5">
          <StaggerGroup
            staggerDelay={130}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5"
          >
            {experts.people.map((expert, index) => {
              const cardContent = (
                <div className="group card-hover flex flex-col h-full cursor-pointer">
                  {/* Portrait Card */}
                  <div className="relative w-full aspect-[240/340] rounded-[16px] sm:rounded-[18px] overflow-hidden select-none">
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                      className="object-cover object-center image-hover-zoom pointer-events-none"
                    />
                  </div>

                  {/* Name and Role Below Card */}
                  <div className="mt-3.5 sm:mt-4">
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-white leading-snug group-hover:text-brand-green transition-colors duration-300">
                      {expert.name}
                    </h3>
                    <p className="mt-2 font-mono text-[12px] sm:text-[14px] text-white/70 leading-snug whitespace-pre-line">
                      {expert.role}
                    </p>
                  </div>
                </div>
              );

              return (
                <StaggerItem key={expert.name} index={index}>
                  {expert.slug ? (
                    <Link
                      href={`/team-members/${expert.slug}`}
                      className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded-[18px]"
                      aria-label={`View ${expert.name}'s profile`}
                    >
                      {cardContent}
                    </Link>
                  ) : (
                    cardContent
                  )}
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                4. BANNER                                   */
/* -------------------------------------------------------------------------- */

export function TeamBanner({ banner }: { banner: TeamPageContent["banner"] }) {
  return (
    <section className="bg-white py-10 sm:py-14 lg:py-20 text-white overflow-hidden">
      <Container>
        <div className="relative rounded-[16px] bg-brand-blue overflow-hidden px-5 sm:px-8 md:px-12 lg:px-14">
          {/* Background Vector Texture: backed-by-experts-bg.svg */}
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
            style={{ backgroundImage: "url(/backed-by-experts-bg.svg)" }}
            aria-hidden="true"
          />

          <div className="relative z-1 grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center lg:items-end gap-6 sm:gap-8 lg:gap-14 xl:gap-20">
            {/* Left: 3D Rocket Illustration (backed-by-experts.png) */}
            <Reveal preset="slide-left" distance={24} className="flex justify-center shrink-0 pt-8 lg:pt-0">
              <div className="relative w-[220px] sm:w-[280px] md:w-[320px] lg:w-[382px] aspect-[382/353] -mb-2">
                <Image
                  src={banner.image || "/team/backed-by-experts.png"}
                  alt={banner.title || "Built for Growing Businesses, Backed by Experts"}
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 1024px) 320px, 382px"
                  className="object-contain"
                  priority={false}
                />
              </div>
            </Reveal>

            {/* Right: Heading & Description */}
            <Reveal preset="slide-right" distance={24} className="py-8 sm:py-12 lg:py-20 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-medium leading-[1.2] lg:leading-[1.15] tracking-[-0.8px] text-white">
                Built for Growing Businesses,<br className="hidden sm:inline" /> Backed by Experts
              </h2>
              <p className="text-[13px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/80 mt-3 sm:mt-5 max-w-xl mx-auto lg:mx-0">
                {banner.description}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                5. CONTACT                                  */
/* -------------------------------------------------------------------------- */

export function TeamContact({
  contact,
  form,
}: {
  contact: TeamPageContent["contact"];
  form?: React.ReactNode;
}) {
  const resolvedFormId =
    contact.formId === "ca45309" || !contact.formId || contact.formId === "1284"
      ? "2148"
      : contact.formId;

  const formDefinition: FormDefinition = {
    id: resolvedFormId,
    source: "fallback",
    fields: [
      { name: "your-name", type: "text", label: "Your name", required: true, options: [], multiple: false },
      { name: "last-name", type: "text", label: "Last name", required: true, options: [], multiple: false },
      { name: "your-email", type: "email", label: "Email address", required: true, options: [], multiple: false },
      { name: "your-phone", type: "tel", label: "Phone Number", required: true, options: [], multiple: false },
      {
        name: "your-option",
        type: "select",
        label: "Please Choose Option",
        required: true,
        options: [
          "Tax Advisory",
          "Financial Advise",
          "Corporate Guidance",
          "Pension Advisory",
        ],
        multiple: false,
      },
      { name: "your-message", type: "textarea", label: "Write your notes...", required: false, options: [], multiple: false },
    ],
    submitLabel: "Contact Us",
  };

  const imageSrc = contact.image || "/here-to-help-img.jpg";

  return (
    <section className="bg-white text-brand-blue">
      <div className="bg-brand-sand/50 py-8 sm:py-12 lg:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[480px_1fr] gap-6 sm:gap-8 lg:gap-8 items-stretch">
            {/* Left: Team Photo (here-to-help-img.jpg) */}
            <Reveal preset="slide-left" distance={20} className="w-full h-full min-h-[260px] sm:min-h-[360px] lg:min-h-full rounded-[10px] overflow-hidden relative">
              <Image
                src={imageSrc}
                alt="Finance in a Box team collaborating"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover object-center"
                priority={false}
              />
            </Reveal>

            {/* Right: Contact Form Card */}
            <Reveal preset="slide-right" distance={20} className="w-full bg-brand-sand/50 rounded-[10px] p-5 sm:p-7 md:p-9 lg:p-12 flex flex-col justify-center">
              <h2 className="text-[22px] sm:text-[28px] md:text-[36px] font-medium leading-[1.2] tracking-tight text-brand-blue mb-2 sm:mb-2.5">
                {contact.title}
              </h2>
              <p className="text-[13px] sm:text-[15px] font-light leading-[160%] text-brand-blue/70 mb-5 sm:mb-7">
                {contact.subtitle}
              </p>

              {form || <CmsForm form={formDefinition} appearance="contact" />}
            </Reveal>
          </div>
        </Container>
      </div>
    </section>
  );
}
