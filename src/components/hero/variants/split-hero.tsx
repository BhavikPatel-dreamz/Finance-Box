import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GreenButton } from "@/components/ui/green-button";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function SplitHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark");

  return (
    <Container>
      <div className="flex-1 flex items-center pt-6 sm:pt-8 lg:pt-0 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center w-full">
          {/* Left Column */}
          <Reveal immediate preset="slide-up" delay={80} distance={24}>
            {eyebrowData && (
              <Eyebrow
                variant={eyebrowData.variant}
                className={eyebrowData.className || "mb-4 sm:mb-6"}
              >
                {eyebrowData.text}
              </Eyebrow>
            )}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white mb-4 sm:mb-6 ${config.titleMaxWidth || (config.highlight?.includes("playbooks") ? "lg:max-w-[400px]" : "lg:max-w-[587px]")}`}>
              {config.title}{" "}
              {config.highlight && (
                <span className="text-[#23C55E]">{config.highlight}</span>
              )}
            </h1>
          </Reveal>

          {/* Right Column */}
          <Reveal
            immediate
            preset="slide-up"
            delay={260}
            distance={24}
            className="max-w-md lg:justify-self-end"
          >
            {config.description && (
              <p className="text-[14px] sm:text-[16px] font-light leading-[1.65] lg:leading-[160%] text-white/80 mb-6 sm:mb-8">
                {config.description}
              </p>
            )}

            {config.primaryCta && (
              <div>
                <GreenButton
                  label={config.primaryCta.label}
                  href={config.primaryCta.url}
                  color={config.primaryCta.color || "green"}
                  bgColor={config.primaryCta.bgColor}
                  textColor={config.primaryCta.textColor}
                  onDark={config.primaryCta.onDark ?? true}
                  className={config.primaryCta.className}
                />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
