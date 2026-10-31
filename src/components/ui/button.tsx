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
   * The button color/type.
   * - "green" (#23C55E): Normal -> bg #23C55E, text #121826 | Hover -> bg #121826, text white
   * - "green-on-dark":   Normal -> bg #23C55E, text #121826 | Hover -> bg white,   text #121826
   * - "dark"  (#121826): Normal -> bg #121826, text white   | Hover -> bg #23C55E, text #121826
   * - "white" (#ffffff): Normal -> bg white,   text #121826 | Hover -> bg #23C55E, text #121826
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

  /** Set true when the button is inside a dark section/container. For green button, hover state is bg white and text #121826. */
  onDark?: boolean;

  /** Button text */
  text?: string;
  /** Alias for text */
  label?: string;
  /** Children as button text */
  children?: React.ReactNode;

  /** Link URL (renders a Next.js <Link> when provided) */
  href?: string;
  /** Click handler (renders a <button> when no href) */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** HTML button type */
  type?: "button" | "submit" | "reset";
  /** Disabled state */
  disabled?: boolean;
  /** Target attribute for links (e.g. "_blank") */
  target?: string;
  /** Rel attribute for links */
  rel?: string;

  /** Whether to show the right circle-arrow icon (default: true) */
  showArrow?: boolean;
  /** Custom icon override */
  icon?: React.ReactNode;

  /**
   * Button sizes:
   * - "62" | "lg" (Default):
   *     Desktop: height 62px, font 18px, padding-x 30px
   *     Tablet:  height 56px, font 16px, padding-x 30px
   *     Mobile:  height 50px, font 15px, padding-x 24px
   *
   * - "50" | "sm":
   *     Desktop: height 50px, font 18px, padding-x 30px
   *     Tablet:  height 48px, font 16px, padding-x 30px
   *     Mobile:  height 44px, font 15px, padding-x 20px
   *
   * - "header":
   *     Fixed height 50px, width 154px, font 14px, padding-x 20px (Header Contact Button)
   *
   * Or pass a custom size object: { width?: string; height?: string; ... }
   */
  size?: "62" | "50" | "lg" | "sm" | "md" | "header" | ButtonSizeObject;

  /** Additional classes */
  className?: string;
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

const variantStyles: Record<ButtonVariant, string> = {
  // Green button (light section): bg #23C55E, text #121826 -> Hover: bg #121826, text white
  green: "bg-[#23C55E] text-[#121826] hover:bg-[#121826] hover:text-white border border-transparent hover:border-white/10",

  // Green button (dark section): bg #23C55E, text #121826 -> Hover: bg white, text #121826
  "green-on-dark": "bg-[#23C55E] text-[#121826] hover:bg-white hover:text-[#121826] border border-transparent hover:border-transparent",

  // Dark button: bg #121826, text white -> Hover: bg #23C55E, text #121826
  dark: "bg-[#121826] text-white hover:bg-[#23C55E] hover:text-[#121826] border border-white/10 hover:border-transparent",

  // White button: bg white, text #121826 -> Hover: bg #23C55E, text #121826
  white: "bg-white text-[#121826] hover:bg-[#23C55E] hover:text-[#121826] border border-transparent shadow-sm",
};

export function ArrowIcon({ isHeader = false, className = "" }: { isHeader?: boolean; className?: string }) {
  const sizeClass = isHeader ? "h-[18px] w-[18px] fill-[#1118281A]" : "h-5 w-5 lg:h-[22px] lg:w-[22px] fill-[#1118281A]";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}>
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
  hoverColor,
  onDark,
}: ButtonProps) {
  const activeVariant = resolveVariant(variant, color, bgColor, onDark, hoverColor);
  const content = text ?? label ?? children;

  // Determine size mode:
  // 1. "header" -> 50px height, 20px padding, 14px font
  // 2. 50px button ("50" | "sm" | object with height 50px)
  // 3. 62px button (default | "62" | "lg" | "md" | object with height 62px or other)
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
    // 50px in desktop view, 30px horizontal padding, 18px font size on desktop
    // Responsive: 44px mobile -> 48px tablet -> 50px desktop
    sizeClasses = "sm:h-[44px] h-[40px] min-h-[40px] sm:min-h-[44px] px-3.75 text-[14px] md:h-[48px] md:min-h-[48px] md:px-[20px] md:text-[16px] lg:h-[50px] lg:min-h-[50px] lg:px-[20px] lg:text-[18px]";
  } else {
    // 62px in desktop view, 30px horizontal padding, 18px font size on desktop
    // Responsive: 50px mobile -> 56px tablet -> 62px desktop
    sizeClasses = "sm:h-[50px] h-[40px] min-h-[40px] sm:min-h-[50px] px-3.75 text-[14px] md:h-[56px] md:min-h-[56px] md:px-[30px] md:text-[16px] lg:h-[62px] lg:min-h-[62px] lg:px-[30px] lg:text-[18px]";
  }

  // Handle custom width or dimensions from object if passed
  if (size && typeof size === "object") {
    if (size.width && size.width !== "auto") {
      customStyle = { width: size.width };
    }
  }

  const baseClasses = twMerge(
    "group inline-flex max-w-full items-center justify-center gap-3.5 rounded-full font-semibold transition-all duration-300 ease-in-out cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[activeVariant],
    sizeClasses,
    className
  );

  const innerContent = (
    <>
      <span className="whitespace-nowrap">{content}</span>
      {icon ? (
        <span className="inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
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
        target={target}
        rel={target === "_blank" ? (rel ?? "noopener noreferrer") : rel}
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
