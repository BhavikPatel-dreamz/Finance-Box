/**
 * ============================================================================
 * HERO SECTIONS CENTRAL CONFIGURATION
 * ============================================================================
 */

import type { HeroConfig, HeroPageKey, HeroOverrides } from "@/components/hero/types";
import { homeContent } from "@/content/home";
import { servicesContent } from "@/content/services";
import { whyContent } from "@/content/why-fiab";
import { clientsContent } from "@/content/clients";
import { careersContent } from "@/content/careers";
import { contactUsContent } from "@/content/contact-us";
import { agenticAiContent } from "@/content/agentic-ai";
import { knowledgeHubContent } from "@/content/knowledge-hub";
import { peopleOperationsContent } from "@/content/people-operations";
import { privacyPolicyContent } from "@/content/privacy-policy";
import { termsConditionsContent } from "@/content/terms-conditions";

// ----------------------------------------------------------------------------
// 1. HOME HERO CONFIG (Has Default Data)
// ----------------------------------------------------------------------------
export const homeHeroConfig: HeroConfig = {
  variant: "home",
  background: "home",
  eyebrow: {
    text: homeContent.hero.eyebrow || "YOUR DEDICATED FINANCE DEPARTMENT",
    variant: "green-no-dash",
  },
  title: homeContent.hero.title || "Your Finance Function,",
  highlight: homeContent.hero.highlight || "Built and Run For You",
  description:
    homeContent.hero.text ||
    "Senior finance talent, modern systems, and an operating cadence designed for venture-backed and high-growth companies. From day one to exit.",
  closeLabel: homeContent.hero.closeLabel || "MONTH-END CLOSE",
  closeValue: homeContent.hero.closeValue || "3",
  closeUnit: homeContent.hero.closeUnit || "days",
  closeTrend: homeContent.hero.closeTrend || "Down from 18",
  runwayLabel: homeContent.hero.runwayLabel || "RUNWAY VISIBILITY",
  runwayValue: homeContent.hero.runwayValue || "18",
  runwayUnit: homeContent.hero.runwayUnit || "months",
  runwayTrend: homeContent.hero.runwayTrend || "Real-time rolling model",
  chartImage: "/home/chart.png",
  chartTitle: homeContent.hero.chartTitle || "Runway trend chart",
  heightClassName: "min-h-[auto] lg:min-h-[660px] xl:min-h-[771px] lg:h-auto xl:min-h-[771px]",
};

// ----------------------------------------------------------------------------
// 2. SERVICES HERO CONFIG (Has Default Data)
// ----------------------------------------------------------------------------
export const servicesHeroConfig: HeroConfig = {
  variant: "services",
  background: "services",
  eyebrow: {
    text: servicesContent.hero.eyebrow || "EXPERTISE ACROSS STAGES",
    variant: "dark",
  },
  title: servicesContent.hero.title || "Finance function built to",
  highlight: servicesContent.hero.highlight || "scale with you",
  description:
    servicesContent.hero.text ||
    "From seed-stage foundations to pre-IPO rigor, we embed senior finance professionals and modern systems into your business. No learning curves, no overhead.",
  tiers: servicesContent.hero.tiers?.map((t) => ({
    number: t.number,
    label: t.label,
    title: t.title,
    highlight: t.highlight,
    text: t.text,
  })) || [
    {
      number: "01",
      label: "STAGE 01 - FOUNDATION",
      title: "Seed to Series A",
      highlight: "Clean Foundation",
      text: "Chart of accounts, vendor setup, automated bookkeeping, and clean runway reporting.",
    },
    {
      number: "02",
      label: "STAGE 02 - MOMENTUM",
      title: "Series A to Series B",
      highlight: "Financial Engine",
      text: "Budget vs. actuals, 3-statement models, board reporting decks, and KPI dashboards.",
    },
    {
      number: "03",
      label: "STAGE 03 - SCALE",
      title: "Series B & Beyond",
      highlight: "Full Office of CFO",
      text: "Strategic forecasting, debt covenants, audit preparation, and M&A readiness.",
    },
  ],
};

// ----------------------------------------------------------------------------
// 3. WHY FIAB HERO CONFIG (Has Default Data)
// ----------------------------------------------------------------------------
export const whyHeroConfig: HeroConfig = {
  variant: "why",
  background: "why",
  titleMaxWidth: "lg:max-w-[590px]",
  eyebrow: {
    text: whyContent.hero.eyebrow || "THE FIAB DIFFERENCE",
    variant: "dark",
  },
  title: whyContent.hero.title || "Why Finance in a Box",
  highlight: whyContent.hero.highlight || "is built different",
  description:
    whyContent.hero.text ||
    "Most growing companies face an impossible choice: an expensive in-house team before they're ready, or a reactive traditional accounting firm that doesn't understand venture-backed businesses. We built the third way.",
  points: whyContent.hero.points?.map((p, idx) => ({
    number: p.number || String(idx + 1).padStart(2, "0"),
    title: p.title,
  })) || [
    { number: "01", title: "Full-Stack Finance Team" },
    { number: "02", title: "Systems Built for Velocity" },
    { number: "03", title: "Scale Up or Down Seamlessly" },
  ],
};

// ----------------------------------------------------------------------------
// 4. CLIENTS HERO CONFIG (Has Default Data)
// ----------------------------------------------------------------------------
export const clientsHeroConfig: HeroConfig = {
  variant: "clients",
  background: "clients",
  eyebrow: {
    text: clientsContent.hero.eyebrow || "CLIENT STORIES",
    variant: "dark-no-dash",
  },
  title: clientsContent.hero.title || "Real numbers.",
  highlight: clientsContent.hero.highlight || "Real scale.",
  description:
    clientsContent.hero.text ||
    "Here's what happens when high-growth companies stop treating finance as an afterthought and start running it as an engine.",
  clientProofTitle: clientsContent.hero.clientProofTitle || "TRUSTED BY 50+ COMPANIES",
  clientProofItems: clientsContent.hero.clientProofItems || [
    "Venture-backed startups",
    "Series A to pre-IPO",
    "50+ companies supported",
  ],
  stats: clientsContent.hero.stats?.map((s) => ({
    value: s.value,
    label: s.label,
  })) || [
    { value: "$500M+", label: "Venture Capital Raised" },
    { value: "10x", label: "Average Efficiency Gain" },
    { value: "99%", label: "Close Rate On-Time" },
  ],
};

// ----------------------------------------------------------------------------
// 5. CAREERS HERO CONFIG (WordPress Only)
// ----------------------------------------------------------------------------
export const careersHeroConfig: HeroConfig = {
  variant: "careers",
  background: "careers",
  titleMaxWidth: "lg:max-w-[400px]",
  eyebrow: {
    text: careersContent.hero.eyebrow || "JOIN THE TEAM",
    variant: "dark",
  },
  title: "Build the operating\nsystem",
  highlight: careersContent.hero.highlight || "for modern",
  highlight2: careersContent.hero.highlight2 || "finance",
  description:
    careersContent.hero.text ||
    "We are reimagining how finance functions operate. Join a high-performing team of finance leaders, operators, and technologists building the future of financial operations.",
  heightClassName: "min-h-[auto] lg:min-h-[660px] xl:min-h-[660px]",
};

// ----------------------------------------------------------------------------
// 6. CONTACT US HERO CONFIG (No Button)
// ----------------------------------------------------------------------------
export const contactHeroConfig: HeroConfig = {
  variant: "contact",
  background: "contact",
  eyebrow: {
    text: contactUsContent.hero.eyebrow || "GET IN TOUCH",
    variant: "green-no-dash",
  },
  title: contactUsContent.hero.title || "Let's Talk About Your",
  highlight: contactUsContent.hero.highlight || "Finance Needs",
  description:
    contactUsContent.hero.text ||
    "Whether you're looking to build your finance function from scratch, prepare for a fundraise, or optimize existing operations, we're here to help.",
  heightClassName: "min-h-[auto] sm:min-h-[460px] lg:min-h-[525px]",
};

// ----------------------------------------------------------------------------
// 7. AGENTIC AI HERO CONFIG (WordPress Only)
// ----------------------------------------------------------------------------
export const agenticAiHeroConfig: HeroConfig = {
  variant: "agentic-ai",
  background: "clients",
  titleMaxWidth: "lg:max-w-[400px]",
  eyebrow: {
    text: agenticAiContent.hero.eyebrow || "INTELLIGENT FINANCE",
    variant: "dark",
  },
  title: agenticAiContent.hero.title || "Agentic AI for",
  highlight: agenticAiContent.hero.highlight || "Finance Teams",
  description:
    agenticAiContent.hero.text ||
    "Autonomous finance agents designed to automate closing, forecasting, reconciliations, and compliance at institutional precision.",
  bullets: agenticAiContent.hero.bullets || [
    "Give your back office autonomous superpowers—safer, faster, and fully auditable",
    "Real-time visibility: Approvals, postings, tickets, and updates happen automatically",
    "Faster go-lives: Deploy in weeks, not quarters, using prebuilt playbooks",
  ],
  heightClassName: "min-h-[auto] sm:min-h-[460px] lg:min-h-[525px]",
};

// ----------------------------------------------------------------------------
// 8. KNOWLEDGE HUB HERO CONFIG (WordPress Only)
// ----------------------------------------------------------------------------
export const knowledgeHubHeroConfig: HeroConfig = {
  variant: "split",
  background: "knowledgehub",
  eyebrow: {
    text: knowledgeHubContent.hero.eyebrow || "RESOURCES & INSIGHTS",
    variant: "dark",
  },
  title: knowledgeHubContent.hero.title || "Knowledge",
  highlight: knowledgeHubContent.hero.highlight || "Hub",
  titleMaxWidth: "lg:max-w-[400px]",
  description:
    knowledgeHubContent.hero.text ||
    "Frameworks, case studies, financial models, and operational guides written by senior finance practitioners for ambitious founders.",
  heightClassName: "min-h-[auto] sm:min-h-[460px] lg:min-h-[525px]",
};

// ----------------------------------------------------------------------------
// 9. PEOPLE OPERATIONS HERO CONFIG (WordPress Only)
// ----------------------------------------------------------------------------
export const peopleOperationsHeroConfig: HeroConfig = {
  variant: "split",
  background: "clients",
  eyebrow: {
    text: peopleOperationsContent.hero.eyebrow || "PEOPLE & TALENT",
    variant: "dark",
  },
  title: peopleOperationsContent.hero.title || "People Operations",
  highlight: peopleOperationsContent.hero.highlight || "& HR Advisory",
  titleMaxWidth: "lg:max-w-[590px]",
  description:
    peopleOperationsContent.hero.text ||
    "Modern HR, payroll, benefits, and equity administration designed to support scaling teams without the administrative friction.",
  heightClassName: "min-h-[auto] sm:min-h-[460px] lg:min-h-[525px]",
};

// ----------------------------------------------------------------------------
// 10. PRIVACY POLICY HERO CONFIG
// ----------------------------------------------------------------------------
export const privacyPolicyHeroConfig: HeroConfig = {
  variant: "legal",
  background: "contact",
  title: privacyPolicyContent.hero.title || "Privacy",
  highlight: privacyPolicyContent.hero.highlight || "Policy",
  effectiveDate: privacyPolicyContent.hero.effectiveDate || "November 2026",
};

// ----------------------------------------------------------------------------
// 11. TERMS & CONDITIONS HERO CONFIG
// ----------------------------------------------------------------------------
export const termsConditionsHeroConfig: HeroConfig = {
  variant: "legal",
  background: "contact",
  title: termsConditionsContent.hero.title || "Terms &",
  highlight: termsConditionsContent.hero.highlight || "Conditions",
  effectiveDate: termsConditionsContent.hero.effectiveDate || "November 2026",
};

// ----------------------------------------------------------------------------
// 12. NOT FOUND (404) HERO CONFIG
// ----------------------------------------------------------------------------
export const notFoundHeroConfig: HeroConfig = {
  variant: "not-found",
  background: "contact",
  errorCode: "404",
  badgeText: "Sorry! This Page Was Lost",
  title: "Oppoos...",
  highlight: "Page Not Found!",
  description: "The page you looking for not found may be it not exist or removed.",
  primaryCta: {
    label: "Back To Home",
    url: "/",
    color: "green",
    size: "header",
    onDark: true,
  },
  secondaryCta: {
    label: "Contact Us",
    url: "/contact-us/",
    color: "white",
    size: "header",
    onDark: true,
  },
  quickLinks: [
    { label: "Services", href: "/services/" },
    { label: "Clients", href: "/clients/" },
    { label: "Why FIAB", href: "/why-fiab/" },
    { label: "Agentic AI", href: "/agentic-ai/" },
    { label: "Careers", href: "/careers/" },
  ],
};

// ----------------------------------------------------------------------------
// HERO CONFIG REGISTRY MAP
// ----------------------------------------------------------------------------
export const heroConfigs: Record<HeroPageKey, HeroConfig> = {
  home: homeHeroConfig,
  services: servicesHeroConfig,
  why: whyHeroConfig,
  clients: clientsHeroConfig,
  careers: careersHeroConfig,
  contact: contactHeroConfig,
  "agentic-ai": agenticAiHeroConfig,
  "knowledge-hub": knowledgeHubHeroConfig,
  "people-operations": peopleOperationsHeroConfig,
  "privacy-policy": privacyPolicyHeroConfig,
  "terms-conditions": termsConditionsHeroConfig,
  "not-found": notFoundHeroConfig,
};

export function getHeroConfig(
  pageKey: HeroPageKey,
  overrides?: HeroOverrides,
): HeroConfig {
  const base = heroConfigs[pageKey] || homeHeroConfig;
  if (!overrides) return base;

  // An explicitly passed `undefined` (e.g. WordPress has no CTA) must clear the
  // base value, not fall back to the static default. The spread already does
  // exactly that, so no per-field fallback is needed here.
  return { ...base, ...overrides };
}