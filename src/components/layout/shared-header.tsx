"use client";

import { usePathname } from "next/navigation";
import { HomeHeader } from "@/components/home/home-header";
import type { SiteHeaderContent } from "@/lib/wordpress/site-chrome";

export function SharedHeader({ header }: { header: SiteHeaderContent }) {
  const pathname = usePathname() || "";
  const isHome = pathname === "/" || pathname === "";

  return (
    <HomeHeader
      header={header}
      surface="plain"
      logoHref={isHome ? "#top" : "/"}
      placeholder={false}
    />
  );
}
