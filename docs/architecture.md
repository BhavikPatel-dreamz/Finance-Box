# Architecture

WordPress owns content and section order. Next.js owns design and behaviour.

```
WordPress (ACF Pro "Page Builder" flexible field, WPGraphQL, WPGraphQL for ACF)
   │  GraphQL, server-side only
src/lib/wordpress/        client.ts → content.ts (+ site-chrome.ts)
   │
src/app/[[...slug]]/page.tsx   ← the single template for every WordPress page
   │  PageFrame (shared surface + SiteFooter)
   │  SectionRenderer (WordPress order, header injected into a leading hero)
   │     └─ section-registry.ts  layout key → trusted definition
   │           └─ src/components/sections/<layout>.tsx  (fragment type + render)
   │                 └─ presentational component (src/components/<domain>/…-sections.tsx, ui/)
```

## Request flow

1. `[[...slug]]/page.tsx` turns the path into a WordPress URI (`/`, `/services/`, `/services/web-development/`). Reserved first segments (`api`, `_next`, `preview`, `blog`, `case-study`, `team`, `category`, the static legal pages, `404`), malformed segments and paths deeper than 6 levels return 404 (`src/lib/wordpress/uri.ts`).
2. `getPublicPage(uri)` (or `getPreviewPage(id)` in Draft Mode) sends **one** GraphQL request: page core fields, optional Yoast `seo`, and `pageBuilder.pageBuilder` with one fragment per layout. Only `Page` nodes with status `publish` are public; anything else is 404.
3. `getSiteChrome()` loads header and footer content once per request (WordPress menus, falling back to `src/content/home.ts`).
4. `SectionRenderer` renders each row in the order WordPress returned it. The renderer:
   - matches `__typename` exactly (`PageBuilderPageBuilder<Key>Layout`) against the registry;
   - passes the shared header to the first section when its definition is a `hero` (the fixed header must sit on the hero's background), otherwise draws the header on a dark band;
   - resolves a presentation variant where needed (`section-variants.ts`);
   - skips unknown layouts and sections whose mapping throws, logging `[page-builder] Skipped section …`. Development shows a visible notice; production renders nothing. Field values and stack traces are never shown to visitors.
5. `generateMetadata` uses the same (request-deduplicated) page load.

Pages with no sections render the title with the shared header/footer. If `WORDPRESS_GRAPHQL_URL` is unset or WordPress fails, a message page with `noindex` is rendered instead of a 404.

## Sections

One file per layout in `src/components/sections/`, created with `defineSection<FragmentType>()`. The `layout` key is type-checked against the fragment's `__typename`. Most sections reuse the page's existing `merge*` mapper (`src/components/<domain>/merge.ts`) through `fromSection()`, which keeps the design defaults in `src/content/*.ts` for fields WordPress leaves empty. Newer mappings use `src/lib/wordpress/fields.ts`.

Presentational components live in `src/components/<domain>/<domain>-sections.tsx` (one exported component per section) and `src/components/ui/`. They are Server Components; only interactive leaves are Client Components (header, accordion, carousels, `Reveal` animations, contact form).

WordPress HTML is never injected: values are reduced to text (`plainText`, `fields.ts`). JSON-LD is escaped.

Inventory: `docs/sections/inventory.md`. Adding a section: `docs/section-development.md`.

## GraphQL

- `src/lib/wordpress/schema.graphql`: committed snapshot of the live schema (`npm run schema`).
- `src/lib/wordpress/queries/*.graphql`: static operations; `queries/sections/*.graphql`: one fragment per layout.
- `npm run codegen` validates every document against the snapshot and generates `src/lib/wordpress/generated/graphql.ts` (typed documents and fragment types).
- `src/lib/page-builder/section-fragments.ts` discovers every layout fragment from the generated module and composes the page query at runtime, filtered to the layout types the live schema reports (`SchemaCapabilities`, cached). If introspection is disabled, every fragment is requested.
- `npm run sections:check` verifies fragment ↔ registry parity and validates the fully composed query (field conflicts between layouts).

The client (`client.ts`, `server-only`) adds a 15 s timeout per attempt and retries network errors, timeouts, 429/5xx and non-JSON bodies twice with backoff (the WordPress host intermittently returns non-JSON). Partial GraphQL errors are logged; data is still used.

## Shared header and footer

`src/components/layout/site-header.tsx` (wraps the client `HomeHeader`: fixed bar, dropdowns, mobile menu) and `site-footer.tsx`. Content comes from `getSiteChrome()`:

- PRIMARY menu → nav links (children → dropdown). An item with CSS class `menu-cta` becomes the green button.
- FOOTER menu → columns (top-level item = column title, children = links).
- No menu assigned → the current static navigation in `src/content/home.ts`.

Logo, footer text, email and legal line have no WordPress source yet.

## Routes that are not WordPress pages

| Route | Source |
| --- | --- |
| `/blog`, `/blog/<slug>`, `/case-study`, `/case-study/<slug>`, `/team/<slug>` | WordPress posts, case studies, team members. See [content-types.md](content-types.md). Root-level post URLs redirect to `/blog/<slug>/`. |
| `/privacy-policy`, `/terms-conditions` | Static content in `src/content/` (no WordPress page exists). `/terms-and-conditions` redirects. |
| `not-found.tsx` | 404 page with shared header/footer |
| `/api/revalidate`, `/api/preview`, `/api/preview/exit`, `/api/contact` | Route handlers |
| `/sitemap.xml`, `/robots.txt` | Published page URIs; robots allows all |

## Caching

See [caching.md](caching.md). WordPress setup: [wordpress-setup.md](wordpress-setup.md).
