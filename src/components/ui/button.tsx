import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant = "green" | "dark" | "white" | "green-on-dark";

export type ButtonSizeObject = {
  width?: string;
  height?: string;
  paddingX?: string;
  paddingY?: string;
  fontSize?: string;
};

export type ButtonProps = {
  /**
   * - "green":         bg #23C55E, text #121826 | hover bg #121826, text white
   * - "green-on-dark": bg #23C55E, text #121826 | hover bg white,   text #121826
   * - "dark":          bg #121826, text white   | hover bg #23C55E, text #121826
   * - "white":         bg white,   text #121826 | hover bg #23C55E, text #121826
   */
  color?: "green" | "dark" | "white" | "green-on-dark" | string;
  /** Alias for color */
  variant?: "green" | "dark" | "white" | "green-on-dark";
  /** Legacy alias for color */
  bgColor?: string;
  /** Legacy prop for text color */
  textColor?: string;
  /** Legacy hover color */
  hoverColor?: string;

  /** Set true inside dark sections so the green button fills white on hover. */
  onDark?: boolean;

  /** Button text */
  text?: string;
  /** Alias for text */
  label?: string;
  /** Children as button text */
  children?: React.ReactNode;

  /** Renders a Next.js <Link> when provided */
  href?: string;
  /** Renders a <button> when no href */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;

  /** Show the circle-arrow icon (default: true) */
  showArrow?: boolean;
  /** Custom icon override */
  icon?: React.ReactNode;

  /**
   * - "62" | "lg" (default): 50px mobile, 56px tablet, 62px desktop
   * - "50" | "sm":           44px mobile, 48px tablet, 50px desktop
   * - "header":              40px mobile, 50px desktop
   * - object:                custom width via { width }
   */
  size?: "62" | "50" | "lg" | "sm" | "md" | "header" | ButtonSizeObject;

  /** Additional classes for the button */
  className?: string;
  /** Override the hover circle color, e.g. "bg-[#1FAF53]" */
  fillClassName?: string;
};

function resolveVariant(
  variant?: string,
  color?: string,
  bgColor?: string,
  onDark?: boolean,
  hoverColor?: string
): ButtonVariant {
  const v = (variant || color || bgColor || "green").toLowerCase().trim();
  if (v === "dark" || v === "black" || v.includes("121826") || v.includes("07110d") || v.includes("0b1120")) {
    return "dark";
  }
  if (v === "white" || v.includes("fff")) {
    return "white";
  }
  const isDarkSection = Boolean(
    onDark || (hoverColor && (hoverColor === "white" || hoverColor.includes("fff")))
  );
  if (v === "green-on-dark" || isDarkSection) {
    return "green-on-dark";
  }
  return "green";
}

// `base`: resting colors + hover text. `fill`: the circle color that grows on hover.
const variantStyles: Record<ButtonVariant, { base: string; fill: string }> = {
  green: {
    base: "bg-[#23C55E] text-[#121826] hover:text-white",
    fill: "bg-[#121826]",
  },
  "green-on-dark": {
    base: "bg-[#23C55E] text-[#121826] hover:text-[#121826]",
    fill: "bg-white",
  },
  dark: {
    base: "bg-[#121826] text-white hover:text-[#121826]",
    fill: "bg-[#23C55E]",
  },
  white: {
    base: "bg-white text-[#121826] shadow-sm hover:text-[#121826]",
    fill: "bg-[#23C55E]",
  },
};

export function ArrowIcon({ isHeader = false, className = "" }: { isHeader?: boolean; className?: string }) {
  const sizeClass = isHeader ? "h-[18px] w-[18px]" : "h-5 w-5 lg:h-[22px] lg:w-[22px]";
  return (
    <span
      className={twMerge(
        "inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none",
        className
      )}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClass}
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8.75" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8.75 6.5L12.25 10L8.75 13.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Button({
  color,
  variant,
  bgColor,
  text,
  label,
  children,
  href,
  onClick,
  type = "button",
  disabled,
  target,
  rel,
  showArrow = true,
  icon,
  size,
  className = "",
  fillClassName = "",
  hoverColor,
  onDark,
}: ButtonProps) {
  const activeVariant = resolveVariant(variant, color, bgColor, onDark, hoverColor);
  const styles = variantStyles[activeVariant];
  const content = text ?? label ?? children;

  const isHeader = size === "header";
  const is50px =
    size === "50" ||
    size === "sm" ||
    (typeof size === "object" && size?.height === "50px");

  let sizeClasses = "";
  let customStyle: React.CSSProperties | undefined = undefined;

  if (isHeader) {
    sizeClasses = "sm:h-[50px] h-[40px] min-h-[40px] sm:min-h-[50px] px-3.75 text-[14px] sm:text-[16px]";
  } else if (is50px) {
    sizeClasses = "sm:h-[44px] h-[40px] min-h-[40px] sm:min-h-[44px] px-3.75 text-[14px] md:h-[48px] md:min-h-[48px] md:px-[20px] md:text-[16px] lg:h-[50px] lg:min-h-[50px] lg:px-[20px] lg:text-[18px]";
  } else {
    sizeClasses = "sm:h-[50px] h-[40px] min-h-[40px] sm:min-h-[50px] px-3.75 text-[14px] md:h-[56px] md:min-h-[56px] md:px-[30px] md:text-[16px] lg:h-[62px] lg:min-h-[62px] lg:px-[30px] lg:text-[18px]";
  }

  if (size && typeof size === "object") {
    if (size.width && size.width !== "auto") {
      customStyle = { width: size.width };
    }
  }

  const baseClasses = twMerge(
    "group relative isolate inline-flex max-w-full items-center justify-center gap-3.5 overflow-hidden rounded-full font-semibold cursor-pointer select-none",
    "transition-[color,transform] duration-500 ease-in-out active:scale-[0.98]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23C55E]/60 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    styles.base,
    sizeClasses,
    className
  );

  const innerContent = (
    <>
      {/* Circle centered on the bottom-left corner; scale 2.5 is enough to cover wide buttons */}
      <span
        aria-hidden="true"
        className={twMerge(
          "pointer-events-none absolute bottom-0 left-0 -z-10 aspect-square w-full rounded-full",
          "[transform:translate(-50%,50%)_scale(0)] transition-transform duration-[900ms] ease-in-out",
          "group-hover:[transform:translate(-50%,50%)_scale(2.5)] group-focus-visible:[transform:translate(-50%,50%)_scale(2.5)]",
          "motion-reduce:transition-none",
          styles.fill,
          fillClassName
        )}
      />
      <span className="whitespace-nowrap">{content}</span>
      {icon ? (
        <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
          {icon}
        </span>
      ) : showArrow ? (
        <ArrowIcon isHeader={isHeader} />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={customStyle}
        className={baseClasses}
        target={target ?? (href && /^https?:\/\//i.test(href) ? "_blank" : undefined)}
        rel={(target ?? (href && /^https?:\/\//i.test(href) ? "_blank" : undefined)) === "_blank" ? (rel ?? "noopener noreferrer") : rel}
        onClick={onClick}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      style={customStyle}
      disabled={disabled}
      className={baseClasses}
      onClick={onClick}
    >
      {innerContent}
    </button>
  );
}

export default Button;