---
name: new-acf-section
description: Build a new Financebox page-builder section from a screenshot or Figma frame - designs the ACF layout, writes the importable ACF JSON (merged safely into the live Page Builder group), the GraphQL fragment, the React component and its registry entry, so the section renders as soon as the layout is imported in WordPress. Use when the user shares a screenshot/design of a new section, asks to "add a new block/section/layout", or wants ACF JSON for a section.
---

# New ACF section from a screenshot

Goal: the user gives a design; you return (1) an ACF JSON file they import in WordPress and (2) a finished, registered Next.js section. After the import, editors add the section to any page and it renders with no further code.

Read first: `docs/section-development.md` (the manual process this automates), `docs/architecture.md`, one similar existing section in `src/components/sections/` and its presentational component.

Package manager is **pnpm** (docs still say `npm run`; use `pnpm`).

## Phase 1 — design the layout (before any code)

1. **Study the screenshot.** List every piece of editable content: eyebrow, title (with italic/coloured words?), body text, buttons, images, repeated cards/rows, and visual variations (dark/light, image left/right). Anything decorative and fixed across uses (icons, background shapes, gradients) stays in code, not ACF.
2. **Reuse before inventing.** Check `pnpm sections:inventory` and `docs/sections/inventory.md`. If an existing layout already fits (maybe with a new variant field), stop and tell the user instead of creating a near-duplicate.
3. **Name it.** Layout `name` snake_case ending in `_section`, prefixed by the page/domain when page-specific (`services_pricing_section`), generic otherwise (`stats_band_section`). Layout key = PascalCase (`ServicesPricingSection`). Must not collide with a live layout.
4. **Choose fields** (spec types → how the component reads them):

   | Content | Spec `type` | GraphQL | Reader (`src/lib/wordpress/fields.ts`) |
   | --- | --- | --- | --- |
   | Short line (eyebrow, title, label) | `text` | `String` | `text()` |
   | Title with italic/green words | `text` + instructions "wrap the highlighted words in *stars*" | `String` | `splitEmphasis()` |
   | Paragraph(s) | `textarea` | `String` | `text()` / `multilineText()` |
   | Bullet list in one field | `textarea` (one item per line) | `String` | `listItems()` |
   | Button / link | `link` | `AcfLink { title url target }` | `link()` (rewrites CMS URLs to site paths) |
   | Image / logo | `image` | `{ node { sourceUrl altText mediaDetails { width height } } }` | `media()` |
   | Variant / layout switch | `button_group` with `choices` + `default` | `String` | compare the value |
   | Toggle | `true_false` | `Boolean` | — |
   | Number | `number` | `Float` | — |
   | Repeated cards/rows | `repeater` with `sub_fields` | list | map, skip empty rows |
   | Grouped sub-fields | `group` with `sub_fields` | object | — |

   No `wysiwyg`: the site never injects WordPress HTML. Keep names generic and stable (`title`, `description`, `cta_button`, `items`); every field optional.
5. **Write the spec** to `acf-json/layouts/<name>.spec.json` (format at the top of `scripts/acf-section.mjs`), with helpful `instructions` for editors on non-obvious fields, then:
   ```bash
   pnpm acf:section build acf-json/layouts/<name>.spec.json
   ```
   This writes the full ACF layout `acf-json/layouts/<name>.json` and prints the GraphQL type name and a draft fragment.

## Phase 2 — the import file (never skip the safety check)

ACF's importer **replaces the whole field group**. A file holding only the new layout would delete every other layout on the site.

1. `acf-json/group_fb_page_builder.json` must be a **fresh export of the live group**. The copy in git is often stale. If the user has not just exported it, ask them: *ACF → Tools → Export Field Groups → tick "Page Builder" → Export As JSON*, and give you the file (save it at that path).
2. Refresh the schema so the stale check is accurate, then merge:
   ```bash
   pnpm schema
   pnpm acf:section import <name>
   ```
   The script refuses if the export lacks any layout that is live in WordPress. Do not work around that refusal; get a fresh export.
3. Output: `acf-json/import/page-builder.json`. Tell the user: *ACF → Tools → Import Field Groups → choose `acf-json/import/page-builder.json` → Import JSON.* The group keeps its key, so existing pages and content are untouched.

## Phase 3 — the frontend (can be written before the import)

1. **Fragment** `src/lib/wordpress/queries/sections/<Key>.graphql`: start from the printed draft; keep only fields the component uses; fragment name = layout key; include `__typename`. If a field name is used by another layout with a different type, alias it (`sections:check` reports this).
2. **Presentational component** in `src/components/<domain>/` (or alongside similar ones): plain typed props, Server Component by default; `"use client"` only for a small interactive child (sliders, accordions; see `ui/accordion.tsx`, `services/investor-slider.tsx`).
   - Match the screenshot at desktop **and** mobile; infer mobile layout from sibling sections if not shown.
   - Reuse `ui/` (`Section`, `Container`, `Eyebrow`, `GreenButton`, `SafeImage`), motion helpers in `components/motion/`, and colour/typography tokens from `src/app/globals.css` and existing sections. No new fonts or one-off hex values when a token exists.
   - `next/image` for WordPress images; never an empty `src`; stable keys.
3. **Section definition** `src/components/sections/<kebab-key>.tsx` with `defineSection<<Key>Fragment>({ layout: "<Key>", render })`: map fragment data through the readers above. Return `null` when the essentials (e.g. title and all cards) are empty, so a half-filled block renders nothing instead of broken markup. Set `hero: true` only for a first-on-page banner (see `common-banner-section.tsx`).
4. **Register** it in `src/components/page-builder/section-registry.ts` (import + entry, alphabetical).

Until the layout is imported, `pnpm codegen` cannot generate `<Key>Fragment`, so typecheck fails on the new files. That is expected; it is safe to deploy anyway only after Phase 4 passes. At runtime the page query requests only fragments for layouts the live schema has, so nothing breaks before the import.

## Phase 4 — after the user imports (wire-up and verify)

Ask the user to import and confirm. Then:

```bash
pnpm schema            # live schema now contains the new layout type
pnpm codegen           # generates <Key>Fragment; fails if a fragment field name is wrong
pnpm sections:check    # fragment ↔ registry parity, composed query valid
pnpm typecheck
pnpm lint
env -u NODE_ENV pnpm build   # the shell may export NODE_ENV=development, which breaks next build
```

Fix any field-name mismatch by reading the new type in `src/lib/wordpress/schema.graphql`; never rename ACF fields to fit the code.

Visual check: ask the user to add the section to a draft page with real content (or use an existing page), run `pnpm dev`, open it (preview via `docs/wordpress-setup.md` for drafts) and compare with the screenshot at ~1440px and ~390px. Also check an empty repeater and a missing image. If you have no browser, say exactly what was not visually checked.

## Phase 5 — document and hand off

- Add the layout row to `docs/sections/inventory.md`; note the task in `agent.md`.
- Commit the spec, the layout JSON, the refreshed `group_fb_page_builder.json`, schema, generated types, fragment, components and registry together.
- Tell the user: the import file path and steps, the fields editors will see, and that new pages using the section need no rebuild (content edits revalidate automatically); only this code change needs a deploy.

## Rules

- Never import or hand the user a field group file that was not checked by `pnpm acf:section import`.
- Never rename or delete existing ACF layouts/fields as part of this skill (see `docs/field-migrations.md`).
- Never hardcode content that editors should change; never add per-page routes; WordPress controls order.
- Don't invent design details the screenshot doesn't show; ask, or follow the closest existing section.
