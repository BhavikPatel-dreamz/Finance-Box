# WordPress setup

Site: [Finance](https://web3.dddemo.net/wordpress/2026/finance). GraphQL: `https://web3.dddemo.net/wordpress/2026/finance/graphql`. This repository does not contain WordPress.

## Plugins (verified through the schema on 2026-11-03)

- WPGraphQL, ACF Pro, WPGraphQL for ACF — active.
- Financebox Headless plugin — sends the revalidation webhook and stores contact leads.
- No SEO plugin is exposed to GraphQL (`Page.seo` does not exist).

## Page Builder field group

One shared field group **Page Builder** on pages, GraphQL field `pageBuilder`, containing one Flexible Content field (GraphQL `pageBuilder`). The frontend reads `Page.pageBuilder.pageBuilder`. Do not add per-page builder fields.

46 layouts exist; all have a frontend component. See `docs/sections/inventory.md`. To add one, follow `docs/section-development.md`.

> `acf-json/group_fb_page_builder.json` in this repo is **stale**: it describes an older 21-layout draft (`home_hero`, `contact_form`, …) that does not match the live group. **Do not import it** — ACF sync would replace the live layouts. Export the live group (ACF → Tools → Export) to refresh it.

## Editor-facing behaviour

- Section order on the site is the order in the Page Builder field. Add, remove, duplicate and drag sections freely.
- Every field is optional. Empty fields fall back to the design's default copy for that section.
- Bold (`<b>`/`<strong>`) part of CTA and hero titles is the green/italic highlight. In the "Trusted by" title, wrap the number in a `<span>`.
- `ServicesOperatingCadenceSection` → *Section Setting*: `up-down` or `side-by-side`. `AgenticOfficialPartnerStack` → *Logo View*: `simple` or `boxed`.
- Agentic AI banner: list items in *Description* become the bullet points; *Tag Line* is the paragraph.
- Fill in **alt text** on uploaded logos and images. Logos without alt text get a name derived from the file name.
- Form shortcodes (`formShortcode`, `newsletterFormShortcode`) are not rendered: shortcodes only run inside WordPress.

## Menus (needed for WordPress-managed navigation)

Appearance → Menus. Assign a menu to **Primary** and to **Footer** (GraphQL `PRIMARY`, `FOOTER`). Until then the header and footer use the built-in navigation.

- Primary: top-level items are the nav; child items form the dropdown. Give the "Contact Us" item the CSS class `menu-cta` (enable *CSS Classes* in Screen Options) to make it the green button.
- Footer: each top-level item is a column title; its children are the links.

## Plugin settings

Settings → Financebox:

- Frontend URL: the Next.js site origin.
- Revalidate secret: same value as `REVALIDATE_SECRET`.
- Form secret: same value as `CONTACT_FORM_SECRET`.

The webhook currently sends `{ secret, uri }`; that triggers a full revalidation. Sending `type` (`page`, `menu`, `settings`, `schema`) and `oldUri` on slug changes makes it more targeted (see `docs/caching.md`).

## Preview

WordPress preview link format:

```
<frontend>/api/preview?secret=<PREVIEW_SECRET>&id=<post ID>
```

`id` is the page's database ID (WordPress also sends it as `preview_id` / `page_id` / `p`, which are accepted). Drafts without a URL preview at `/<slug>/`. `WORDPRESS_PREVIEW_USER` / `WORDPRESS_PREVIEW_PASSWORD` (an Application Password) stay on the server. Preview pages show a "Preview — exit" badge, send `noindex`, and are never cached. `/api/preview/exit?redirect=/path/` leaves preview.

Verified 2026-11-03 against `/careers/` (ID 1519): preview entry, draft-mode render with credentials, `noindex`, exit.

## SEO

Without an SEO plugin, metadata comes from WordPress: page title (front page: the first section's title), description from the first section with a description, featured image for Open Graph, canonical on `NEXT_PUBLIC_SITE_URL`. When the **WPGraphQL Yoast SEO** add-on is active, the page query detects `Page.seo` and uses Yoast's title, description, canonical, Open Graph and `noindex` automatically. Rank Math is not mapped.
