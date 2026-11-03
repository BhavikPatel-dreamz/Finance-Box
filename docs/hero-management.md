# Hero Sections Management Guide

All hero sections across the entire website are managed through a single TypeScript configuration file:
👉 **[`src/config/hero.config.ts`](file:///media/drive/React/Finance/Finance-Box/src/config/hero.config.ts)**

> **No code editing required**: You do not need to open or edit any React/JSX component files to update content, change styles, or switch layouts. Simply modify `src/config/hero.config.ts`.

---

## 🚀 Quick Start: How to Edit Any Hero

Open [`src/config/hero.config.ts`](file:///media/drive/React/Finance/Finance-Box/src/config/hero.config.ts) and locate the page you want to update:

| Page | Config Object | Available Variant Layouts |
|---|---|---|
| **Home (`/`)** | `homeHeroConfig` | `"home"`, `"services"`, `"why"`, `"split"`, `"centered"` |
| **Services (`/services/`)** | `servicesHeroConfig` | `"services"`, `"split"`, `"why"`, `"centered"` |
| **Why FIAB (`/why-fiab/`)** | `whyHeroConfig` | `"why"`, `"split"`, `"services"`, `"centered"` |
| **Clients (`/clients/`)** | `clientsHeroConfig` | `"clients"`, `"split"`, `"centered"` |
| **Careers (`/careers/`)** | `careersHeroConfig` | `"careers"`, `"split"`, `"centered"` |
| **Contact Us (`/contact-us/`)** | `contactHeroConfig` | `"contact"`, `"centered"`, `"split"` |
| **Agentic AI (`/agentic-ai/`)** | `agenticAiHeroConfig` | `"agentic-ai"`, `"split"`, `"centered"` |
| **Knowledge Hub (`/knowledge-hub/`)** | `knowledgeHubHeroConfig` | `"split"`, `"centered"` |
| **People Operations (`/people-operations/`)** | `peopleOperationsHeroConfig` | `"split"`, `"centered"` |
| **Privacy Policy (`/privacy-policy/`)** | `privacyPolicyHeroConfig` | `"legal"`, `"centered"` |
| **Terms & Conditions (`/terms-conditions/`)** | `termsConditionsHeroConfig` | `"legal"`, `"centered"` |
| **404 Page (`/404/`)** | `notFoundHeroConfig` | `"not-found"`, `"centered"` |

---

## 🎨 Layout Variants Overview

You can switch the layout of any hero section simply by changing the `variant` property in `src/config/hero.config.ts`:

### 1. `"home"`
- **Layout**: High-impact split dashboard.
- **Features**: Month-End close metric card, Runway metric card, interactive/visual chart preview, and a floating booking call action.

### 2. `"services"`
- **Layout**: 2-Column Split with Stage/Tier cards.
- **Features**: Vertical gradient divider bar, numbered tier cards (`01`, `02`, `03`) with highlight badges, and primary + secondary action buttons.

### 3. `"why"`
- **Layout**: 2-Column Heading/Description with bottom 3-column feature pill strip.
- **Features**: 3-column numbered badges (`01`, `02`, `03`) with frosted glass blur effect.

### 4. `"clients"`
- **Layout**: Centered headline with a bottom client proof & metrics showcase.
- **Features**: Left column client proof bullet list (`Venture-backed startups`, etc.) and right column large statistic metrics (`$500M+`, `10x`, `99%`).

### 5. `"careers"`
- **Layout**: 2-Column split designed for multi-line typography.
- **Features**: Supports `highlight` and `highlight2` with clean CTA button.

### 6. `"contact"`
- **Layout**: Centered minimal high-impact layout.
- **Features**: Clean eyebrow, bold centered heading with green accent, and supportive text.

### 7. `"agentic-ai"`
- **Layout**: Split layout with feature bullet indicators.
- **Features**: Square green bullets with animated list and prominent CTA.

### 8. `"split"`
- **Layout**: Clean 2-column layout (Left: Eyebrow + Title; Right: Description + Button).
- **Features**: Ideal for resource and content hubs like Knowledge Hub and People Operations.

### 9. `"legal"`
- **Layout**: Compact centered banner for legal documents.
- **Features**: Centered document title with brand highlight and "Last updated" date.

### 10. `"not-found"`
- **Layout**: 404 error experience.
- **Features**: Giant watermark `404`, pulsing status badge, dual CTA action buttons, and quick navigation tags.

---

## 🖼️ Background Presets

You can change the background vector graphic by setting the `background` property:

```ts
background: "home"      // url(/home/homepage-hero-bg.svg)
background: "services"  // url(/services/services-hero-bg.svg)
background: "why"       // url(/why/why-bg-img.svg)
background: "clients"   // url(/clients/client-hero-bg.svg)
background: "careers"   // url(/careers/careers-page-hero-bg.svg)
background: "contact"   // url(/contact-us/contactus-hero-bg.svg)
background: "none"      // No background image
// Or pass any custom image:
background: "/images/custom-hero-bg.png"
```

---

## 🛠️ Common Customization Examples

### Changing Text and CTA Button:
```ts
export const contactHeroConfig: HeroConfig = {
  variant: "contact",
  background: "contact",
  eyebrow: {
    text: "SCHEDULE A CALL",
    variant: "green-no-dash",
  },
  title: "Let's Scale Your",
  highlight: "Financial Operations",
  description: "Connect with our team of senior finance experts today.",
  primaryCta: {
    label: "Book a 15-min Call",
    url: "https://calendly.com/your-team",
    color: "green",
  },
};
```

### Switching a Page to Another Variant:
Want the Contact page to use the 2-column split layout with bullets instead of centered?
Just change `variant: "agentic-ai"` and add `bullets`:

```ts
export const contactHeroConfig: HeroConfig = {
  variant: "agentic-ai",
  background: "contact",
  title: "Contact",
  highlight: "Our Team",
  description: "We are ready to partner with you.",
  bullets: [
    "Average response time under 2 hours",
    "Direct consultation with finance partners",
    "Confidential and NDAs available",
  ],
  primaryCta: {
    label: "Send Message",
    url: "#contact-form",
  },
};
```

---

## 🧩 Architecture

- **`src/config/hero.config.ts`**: The single source of truth for all hero content and variant mappings.
- **`src/components/hero/types.ts`**: Full TypeScript definitions for all hero properties.
- **`src/components/hero/hero-section.tsx`**: Master `<HeroSection />` component that dynamically resolves settings, backgrounds, headers, and variant components.
- **`src/components/hero/variants/`**: Modular variant implementations.
