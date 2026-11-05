import React from "react";
import { twMerge } from "tailwind-merge";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import Container from "@/components/ui/container";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export function AgenticAiHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark");

  return (
    <Container>
      <div className="flex-1 flex items-center pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column */}
          <Reveal immediate preset="slide-up" delay={80} distance={24}>
            {eyebrowData && (
              <Eyebrow
                variant={eyebrowData.variant}
                className={eyebrowData.className || "mb-6"}
              >
                {eyebrowData.text}
              </Eyebrow>
            )}
            <h1
              className={twMerge(
                "text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-6 lg:max-w-[400px]",
                config.titleMaxWidth
              )}
            >
              {config.title}{" "}
              {config.highlight && (
                <span className="text-[#23C55E]">{config.highlight}</span>
              )}
            </h1>
            {config.tagLine && (
              <p
                className={twMerge(
                  "text-[16px] font-light leading-[160%] text-white/90 max-w-md mb-3",
                  config.titleMaxWidth
                )}
              >
                {config.tagLine}
              </p>
            )}
            {config.description && (
              <p
                className={twMerge(
                  "text-[16px] font-light leading-[160%] text-white/80 max-w-md",
                  config.titleMaxWidth
                )}
              >
                {config.description}
              </p>
            )}
          </Reveal>

          {/* Right Column (Bullets + CTA) */}
          <div className="max-w-md lg:justify-self-end">
            {config.rightDescription && (
              <p className="text-[16px] font-light leading-[160%] text-white/80 max-w-md mb-6">
                {config.rightDescription}
              </p>
            )}
            {config.bullets && config.bullets.length > 0 && (
              <StaggerGroup immediate staggerDelay={120} className="space-y-6 mb-10">
                {config.bullets.map((bullet, idx) => (
                  <StaggerItem
                    key={idx}
                    index={idx}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-2 h-[6px] w-[6px] shrink-0 bg-[#23C55E]" />
                    <span className="text-[16px] font-light leading-[160%] text-white/80">
                      {bullet}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            )}

            {config.primaryCta && (
              <Reveal immediate preset="slide-up" delay={480} distance={20}>
                <GreenButton
                  label={config.primaryCta.label}
                  href={config.primaryCta.url}
                  bgColor={config.primaryCta.bgColor}
                  textColor={config.primaryCta.textColor}
                  color={config.primaryCta.color || "white"}
                  onDark={config.primaryCta.onDark ?? true}
                  className={config.primaryCta.className}
                />
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
