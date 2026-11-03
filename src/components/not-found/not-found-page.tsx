import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import Container from "@/components/ui/container";

const POPULAR_DESTINATIONS = [
  { label: "Services", href: "/services/" },
  { label: "Clients", href: "/clients/" },
  { label: "Why FIAB", href: "/why-fiab/" },
  { label: "Agentic AI", href: "/agentic-ai/" },
  { label: "Careers", href: "/careers/" },
];

export function NotFoundPage({ chrome }: { chrome: SiteChrome }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#07110d] text-white selection:bg-[#23C55E]/30 selection:text-white overflow-x-clip">
      {/* 1. Header */}
      <SiteHeader header={chrome.header} />

      {/* 2. Main 404 Hero Section */}
      <main className="relative flex-1 flex items-center justify-center py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Project Theme Background Vector & Ambient Glow */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: "url(/contact-us/contactus-hero-bg.svg)" }}
          aria-hidden="true"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#23C55E]/10 blur-[150px]"
        />

        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center px-4">
            {/* Giant Stylized 404 Watermark + Eyebrow */}
            <div className="relative select-none mb-1 sm:mb-2">
              <span
                className="block text-[120px] sm:text-[170px] md:text-[210px] lg:text-[250px] font-black leading-none tracking-tighter bg-gradient-to-b from-[#23C55E]/25 via-[#23C55E]/10 to-transparent bg-clip-text text-transparent font-mono"
                aria-hidden="true"
              >
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#23C55E]/15 border border-[#23C55E]/30 text-[#23C55E] text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-sm whitespace-nowrap shadow-[0_0_20px_rgba(35,197,94,0.15)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#23C55E] animate-pulse" />
                  Sorry! This Page Was Lost
                </span>
              </div>
            </div>

            {/* Main Headline (Live Site Data) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium leading-[1.12] tracking-tight text-white mb-4 -mt-4 sm:-mt-8">
              Oppoos... <span className="text-[#23C55E]">Page Not Found!</span>
            </h1>

            {/* Description (Live Site Data) */}
            <p className="text-[15px] sm:text-[17px] font-light leading-[1.7] text-white/70 max-w-lg mb-8 sm:mb-10">
              The page you looking for not found may be it not exist or removed.
            </p>

            {/* Common Project Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                color="green"
                size="header"
                text="Back To Home"
                href="/"
                onDark={true}
              />
              <Button
                color="white"
                size="header"
                text="Contact Us"
                href="/contact-us/"
                onDark={true}
              />
            </div>

            {/* Quick Navigation Links */}
            <div className="mt-12 pt-8 border-t border-white/[0.08] w-full max-w-md">
              <p className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
                Quick Navigation
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {POPULAR_DESTINATIONS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xs text-white/75 hover:text-[#23C55E] bg-white/[0.05] hover:bg-white/[0.1] px-3.5 py-1.5 rounded-full border border-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* 3. Site Footer */}
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}
