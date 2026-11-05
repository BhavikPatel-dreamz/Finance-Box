import type { ElementType, HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "main" | "section" | "header" | "footer" | "nav" | ElementType;
  size?: "default" | "header" | "narrow";
  bleed?: "right";
}

/**
 * Common Project Container Component (Derived from 1440px Figma Reference)
 * - Default size: Strictly 1280px content width (`max-w-[1280px]`) centered with 80px margins at 1440px.
 * - Header size: 1326px (`max-w-[1326px]`) spanning 50px to 1375px at 1440px.
 * - Narrow size: 880px (`max-w-[880px]`) for centered FAQ / article reading widths.
 * - Bleed right: Aligns to 1280px container on left and bleeds full edge on right.
 * - Responsive padding: 16px mobile (`px-4`), 24px tablet (`sm:px-6`), 32px laptop (`lg:px-8`), 0px on desktop >=1440px (`min-[1440px]:px-0`).
 */
export function Container({
  as: Component = "div",
  size = "default",
  bleed,
  className = "",
  ...props
}: ContainerProps) {
  if (bleed === "right") {
    return (
      <Component
        className={`w-full container-bleed-right ${className}`.trim()}
        {...props}
      />
    );
  }

  let maxWidth = "max-w-[1312px]";
  if (size === "header") {
    maxWidth = "max-w-[1326px]";
  } else if (size === "narrow") {
    maxWidth = "max-w-[880px]";
  }

  const hasCustomPadding = className.includes("px-");
  const defaultPadding = hasCustomPadding
    ? ""
    : "px-4";

  return (
    <Component
      className={`mx-auto box-border w-full ${maxWidth} ${defaultPadding} ${className}`.trim()}
      {...props}
    />
  );
}

export default Container;
