import React from "react";
import { twMerge } from "tailwind-merge";

export type SectionTheme = "light" | "dark" | "faq" | "cream" | "lightblue";
export type SectionSpacing = "both" | "top" | "bottom" | "none" | "space50" | "space60";

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
  faq: "bg-[#EDE9E6] text-[#121826]",
  cream:"bg-[#EDE9E6] text-[#121826]",
  lightblue: "bg-[#191F2D] text-white"
};

const spacingStyles: Record<SectionSpacing, string> = {
  both: "py-14 sm:py-16 lg:py-20",
  top: "pt-14 sm:pt-16 lg:pt-20",
  bottom: "pb-14 sm:pb-16 lg:pb-20",
  space50: "py-10 sm:py-12.5",
  space60: "py-10 sm:py-12.5 lg:py-15",
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
