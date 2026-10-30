"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { HomeContent } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type NavLink = HomeContent["header"]["links"][number];

function isUrlActive(currentPath: string, targetUrl: string): boolean {
  if (!currentPath || !targetUrl) return false;
  if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) return false;

  const targetPath = targetUrl.split("#")[0].split("?")[0];
  if (!targetPath) return false;

  const cleanCurrent = currentPath.replace(/\/+$/, "") || "/";
  const cleanTarget = targetPath.replace(/\/+$/, "") || "/";

  if (cleanTarget === "/") {
    return cleanCurrent === "/";
  }

  return cleanCurrent === cleanTarget || cleanCurrent.startsWith(`${cleanTarget}/`);
}

function headerSurface(surface: "grid" | "plain", scrolled: boolean) {
  if (surface === "plain" && !scrolled) return "border-transparent bg-transparent";
  if (surface === "plain") return "border-white/5 bg-[#07110d]/95 backdrop-blur";
  return "border-white/5 bg-[#07110d]";
}

export function HomeHeader({
  header,
  surface = "grid",
  logoHref = "#top",
}: {
  header: HomeContent["header"];
  surface?: "grid" | "plain";
  logoHref?: string;
}) {
  const pathname = usePathname() || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (surface !== "plain") return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [surface]);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenLabel(null);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenLabel(null);
    }
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-30 border-b ${headerSurface(surface, scrolled)}`}>
      {surface === "grid" ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(40,92,62,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(40,92,62,0.35) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      ) : null}
      <Container size="header" className="relative flex items-center justify-between gap-6 py-5 sm:py-6 lg:py-7">
        <a href={logoHref} className="shrink-0 outline-0">
          <img src={header.logo.url} alt={header.logo.alt} className="h-10 sm:h-12 lg:h-13.75 w-auto object-contain" />
        </a>
        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden items-center gap-6 xl:gap-7.5 text-[15px] xl:text-base text-white/85 lg:flex"
        >
          {header.links.map((link) => (
            <DesktopItem
              key={link.label}
              link={link}
              open={openLabel === link.label}
              pathname={pathname}
              onOpen={setOpenLabel}
            />
          ))}
        </nav>

        {/* Updated Button Size */}
        <div className="btn-cta hidden lg:block">
          <Button
            color="green"
            size="header"
            text={header.cta.label}
            href={header.cta.url}
            className="w-[154px] !hover:bg-white !hover:text-[#121826]"
          />
        </div>

        {/* Mobile / Tablet Icon-Only Toggle Button */}
        <button
          type="button"
          className={`relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border transition-all duration-200 shadow-sm backdrop-blur-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#23C55E]/50 lg:hidden ${
            menuOpen
              ? "border-[#23C55E]/50 bg-[#23C55E]/15 text-[#23C55E] hover:border-[#23C55E]/70 hover:bg-[#23C55E]/20"
              : "border-white/15 bg-white/[0.06] text-white hover:border-white/30 hover:bg-white/[0.12]"
          }`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <div className="relative flex h-3.5 w-4.5 flex-col justify-between items-center" aria-hidden="true">
            <span
              className={`h-[2px] w-full rounded-full transition-all duration-300 ease-in-out ${
                menuOpen ? "translate-y-[6px] rotate-45 bg-[#23C55E]" : "bg-white"
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-white transition-all duration-200 ease-in-out ${
                menuOpen ? "scale-x-0 opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full transition-all duration-300 ease-in-out ${
                menuOpen ? "-translate-y-[6px] -rotate-45 bg-[#23C55E]" : "bg-white"
              }`}
            />
          </div>
        </button>
      </Container>

      {/* Mobile / Tablet Dropdown Menu */}
      {menuOpen ? (
        <div className="relative border-t border-white/10 bg-[#07110d]/98 backdrop-blur-xl shadow-2xl lg:hidden">
          <Container size="header" className="px-6 md:py-5 max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav aria-label="Mobile" className="flex flex-col divide-y divide-white/[0.08]">
              {header.links.map((link) => (
                <MobileItem
                  key={link.label}
                  link={link}
                  pathname={pathname}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}

              <div className="pt-5 mt-2 border-t-0">
                <Button
                  color="green"
                  size="header"
                  text={header.cta.label}
                  href={header.cta.url}
                  className="w-full justify-center !hover:bg-white !hover:text-[#121826] font-semibold text-center"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function DesktopItem({
  link,
  open,
  pathname,
  onOpen,
}: {
  link: NavLink;
  open: boolean;
  pathname: string;
  onOpen: (label: string | null) => void;
}) {
  const hasActiveChild = link.children.some((child) => isUrlActive(pathname, child.url));
  const isDirectActive = isUrlActive(pathname, link.url);
  const isActive = isDirectActive || hasActiveChild;

  if (link.children.length === 0) {
    return (
      <a
        href={link.url}
        className={`whitespace-nowrap transition-colors ${
          isActive ? "text-[#23C55E] font-medium" : "text-white/85 hover:text-white"
        }`}
      >
        {link.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => onOpen(link.label)} onMouseLeave={() => onOpen(null)}>
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <a
          href={link.url}
          className={`transition-colors ${
            isActive ? "text-[#23C55E] font-medium" : "text-white/85 hover:text-white"
          }`}
        >
          {link.label}
        </a>
        <button
          type="button"
          className={`transition-colors ${
            isActive ? "text-[#23C55E]" : "text-white/85 hover:text-white"
          }`}
          aria-expanded={open}
          aria-haspopup="true"
          aria-label={`${link.label} menu`}
          onClick={() => onOpen(open ? null : link.label)}
        >
          <Chevron open={open} />
        </button>
      </span>
      {open ? (
        <div className="absolute top-full left-1/2 z-40 w-56 -translate-x-1/2 pt-3">
          <ul className="rounded-lg border border-white/7 bg-[#121826] p-2 shadow-2xl">
            {link.children.map((child) => {
              const isChildActive = isUrlActive(pathname, child.url);
              return (
                <li key={child.label}>
                  <a
                    href={child.url}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isChildActive
                        ? "bg-[#23C55E]/15 text-[#23C55E] font-medium"
                        : "text-white/80 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => onOpen(null)}
                  >
                    {child.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MobileItem({
  link,
  pathname,
  onNavigate,
}: {
  link: NavLink;
  pathname: string;
  onNavigate: () => void;
}) {
  const hasActiveChild = link.children.some((child) => isUrlActive(pathname, child.url));
  const isDirectActive = isUrlActive(pathname, link.url);
  const isParentActive = isDirectActive || hasActiveChild;

  // Auto-expand if a child item is currently active
  const [open, setOpen] = useState(hasActiveChild);

  if (link.children.length === 0) {
    return (
      <div className="py-1">
        <a
          href={link.url}
          onClick={onNavigate}
          className={`flex items-center justify-between py-2.5 text-[16px] sm:text-[17px] font-medium transition-colors ${
            isDirectActive ? "text-[#23C55E] font-semibold" : "text-white/90 hover:text-white"
          }`}
        >
          <span>{link.label}</span>
          {isDirectActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-[#23C55E] shadow-[0_0_8px_#23C55E]" />
          )}
        </a>
      </div>
    );
  }

  return (
    <div className="py-1">
      <div className="flex items-center justify-between py-2.5">
        <a
          href={link.url}
          onClick={onNavigate}
          className={`text-[16px] sm:text-[17px] font-medium transition-colors ${
            isParentActive ? "text-[#23C55E] font-semibold" : "text-white/90 hover:text-white"
          }`}
        >
          {link.label}
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${link.label} menu`}
          onClick={() => setOpen((v) => !v)}
          className={`flex h-9 w-9 items-center justify-center -mr-2 rounded-full transition-colors ${
            open ? "text-[#23C55E]" : "text-white/60 hover:text-white"
          } active:scale-95`}
        >
          <Chevron open={open} />
        </button>
      </div>

      {open && (
        <ul className="mb-2.5 ml-1 space-y-1 border-l-2 border-[#23C55E]/30 pl-4">
          {link.children.map((child) => {
            const isChildActive = isUrlActive(pathname, child.url);
            return (
              <li key={child.label}>
                <a
                  href={child.url}
                  onClick={onNavigate}
                  className={`flex items-center gap-2 py-2 text-[15px] transition-colors ${
                    isChildActive
                      ? "font-semibold text-[#23C55E]"
                      : "text-white/65 hover:text-white font-normal"
                  }`}
                >
                  {isChildActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#23C55E] shadow-[0_0_6px_#23C55E]" />
                  )}
                  {child.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M4 6.5 8 10.5 12 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
