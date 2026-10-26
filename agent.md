# Agent status

Updated: 2026-10-23

## Architecture

The Next.js app is the project root. Every page is a React Server Component rendered on the server from the external WordPress GraphQL API. ACF Flexible Content is the page builder. The section registry maps each live layout type to one React component. The homepage is built from the supplied homepage image. Other pages are still waiting for designs.

The connected WordPress site is the external Finance server at `https://web3.dddemo.net/wordpress/2026/finance`. The homepage field group is installed there. This repository only contains the Next.js app.

## Completed

- Next.js 16, TypeScript, Tailwind 4, Cache Components, and Node 22.
- GraphQL client: `src/lib/wordpress/client.ts`.
- Codegen: `codegen.ts`, operations in `src/lib/wordpress/queries/`, output in `src/lib/wordpress/generated/graphql.ts`. Run `npm run codegen`.
- Dynamic page route: `src/app/[[...slug]]/page.tsx`.
- Section registry: `src/components/sections/registry.ts`.
- Contact form section, API, validation, honeypot, and rate limit.
- Homepage and contact fields are registered on the external WordPress site. This repo does not contain WordPress.
- Cache tags and `/api/revalidate`.
- Preview entry and exit routes. Preview credentials stay server-side.
- Sitemap and robots routes.
- SEO from the WordPress title, excerpt, featured image, and canonical URL.
- Headless plugin: menus, revalidation, private leads.
- Section skill: `.cursor/skills/financebox/SKILL.md`.

## Pending

- Confirm the contact layout GraphQL type name. The matcher accepts names ending in `ContactForm`.
- Homepage portraits, the hero chart image, and most partner logos were not in the asset folder. The chart is drawn in the page. Missing photos stay empty until an image is set in WordPress.
- Remaining pages. Supply the next page image when the homepage is accepted.
- Activate the WPGraphQL Yoast SEO Addon when SEO editing is required. Rank Math needs a separate field mapping.
- Final integration, performance, and security pass.

## GraphQL

Endpoint: `https://web3.dddemo.net/wordpress/2026/finance/graphql`

Checked on 2026-10-23:

- `generalSettings` returns title `Finance` and URL `http://web3.dddemo.net/wordpress/2026/finance`.
- `pages` returns one page: `sample-page` at `/sample-page/`.
- `nodeByUri` returns `title`, `slug`, `uri`, `content`, and `featuredImage`. `excerpt` is not a field on `Page`.
- `pageBuilder` is not a field on `Page`. The Page Builder group has not been imported.
- `menus` returns an empty list. `PRIMARY` is not a `MenuLocationEnum` value. The headless plugin's menu locations are not registered on this site.
- `__type` and `__schema` are rejected: public introspection is disabled.
- WPGraphQL for ACF is active. `seo` is not a field on `Page`. Yoast and Rank Math GraphQL extensions are not installed.
- SEO is intentionally deferred. Pages use the WordPress title, plain-text content, featured image, and a canonical URL. After the WPGraphQL Yoast SEO Addon is activated, the same page query reads Yoast's `seo` fields without a code change. Rank Math is not mapped.

Local schema file: `src/lib/wordpress/schema.graphql`. It describes the core operations used for codegen. It is not a full copy of the live schema.

Expected ACF path after import: `pageBuilder.pageSections`.

Core operations that are generated:

- `SiteSettings`
- `PageByUri`
- `PreviewPage`
- `PublishedPages`
- `MenuByLocation`

Introspection for sections and SEO is a separate query and is not code-generated.

## ACF JSON

| File | Group | Layouts |
| --- | --- | --- |
| External WordPress, group Page Builder | `pageBuilder.pageSections` | `home_header`, `home_hero`, `home_logos`, `home_founders`, `home_difference`, `home_growth`, `home_partners`, `home_decisions`, `home_leadership`, `home_pressure`, `home_footer`, `services_hero`, `services_stages`, `services_depth`, `services_detail`, `services_cfo`, `services_process`, `services_investors`, `why_hero`, `why_compare`, `contact_form` |

The contact form is not dynamically confirmed. The JSON, component, registry entry, and introspection-based query exist. Rendering starts only when the live schema exposes a matching layout.

## Sections

| Key | Component | Registry |
| --- | --- | --- |
| `contact_form` | `src/components/sections/contact-form/section.tsx` | `src/components/sections/registry.ts` |
| Homepage layouts | `src/components/sections/home/section.tsx` | `src/components/sections/registry.ts` |
| Services layouts | `src/components/sections/services/section.tsx` | `src/components/sections/registry.ts` |
| Why FIAB layouts | `src/components/sections/why/section.tsx` | `src/components/sections/registry.ts` |

Usage: `docs/sections/contact-form.md`, `docs/sections/homepage.md`, `docs/sections/services.md`, and `docs/sections/why-fiab.md`.

`/` renders the designed homepage from `src/content/home.ts` when WordPress has no homepage sections. The hero, logo bar, founders accordion, difference grid, and growth section match the supplied screenshots. The growth photo and the three service cards are one section. Technology partners, client stories, and leadership are three separate sections. Partner logos and leadership portraits render when those image files are supplied. The header matches the navigation screenshot: Services, Clients, and About Us open dropdowns, Agentic AI is a link, and Contact Us is the green button. The pressure band and footer match the closing screenshots. Logo files that were not provided are repeated from the supplied assets. The collapsed accordion answers are editable; two of them were not visible in the screenshot, so those answers are short stand-ins. Import `acf-json/group_fb_page_builder.json` to update those fields on the external site. `/services/` renders the Services page from `src/content/services.ts`: the stage hero, the company-stage cards, the tier-depth band, the Foundation, Momentum, and Foresight offering grids, the fractional CFO cards, the five-step cadence, and the investor row. Photos for those cards render when image files are set. Those layouts are in the local page-builder JSON and are not on the live schema until that file is imported. `/why-fiab/` renders the Why FIAB page: the choice hero and the comparison table. The font is Manrope until a brand font file is supplied.

## Cache

Public reads use `use cache` and `cacheLife("hours")` (1 hour revalidation, 1 day expiry in the Next.js hours profile). Tags are documented in `docs/caching.md`.

`/api/revalidate` requires `REVALIDATE_SECRET`. It expires the page, settings, menu, schema, and sitemap tags.

Preview fetches are uncached. Draft responses are `noindex`.

If WordPress is unset, pages other than `/` render a configuration message with `noindex`. If WordPress errors, they render an unavailable message with `noindex`. A successful empty result is a 404, except `/`, which renders the homepage design.

## Environment

See `.env.example`.

- `WORDPRESS_GRAPHQL_URL`
- `WORDPRESS_URL` for media and lead delivery
- `NEXT_PUBLIC_SITE_URL`
- `REVALIDATE_SECRET`
- `PREVIEW_SECRET` (falls back to the revalidate secret)
- `WORDPRESS_PREVIEW_USER` and `WORDPRESS_PREVIEW_PASSWORD` (server only)
- `CONTACT_DELIVERY` is `wordpress` or `webhook`
- `CONTACT_FORM_SECRET`
- `CONTACT_WEBHOOK_URL` and `CONTACT_WEBHOOK_SECRET` for webhook delivery

No email provider or inbox address is configured.

## Decisions needing approval

- Final contact delivery provider and recipient.
- Whether Yoast, Rank Math, or another SEO plugin will be installed.
- Auth or account pages, if a later Figma frame needs them.
- A UI kit. Tailwind is the current styling system.

## Verification

- `tsc` and ESLint passed.
- `npm run build` succeeded. `/[[...slug]]` is a partial prerender. `/api/contact`, `/api/preview`, and `/api/revalidate` are dynamic. `/sitemap.xml` uses the hours cache profile.
- With GraphQL unset, `/` renders the configuration message. `POST /api/contact` returns 400 for invalid fields and 503 when delivery is not configured. A filled honeypot returns success without delivery.
- The contact form is not mounted on a public page until WordPress returns that section, so its browser UI has not been exercised.
- No live GraphQL endpoint was available.

## Known limitations

- Contact rate limiting is in memory, per server process.
- Outage responses are rendered pages with `noindex`. Next.js does not set HTTP 503 for those server-rendered messages.
- Calling draft mode makes the page route dynamic. The GraphQL data for public visitors remains behind cache tags.
- Menu queries run only when `MenuLocationEnum` contains `PRIMARY` or `FOOTER`.
