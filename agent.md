# Agent status

Updated: 2026-11-03

> Status: **audit complete, refactor in progress.** This file is rewritten at the end of the refactor with the final state.

## Phase 0 audit (2026-11-03)

### Next.js

- Next.js 16.4.2, React 19.3, TypeScript 5, Tailwind 4, `cacheComponents: true`, Node 22.
- Routes: `src/app/[[...slug]]/page.tsx` (catch-all), `api/revalidate`, `api/preview`, `api/preview/exit`, `api/contact`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx`.
- Codegen: `@graphql-codegen` with `typed-document-node`, operations in `src/lib/wordpress/queries/`.
- Styling: Tailwind 4 + shared UI in `src/components/ui/` (Section, Container, Eyebrow, GreenButton, Button, FooterHero, ProcessGrid, PartnersSection, Accordion). Motion in `src/components/motion/reveal.tsx`.

### WordPress (`https://web3.dddemo.net/wordpress/2026/finance/graphql`)

- WPGraphQL + ACF Pro + WPGraphQL for ACF active. **Introspection is now open** (it was disabled on 2026-10-23).
- One shared field group: `Page.pageBuilder` (type `PageBuilder`) → flexible field `pageBuilder` (interface `PageBuilderPageBuilder_Layout`). The spec's `page_sections` name is not what is installed; the installed ACF field resolves to GraphQL `pageBuilder.pageBuilder`.
- 46 layouts. GraphQL type name pattern: `PageBuilderPageBuilder<Layout>Layout`.
- 13 published pages. `foundation`, `momentum`, `foresight`, `sample-page` have no sections.
- Menus: `MenuLocationEnum` has `PRIMARY`, `FOOTER`, `MENU_1`, but **no menus are assigned**. No ACF options page for header/footer.
- No SEO plugin GraphQL fields (`Page.seo` absent). No `excerpt` on `Page`.
- The host intermittently returns non-JSON responses (observed during the audit); the client must retry.

### Architecture problems found

1. **Not a single dynamic template.** `[[...slug]]/page.tsx` dispatched hardcoded URIs to ten page components (`HomePage`, `ServicesPage`, …).
2. **WordPress did not control section order.** Each page component rendered a fixed section order and `merge.ts` overlaid WordPress values onto static content. Adding, removing or reordering sections in WordPress had no effect.
3. **Registry was not used for rendering.** Each registry entry's `render` returned the whole page component (`<HomePage sections={[section]} />`). Registry lookup was regex-suffix based; shared layouts (`CtaSection`, …) were registered several times.
4. **Header and footer were not shared.** Each page rendered `HomeHeader` inside its hero and `HomeFooter` at the end, from static `homeContent`.
5. Public reads were never cached (`publicReadsAreCached()` returned `false`).
6. `src/lib/wordpress/schema.graphql` was a hand-written partial schema; `acf-json/group_fb_page_builder.json` is stale (21 old layout names, none of which exist live).
7. `ClientsWhereFiabWorksSection` and `WhyFiabTrustedBySection` ignored WordPress data.

### Decisions

- Keep the installed ACF field (`pageBuilder.pageBuilder`) and the 46 real layouts. The spec's generic layouts (`hero_banner`, …) do not exist in WordPress and are not invented.
- One React component per layout in `src/components/sections/`. Each section file owns its GraphQL fragment reference and its render function.
- Fragments live in `src/lib/wordpress/queries/sections/*.graphql` and are validated by codegen against the live schema (`npm run schema` refreshes it).
- Registry keyed by exact layout name; unknown layouts fail safely.
- Shared header/footer rendered once by the template. Because the fixed header overlays the hero background, the header is passed into the first section when it is a hero layout.
- Layouts reused with different designs use WordPress variant fields where they exist (`sectionSetting`, `logoView`). Where WordPress has no variant field (`CommonBannerSection`, `CtaSection`, `JoinWaitlistSection`), a single documented presentation map chooses the variant by page URI until an ACF "variant" field is added.
- Existing `merge.ts` mappers are reused per section to keep current field fallbacks.
