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
  | string;

export interface EyebrowProps extends Omit<React.HTMLAttributes<HTMLElement>, "prefix"> {
  text?: string;
  children?: React.ReactNode;
  variant?: EyebrowVariant;
  bg?: "white" | "dark" | "light";
  color?: string;
  opacity?: number | string;
  dash?: boolean;
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
  bg,
  color,
  opacity,
  dash = true,
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
  const isWhiteBg =
    bg === "white" ||
    bg === "light" ||
    variant === "light" ||
    variant === "white" ||
    variant === "on-light";

  const isGreen = variant === "green" || variant === "accent";

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
  const showDash = dash && !prefix;
  const content = showDash ? stripLeadingDash(rawContent) : rawContent;

  const resolvedDashWidth =
    typeof dashWidth === "number" ? `${dashWidth}px` : dashWidth;
  const resolvedDashSpace =
    typeof dashSpace === "number" ? `${dashSpace}px` : dashSpace;

  return (
    <Component
      className={`${dmMono.className} inline-flex items-center font-mono text-[14px] font-medium uppercase tracking-[1.5px] leading-[18px] ${className}`.trim()}
      style={{
        fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
        fontSize: "14px",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        lineHeight: "18px",
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
