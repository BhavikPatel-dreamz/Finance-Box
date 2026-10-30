import type { ElementType, HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "main" | "section" | "header" | "footer" | "nav" | ElementType;
  size?: "default" | "header";
  bleed?: "right";
}

/**
 * Common Project Container Component
 * - Default size: 1280px (`max-w-[1280px]`)
 * - Header size: 1326px (`max-w-[1326px]`)
 * - Bleed right: Full width with left spacing aligning to 1280px and 0 right spacing
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

  const maxWidth = size === "header" ? "max-w-[1326px]" : "max-w-[1310px]";
  const defaultPadding = className.includes("px-") ? "" : "px-3.75";

  return (
    <Component
      className={`container mx-auto box-border w-full ${maxWidth} ${defaultPadding} ${className}`.trim()}
      {...props}
    />
  );
}

export default Container;
