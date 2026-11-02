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

// Full class names so Tailwind can detect them at build time
const DESKTOP_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

export function ProcessGrid({ steps, className = "" }: ProcessGridProps) {
  const total = steps.length;
  if (total === 0) return null;

  const hasOddCount = total % 2 !== 0;

  return (
    <div
      className={twMerge(
        "overflow-hidden border border-white/10 bg-[#191F2D]",
        className
      )}
    >
      <ol
        className={twMerge(
          "grid grid-cols-1 sm:grid-cols-2",
          DESKTOP_COLS[total] ?? "lg:grid-cols-5"
        )}
      >
        {steps.map((step, idx) => {
          const isLast = idx === total - 1;
          const isLeftColOnSm = idx % 2 === 0;
          const isSpannedOnSm = hasOddCount && isLast;
          const isLastRowOnSm = hasOddCount ? isLast : idx >= total - 2;

          return (
            <li
              key={`${step.number}-${idx}`}
              className={twMerge(
                "relative flex min-h-[200px] flex-col bg-[#191F2D] pb-8 pt-8 sm:min-h-[290px] sm:pt-9 lg:min-h-[311px] lg:pt-10",
                // Mobile (1 column)
                !isLast && "border-b border-white/10",
                // Tablet (2 columns)
                isLeftColOnSm && !isSpannedOnSm && "sm:border-r sm:border-white/10",
                !isLeftColOnSm && "sm:border-r-0",
                isLastRowOnSm ? "sm:border-b-0" : "sm:border-b sm:border-white/10",
                isSpannedOnSm && "sm:col-span-2 lg:col-span-1",
                // Desktop (single row)
                "lg:border-b-0",
                !isLast ? "lg:border-r lg:border-white/10" : "lg:border-r-0"
              )}
            >
              {/* Green bar + step number */}
              <div className="flex h-[36px] shrink-0 items-center gap-[17px] sm:h-[44px] sm:gap-[21px] lg:h-[48px]">
                <span
                  aria-hidden="true"
                  className="h-full w-[3px] shrink-0 bg-[#23C55E]"
                />
                <span className="text-[32px] font-extrabold leading-none tracking-tight text-white sm:text-[38px] lg:text-[40px]">
                  {step.number}
                </span>
              </div>

              {/* Top-aligned so every title starts on the same line across columns */}
              <div className="mt-8 px-5 sm:mt-10 sm:px-6 lg:mt-[54px]">
                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-white sm:text-[26px] lg:text-[28px]">
                  {step.title}
                </h3>
                <p className="text-[14px] font-normal leading-[150%] text-white/70 sm:text-[15px] sm:leading-[160%] lg:text-[16px]">
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ProcessGrid;