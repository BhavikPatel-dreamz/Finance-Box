import React from "react";
import Link from "next/link";
import type { HeroConfig } from "../types";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

export function NotFoundHeroVariant({ config }: { config: HeroConfig }) {
  const errorCode = config.errorCode || "404";
  const badgeText = config.badgeText || "Sorry! This Page Was Lost";

  return (
    <div className="relative w-full flex items-center justify-center py-16 sm:py-20 lg:py-24">
      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#23C55E]/10 blur-[150px]"
      />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4">
          {/* Giant Stylized 404 Watermark + Eyebrow */}
          <div className="relative select-none mb-1 sm:mb-2">
            <span
              className="block text-[120px] sm:text-[170px] md:text-[210px] lg:text-[250px] font-black leading-none tracking-tighter bg-gradient-to-b from-[#23C55E]/25 via-[#23C55E]/10 to-transparent bg-clip-text text-transparent font-mono"
              aria-hidden="true"
            >
              {errorCode}
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23C55E]/15 border border-[#23C55E]/30 text-[#23C55E] text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-sm whitespace-nowrap shadow-[0_0_20px_rgba(35,197,94,0.15)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#23C55E] animate-pulse" />
                {badgeText}
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] tracking-tight text-white mb-4 -mt-4 sm:-mt-8">
            {config.title}{" "}
            {config.highlight && (
              <span className="text-[#23C55E]">{config.highlight}</span>
            )}
          </h1>

          {/* Description */}
          {config.description && (
            <p className="text-[15px] sm:text-[17px] font-light leading-[1.7] text-white/70 max-w-lg mb-8 sm:mb-10">
              {config.description}
            </p>
          )}

          {/* Action Buttons */}
          {(config.primaryCta || config.secondaryCta) && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {config.primaryCta && (
                <Button
                  color={config.primaryCta.color || "green"}
                  size={config.primaryCta.size || "header"}
                  text={config.primaryCta.label}
                  href={config.primaryCta.url}
                  onDark={true}
                  className={config.primaryCta.className}
                />
              )}
              {config.secondaryCta && (
                <Button
                  color={config.secondaryCta.color || "white"}
                  size={config.secondaryCta.size || "header"}
                  text={config.secondaryCta.label}
                  href={config.secondaryCta.url}
                  onDark={true}
                  className={config.secondaryCta.className}
                />
              )}
            </div>
          )}

          {/* Quick Navigation Links */}
          {config.quickLinks && config.quickLinks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/[0.08] w-full max-w-md">
              <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                Quick Navigation
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {config.quickLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono text-white/80 hover:text-white bg-white/[0.04] hover:bg-[#23C55E]/15 border border-white/[0.08] hover:border-[#23C55E]/40 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
