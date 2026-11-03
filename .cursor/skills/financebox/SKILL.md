---
name: financebox
description: >-
  Add or change Financebox page-builder sections (ACF Flexible Content layouts
  rendered by Next.js through WPGraphQL). Use when implementing a Figma section,
  ACF layout, GraphQL fragment, section component, header/footer, cache or
  preview behaviour, or WordPress content in this repository.
---

# Financebox sections

Read `agent.md`, `docs/architecture.md` and `docs/section-development.md` before editing.

- Every WordPress page renders through `src/app/[[...slug]]/page.tsx`. Never add a per-page Next.js route or a per-page component.
- WordPress controls which sections a page has and their order (`Page.pageBuilder.pageBuilder`). Never hardcode section order.
- One layout = one fragment (`src/lib/wordpress/queries/sections/<Key>.graphql`) + one definition (`src/components/sections/<key>.tsx`) + one registry entry (`src/components/page-builder/section-registry.ts`).
- Confirm field names with `npm run schema && npm run sections:inventory`; never guess them. Generate types with `npm run codegen`.
- Do not invent a visual design when no Figma frame was provided.
- Do not inject WordPress HTML; use `src/lib/wordpress/fields.ts`.

## Checks

`npm run sections:check`, `npm run typecheck`, `npm run lint`, `npm run build`. Then `npm run dev` and check desktop and mobile widths, empty fields, and moving the section in WordPress. If no browser is available, say what was not visually checked.

Update `docs/sections/inventory.md` and `agent.md` when a section is added or changed.
