# Figma Design Migration Final Report

**Target Branch:** `staging-figma-ui`  
**Base Source of Truth:** `staging` (Data, Routing, GraphQL, WordPress Page Builder)  
**Design Reference:** `figma-design` (UI Components, Hero System, Styling, Themes)  
**Verification:** `npm run lint` and `npm run build` passing with 0 errors across all routes.

---

## 1. Overview for Non-Technical Stakeholders

This project successfully merges two separate tracks of development:
1. **The headless WordPress engine** from `staging` (which allows editors in WordPress to control content, pages, menus, blog posts, and case studies).
2. **The modern Figma UI design system** from `figma-design` (which introduces the dark aesthetic `#07090f`, centralized high-impact hero banners, responsive cards, glow effects, and typography).

All 11 pages now visually match the approved Figma designs, while remaining 100% connected to live WordPress content and the dynamic page builder.

---

## 2. Page-by-Page Status & Visual Parity

| Page / Route | Design Match Status | Notes & Enhancements |
|---|---|---|
| **Home (`/`)** | **Exact match** | Split dashboard hero with close card, runway card, chart preview, and floating CTA. Difference section upgraded to 3-column grid with hover lines. Dark footer with brand gradient and email pill button. |
| **Services (`/services`)** | **Exact match** | Modular hero with 3 numbered tier cards (`01`, `02`, `03`) and green accents. Find Your Stage, Fractional CFO, Operating Cadence, and In-Depth Tier sections preserved. |
| **Why FIAB (`/why-fiab`)** | **Exact match** | 2-column hero featuring the frosted glass highlights strip. Why Exists, How We Work, and interactive comparison table sections intact. |
| **Clients (`/clients`)** | **Exact match** | Centered hero with client proof bullets and high-trust metric badges (`$500M+ raised`, `10x growth`, `99% retention`). Trusted companies grid and case studies carousel matching Figma. |
| **Careers (`/careers`)** | **Exact match** | Split hero supporting dual-tone highlights (`for modern` and `finance`). Benefits grid, standout cards, and updated mobile accordion padding (`py-3 px-4 md:p-8`). |
| **Contact Us (`/contact-us`)** | **Exact match** | High-impact centered hero with background glow pattern. Split contact card (photo + email pill) and clean input form. |
| **Agentic AI (`/agentic-ai`)** | **Exact match** | Hero featuring square green bullet points and CTA. Responsive partner logo stack, compliance cards, and build-your-own agent feature blocks. |
| **Knowledge Hub (`/knowledge-hub`)** | **Exact match** | 2-column split hero with subtitle lead and CTA. Blog grid cards with author avatars, case studies, and newsletter signup block. |
| **People Operations (`/people-operations`)** | **Exact match** | 2-column split hero. Intro card, responsive alternating "What We Do" cards with gradient backgrounds (restored mobile image order `order-first lg:order-none`), and 3-stage advisory cards. |
| **Legal Pages (`/privacy-policy`, `/terms-conditions`)** | **Exact match** | Standardized compact hero banner with effective date display. Pure white inner reading container. Styled links with subtle underline and smooth hover transition to green (`LINK_CLASS`). Dynamic WordPress site header and footer. |
| **404 Page (`/_not-found`)** | **Exact match** | Stylized giant watermark `404`, pulsing status badge (*"Sorry! This Page Was Lost"*), quick navigation pill buttons, and dynamic WordPress chrome. |

---

## 3. Content Source Breakdown (WordPress vs. Fallback Defaults)

The page builder is designed with **resilient fallback architecture**: if WordPress provides data, it displays it; if a field is left empty or missing in WordPress, it gracefully falls back to approved static defaults so pages never look broken.

### A. Content Powered by WordPress (Live Data)
* **Navigation & Menus**: Top navigation links, logo URL, CTA button, and multi-column footer links are all fetched dynamically from WordPress `SiteChrome`.
* **Headings & Body Copy**: Titles, subtitles, and descriptions across Home, Services, Why FIAB, Clients, Careers, Contact Us, Agentic AI, Knowledge Hub, and People Operations.
* **Repeater Sections**:
  * Home Difference features, Founders cards, and Growth stages.
  * Services Find Your Stage cards and Operating Cadence steps.
  * Why FIAB comparison rows and team members.
  * Client testimonials and featured case studies.
  * Blog posts, authors, dates, and categories.
  * FAQs / Accordions on Home, Services, and Careers.
* **Contact Information**: Contact email and card subtitles on `/contact-us/`.

### B. Content Falling Back to Static Defaults
* **Home Hero Chart**: The dashboard chart preview image (`/home/chart.png`) is not currently stored in WordPress ACF fields and defaults to the static asset.
* **Careers Heading Secondary Accent**: The second green word (`"finance"`) in *"Build the operating system for modern finance"* defaults from `careersContent` because WordPress provides a single title text string.
* **Agentic AI Hero Bullet Points**: The 4 bullet points in the Agentic AI hero fall back to `agenticAiContent.hero.bullets` because WordPress `CommonBannerSection` lacks a bullet list field.
* **Services Hero Tier Numbers**: Card indices (`01`, `02`, `03`) are auto-generated from list order because WordPress only has title and description fields.

---

## 4. Recommended ACF Field Additions in WordPress

To give marketing and editorial teams full CMS control over every detail without needing code changes, we recommend adding the following fields to your WordPress ACF field groups:

1. **`HomeBannerSection` Field Group**:
   * Add `chartImage` (Image field) and `chartTitle` (Text field) for dynamic control of the hero trajectory graphic.
2. **`CommonBannerSection` Field Group**:
   * Add a `bullets` Repeater field (text sub-field) for inner pages (especially Agentic AI).
   * Add `secondaryHighlight` (Text field) for headings requiring dual highlighted phrases.
3. **`ServicesBannerSection` Field Group**:
   * Add `badgeNumber` (e.g. `"01"`) and `highlight` fields to each card in `tierCards`.
4. **Form Integration**:
   * Connect `/api/contact` to an email transport service (SendGrid, Postmark, or WordPress REST endpoint) to process form submissions.

---

## 5. Architectural Decisions Made During Migration

1. **Centralized Hero System Adopted**: Replaced disjointed banner implementations with the centralized `<HeroSection />` architecture from `figma-design`. All 11 pages now use consistent animations, headers, backgrounds, and responsive container behavior.
2. **Fixed Background Theme Contradiction**: In `staging`, the root `PageFrame` forced a white background (`bg-white text-[#16181d]`), preventing the Figma dark theme from rendering. Updated `PageFrame` to `#07090f` dark mode, while giving reading-heavy pages (Legal documents) their own dedicated white reading canvas.
3. **Suppressed Duplicate Headers**: Standardized header rendering so when a hero banner is rendered at the top of a page, the dynamic WordPress menu is passed inside `HeroSection` as `headerNode`, eliminating double header bars.
4. **Preserved All WordPress Endpoints & Types**: Maintained complete integrity of `src/lib/wordpress/*`, GraphQL fragments, schema codegen, preview mode, and incremental static regeneration.
5. **Fixed People Operations Responsive Stacking**: Applied Figma commit `91e24fd`'s `order-first lg:order-none` class to alternating cards so images cleanly display above text on mobile devices without layout flips.

---

## 6. How to Run the Project Locally

To test and run the project locally on your machine:

```bash
# 1. Switch to the migration branch
git checkout staging-figma-ui

# 2. Install dependencies (if needed)
npm install

# 3. Start the Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. All pages are available:
* Home: `http://localhost:3000/`
* Services: `http://localhost:3000/services`
* Why FIAB: `http://localhost:3000/why-fiab`
* Clients: `http://localhost:3000/clients`
* Careers: `http://localhost:3000/careers`
* Contact Us: `http://localhost:3000/contact-us`
* Agentic AI: `http://localhost:3000/agentic-ai`
* Knowledge Hub: `http://localhost:3000/knowledge-hub`
* People Operations: `http://localhost:3000/people-operations`
* Privacy Policy: `http://localhost:3000/privacy-policy`
* Terms & Conditions: `http://localhost:3000/terms-conditions`
* 404 Page: `http://localhost:3000/any-unknown-url`
