# Migration Plan: Figma Design Fidelity onto Headless WordPress Engine

> **Document Version:** 1.0.0  
> **Status:** Analysis & Architecture Specification Only (No source files modified)  
> **Target Branch:** `staging` (Source of Truth for Data, GraphQL, Routing, Content Flow)  
> **Design Reference:** `figma-design` (Source of Truth for UI, Styling, Layouts, Hero System)  
> **Common Ancestor:** Commit `12f10fc` (*"404 page"*)

---

## Executive Summary

The project diverged at commit `12f10fc`:
* **`staging`** introduced PR #1 (`headless-wordpress-integration`), converting the architecture into a dynamic ACF Flexible Content page-builder (`PageFrame` + `SectionRenderer`) driven by live WordPress GraphQL queries.
* **`figma-design`** introduced 4 subsequent commits (`f5417f4`, `91e24fd`, `7302dfb`, `15b9785`) that added a centralized Hero management system (`src/components/hero/`, `src/config/hero.config.ts`), polished footer and card interactions, updated accordion padding, and refined legal link styles.

The goal of this migration is to achieve **100% visual and behavioral parity with `figma-design`** while preserving **100% of the WordPress GraphQL data flow, caching, previewing, and dynamic route architecture** established on `staging`.

---

## 1. Git Diff & File Classification

Diff comparison between `12f10fc`, `figma-design`, and `staging`:
* `12f10fc...figma-design`: 30 files changed
* `12f10fc...staging`: 218 files changed / created

### Category A: Staging-Only Files (Data / Routing / GraphQL / API / Tooling)
> **Constraint:** These files MUST NOT be modified or reverted to `figma-design`. They power the headless architecture.

| File / Subsystem | Purpose in Staging |
|---|---|
| `src/app/[[...slug]]/page.tsx` | Master dynamic catch-all route rendering WordPress pages via `SectionRenderer` and `PageFrame`. |
| `src/app/api/preview/route.ts` & `exit/route.ts` | Next.js Draft Mode preview handlers for WordPress drafts. |
| `src/app/api/revalidate/route.ts` | On-demand cache revalidation endpoint for WordPress webhook triggers. |
| `src/app/blog/**` (3 files) | Dynamic WordPress Blog archive, pagination, and post pages. |
| `src/app/case-study/**` (2 files) | Dynamic WordPress Case Studies archive and single pages. |
| `src/app/team/**` (2 files) | Dynamic WordPress Team directory and member detail pages. |
| `src/app/privacy-policy/page.tsx` & `terms-conditions/page.tsx` | Static wrapper routes passing WordPress `chrome` to legal layouts. |
| `src/app/not-found.tsx` & `sitemap.ts` | Global 404 handler and dynamic XML sitemap generator. |
| `src/lib/wordpress/**` (17 files) | GraphQL client, preview cookies, link resolution, rich text parsers, site chrome loader, schema, and generated types. |
| `src/lib/wordpress/queries/**` (50+ files) | All `.graphql` queries, fragments, and ACF layout fragments. |
| `src/lib/page-builder/**` (3 files) | Type definitions, layout typenames, and fragment mappings. |
| `src/components/page-builder/**` (4 files) | `section-registry.ts`, `section-renderer.tsx`, `section-variants.ts`, `section-fallback.tsx`. |
| `src/components/sections/**` (46 files) | ACF layout adapter components registered with `SectionRenderer`. |
| `src/components/blog/**`, `case-studies/**`, `team/**`, `content/**` | Dynamic WordPress post cards, team cards, and rich text formatters. |
| `scripts/**` (3 scripts) | `check-sections.mjs`, `fetch-schema.mjs`, `section-inventory.mjs`. |
| `codegen.ts`, `next.config.ts`, `package.json`, `package-lock.json`, `.env.example` | Build tooling and dependencies. |

---

### Category B: Figma-Only Files (UI Components, Styles, Config)
> **Action:** These files can be safely copied directly from `figma-design` into `staging`.

| File Path | Description / Purpose | Source Commit |
|---|---|---|
| `docs/hero-management.md` | Documentation for centralized Hero system configuration. | `f5417f4` |
| `src/config/hero.config.ts` | Centralized hero content, typography, badges, metrics, and variant definitions. | `f5417f4` |
| `src/components/ui/rise-glow.tsx` | Green radial rise-glow animation utility for cards and buttons. | `f5417f4` |
| `src/components/ui/accordion.tsx` | Accordion with mobile padding refinement (`py-3 px-4 md:p-8`). | `7302dfb` |
| `src/components/hero/hero-section.tsx` | Master `<HeroSection />` component routing to modular variants. | `f5417f4` |
| `src/components/hero/index.ts` | Public export interface for hero module. | `f5417f4` |
| `src/components/hero/types.ts` | TypeScript types for all hero configs, buttons, tiers, proof points, stats. | `f5417f4` |
| `src/components/hero/utils.ts` | Background resolution and header format utilities. | `f5417f4` |
| `src/components/hero/variants/home-hero.tsx` | High-impact split dashboard hero with Close card, Runway card, and Chart. | `f5417f4` |
| `src/components/hero/variants/services-hero.tsx` | 2-column split hero with numbered tier cards (`01`, `02`, `03`) & gradient divider. | `f5417f4` |
| `src/components/hero/variants/why-hero.tsx` | 2-column hero with 3-column frosted glass pill strip. | `f5417f4` |
| `src/components/hero/variants/clients-hero.tsx` | Centered hero with client proof bullets and `$500M+`, `10x`, `99%` metrics. | `f5417f4` |
| `src/components/hero/variants/careers-hero.tsx` | 2-column split hero supporting dual green highlights (`highlight` + `highlight2`). | `f5417f4` |
| `src/components/hero/variants/contact-hero.tsx` | Centered minimalist high-impact hero. | `f5417f4` |
| `src/components/hero/variants/agentic-ai-hero.tsx` | Split hero with square green bullet points and CTA. | `f5417f4` |
| `src/components/hero/variants/split-hero.tsx` | General-purpose 2-column hero for Knowledge Hub and People Operations. | `f5417f4` |
| `src/components/hero/variants/legal-hero.tsx` | Compact centered hero banner with effective date display. | `f5417f4` |
| `src/components/hero/variants/not-found-hero.tsx` | 404 hero with watermark `404`, pulsing badge, and quick navigation pills. | `f5417f4` |
| `src/components/hero/variants/centered-hero.tsx` | Universal centered fallback hero layout. | `f5417f4` |

---

### Category C: Overlapping Files Requiring Manual Reconciliation
> **Action:** These 11 files changed in both branches (or were renamed/split on staging). Merging them requires integrating the Figma design changes into the staging component architecture.

| Staging File | Figma File | Nature of Conflict & Resolution Plan |
|---|---|---|
| `src/components/home/home-sections.tsx` | `src/components/home/home-page.tsx` | **Conflict:** In `figma-design`, `HomePage` was a monolithic page that had Hero componentization (`f5417f4`) and major design updates to `Difference` (3-column grid), `Growth`, and `HomeFooter` (`91e24fd`). On `staging`, it was renamed to `home-sections.tsx` and chopped into individual exported section components.<br>**Resolution:** Update `HomeDifference`, `HomeGrowth`, and `HomeDecisions` in `home-sections.tsx` to match the exact JSX and Tailwind classes from Figma commit `91e24fd`. |
| `src/components/layout/site-footer.tsx` | `src/components/home/home-page.tsx` (`HomeFooter`) | **Conflict:** In `staging`, `SiteFooter` renders standard links from WordPress `chrome.footer`. In `figma-design` (`91e24fd`), `HomeFooter` was redesigned with gradient `bg-[linear-gradient(180deg,#121826_38.14%,#141D32_93.71%)]`, brand info column, mailto button with SVG circle, responsive columns, and green underline hover transitions.<br>**Resolution:** Upgrade `SiteFooter` in `site-footer.tsx` with the Figma styling, while retaining WordPress `chrome.footer` data mapping. |
| `src/components/layout/site-header.tsx` | Embedded Hero Header | **Conflict:** In `staging`, `SiteHeader` wraps `HomeHeader` and runs through `PageFrame`. On `figma-design`, `HomeHeader` is rendered directly inside `HeroSection` with `surface="plain"` or `"grid"`.<br>**Resolution:** Ensure `HeroSection` accepts an optional `headerNode?: ReactNode`. When rendered via `SectionRenderer`, the WordPress `header` node is rendered inside `HeroSection` without adding an extra outer bar. |
| `src/components/layout/page-frame.tsx` | N/A (Figma used `#07090f` body) | **Conflict:** `PageFrame` hardcodes `bg-white text-[#16181d]`. In `figma-design`, the site canvas is `#07090f` dark mode.<br>**Resolution:** Update `PageFrame` wrapper to `bg-[#07090f] text-white` (or remove the conflicting `bg-white text-[#16181d]`), letting individual light sections (like legal body) declare their own backgrounds. |
| `src/components/legal/legal-page-layout.tsx` | `src/components/legal/legal-page-layout.tsx` | **Conflict:** Staging replaced the hero with `ArticleHero` and added `chrome: SiteChrome`. Figma commit `15b9785` added `LINK_CLASS` (smooth underline hover transitions) and used `HeroSection` variant `"legal"`.<br>**Resolution:** Use `HeroSection` with `variant: "legal"` inside `LegalPageLayout`, keep the `chrome` footer support, and apply the Figma `LINK_CLASS` styling to all content links. |
| `src/components/not-found/not-found-page.tsx` | `src/components/not-found/not-found-page.tsx` | **Conflict:** Staging inlined the 404 markup. Figma uses `<HeroSection page="not-found" />` and `<HomeFooter />`.<br>**Resolution:** Have `NotFoundPage` render `<HeroSection page="not-found" />` (passing `chrome.header` if available) and `<SiteFooter footer={chrome.footer} />`. |
| `src/components/people-operations/people-operations-sections.tsx` | `src/components/people-operations/people-operations-page.tsx` | **Conflict:** Figma commit `91e24fd` fixed responsive card order (`order-first lg:order-none`) and text container widths on `PeopleOperationsWhatWeDo`.<br>**Resolution:** Port the responsive layout classes from `91e24fd` into `people-operations-sections.tsx`. |
| `src/components/services/services-sections.tsx` | `src/components/services/services-page.tsx` | **Conflict:** In Figma, hero used `HeroSection page="services"`. In staging, it uses `ServicesBanner`.<br>**Resolution:** Update `services-banner-section.tsx` to render `HeroSection` with `variant="services"`. |
| `src/components/why/why-sections.tsx` | `src/components/why/why-page.tsx` | **Conflict:** In Figma, hero used `HeroSection page="why"`. In staging, it uses `WhyHero`.<br>**Resolution:** Update `why-fiab-banner-section.tsx` to render `HeroSection` with `variant="why"`. |
| `src/components/clients/clients-sections.tsx` | `src/components/clients/clients-page.tsx` | **Conflict:** In Figma, hero used `HeroSection page="clients"`. In staging, it uses `ClientsBanner`.<br>**Resolution:** Update `clients-banner-section.tsx` to render `HeroSection` with `variant="clients"`. |
| `src/components/careers/careers-sections.tsx`, `contact-sections.tsx`, `agentic-ai-sections.tsx`, `knowledge-hub-sections.tsx` | Respective Figma `*-page.tsx` files | **Conflict:** Heroes were extracted into `CommonBannerSection` and `ContactBannerSection` in staging, losing Figma variant specifics.<br>**Resolution:** Map respective banner section definitions to render `HeroSection` with their exact Figma variant. |

---

## 2. WordPress ACF Layout to Figma Component Mapping

Every layout rendered by `SectionRenderer` (46 layouts total) maps to a Figma-approved component.

### Hero Sections (Rendered at `index === 0` with header)

| WordPress Layout Key | Current Staging File | Figma Target Component | Layout Variant Key |
|---|---|---|---|
| `HomeBannerSection` | `home-banner-section.tsx` | `HeroSection` / `HomeHeroVariant` | `"home"` |
| `ServicesBannerSection` | `services-banner-section.tsx` | `HeroSection` / `ServicesHeroVariant` | `"services"` |
| `WhyFiabBannerSection` | `why-fiab-banner-section.tsx` | `HeroSection` / `WhyHeroVariant` | `"why"` |
| `ClientsBannerSection` | `clients-banner-section.tsx` | `HeroSection` / `ClientsHeroVariant` | `"clients"` |
| `CommonBannerSection` (Careers) | `common-banner-section.tsx` | `HeroSection` / `CareersHeroVariant` | `"careers"` |
| `CommonBannerSection` (Agentic AI) | `common-banner-section.tsx` | `HeroSection` / `AgenticAiHeroVariant` | `"agentic-ai"` |
| `CommonBannerSection` (Knowledge Hub) | `common-banner-section.tsx` | `HeroSection` / `SplitHeroVariant` | `"split"` |
| `CommonBannerSection` (People Ops) | `common-banner-section.tsx` | `HeroSection` / `SplitHeroVariant` | `"split"` |
| `ContactBannerSection` | `contact-banner-section.tsx` | `HeroSection` / `ContactHeroVariant` | `"contact"` |

### Body Sections (Standard In-Page Rows)

| WordPress Layout Key | Staging File (`src/components/sections/`) | Figma Source Component | Target Module |
|---|---|---|---|
| `AboutAgenticSection` | `about-agentic-section.tsx` | `AgenticAbout` | `agentic-ai-sections.tsx` |
| `AgenticOfficialPartnerStack` | `agentic-official-partner-stack.tsx` | `PartnersSection` | `ui/partners-section.tsx` |
| `AgenticOpsComplianceSection` | `agentic-ops-compliance-section.tsx` | `AgenticOpsCompliance` | `agentic-ai-sections.tsx` |
| `AgenticPeopleOpsPayrollItSection` | `agentic-people-ops-payroll-it-section.tsx` | `AgenticPeopleOps` | `agentic-ai-sections.tsx` |
| `AgenticProvenArchitectureSection` | `agentic-proven-architecture-section.tsx` | `AgenticProvenArchitecture` | `agentic-ai-sections.tsx` |
| `CareersBenefitsSection` | `careers-benefits-section.tsx` | `CareersBenefits` | `careers-sections.tsx` |
| `CareersStandOutSection` | `careers-stand-out-section.tsx` | `CareersStandOut` | `careers-sections.tsx` |
| `CareersWhyWorkSection` | `careers-why-work-section.tsx` | `CareersWhyWork` | `careers-sections.tsx` |
| `CaseStudySection` | `case-study-section.tsx` | `KnowledgeHubCaseStudies` | `knowledge-hub-sections.tsx` |
| `ClientsFeaturedCaseStudiesSection`| `clients-featured-case-studies-section.tsx`| `ClientsCaseStudies` | `clients-sections.tsx` |
| `ClientsTestimonialsSection` | `clients-testimonials-section.tsx` | `ClientsTestimonials` | `clients-sections.tsx` |
| `ClientsTrustedCompaniesSection` | `clients-trusted-companies-section.tsx` | `ClientsTrustedCompanies` | `clients-sections.tsx` |
| `ClientsWhereFiabWorksSection` | `clients-where-fiab-works-section.tsx` | `ClientsWhereFiabWorks` | `clients-sections.tsx` |
| `ContactConnectedSection` | `contact-connected-section.tsx` | `ContactConnected` | `contact-sections.tsx` |
| `ContactFormSection` | `contact-form-section.tsx` | `ContactFormBlock` | `contact-sections.tsx` |
| `CtaSection` (Home) | `cta-section.tsx` | `HomePressure` | `home-sections.tsx` |
| `CtaSection` (Why) | `cta-section.tsx` | `WhyFooterCta` | `why-sections.tsx` |
| `CtaSection` (Other Pages) | `cta-section.tsx` | `FooterHero` | `ui/footer-hero.tsx` |
| `FaqSection` | `faq-section.tsx` | `FaqBlock` (using updated `Accordion`) | `ui/accordion.tsx` |
| `HomeClientPerspectiveSection` | `home-client-perspective-section.tsx` | `HomeDecisions` | `home-sections.tsx` |
| `HomeFinanceThatGrowsSection` | `home-finance-that-grows-section.tsx` | `HomeGrowth` (with `91e24fd` layout) | `home-sections.tsx` |
| `HomeLeadershipSection` | `home-leadership-section.tsx` | `Leadership` | `home/leadership.tsx` |
| `HomeWhatMakesFiabDifferentSection`| `home-what-makes-fiab-different-section.tsx`| `HomeDifference` (with `91e24fd` 3-col grid) | `home-sections.tsx` |
| `HomeWhenFinanceMattersSection` | `home-when-finance-matters-section.tsx` | `Founders` | `home/founders.tsx` |
| `JoinWaitlistSection` | `join-waitlist-section.tsx` | `KnowledgeHubNewsletter` / `AgenticWaitlist` | `knowledge-hub-sections.tsx` |
| `OurBlogSection` | `our-blog-section.tsx` | `KnowledgeHubBlogs` | `knowledge-hub-sections.tsx` |
| `PeopleOperationsIntroSection` | `people-operations-intro-section.tsx` | `PeopleOperationsIntro` | `people-operations-sections.tsx` |
| `PeopleOperationsWhatWeDoSection` | `people-operations-what-we-do-section.tsx` | `PeopleOperationsWhatWeDo` (`91e24fd` order) | `people-operations-sections.tsx` |
| `PeopleOperationsWhereWeHelpSection`| `people-operations-where-we-help-section.tsx`| `PeopleOperationsWhereWeHelp` | `people-operations-sections.tsx` |
| `ServicesFindYourStageSection` | `services-find-your-stage-section.tsx` | `ServicesStages` | `services-sections.tsx` |
| `ServicesFractionalCfoSection` | `services-fractional-cfo-section.tsx` | `ServicesCfo` | `services-sections.tsx` |
| `ServicesInvestorsSection` | `services-investors-section.tsx` | `ServicesInvestors` | `services-sections.tsx` |
| `ServicesOperatingCadenceSection` | `services-operating-cadence-section.tsx` | `ServicesProcess` / `CareersHowWeHire` | `services-sections.tsx` |
| `ServicesTiersInDepthSection` | `services-tiers-in-depth-section.tsx` | `ServicesTiers` | `services-sections.tsx` |
| `SimpleCtaSection` | `simple-cta-section.tsx` | `KnowledgeHubResources` | `knowledge-hub-sections.tsx` |
| `TeamMembersSection` | `team-members-section.tsx` | `WhyTeam` | `why-sections.tsx` |
| `WhyFiabComparisonSection` | `why-fiab-comparison-section.tsx` | `WhyCompare` | `why-sections.tsx` |
| `WhyFiabExistsSection` | `why-fiab-exists-section.tsx` | `WhyAbout` | `why-sections.tsx` |
| `WhyFiabHowWeWorkSection` | `why-fiab-how-we-work-section.tsx` | `WhyHowWeWork` | `why-sections.tsx` |
| `WhyFiabLetsTalkSection` | `why-fiab-lets-talk-section.tsx` | `WhyTalk` | `why-sections.tsx` |
| `WhyFiabTrustedBySection` | `why-fiab-trusted-by-section.tsx` | `TrustedBy` | `home/trusted-by.tsx` |
| `YourOwnAgenticSection` | `your-own-agentic-section.tsx` | `AgenticBuildYourOwn` | `agentic-ai-sections.tsx` |

---

## 3. Figma Component Props vs WordPress GraphQL Data (Gap Analysis)

The staging codebase handles data merging via `fromSection(mergeFn, staticFallback, acfData)`. Below is the audit of what fields each Figma component expects vs what WordPress GraphQL delivers:

### A. Home Hero (`HomeHeroVariant`)
* **Expected by Figma:**
  * `eyebrow` (string / object)
  * `title` & `highlight`
  * `description`
  * `primaryCta` (`label`, `url`, `color`)
  * Month-End Close Card: `closeLabel`, `closeValue`, `closeUnit`, `closeTrend`
  * Runway Card: `runwayLabel`, `runwayValue`, `runwayUnit`, `runwayTrend`
  * Chart Card: `chartTitle`, `chartImage`
  * Floating CTA: `label`, `url`, `color`
* **Provided by WP GraphQL (`HomeBannerSectionFragment`):**
  * `title`, `subTitle`, `description`
  * `ctaButton { title, url, target }`
  * `floatingCtaButton { title, url, target }`
  * `statCards { label, note, value }` (generic repeater)
* **Gaps & Fallback Strategy:**
  1. WP sends a generic `statCards` list rather than explicit close vs runway fields. `mergeHome` already handles this by extracting `statCards[0]` into close and `statCards[1]` into runway.
  2. WP does not supply the chart image or chart title. The component must retain the fallback `/home/chart.png` and default title from `homeContent.hero`.
  3. Green text highlight is handled by splitting title or checking against default strings.

### B. Services Hero (`ServicesHeroVariant`)
* **Expected by Figma:**
  * `eyebrow`
  * `title` & `highlight`
  * `description`
  * `primaryCta` & `secondaryCta`
  * `tiers` (repeater of 3 cards: `number`, `label`, `title`, `highlight`, `text`)
* **Provided by WP GraphQL (`ServicesBannerSectionFragment`):**
  * `title`, `subTitle`, `description`
  * `primaryCtaButton`, `secondaryCtaButton`
  * `tierCards { label, title, description }`
* **Gaps & Fallback Strategy:**
  1. WP `tierCards` lacks `number` (e.g. `"01"`, `"02"`, `"03"`). Fallback logic maps index `0 -> "01"`, `1 -> "02"`, `2 -> "03"`.
  2. WP lacks separate `highlight` for tier cards. Fallback merges with static `servicesContent.banner.tiers`.

### C. Why FIAB Hero (`WhyHeroVariant`)
* **Expected by Figma:**
  * `eyebrow`, `title`, `highlight`, `description`, `primaryCta`
  * `points` (repeater of 3 badges: `number`, `title`)
* **Provided by WP GraphQL (`WhyFiabBannerSectionFragment`):**
  * `title`, `subTitle`, `description`, `ctaButton`
  * `highlights { number, title }`
* **Gaps & Fallback Strategy:**
  * Exact 1-to-1 match. When WP `highlights` has items, it maps directly to `points`.

### D. Clients Hero (`ClientsHeroVariant`)
* **Expected by Figma:**
  * `eyebrow`, `title`, `highlight`, `description`, `primaryCta`
  * `clientProofTitle` (string)
  * `clientProofItems` (array of bullet strings)
  * `stats` (array of `{ value, label }`)
* **Provided by WP GraphQL (`ClientsBannerSectionFragment`):**
  * `title`, `subTitle`, `description`, `ctaButton`
  * `clientProofTitle`
  * `clientProofItems { item }`
  * `stats { label, value }`
* **Gaps & Fallback Strategy:**
  * 1-to-1 match.

### E. Agentic AI & Careers Heroes (`CommonBannerSectionFragment`)
* **Expected by Figma:**
  * *Careers:* `title`, `highlight`, `highlight2`, `description`, `primaryCta`
  * *Agentic AI:* `title`, `highlight`, `description`, `bullets` (array of bullet strings), `primaryCta`
  * *Split (Knowledge Hub / People Ops):* `title`, `highlight`, `description`, `primaryCta`
* **Provided by WP GraphQL (`CommonBannerSectionFragment`):**
  * `title`, `subTitle`, `description`, `primaryCtaButton`, `secondaryCtaButton`
* **Gaps & Fallback Strategy:**
  1. WP `CommonBannerSection` does **not** have a `bullets` repeater field in GraphQL. Agentic AI bullets must fall back to `hero.config.ts` or `agenticAiContent.hero.bullets`.
  2. WP lacks `highlight2` for Careers. Careers multi-line highlight falls back to `careersHeroConfig.highlight2`.

### F. Legal Hero (`LegalHeroVariant`)
* **Expected by Figma:**
  * `title`, `highlight`, `effectiveDate`
* **Provided by WP GraphQL / Static Content:**
  * Handled via `LegalDocContent` (`content.hero.title`, `content.hero.highlight`, `content.hero.effectiveDate`).
* **Gaps & Fallback Strategy:**
  * Direct 1-to-1 match.

### G. 404 Hero (`NotFoundHeroVariant`)
* **Expected by Figma:**
  * `errorCode` (`"404"`), `badgeText`, `title`, `highlight`, `description`, `quickLinks`
* **Provided by Static Content / Config:**
  * Configured in `notFoundHeroConfig` in `src/config/hero.config.ts`.
* **Gaps & Fallback Strategy:**
  * Direct 1-to-1 match.

---

## 4. Global Styling, Fonts & Background Theme Comparison

### A. Root Layout & CSS Variables
* **`src/app/globals.css`** is identical on both branches:
  ```css
  :root {
    --background: #07090f;
    --foreground: #f5f7fb;
    --muted: #a7b0be;
    --border: rgba(255, 255, 255, 0.12);
    --accent: #39e58c;
  }
  body {
    background: var(--background);
    color: var(--foreground);
    font-family: var(--font-dm-sans), "DM Sans", sans-serif;
  }
  ```
* **Fonts:** `dmSans` and `dmMono` loaded via `@/app/fonts` in `RootLayout`.

### B. The Root Canvas Contradiction (`PageFrame` Issue)
* **The Problem:** In `staging`, `src/components/layout/page-frame.tsx` declares:
  ```tsx
  <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-[#16181d]">
  ```
  This single line forces the entire website background to be **white**, completely breaking the dark `#07090f` / `#121826` aesthetic of the Figma designs.
* **The Fix:**
  Change `PageFrame` to:
  ```tsx
  <div className="flex min-h-screen flex-col overflow-x-clip bg-[#07090f] text-white">
  ```
  Only pages that are intentionally light (such as Legal reading views) will declare their own inner white container (`bg-white text-[#16181d]`), exactly as they did in `figma-design`.

---

## 5. Page-by-Page Migration Plan & Risk Matrix

### Page 1: Home (`/`)
* **Components to Reconcile:**
  1. `src/components/sections/home-banner-section.tsx`: Replace inline `HomeHero` with `<HeroSection page="home" headerNode={header} overrides={...} />`.
  2. `src/components/home/home-sections.tsx`:
     * Update `HomeDifference` with commit `91e24fd` classes (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, updated padding, hover lines).
     * Update `HomeGrowth` with `91e24fd` layout refinements.
     * Ensure `HomeFooter` styles are ported into `src/components/layout/site-footer.tsx`.
* **Data Flow:** Uses `mergeHome` to blend `HomeBannerSectionFragment`, `HomeWhenFinanceMattersSectionFragment`, etc.
* **Risks:**
  * *High Risk:* If `headerNode` is rendered twice (once by `PageFrame` and once by `HeroSection`).
  * *Mitigation:* Ensure `SectionRenderer` suppresses `<StandaloneHeader>` when `firstIsHero === true`, and passes `header` into `HeroSection`.

---

### Page 2: Services (`/services/`)
* **Components to Reconcile:**
  1. `src/components/sections/services-banner-section.tsx`: Render `<HeroSection page="services" headerNode={header} overrides={...} />`.
  2. `src/components/sections/services-tiers-in-depth-section.tsx`: Ensure dark background styling is preserved.
* **Data Flow:** Uses `mergeServices` with `ServicesBannerSectionFragment`.
* **Risks:**
  * *Medium Risk:* WP `tierCards` repeater has fewer fields than Figma tier items.
  * *Mitigation:* Default tier fallback data from `servicesHeroConfig` ensures complete display.

---

### Page 3: Why FIAB (`/why-fiab/`)
* **Components to Reconcile:**
  1. `src/components/sections/why-fiab-banner-section.tsx`: Render `<HeroSection page="why" headerNode={header} overrides={...} />`.
  2. `src/components/sections/why-fiab-comparison-section.tsx`: Verify table row contrasts against dark background.
* **Data Flow:** Uses `mergeWhy` with `WhyFiabBannerSectionFragment`.
* **Risks:**
  * *Low Risk:* Field schema in `WhyFiabBannerSection.graphql` matches Figma point structure cleanly.

---

### Page 4: Clients (`/clients/`)
* **Components to Reconcile:**
  1. `src/components/sections/clients-banner-section.tsx`: Render `<HeroSection page="clients" headerNode={header} overrides={...} />`.
  2. `src/components/sections/clients-testimonials-section.tsx` & `clients-featured-case-studies-section.tsx`.
* **Data Flow:** Uses `mergeClients` with `ClientsBannerSectionFragment`.
* **Risks:**
  * *Medium Risk:* Client proof badges and statistic cards must align horizontally on wide viewports.
  * *Mitigation:* `ClientsHeroVariant` from Figma already handles responsive flex/grid wrappers.

---

### Page 5: Careers (`/careers/`)
* **Components to Reconcile:**
  1. `src/components/sections/common-banner-section.tsx`: When `uri === "/careers/"`, render `<HeroSection page="careers" headerNode={header} overrides={...} />`.
  2. `src/components/sections/faq-section.tsx`: Verify accordion uses updated `py-3 px-4 md:p-8` padding from commit `7302dfb`.
* **Data Flow:** Uses `mergeCareers` with `CommonBannerSectionFragment`.
* **Risks:**
  * *Low Risk:* `CommonBannerSection` must distinguish between `/careers/`, `/agentic-ai/`, `/knowledge-hub/`, and `/people-operations/`. Staging already has `variant` resolution in `section-variants.ts`.

---

### Page 6: Contact Us (`/contact-us/`)
* **Components to Reconcile:**
  1. `src/components/sections/contact-banner-section.tsx`: Render `<HeroSection page="contact" headerNode={header} overrides={...} />`.
  2. `src/components/sections/contact-form-section.tsx`: Ensure form card has correct border glow and dark contrast.
* **Data Flow:** Uses `mergeContact` with `ContactBannerSectionFragment`.
* **Risks:**
  * *Low Risk:* Minimal centered hero; straightforward migration.

---

### Page 7: Agentic AI (`/agentic-ai/`)
* **Components to Reconcile:**
  1. `src/components/sections/common-banner-section.tsx`: When variant is `agentic-ai`, render `<HeroSection page="agentic-ai" headerNode={header} overrides={...} />`.
  2. `src/components/sections/agentic-official-partner-stack.tsx`: Ensure partner logo grid matches Figma layout.
* **Data Flow:** Uses `mergeAgenticAi` with `CommonBannerSectionFragment`.
* **Risks:**
  * *Medium Risk:* WP GraphQL fragment lacks bullets; component must use fallback bullets from `hero.config.ts`.

---

### Page 8: Knowledge Hub & People Operations (`/knowledge-hub/`, `/people-operations/`)
* **Components to Reconcile:**
  1. `src/components/sections/common-banner-section.tsx`: When variant is `split`, render `<HeroSection variant="split" headerNode={header} overrides={...} />`.
  2. `src/components/sections/people-operations-what-we-do-section.tsx`: Apply commit `91e24fd` responsive card layout (`order-first lg:order-none`).
* **Data Flow:** Uses `mergeKnowledgeHub` and `mergePeopleOperations`.
* **Risks:**
  * *Low Risk:* Standard 2-column split layout.

---

### Page 9: Legal Pages (`/privacy-policy/`, `/terms-conditions/`)
* **Components to Reconcile:**
  1. `src/components/legal/legal-page-layout.tsx`:
     * Render `<HeroSection page="privacy-policy" overrides={{ variant: "legal", ... }} />`.
     * Add `LINK_CLASS` from commit `15b9785` for hover transitions on all legal document links.
     * Use inner `<div className="bg-white text-[#16181d]">` for the document body.
* **Data Flow:** Static content passed to `LegalPageLayout`.
* **Risks:**
  * *Low Risk:* Document body is purely textual.

---

### Page 10: 404 Not Found (`/404/` and `src/app/not-found.tsx`)
* **Components to Reconcile:**
  1. `src/components/not-found/not-found-page.tsx`:
     * Render `<HeroSection page="not-found" headerNode={siteHeaderNode(chrome)} />`.
     * Render `<SiteFooter footer={chrome.footer} />`.
* **Data Flow:** Uses `getSiteChrome()` for navigation.
* **Risks:**
  * *Low Risk:* Self-contained error view.

---

## 6. Execution Order & Implementation Checklist

When ready to implement, follow this exact sequence:

1. [ ] **Step 1: Copy Figma-Only Assets & Modules**
   * Copy `src/components/hero/**` (16 files) from `figma-design`.
   * Copy `src/config/hero.config.ts` and `docs/hero-management.md`.
   * Copy `src/components/ui/rise-glow.tsx`.
   * Update `src/components/ui/accordion.tsx` padding to `py-3 px-4 md:p-8`.

2. [ ] **Step 2: Adapt `HeroSection` for Headless Chrome**
   * Add `headerNode?: React.ReactNode` to `HeroSectionProps`.
   * If `headerNode` is provided by `SectionRenderer`, render `{headerNode}` instead of creating an internal header.

3. [ ] **Step 3: Fix Global Background Theme**
   * In `src/components/layout/page-frame.tsx`, update wrapper to `bg-[#07090f] text-white`.
   * Upgrade `src/components/layout/site-footer.tsx` with commit `91e24fd` gradient and layout styles.

4. [ ] **Step 4: Update Section Banner Wrappers**
   * Update `home-banner-section.tsx` to render `HeroSection` (`page="home"`).
   * Update `services-banner-section.tsx` to render `HeroSection` (`page="services"`).
   * Update `why-fiab-banner-section.tsx` to render `HeroSection` (`page="why"`).
   * Update `clients-banner-section.tsx` to render `HeroSection` (`page="clients"`).
   * Update `common-banner-section.tsx` to render `HeroSection` dynamically with variant (`"careers"`, `"agentic-ai"`, `"split"`).
   * Update `contact-banner-section.tsx` to render `HeroSection` (`page="contact"`).

5. [ ] **Step 5: Apply Figma Design Commits to Body Sections**
   * Port `91e24fd` card styling to `HomeDifference` in `home-sections.tsx`.
   * Port `91e24fd` responsive order to `PeopleOperationsWhatWeDo` in `people-operations-sections.tsx`.
   * Port `15b9785` `LINK_CLASS` to `legal-page-layout.tsx`.
   * Connect `not-found-page.tsx` to `HeroSection` (`page="not-found"`).

6. [ ] **Step 6: Verification & Automated Checks**
   * Run `node scripts/check-sections.mjs` (ensure all 46 layouts pass).
   * Run `npm run build` (ensure TypeScript passes without compilation errors).
   * Verify all pages on `http://localhost:3000` match Figma layout, colors, and typography.
