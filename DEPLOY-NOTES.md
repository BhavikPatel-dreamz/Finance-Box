# Deploy Notes - Remove page-wise conditions

## Step 3 list (URI-only designs now removed)

Removed URI-based design logic:

1. CommonBannerSection (`common_banner`)
   - Pages that relied on URI variants: `/`, `/services/`, `/why-fiab/`, `/clients/`, `/contact/`, `/agentic-ai/`, `/knowledge-hub/`, `/people-operations/`, `/careers/`.
   - After removal: all CommonBanner sections render the default knowledge-hub design.
   - Fields needed to recreate each design as a dedicated ACF layout:
     - home design: `subTitle, title, description, ctaButton, floatingCtaButton, statCards`
     - services design: `subTitle, title, description, primaryCtaButton, secondaryCtaButton, tierCards`
     - why design: `subTitle, title, description, ctaButton, highlights`
     - clients design: `subTitle, title, description, clientProof, stats`
     - contact design: `subtitle, title, description`
     - agentic-ai design: `subTitle, title, description, tagLine (bullets), ctaButton`

2. CtaSection (`cta_section`)
   - Pages relying on URI variants (home, services, why, clients, careers, agentic-ai, knowledge-hub, people-operations).
   - After removal: renders the default (`default` style) FooterHero with career/pressure-style fields.
   - Fields to recreate design variants via dedicated layouts (if needed): `subTitle/title/description/ctaButton` mapped per page design.

3. JoinWaitlistSection (`join_waitlist`)
   - Pages relying on URI variants (waitlist on agentic-ai, newsletter on knowledge-hub).
   - After removal: renders the agentic waitlist design.
   - To keep the newsletter design, create a new ACF layout (fields: `title, highlight, text, cta, formId`).

4. FaqSection (`faq_section`)
   - Home used a dark container; others use light/cream.
   - After removal: all render light (default).
   - Fields to recreate home dark variant: same FAQ fields; only container styling differs (could be an ACF "variant" or separate layout: `faq_dark`).

## Add a new section
1. Create the ACF layout in WordPress.
2. Add one component + GraphQL fragment in `src/components/sections/` named after the ACF layout.
3. Add one line to `src/components/page-builder/section-registry.ts`.
## Recovery point

Commit hash before this refactor batch: 6986fc00ecc796163f783e9ff115822f2287bca7

Use this to recover removed URI-variant designs if they are later added back as
dedicated ACF layouts:
  git show 6986fc00ecc796163f783e9ff115822f2287bca7:src/components/sections/<file>.tsx
