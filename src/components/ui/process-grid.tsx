import React from "react";
import { twMerge } from "tailwind-merge";

export type ProcessStepItem = {
  number: string;
  title: string;
  text: string;
};

export type ProcessGridProps = {
  steps: ProcessStepItem[];
  className?: string;
};

export function ProcessGrid({ steps, className = "" }: ProcessGridProps) {
  const total = steps.length;

  return (
    <div
      className={twMerge(
        "rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#191F2D] overflow-hidden",
        className
      )}
    >
      <div
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2",
          total === 5
            ? "lg:grid-cols-5"
            : total === 4
            ? "lg:grid-cols-4"
            : total === 3
            ? "lg:grid-cols-3"
            : "lg:grid-cols-5"
        )}
      >
        {steps.map((step, idx) => {
          const isLast = idx === total - 1;
          const isOddInSm = idx % 2 === 0; // left col on 2-col tablet layout
          const isLastSmRow = total % 2 !== 0 ? isLast : idx >= total - 2;
          const isLastOnSmSpanned = total % 2 !== 0 && isLast;

          return (
            <div
              key={idx}
              className={twMerge(
                "relative py-8 sm:py-9 lg:py-10 flex flex-col justify-between bg-[#191F2D] min-h-[200px] sm:min-h-[290px] lg:min-h-[311px]",
                // Mobile borders (1 column)
                !isLast ? "border-b border-white/10" : "border-b-0",
                // Tablet borders (2 columns)
                isOddInSm && !isLastOnSmSpanned
                  ? "sm:border-r sm:border-white/10"
                  : "sm:border-r-0",
                !isLastSmRow ? "sm:border-b sm:border-white/10" : "sm:border-b-0",
                isLastOnSmSpanned ? "sm:col-span-2 lg:col-span-1" : "",
                // Desktop borders (5 columns)
                "lg:border-b-0",
                !isLast ? "lg:border-r lg:border-white/10" : "lg:border-r-0"
              )}
            >
              {/* Top: Green vertical indicator flush with left edge + Step Number */}
              <div className="h-[56px] sm:h-[68px] lg:h-[76px] shrink-0 flex items-start gap-4 sm:gap-5 lg:gap-6">
                <div className="w-[3px] h-[36px] sm:h-[44px] lg:h-[48px] bg-[#23C55E] -ml-[1px] shrink-0" />
                <span className="text-[32px] sm:text-[38px] lg:text-[40px] font-extrabold leading-none text-white tracking-tight">
                  {step.number}
                </span>
              </div>

              {/* Bottom: Title & Description aligned to bottom */}
              <div className="px-5 sm:px-6 lg:px-6.5 flex flex-col flex-grow justify-end">
                <h3 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[150%] sm:leading-[160%] text-white/70">
                  {step.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessGrid;
