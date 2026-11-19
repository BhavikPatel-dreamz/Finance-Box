import React, { type ReactNode } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { StaggerGroup, StaggerItem } from "@/components/motion/reveal";

export type ProcessVariant = "number" | "icon";

export type ProcessStepItem = {
  number?: string | number;
  icon?: ReactNode | string | React.ComponentType<{ className?: string }>;
  title: string;
  text?: string;
  description?: string;
  variant?: ProcessVariant;
};

export type ProcessGridProps = {
  steps: ProcessStepItem[];
  variant?: ProcessVariant;
  className?: string;
  itemClassName?: string;
};

// Full class names so Tailwind can detect them at build time
const DESKTOP_COLS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/**
 * Built-in default SVG fallback icons for variant="icon" if no custom icon is provided.
 */
function getDefaultStepIcon(index: number) {
  switch (index % 5) {
    case 0: // Discover: Magnifier
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 1: // Design: Document
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 2: // Implement: Cog
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 3: // Stabilize: Layout
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="3" x2="9" y2="21" />
          <line x1="9" y1="12" x2="21" y2="12" />
        </svg>
      );
    case 4: // Hand off: Thumbs Up
    default:
      return (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          aria-hidden="true"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      );
  }
}

function renderStepIcon(step: ProcessStepItem, index: number) {
  if (typeof step.icon === "string") {
    return (
      <Image
        src={step.icon}
        alt={step.title}
        width={26}
        height={26}
        className="object-contain"
      />
    );
  }

  if (React.isValidElement(step.icon)) {
    return step.icon;
  }

  if (typeof step.icon === "function") {
    const IconComp = step.icon;
    return <IconComp className="h-6 w-6 text-white" />;
  }

  return getDefaultStepIcon(index);
}

export function ProcessGrid({
  steps,
  variant = "number",
  className = "",
  itemClassName = "",
}: ProcessGridProps) {
  const total = steps.length;
  if (total === 0) return null;

  const hasOddCount = total % 2 !== 0;

  return (
    <div
      className={twMerge(
        "overflow-hidden rounded-[16px] sm:rounded-[20px] border border-white/10 bg-[#191F2D]",
        className
      )}
    >
      <StaggerGroup
        as="ol"
        staggerDelay={120}
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

          const stepVariant: ProcessVariant =
            step.variant ?? variant ?? (step.icon && !step.number ? "icon" : "number");

          const stepNumber =
            step.number !== undefined
              ? String(step.number).padStart(2, "0")
              : String(idx + 1).padStart(2, "0");

          const stepText = step.text ?? step.description ?? "";

          return (
            <StaggerItem
              key={`${step.title}-${idx}`}
              as="li"
              index={idx}
              className={twMerge(
                "group card-hover relative flex min-h-[190px] flex-col bg-[#191F2D] pb-7 pt-7 sm:min-h-[260px] sm:pt-8 md:min-h-[280px] lg:min-h-[290px] lg:pt-9 xl:min-h-[311px] xl:pt-10",
                // Mobile (1 column)
                !isLast && "border-b border-white/10",
                // Tablet (2 columns)
                isLeftColOnSm && !isSpannedOnSm && "sm:border-r sm:border-white/10",
                !isLeftColOnSm && "sm:border-r-0",
                isLastRowOnSm ? "sm:border-b-0" : "sm:border-b sm:border-white/10",
                isSpannedOnSm && "sm:col-span-2 lg:col-span-1",
                // Desktop (single row)
                "lg:border-b-0",
                !isLast ? "lg:border-r lg:border-white/10" : "lg:border-r-0",
                itemClassName
              )}
            >
              {/* Header indicator: Green bar + (Step number OR 60px Icon circle) */}
              {stepVariant === "icon" ? (
                <div className="flex items-center gap-3.5 sm:gap-[18px]">
                  <span
                    aria-hidden="true"
                    className="lg:h-12.5 w-[3px] shrink-0 bg-brand-green"
                  />
                  <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#FFFFFF14] transition-colors duration-300 group-hover:border-white/40">
                    {renderStepIcon(step, idx)}
                  </div>
                </div>
              ) : (
                <div className="flex h-[36px] shrink-0 items-center gap-[17px] sm:h-[44px] sm:gap-[21px] lg:h-[48px]">
                  <span
                    aria-hidden="true"
                    className="h-full w-[3px] shrink-0 bg-brand-green"
                  />
                  <span className="text-[32px] font-extrabold leading-none tracking-tight text-white sm:text-[38px] lg:text-[40px]">
                    {stepNumber}
                  </span>
                </div>
              )}

              {/* Title & Description */}
              <div
                className={twMerge(
                  "px-4 sm:px-5 lg:px-4 xl:px-6.5",
                  stepVariant === "icon"
                    ? "mt-6 sm:mt-7 lg:mt-10 xl:mt-13.5"
                    : "mt-6 sm:mt-8 lg:mt-9 xl:mt-[54px]"
                )}
              >
                <h3 className="mb-1.5 sm:mb-5 font-semibold leading-tight text-white text-[20px] lg:text-[20px] xl:text-[30px] 2xl:text-[30px]">
                  {step.title}
                </h3>
                {stepText && (
                  <p className="font-normal leading-[150%] text-white/70 sm:leading-[160%] text-[14px] xl:text-[16px]">
                    {stepText}
                  </p>
                )}
              </div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}

export default ProcessGrid;
