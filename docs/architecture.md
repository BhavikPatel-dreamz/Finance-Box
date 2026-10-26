# Architecture

Financebox is a headless site. Next.js renders pages. WordPress remains the content source. Figma sections are added later, one at a time. Do not invent section designs.

## Application

This repository is the Next.js 16 app: React 19, TypeScript, Tailwind 4, and Cache Components. WordPress runs on the external Finance server. Pages are React Server Components. The server fetches GraphQL and sends HTML. The mobile menu, contact form, and error boundary are the only client components.

## Page rendering

`src/app/[[...slug]]/page.tsx` is a server component. It resolves a WordPress URI. `/` renders the homepage. Every other URI renders `PageShell`.

1. The page query reads core WordPress page fields through WPGraphQL.
2. A cached introspection query checks whether `Page.pageBuilder.pageSections` exists.
3. Registered section types that are present in the live schema are queried with inline fragments.
4. `SectionRenderer` walks the returned list in order and renders the matching component.

A missing page returns 404. An unset `WORDPRESS_GRAPHQL_URL` renders a configuration message and `noindex`. A network or GraphQL failure renders an unavailable message and `noindex`. One invalid section does not drop the rest of the page.

Reserved application paths are `api`, `sitemap.xml`, and `robots.txt`. A WordPress page cannot take those URLs.

## Section contract

Each section module provides:

- `matchesType` for the live GraphQL type name
- the field names it is allowed to request
- Zod validation
- a React component

The registry is `src/components/sections/registry.ts`.

The only registered section today is the contact form. It is functional infrastructure, not a Figma design. Its ACF layout is `contact_form` inside the `page_sections` flexible field.

## GraphQL

Static operations live in `src/lib/wordpress/queries/`. `npm run codegen` generates `src/lib/wordpress/generated/graphql.ts` from `schema.graphql`, or from `WORDPRESS_GRAPHQL_URL` when that variable is set.

The local schema covers the core queries only. It is not a copy of a live WordPress schema. ACF section fields are discovered at runtime and are not part of the generated schema until a live introspection replaces it.

## Caching

See [caching.md](caching.md).

## WordPress setup

See [wordpress-setup.md](wordpress-setup.md).
