import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import {
  ProcessGrid,
  type ProcessStepItem,
  type ProcessVariant,
} from "./process-grid";

export type ProcessHeaderLayout = "split" | "centered";

export type ProcessSectionProps = {
  title: ReactNode;
  highlight?: string;
  description?: ReactNode;
  steps: ProcessStepItem[];
  variant?: ProcessVariant;
  headerLayout?: ProcessHeaderLayout;
  className?: string;
  gridClassName?: string;
  theme?: "dark" | "light";
  spacing?: "top" | "bottom" | "both" | "none";
  id?: string;
};

export function ProcessSection({
  title,
  highlight,
  description,
  steps,
  variant = "number",
  headerLayout = "split",
  className = "",
  gridClassName = "",
  theme = "dark",
  spacing = "both",
  id,
}: ProcessSectionProps) {
  const isSplit = headerLayout === "split";

  return (
    <Section
      id={id}
      theme={theme}
      spacing={spacing}
      className={twMerge("process-section bg-brand-blue text-white", className)}
    >
      <Container>
        {/* Header */}
        {isSplit ? (
          <Reveal
            preset="slide-up"
            distance={20}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-3 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-14 xl:mb-16"
          >
            <h2 className="text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-medium leading-[1.05] tracking-[-0.8px] text-white min-w-0">
              {title}{" "}
              {highlight && (
                <span className="text-brand-green italic font-bold">
                  {highlight}
                </span>
              )}
            </h2>
            {description && (
              <div className="text-[13.5px] sm:text-[15px] lg:text-[16px] font-light leading-[160%] text-white/70 max-w-md text-left lg:text-right min-w-0">
                {description}
              </div>
            )}
          </Reveal>
        ) : (
          <Reveal
            preset="slide-up"
            distance={20}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium leading-[1.15] sm:leading-[1.1] tracking-[-0.8px] mb-3 sm:mb-4 text-white">
              {title}{" "}
              {highlight && (
                <span className="text-brand-green italic font-bold block sm:inline">
                  {highlight}
                </span>
              )}
            </h2>
            {description && (
              <div className="text-[14px] sm:text-[16px] font-light leading-[160%] text-white/70 max-w-[680px] px-2">
                {description}
              </div>
            )}
          </Reveal>
        )}

        {/* Process Cards Grid */}
        <ProcessGrid steps={steps} variant={variant} className={gridClassName} />
      </Container>
    </Section>
  );
}

export default ProcessSection;
