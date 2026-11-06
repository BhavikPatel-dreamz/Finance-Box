---
name: acf-static-to-dynamic
description: Migrate a Financebox page-builder section from static default content to WordPress/ACF-only data, while making only that section blank when required data is missing.
---

# ACF static-to-dynamic migration

Use this skill when a section still reads from `src/content/*.ts` defaults or hard-coded images/text and should instead render only what WordPress/ACF returns.

## Workflow

1. Read the fragment:
   - `src/lib/wordpress/queries/sections/<Section>.graphql`
   - Run `npm run schema && npm run sections:inventory` if field names are uncertain.
2. Read the section definition and presentational component.
3. Replace static-fallback logic with direct field readers from `src/lib/wordpress/fields.ts`:
   - `text()`, `link()`, `media()`, `asArray()`, `asObject()`, `asString()`
4. Add an explicit null guard:
   - If essential data/images/cards are missing, return `null` from the section definition.
   - Never let a missing section mark the page `unavailable`.
5. Remove now-unused default imports/constants from:
   - `src/content/*.ts`
   - `src/components/<domain>/merge.ts`
   - section definitions
6. Keep design-only assets (icons) if they are not CMS-managed, but never keep content defaults.
7. Run:
   ```bash
   npm run schema
   npm run codegen
   npm run sections:check
   npm run typecheck
   npm run lint
   ```
8. Update `docs/sections/inventory.md` and `agent.md` if status changed.

## Rules

- Do not make one bad/missing section take down the whole website.
- Do not inject WordPress HTML.
- Prefer ACF field names; do not rename fields without the additive migration process.
- Return `null` for a blank section rather than rendering empty broken markup.
