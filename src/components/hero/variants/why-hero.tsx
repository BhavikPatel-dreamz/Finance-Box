import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function WhyHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark");

  return (
    <Container>
      <div className="w-full">
        {/* Top 2-Column Heading & Intro */}
        <div className="grid items-start gap-6 sm:gap-8 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-[84px] lg:pb-[60px] lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal immediate preset="slide-up" delay={100} distance={28}>
            {eyebrowData && (
              <Eyebrow
                variant={eyebrowData.variant}
                className={eyebrowData.className}
              >
                {eyebrowData.text}
              </Eyebrow>
            )}
            <h1 className="mt-3.5 sm:mt-4.5 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
              {config.title}
              {config.highlight && (
                <span className="block whitespace-pre-line text-[#23C55E]">
                  {config.highlight}
                </span>
              )}
            </h1>
          </Reveal>

          <Reveal
            immediate
            preset="slide-up"
            delay={280}
            distance={28}
            className="lg:max-w-[460px] lg:justify-self-end lg:pt-2.5"
          >
            {config.description && (
              <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] text-white/90">
                {config.description}
              </p>
            )}
            {config.primaryCta && (
              <div className="mt-6 sm:mt-8">
                <Button
                  color={config.primaryCta.color || "white"}
                  text={config.primaryCta.label}
                  href={config.primaryCta.url}
                  className={config.primaryCta.className}
                />
              </div>
            )}
          </Reveal>
        </div>

        {/* Bottom Feature Points Banner */}
        {config.points && config.points.length > 0 && (
          <div className="relative pb-12 sm:pb-16 lg:pb-24">
            <StaggerGroup
              immediate
              staggerDelay={150}
              className="w-full rounded-[12px] sm:rounded-none overflow-hidden border border-white/10 sm:border-x-0 sm:border-y sm:border-white/10 bg-[rgba(0,0,0,0.03)] backdrop-blur-[3px]"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
              }}
            >
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-y-0 md:divide-x md:divide-white/10">
                {config.points.map((point, index) => (
                  <StaggerItem
                    key={point.number || index}
                    index={index}
                    className="card-hover flex min-h-[50px] md:h-[110px] md:flex-col lg:justify-between lg:items-start items-center p-3.5 sm:px-5 sm:py-4 lg:gap-0 gap-x-4"
                  >
                    <span className="point-number inline-flex h-8 w-8 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-full bg-[#121826] border border-[#23C55E]/40 text-[13px] sm:text-[14px] font-semibold text-[#23C55E] shadow-[0_0_10px_rgba(35,197,94,0.1)]">
                      {point.number || String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] font-semibold text-white tracking-tight leading-snug">
                      {point.title}
                    </p>
                  </StaggerItem>
                ))}
              </div>
            </StaggerGroup>
          </div>
        )}
      </div>
    </Container>
  );
}
