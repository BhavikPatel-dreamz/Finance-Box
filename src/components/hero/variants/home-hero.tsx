import React from "react";
import Image from "next/image";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function HomeHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "green-no-dash");

  const isDefaultTitle =
    config.title === "Your Finance Function," &&
    config.highlight === "Built and Run For You";

  return (
    <Container className="relative flex-1 flex flex-col justify-end lg:justify-start pb-10 sm:pb-12 lg:pb-8">
      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 xl:gap-0 items-start pt-4 sm:pt-6 lg:pt-10 xl:pt-16">
        {/* Left Column */}
        <div className="lg:col-span-7 pt-2 sm:pt-4 lg:pt-8 xl:pt-[73px]">
          {eyebrowData && (
            <Reveal immediate preset="slide-up" delay={80} distance={18}>
              <Eyebrow
                variant={eyebrowData.variant}
                className={eyebrowData.className || "mb-4 sm:mb-5"}
              >
                {eyebrowData.text}
              </Eyebrow>
            </Reveal>
          )}

          <Reveal immediate preset="slide-up" delay={220} distance={32}>
            <h1 className="text-[34px] sm:text-[50px] md:text-[54px] lg:text-[54px] xl:text-[76px] 2xl:text-[84px] leading-[1.08] sm:leading-[1.05] tracking-tight sm:tracking-[-0.8px]">
              {isDefaultTitle ? (
                <>
                  <span className="font-light text-white block">Your Finance</span>
                  <span className="block">
                    <span className="font-light text-white">Function, </span>
                    <span className="font-bold text-[#23C55E]">Built</span>
                  </span>
                  <span className="font-bold text-[#23C55E] block">and Run For You</span>
                </>
              ) : (
                <>
                  <span className="font-light">{config.title}</span>{" "}
                  {config.highlight && (
                    <span className="font-bold text-[#23C55E]">{config.highlight}</span>
                  )}
                </>
              )}
            </h1>
          </Reveal>

          {config.description && (
            <Reveal immediate preset="slide-up" delay={380} distance={24}>
              <p className="mt-4 sm:mt-6 max-w-[550px] text-[15px] sm:text-[16px] xl:text-[18px] font-light leading-[160%] text-white/80">
                {config.description}
              </p>
            </Reveal>
          )}

          {config.primaryCta && (
            <Reveal immediate preset="slide-up" delay={540} distance={20}>
              <div className="mt-6 sm:mt-7">
                <GreenButton
                  label={config.primaryCta.label}
                  href={config.primaryCta.url}
                  color={config.primaryCta.color || "white"}
                  bgColor={config.primaryCta.bgColor}
                  textColor={config.primaryCta.textColor}
                  onDark={config.primaryCta.onDark}
                  target={config.primaryCta.target}
                  className={config.primaryCta.className}
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 relative flex flex-col items-center lg:items-end pt-28 sm:pt-36 lg:pt-[180px] xl:pt-[252px] lg:mr-0 xl:-mr-[38px]">
          <div className="relative w-full max-w-[420px] lg:max-w-[440px] xl:max-w-[519px]">
            {/* Month-End Close Card */}
            {config.closeValue && (
              <Reveal
                immediate
                preset="slide-up"
                delay={460}
                distance={28}
                className="card-hover absolute -top-[95px] sm:-top-[110px] lg:-top-[125px] xl:-top-[143px] left-0 sm:-left-[20px] lg:-left-[50px] xl:-left-[118px] w-[130px] min-[360px]:w-[140px] sm:w-[170px] lg:w-[175px] xl:w-[196px] h-auto min-h-[115px] sm:h-[135px] lg:h-[140px] xl:h-[152px] bg-[#050D1F] border [border-image-source:linear-gradient(139.46deg,rgba(255,255,255,0.1)_1.38%,rgba(255,255,255,0.06)_76.95%)] [border-image-slice:1] p-3 sm:p-4 xl:p-5 z-1 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-mono text-white uppercase tracking-[0.86px] leading-none">
                    {config.closeLabel || "MONTH-END CLOSE"}
                  </p>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                    <span className="text-[26px] sm:text-[34px] lg:text-[34px] xl:text-[40px] font-medium text-[#23C55E] leading-none">
                      {config.closeValue}
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-normal text-white font-sans leading-none">
                      {config.closeUnit || "days"}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-normal text-white leading-none">
                    ↓ {config.closeTrend || "Down from 18"}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Runway Card */}
            {config.runwayValue && (
              <Reveal
                immediate
                preset="slide-up"
                delay={620}
                distance={28}
                className="card-hover absolute -top-[115px] sm:-top-[140px] lg:-top-[165px] xl:-top-[195px] right-0 lg:right-[20px] xl:right-[87px] w-[138px] min-[360px]:w-[150px] sm:w-[180px] lg:w-[175px] xl:w-[194px] h-auto min-h-[125px] sm:h-[140px] lg:h-[138px] xl:h-[147px] bg-[#050D1F] border [border-image-source:linear-gradient(139.46deg,rgba(255,255,255,0.1)_1.38%,rgba(255,255,255,0.06)_76.95%)] [border-image-slice:1] p-3 sm:p-4 xl:p-5 z-1 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-mono text-white uppercase tracking-[0.86px] leading-none mb-2 sm:mb-3">
                    {config.runwayLabel || "RUNWAY VISIBILITY"}
                  </p>
                  <div className="flex items-baseline gap-1 sm:gap-1.5">
                    <span className="text-[26px] sm:text-[34px] lg:text-[34px] xl:text-[40px] font-medium text-[#23C55E] leading-none">
                      {config.runwayValue}
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-normal text-white font-sans leading-none">
                      {config.runwayUnit || "months"}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] lg:text-[11px] xl:text-[12px] font-normal text-white leading-none">
                  {config.runwayTrend || "Real-time rolling model"}
                </p>
              </Reveal>
            )}

            {/* Chart Card */}
            {config.chartImage && (
              <Reveal
                immediate
                preset="scale-up"
                delay={300}
                duration={900}
                className="relative w-full h-[200px] sm:h-[250px] md:h-[270px] xl:h-[293px]"
              >
                <Image
                  src={config.chartImage}
                  alt={config.chartTitle || "Financial chart"}
                  fill
                  priority
                  className="object-contain"
                />
              </Reveal>
            )}
          </div>

          {/* Book a Call / Floating CTA Button */}
          {config.floatingCta && (
            <Reveal
              immediate
              preset="slide-up"
              delay={740}
              distance={20}
              className="mt-6 sm:mt-8 lg:mt-6 xl:mt-[38px] flex justify-center lg:justify-end w-full max-w-[420px] lg:max-w-[440px] xl:max-w-[519px] lg:pr-0 xl:pr-[7px]"
            >
              <GreenButton
                label={config.floatingCta.label}
                href={config.floatingCta.url}
                color={config.floatingCta.color || "green"}
                onDark={config.floatingCta.onDark ?? true}
                className={config.floatingCta.className}
              />
            </Reveal>
          )}
        </div>
      </div>
    </Container>
  );
}
