# Agent status

Updated: 2026-11-03

## Architecture (current)

Single dynamic template. WordPress controls content and section order; Next.js controls design.

- Every WordPress page renders through `src/app/[[...slug]]/page.tsx` → `PageFrame` → `SectionRenderer` → `section-registry.ts` → one definition per layout in `src/components/sections/`.
- Shared header/footer: `src/components/layout/site-header.tsx`, `site-footer.tsx`, data from `src/lib/wordpress/site-chrome.ts` (WordPress menus, static fallback).
- Data: `src/lib/wordpress/client.ts` (server-only, timeout, retry), `content.ts` (cached loaders), one composed GraphQL request per page.
- Posts, case studies, team: own routes under `src/app/blog`, `src/app/case-study`, `src/app/team` (`docs/content-types.md`).
- Details: `docs/architecture.md`. Adding a section: `docs/section-development.md`. Inventory: `docs/sections/inventory.md`. Caching/webhook: `docs/caching.md`. WordPress: `docs/wordpress-setup.md`.

Stack: Next.js 16.4.2 (App Router, Turbopack, Cache Components), React 19.3, TypeScript 5, Tailwind 4, Node 22, GraphQL Codegen.

## Technical decisions

| Decision | Why |
| --- | --- |
| Keep the installed field `Page.pageBuilder.pageBuilder` and its 46 real layouts | The spec's generic layouts (`hero_banner`, …) and `page_sections` name do not exist in WordPress; inventing them was out of scope. |
| Committed schema snapshot (`npm run schema`) drives codegen | Real validation (caught the broken preview query); builds don't need WordPress. |
| Fragments in `.graphql`, page query composed at runtime from generated fragment docs, filtered by live layout types | One request per page; removing a layout in WordPress cannot break the query. |
| `defineSection<Fragment>()` type-checks the layout key against `__typename` | Registry keys cannot drift from GraphQL types. |
| Header passed into a leading `hero` section | The fixed header must sit on the hero's background (pixel-identical to before). |
| Existing `merge.ts` mappers reused per section (`fromSection`) | Preserves current output and design-default fallbacks exactly. |
| Variants: ACF fields where they exist (`sectionSetting`, `logoView`); a URI→variant presentation map for `CommonBannerSection`, `CtaSection`, `JoinWaitlistSection` | Those three have several Figma designs and no ACF field to choose one. Map lives only in `section-variants.ts`. |
| Cache in production only, `WORDPRESS_CACHE=off` escape hatch | Development stays live; production gets 1 h cache + webhook. |
| Legal pages are static app routes | No WordPress pages exist for them. |

## Completed (2026-11-03)

1. Audit of Next.js app and live WordPress schema (findings below).
2. Live schema snapshot + `scripts/fetch-schema.mjs`, `scripts/section-inventory.mjs`, `scripts/check-sections.mjs`; npm scripts `schema`, `sections:inventory`, `sections:check`, `typecheck`.
3. 46 section fragments, all validated by codegen; `PageCore`, `SchemaCapabilities` operations; menu query gets `cssClasses`.
4. GraphQL client: `server-only`, 15 s timeout, 2 retries on transient errors / non-JSON, partial-error logging.
5. Data layer rewrite (`content.ts`): one request per page, `publish`-only, request dedupe with React `cache()`, cache tags incl. new `pages`, Yoast detection, front-page title from lead section.
6. Split ten page components into 46 per-layout components (`src/components/<domain>/<domain>-sections.tsx`), JSX unchanged; removed `HomePage`, `ServicesPage`, … and the per-URI dispatch.
7. Section definitions, registry (duplicate guard), renderer (WordPress order, header injection, safe skip), dev-only fallback.
8. Shared header/footer + menu mapping (`menu-cta` class for the CTA). Legal pages and 404 use them.
9. `WhyFiabTrustedBySection` and `ClientsWhereFiabWorksSection` now read WordPress (they were hardcoded).
10. Preview fixed: the old query used `asPreview`, which this WPGraphQL version does not have, so preview never worked. Now `DATABASE_ID` + `preview.node`, preview cookie, noindex, badge, safe exit redirect.
11. Webhook: header or body secret, typed scopes (`page`/`menu`/`settings`/`schema`/`all`), `oldUri`, idempotent, error handling.
12. Reserved routes, URI normalisation, `/terms-and-conditions` redirect, escaped JSON-LD.
13. Documentation: architecture, caching, WordPress setup, section guide, inventory, README, `.cursor/skills/financebox`.

## Post types (2026-11-03, second pass)

`post` (3), `case-study` (3) and `team` (2) were all 404 before; the Clients "Read a Full Case Study" buttons were broken links. Now: `/blog`, `/blog/page/<n>`, `/blog/<slug>`, `/case-study`, `/case-study/<slug>`, `/team`, `/team/<slug>` as separate route files; root-level post URLs 308 to `/blog/<slug>/`; `/category/*` → `/blog`. Details: `docs/content-types.md`.

- Moved existing UI into shared files: blog card, case study card, team profile card, article hero; `mapTeamMember` → `src/components/team/team-member.ts`.
- Knowledge Hub blog/case-study cards, Clients case studies and Why FIAB team names now link to these pages. Blog cards show the real category, author, avatar and reading time (were hardcoded "Consulting", "By Guruprasad", "3 min read"). "Explore Blogs"/"Explore Case Studies" go to the archives (WordPress has `#`; static defaults pointed at non-existent `/blogs`, `/case-studies`).
- Fixed: Clients cards put the whole `featuredContent` into "Challenge" and showed static Solution/Outcome; now parsed by label.
- `plainText` now decodes numeric entities (`&#8217;`, `&#038;`).
- Body HTML rendered only via `sanitize-html@2.18.1` allowlist (2.18.0 and below have an advisory). XSS payload test passed.
- Sitemap includes the new routes; webhook accepts `post`, `case-study`, `team`.
- Verified on dev against live WordPress: all routes 200, unknown slugs 404, redirects 308/307, links on Knowledge Hub/Clients/Why FIAB, sitemap, webhook scopes, screenshots of post, case study, team pages. `tsc`, lint (no new errors), `sections:check`, `next build` pass.
- Header (About Us → Team) and footer "Team" links pointed to `/#team` and `/#about`, anchors that do not exist on the homepage; they now go to `/team/`.
- **Content gaps in WordPress** (not code): the 3 posts have no body or excerpt; all 3 case studies use template placeholder text in Featured Content (DeepScribe's mentions FLYR) and have no body.
- No Figma exists for these pages; they are composed from existing design pieces and should be reviewed by design.

## Pending / needs a decision

- Preview for posts/case studies/team (preview currently supports pages only).

- **Menus**: assign WordPress menus to Primary and Footer (see `docs/wordpress-setup.md`). Until then navigation is static.
- **Header/footer globals**: logo, footer text, email, legal line have no WordPress source. Needs an ACF options page (decision: which fields).
- **Variant fields**: add an ACF `variant` select to `CommonBannerSection`, `CtaSection`, `JoinWaitlistSection` so editors pick the design; then drop them from `section-variants.ts`.
- **SEO plugin**: none installed. Activating WPGraphQL Yoast SEO is picked up automatically.
- **Forms**: Contact, waitlist and newsletter forms are static markup that does not submit (unchanged from before). A working `ContactForm` + `/api/contact` exists but is unused. Needs a decision on delivery (WordPress leads vs webhook) and on the shortcode fields.
- **Real 404 status in production** (soft 404 today, see `docs/caching.md`): add a Proxy check.
- **Stale `acf-json/group_fb_page_builder.json`**: must not be imported; replace with an export of the live group.
- **Content quirks visible on the live site (WordPress data / existing merge logic, unchanged)**: Agentic AI headings repeat the highlight ("Agentic AIAgentic AI", "TalentPeople Ops & Talent"), Careers "What Makes FIAB Stand Out? hhhhhh", "Why work at FIAB? at FIAB?".
- Optional cleanup: consolidate the nine near-identical `merge.ts` helpers; fix pre-existing lint errors (`any` in `merge.ts`, `reveal.tsx`, `home-header.tsx`).

## GraphQL schema findings (live, 2026-11-03)

- Introspection open. `Page.pageBuilder: PageBuilder { pageBuilder: [PageBuilderPageBuilder_Layout] }`, 46 possible types.
- `RootQuery.page(id, idType: DATABASE_ID | ID | URI)`; no `asPreview` argument. `Page.preview: { node: Page }`, `Page.status`, `Page.desiredSlug`, `Page.isFrontPage`.
- `MenuLocationEnum`: `PRIMARY`, `FOOTER`, `MENU_1`; no menus assigned. `MenuItem.cssClasses` available.
- No `Page.seo`, no `Page.excerpt`. Custom post types referenced by layouts: `Team`, `CaseStudy` (`caseStudiesOptions { tagLine featuredContent }`), `Post`.
- Field-name conflict: `teamMembers` is a repeater on `HomeLeadershipSection` and a relationship on `TeamMembersSection` → aliased `teamMembersList`.
- Host intermittently returns non-JSON responses; retries handle it.

## ACF layout mappings

All 46 layouts → component, fragment, variant and live pages: `docs/sections/inventory.md`. Unregistered live layouts: none.

## Validation status (all run 2026-11-03)

| Check | Result |
| --- | --- |
| `npm run codegen` | Pass (all documents valid against live schema) |
| `npm run sections:check` | Pass: 46 fragments, 46 sections, 46 schema layouts. Negative test (removed alias) correctly fails. |
| `tsc --noEmit` | Pass |
| ESLint | No new errors. Remaining errors are pre-existing (`merge.ts` `any`, `reveal.tsx`, `home-header.tsx`, unused `Eyebrow` import in 404 page). |
| `next build` | Pass. `/[[...slug]]` partial prerender, 1 h / 1 d. |
| Rendered-text diff vs pre-refactor site (11 pages, live WordPress) | Identical except intended changes: WordPress logos in "Trusted by" (Home, Why FIAB), WordPress images/link in Clients "Where FIAB Works", Agentic banner bullets/paragraph from WordPress, page titles from WordPress. |
| Screenshots vs pre-refactor (headless Chrome) | Home desktop (hero + full page) and mobile hero, Careers, Agentic AI, Knowledge Hub: layout identical; header in hero unchanged. Other pages verified by text diff only. |
| Unknown layout (FaqSection unregistered temporarily) | Section skipped with dev notice naming it; rest of page and footer rendered. |
| Webhook | No/bad secret 401; `page` and `menu` scopes expire the right tags; prod cache refetches after `page` event. |
| Preview | Bad secret 401; real credentials: entry 307 + cookies, draft render with badge and `noindex`; exit; open-redirect blocked. |
| Production cache (`next start`) | Repeat requests 35–130 ms vs cold 0.8–13 s. |
| 404 | `next dev`: 404. `next start`: soft 404 (200 + noindex), documented. |
| Not tested | Real draft content (no draft page exists), WordPress menus (none assigned), Yoast fields, CMS add/remove/reorder by an editor (no admin access; ordering is verified by code path and by matching live order). |

## Environment

See `.env.example`: `WORDPRESS_GRAPHQL_URL`, `WORDPRESS_URL`, `NEXT_PUBLIC_SITE_URL`, `WORDPRESS_CACHE`, `REVALIDATE_SECRET`, `PREVIEW_SECRET`, `WORDPRESS_PREVIEW_USER`, `WORDPRESS_PREVIEW_PASSWORD`, `CONTACT_*`.

## Known limitations

- Soft 404 in production (above).
- Contact rate limit is in memory, per process.
- Draft Mode makes the page dynamic for that visitor only; public responses stay cached.
- Section field defaults come from `src/content/*.ts`: clearing a field in WordPress shows the design copy rather than nothing.
