# Why FIAB

The Why FIAB page is the designed page at `/why-fiab/`. It renders from local defaults in `src/content/why-fiab.ts` until WordPress returns these layouts.

## Layouts

Add these layouts to Page Sections on the Why FIAB page. Import `acf-json/group_fb_page_builder.json` through ACF → Tools → Import before the new layouts appear in the editor.

| Layout name | What it edits |
| --- | --- |
| `why_hero` | Eyebrow, title, green highlight, intro, discovery button, and the three numbered points |
| `why_compare` | Heading, green line, intro, feature label, comparison columns, and rows |

An empty field keeps the matching default. Mark each comparison row with one `yes` or `no` per line, in the same order as the columns. The Finance column is the featured column and can show a logo. The diamond pattern is part of the design.

The About menu item Why FIAB points at `/why-fiab/`.
