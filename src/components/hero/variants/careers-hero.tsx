import React from "react";
import type { HeroConfig } from "../types";
import { parseEyebrow } from "../utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

export function CareersHeroVariant({ config }: { config: HeroConfig }) {
  const eyebrowData = parseEyebrow(config.eyebrow, "dark");

  return (
    <Container>
      <div className="flex-1 flex items-center pb-12 sm:pb-16 lg:pb-24 pt-8 sm:pt-12 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
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
            <h1 className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] leading-[1.12] font-medium tracking-tight text-white">
              {config.title.includes("\n") ? (
                config.title.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <>
                  {config.title}{" "}
                </>
              )}
              {config.highlight && (
                <>
                  <span className="text-[#23C55E]">{config.highlight}</span>
                  <br />
                </>
              )}
              {config.highlight2 && (
                <span className="text-[#23C55E]">{config.highlight2}</span>
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
              <p className="text-[15px] sm:text-[16px] font-light leading-[160%] text-white/80 mb-6 sm:mb-8">
                {config.description}
              </p>
            )}
            {config.primaryCta && (
              <div>
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
      </div>
    </Container>
  );
}
