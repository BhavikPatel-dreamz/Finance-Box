"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home";
import { GreenButton } from "@/components/ui/green-button";

type NavLink = HomeContent["header"]["links"][number];

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
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={logoHref} className="shrink-0">
          <img src={header.logo.url} alt={header.logo.alt} className="h-10 w-auto" />
        </a>
        <nav ref={navRef} aria-label="Primary" className="hidden items-center gap-7 text-sm text-white/85 md:flex">
          {header.links.map((link) => (
            <DesktopItem key={link.label} link={link} open={openLabel === link.label} onOpen={setOpenLabel} />
          ))}
        </nav>
        
        {/* Updated Button Size */}
        <div className="hidden md:block">
          <GreenButton
            label={header.cta.label}
            href={header.cta.url}
            size={{
              width: "154px",
              height: "44px",
              paddingX: "20px",
              paddingY: "10px",
              fontSize: "14px"
            }}
            className="min-h-[44px]"
          />
        </div>

        <button
          type="button"
          className="relative rounded-full border border-white/15 px-3 py-2 text-sm text-white md:hidden"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          Menu
        </button>
      </div>
      {menuOpen ? (
        <nav aria-label="Mobile" className="relative flex flex-col gap-2 border-t border-white/10 px-6 py-4 text-sm md:hidden">
          {header.links.map((link) => (
            <MobileItem key={link.label} link={link} onNavigate={() => setMenuOpen(false)} />
          ))}
          <a href={header.cta.url} className="mt-2 font-semibold text-[#3DDC84]" onClick={() => setMenuOpen(false)}>
            {header.cta.label}
          </a>
        </nav>
      ) : null}
    </header>
  );
}

function DesktopItem({
  link,
  open,
  onOpen,
}: {
  link: NavLink;
  open: boolean;
  onOpen: (label: string | null) => void;
}) {
  if (link.children.length === 0) {
    return (
      <a href={link.url} className="hover:text-white">
        {link.label}
      </a>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => onOpen(link.label)} onMouseLeave={() => onOpen(null)}>
      <span className="inline-flex items-center gap-1.5">
        <a href={link.url} className="hover:text-white">
          {link.label}
        </a>
        <button
          type="button"
          className="hover:text-white"
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
          <ul className="rounded-2xl border border-white/10 bg-[#0d1612] p-2 shadow-2xl">
            {link.children.map((child) => (
              <li key={child.label}>
                <a href={child.url} className="block rounded-xl px-3 py-2 text-white/80 hover:bg-white/5 hover:text-white" onClick={() => onOpen(null)}>
                  {child.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function MobileItem({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  if (link.children.length === 0) {
    return (
      <a href={link.url} onClick={onNavigate}>
        {link.label}
      </a>
    );
  }
  return (
    <div>
      <div className="flex items-center justify-between py-1">
        <a href={link.url} onClick={onNavigate}>
          {link.label}
        </a>
        <button type="button" aria-expanded={open} aria-label={`${link.label} menu`} onClick={() => setOpen((value) => !value)}>
          <Chevron open={open} />
        </button>
      </div>
      {open ? (
        <ul className="mt-1 mb-2 space-y-2 border-l border-white/10 pl-3 text-white/70">
          {link.children.map((child) => (
            <li key={child.label}>
              <a href={child.url} onClick={onNavigate}>
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="M4 6.5 8 10.5 12 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}