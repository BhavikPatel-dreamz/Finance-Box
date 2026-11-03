import React from "react";
import type { HeroConfig } from "../types";

export function LegalHeroVariant({ config }: { config: HeroConfig }) {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
        {config.title}{" "}
        {config.highlight && (
          <span className="text-[#23C55E]">{config.highlight}</span>
        )}
      </h1>
      {config.effectiveDate && (
        <p className="text-xs sm:text-sm text-white/60">
          Last updated: {config.effectiveDate}
        </p>
      )}
    </div>
  );
}
