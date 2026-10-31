import React from "react";
import { dmMono } from "@/app/fonts";

export type EyebrowVariant =
  | "dark"
  | "light"
  | "white"
  | "green"
  | "accent"
  | "on-dark"
  | "on-light"
  | "dash"
  | "no-dash"
  | "with-dash"
  | "without-dash"
  | "dark-dash"
  | "dark-no-dash"
  | "light-dash"
  | "light-no-dash"
  | "green-dash"
  | "green-no-dash"
  | "accent-dash"
  | "accent-no-dash"
  | string;

export interface EyebrowProps extends Omit<React.HTMLAttributes<HTMLElement>, "prefix"> {
  text?: string;
  children?: React.ReactNode;
  variant?: EyebrowVariant;
  dashVariant?: "dash" | "no-dash" | "with-dash" | "without-dash";
  bg?: "white" | "dark" | "light";
  color?: string;
  opacity?: number | string;
  dash?: boolean;
  noDash?: boolean;
  hasDash?: boolean;
  dashWidth?: string | number;
  dashSpace?: string | number;
  dashColor?: string;
  dashOpacity?: number | string;
  prefix?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
}

function stripLeadingDash(node: React.ReactNode): React.ReactNode {
  if (typeof node === "string") {
    return node.replace(/^[—–-]\s*/, "");
  }
  if (Array.isArray(node)) {
    return React.Children.map(node, (child, index) => {
      if (index === 0 && typeof child === "string") {
        return child.replace(/^[—–-]\s*/, "");
      }
      return child;
    });
  }
  return node;
}

export function Eyebrow({
  text,
  children,
  variant = "dark",
  dashVariant,
  bg,
  color,
  opacity,
  dash,
  noDash,
  hasDash,
  dashWidth = "16px",
  dashSpace = "14px",
  dashColor,
  dashOpacity,
  prefix,
  as: Component = "p",
  className = "",
  style,
  ...rest
}: EyebrowProps) {
  const variantStr = (variant || "").toLowerCase();

  // Resolve whether dash should be displayed
  const isExplicitNoDash =
    noDash === true ||
    dash === false ||
    hasDash === false ||
    dashVariant === "no-dash" ||
    dashVariant === "without-dash" ||
    variantStr === "no-dash" ||
    variantStr === "without-dash" ||
    variantStr.includes("-no-dash") ||
    variantStr.includes("_no_dash") ||
    variantStr.includes("nodash") ||
    variantStr === "plain";

  const isExplicitDash =
    noDash === false ||
    dash === true ||
    hasDash === true ||
    dashVariant === "dash" ||
    dashVariant === "with-dash" ||
    variantStr === "dash" ||
    variantStr === "with-dash" ||
    variantStr.includes("-dash") ||
    variantStr.includes("_dash");

  // If explicitly no-dash, don't show dash; otherwise default to true
  const shouldShowDash = isExplicitNoDash ? false : true;

  // Resolve color
  const isWhiteBg =
    bg === "white" ||
    bg === "light" ||
    variantStr.includes("light") ||
    variantStr.includes("white") ||
    variantStr.includes("on-light");

  const isGreen =
    variantStr.includes("green") ||
    variantStr.includes("accent");

  let defaultColor = "#FFFFFF";
  let defaultOpacity: number | string = 0.7;

  if (isWhiteBg) {
    defaultColor = "#121826";
    defaultOpacity = 0.7;
  } else if (isGreen) {
    defaultColor = "#23C55E";
    defaultOpacity = 1;
  } else {
    defaultColor = "#FFFFFF";
    defaultOpacity = 0.7;
  }

  const finalColor = color ?? defaultColor;
  const finalOpacity = opacity !== undefined ? opacity : (color ? 1 : defaultOpacity);

  const rawContent = text ?? children;
  const showDash = shouldShowDash && !prefix;
  const content = showDash || isExplicitNoDash ? stripLeadingDash(rawContent) : rawContent;

  const resolvedDashWidth =
    typeof dashWidth === "number" ? `${dashWidth}px` : dashWidth;
  const resolvedDashSpace =
    typeof dashSpace === "number" ? `${dashSpace}px` : dashSpace;

  const hasCustomFontSize = className.includes("text-") || className.includes("text-[");
  const hasCustomLineHeight = className.includes("leading-");

  return (
    <Component
      className={`${dmMono.className} inline-flex items-center font-mono text-[14px] font-medium uppercase tracking-[1.5px] leading-[18px] ${className}`.trim()}
      style={{
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        ...(hasCustomFontSize ? {} : { fontSize: "14px" }),
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        ...(hasCustomLineHeight ? {} : { lineHeight: "18px" }),
        color: finalColor,
        opacity: finalOpacity,
        ...style,
      }}
      {...rest}
    >
      {showDash && (
        <span
          className="inline-block shrink-0"
          style={{
            width: resolvedDashWidth,
            height: "0px",
            borderTop: `1.5px solid ${dashColor ?? finalColor}`,
            opacity: dashOpacity !== undefined ? dashOpacity : undefined,
            marginRight: resolvedDashSpace,
          }}
          aria-hidden="true"
        />
      )}
      {prefix}
      {content}
    </Component>
  );
}

export default Eyebrow;
