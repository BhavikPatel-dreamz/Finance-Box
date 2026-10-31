"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { HomeContent } from "@/content/home";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type NavLink = HomeContent["header"]["links"][number];

function isUrlActive(
  currentPath: string,
  targetUrl: string,
  options?: { currentHash?: string }
): boolean {
  if (!currentPath || !targetUrl) return false;
  if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) return false;

  const [pathWithQuery, hash] = targetUrl.split("#");
  const targetPath = pathWithQuery.split("?")[0];

  const cleanCurrent = currentPath.replace(/\/+$/, "") || "/";
  const cleanTarget = (targetPath || "").replace(/\/+$/, "") || "/";

  // If the target URL contains an explicit anchor hash (e.g. /services/#foundation, /#about, /#team)
  if (hash) {
    const targetHash = `#${hash}`;
    const hashMatches = options?.currentHash === targetHash;
    const pathMatches = cleanTarget === "/" ? true : cleanCurrent === cleanTarget;
    return pathMatches && hashMatches;
  }

  // If target has no hash:
  if (cleanTarget === "/") {
    return cleanCurrent === "/";
  }

  return cleanCurrent === cleanTarget;
}

function headerSurface(surface: "grid" | "plain", isSticky: boolean, menuOpen: boolean) {
  if (menuOpen) return "border-white/10 bg-[#07110d]";
  if (surface === "plain" && !isSticky) return "border-transparent bg-transparent";
  if (surface === "plain") return "border-white/10 bg-[#07110d]/98 backdrop-blur-md shadow-xl";
  return "border-white/5 bg-[#07110d] shadow-lg";
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
  const [currentHash, setCurrentHash] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const [mobileOpenLabel, setMobileOpenLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(undefined);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Track location hash for anchor links like #foundation, #momentum, etc.
  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash || "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Measure header bar height to keep placeholder perfectly sized
  useEffect(() => {
    if (!barRef.current) return;
    const updateHeight = () => {
      if (barRef.current) {
        setHeaderHeight(barRef.current.offsetHeight + 1);
      }
    };
    updateHeight();

    const ro = new ResizeObserver(updateHeight);
    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, []);

  // Sticky on scroll up, hide on scroll down
  useEffect(() => {
    let lastScrollY = Math.max(0, window.scrollY);
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);

          if (currentScrollY <= 10) {
            setVisible(true);
            setScrolled(false);
          } else {
            setScrolled(true);

            const delta = currentScrollY - lastScrollY;
            if (Math.abs(delta) > 6) {
              if (delta > 0) {
                // Scrolling down -> hide header
                setVisible(false);
                setOpenLabel(null);
              } else {
                // Scrolling up -> show header
                setVisible(true);
              }
            }
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // When mobile menu opens, auto-expand only the dropdown containing the active page (if any)
  useEffect(() => {
    if (menuOpen) {
      const activeParent = header.links.find((link) =>
        link.children.some((child) => isUrlActive(pathname, child.url, { currentHash }))
      );
      setMobileOpenLabel(activeParent ? activeParent.label : null);
    } else {
      setMobileOpenLabel(null);
    }
  }, [menuOpen, pathname, currentHash, header.links]);

  const isHeaderVisible = menuOpen || visible;
  const isHeaderSticky = scrolled || menuOpen;

  return (
    <>
      {/* Placeholder to preserve document flow height when header is fixed */}
      <div
        style={{ height: headerHeight ? `${headerHeight}px` : undefined }}
        className={headerHeight === undefined ? "h-[81px] sm:h-[97px] lg:h-[112px]" : ""}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        } ${headerSurface(surface, isHeaderSticky, menuOpen)}`}
      >
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
        <div ref={barRef}>
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
                  currentHash={currentHash}
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
                onDark={true}
                className="w-[154px] hover:!bg-white hover:!text-[#121826]"
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
        </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {menuOpen ? (
        <div className="relative border-t border-white/10 bg-[#07110d]/98 backdrop-blur-xl shadow-2xl lg:hidden">
          <Container size="header" className="px-6 md:py-5 max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav aria-label="Mobile" className="flex flex-col divide-y divide-white/[0.08] pb-6">
              {header.links.map((link) => (
                <MobileItem
                  key={link.label}
                  link={link}
                  open={mobileOpenLabel === link.label}
                  onToggle={() =>
                    setMobileOpenLabel((current) => (current === link.label ? null : link.label))
                  }
                  pathname={pathname}
                  currentHash={currentHash}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}

              <div className="pt-5 mt-2 border-t-0">
                <Button
                  color="green"
                  size="header"
                  text={header.cta.label}
                  href={header.cta.url}
                  onDark={true}
                  className="w-full justify-center hover:!bg-white hover:!text-[#121826] font-semibold text-center"
                  onClick={() => setMenuOpen(false)}
                />
              </div>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  </>
  );
}

function DesktopItem({
  link,
  open,
  pathname,
  currentHash,
  onOpen,
}: {
  link: NavLink;
  open: boolean;
  pathname: string;
  currentHash: string;
  onOpen: (label: string | null) => void;
}) {
  const hasActiveChild = link.children.some((child) => isUrlActive(pathname, child.url, { currentHash }));
  const isDirectActive = isUrlActive(pathname, link.url, { currentHash });
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
        <div className="absolute top-full left-1/2 z-50 w-60 -translate-x-1/2 pt-2.5">
          <ul className="rounded-xl border border-white/10 bg-[#121826]/98 backdrop-blur-xl p-1.5 shadow-2xl space-y-0.5">
            {link.children.map((child) => {
              const isChildActive = isUrlActive(pathname, child.url, { currentHash });
              return (
                <li key={child.label}>
                  <a
                    href={child.url}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 ${
                      isChildActive
                        ? "bg-[#23C55E]/15 text-[#23C55E] font-medium"
                        : "text-white/80 hover:bg-white/[0.08] hover:text-white font-normal"
                    }`}
                    onClick={() => onOpen(null)}
                  >
                    <span>{child.label}</span>
                    {isChildActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#23C55E] shadow-[0_0_6px_#23C55E]" />
                    )}
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
  open,
  onToggle,
  pathname,
  currentHash,
  onNavigate,
}: {
  link: NavLink;
  open: boolean;
  onToggle: () => void;
  pathname: string;
  currentHash: string;
  onNavigate: () => void;
}) {
  const hasActiveChild = link.children.some((child) => isUrlActive(pathname, child.url, { currentHash }));
  const isDirectActive = isUrlActive(pathname, link.url, { currentHash });
  const isParentActive = isDirectActive || hasActiveChild;

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
          onClick={onToggle}
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
            const isChildActive = isUrlActive(pathname, child.url, { currentHash });
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
