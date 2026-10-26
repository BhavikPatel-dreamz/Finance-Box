---
name: financebox
description: >-
  Add Financebox Figma sections to the Next.js section registry and the ACF
  flexible content field group, and connect them through WordPress GraphQL.
  Use when implementing a Figma section, ACF field group, page builder layout,
  GraphQL query, contact form, cache behavior, or WordPress content in this
  repository.
---

# Financebox sections

Read `agent.md` and `docs/architecture.md` before editing. Pages are WordPress pages rendered by `src/app/[[...slug]]/page.tsx`. Sections come from ACF Flexible Content. Do not invent a visual design when no Figma section was provided.

## Add a section

1. Inspect the supplied Figma section: layout, breakpoints, content fields, and interactions.
2. Reuse tokens in `src/app/globals.css`. Add a token when the value is a brand color, a type style, or used more than once.
3. Create `src/components/sections/<key>/section.tsx`.
4. Validate props with Zod. Optional fields must render safely when missing.
5. Add the layout in the external WordPress Page Builder field group. Keep existing layouts. Use stable field names and GraphQL field names. This repo does not store WordPress or ACF JSON.
6. Register the section in `src/components/sections/registry.ts`.
7. `matchesType` must identify the live GraphQL layout type. `fields` lists only the GraphQL fields the section reads. The loader requests a field only when introspection shows it exists.
8. Add `docs/sections/<key>.md` with the layout name, fields, and how to place it in WordPress.
9. Update `agent.md` with the section status and file paths.

Do not query a guessed ACF type before introspection confirms it. Do not replace the registry with a large conditional component. Do not render unsanitized CMS HTML as code.

## Preserve compatibility

- Keep section order equal to the GraphQL list order.
- The same layout may appear more than once.
- An unknown or invalid section logs a diagnostic and does not throw.
- Public GraphQL reads stay inside `use cache` with a tag from `src/lib/cache/tags.ts`.
- Preview fetches stay uncached and server-side.

## Checks

With `npm run dev` from the project root:

- Desktop and mobile widths from the Figma frame.
- The page returns 404 for an unknown slug once WordPress is connected.
- With `WORDPRESS_GRAPHQL_URL` unset, the shell shows the configuration message.
- A page containing the new layout renders it, and a second instance can hold different content.

If no browser is available, request the route from the dev server and say what was not visually checked.
