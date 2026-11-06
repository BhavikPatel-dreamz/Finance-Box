import { HomeHeader } from "@/components/home/home-header";
import type { SiteHeaderContent } from "@/lib/wordpress/site-chrome";

/**
 * Shared site header. The bar itself is `fixed`; `HomeHeader` renders an
 * in-flow placeholder of the same height, so the header sits on top of
 * whatever background contains it (the hero section, or `StandaloneHeader`).
 */
export function SiteHeader({
  header,
  placeholder = true,
  surface = "plain",
}: {
  header: SiteHeaderContent;
  placeholder?: boolean;
  surface?: "grid" | "plain";
}) {
  return <HomeHeader header={header} surface={surface} logoHref="/" placeholder={placeholder} />;
}

/** Dark band for pages whose first section is not a hero (or that have no sections). */
export function StandaloneHeader({ children }: { children: React.ReactNode }) {
  return <div className="relative bg-[#121826] text-white">{children}</div>;
}
