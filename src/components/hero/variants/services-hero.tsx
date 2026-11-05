import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import { ArrowIcon } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import Link from "next/link";

// Always returns "01", "02", ... Uses the CMS value only if it's a plain number,
// otherwise falls back to the item's position so it auto-increments.
const formatTierNumber = (raw: unknown, idx: number) => {
  const match = String(raw ?? "").match(/^\s*(\d+)\s*$/);
  const n = match ? Number(match[1]) : idx + 1;
  return String(n).padStart(2, "0");
};

export function ServicesHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark");

  return (
    <Container>
      <div className="flex-1 grid grid-cols-1 min-[890px]:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center py-10 sm:py-14 md:py-12 lg:py-20">
        {/* Left Column */}
        <div className="max-w-2xl">
          {eyebrowData && (
            <Reveal immediate preset="slide-up" delay={80} distance={18}>
              <Eyebrow
                variant={eyebrowData.variant}
                className={eyebrowData.className}
              >
                {eyebrowData.text}
              </Eyebrow>
            </Reveal>
          )}

          <Reveal immediate preset="slide-up" delay={220} distance={32}>
            <h1 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.15] lg:leading-[1.12] font-medium tracking-tight text-white">
              {config.title}
              {config.highlight && (
                <span className="whitespace-pre-line text-[#23C55E]">
                  {" "}
                  {config.highlight}
                </span>
              )}
            </h1>
          </Reveal>

          {config.description && (
            <Reveal immediate preset="slide-up" delay={380} distance={24}>
              <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/90 mt-4 sm:mt-5 lg:max-w-[508px]">
                {config.description}
              </p>
            </Reveal>
          )}

          {(config.primaryCta || config.secondaryCta) && (
            <Reveal immediate preset="slide-up" delay={540} distance={20}>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10">
                {config.primaryCta && (
                  <GreenButton
                    label={config.primaryCta.label}
                    href={config.primaryCta.url}
                    color={config.primaryCta.color || "white"}
                    bgColor={config.primaryCta.bgColor}
                    textColor={config.primaryCta.textColor}
                    onDark={config.primaryCta.onDark ?? true}
                    className={config.primaryCta.className}
                  />
                )}
                {config.secondaryCta &&
                  (config.secondaryCta.isTextLink ? (
                    <Link
                      href={config.secondaryCta.url}
                      target={config.secondaryCta.target}
                      rel={config.secondaryCta.target === "_blank" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 text-base sm:text-lg hover:text-[#23C55E] font-semibold transition-all duration-300 py-1"
                    >
                      {config.secondaryCta.label} <ArrowIcon />
                    </Link>
                  ) : (
                    <GreenButton
                      label={config.secondaryCta.label}
                      href={config.secondaryCta.url}
                      color={config.secondaryCta.color || "green"}
                      onDark={true}
                    />
                  ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* Right Column (Tiers) */}
        {config.tiers && config.tiers.length > 0 && (
          <StaggerGroup
            immediate
            staggerDelay={140}
            className="relative w-full flex flex-col gap-3.5 sm:gap-4 max-w-[506px] lg:justify-self-end"
          >
            {/* Vertical Gradient Divider Line (stretches with the list) */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-5 xl:-left-6 -top-7 bottom-0 w-[1.5px] pointer-events-none bg-[linear-gradient(180deg,#23C55E_0%,rgba(35,197,94,0)_89.31%)]"
            />
            {config.tiers.map((tier, idx) => (
              <StaggerItem
                key={idx}
                index={idx}
                className="card-hover w-full min-h-[110px] h-auto lg:h-[125px] bg-[#050D1F] border border-white/8 rounded-[15px] p-4 sm:p-4.5 flex items-start gap-3.5 sm:gap-4.5 relative overflow-hidden group hover:border-[#23C55E]/50 transition-colors"
              >
                <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#232835] bg-[#121826] text-[14px] font-semibold text-[#23C55E] tabular-nums">
                  {formatTierNumber(tier.number, idx)}
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
        )}
      </div>
    </Container>
  );
}