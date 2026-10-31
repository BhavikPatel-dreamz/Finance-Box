import React from "react";
import { twMerge } from "tailwind-merge";

export type SectionTheme = "light" | "dark";
export type SectionSpacing = "both" | "top" | "bottom" | "none";

export type SectionProps = {
  /** light: bg white, text #121826 | dark: bg #121826, text white */
  theme?: SectionTheme;
  /** both: top + bottom padding | top: only top | bottom: only bottom | none: no vertical padding */
  spacing?: SectionSpacing;
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const themeStyles: Record<SectionTheme, string> = {
  light: "bg-white text-[#121826]",
  dark: "bg-[#121826] text-white",
};

const spacingStyles: Record<SectionSpacing, string> = {
  both: "py-14 sm:py-16 lg:py-20",
  top: "pt-14 sm:pt-16 lg:pt-20",
  bottom: "pb-14 sm:pb-16 lg:pb-20",
  none: "",
};

export function Section({
  theme = "light",
  spacing = "both",
  id,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={twMerge(themeStyles[theme], spacingStyles[spacing], className)}
    >
      {children}
    </section>
  );
}

export default Section;
