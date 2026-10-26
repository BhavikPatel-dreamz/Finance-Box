# Services

The Services page is the designed page at `/services/`. It renders from local defaults in `src/content/services.ts` until WordPress returns these layouts.

## Layouts

Add these layouts to Page Sections on the Services page. Import `acf-json/group_fb_page_builder.json` through ACF → Tools → Import before the new layouts appear in the editor. That file keeps the homepage layouts and the contact form.

| Layout name | What it edits |
| --- | --- |
| `services_hero` | Eyebrow, title, green highlight, intro, both buttons, and the three tier cards |
| `services_stages` | Eyebrow, title, intro, and the four stage cards. Each card has a title, label, text, and an icon |
| `services_depth` | Eyebrow, title, and the team button |
| `services_detail` | One tier block: number, title, text, button, anchor, and the offering grid. Add it once for each tier |
| `services_cfo` | Fractional CFO heading, intro, button, and the three delivery cards. Each card image is optional |
| `services_process` | Heading, intro, and the five numbered steps |
| `services_investors` | Eyebrow, title, italic word, intro, both links, and the scrolling investor cards. Each card image is optional |

An empty field keeps the matching default. A repeater replaces the whole list when at least one complete row is saved. The page stays in this design order.

The tier numbers, labels, and green phrases are editable. Stage icons are Gear, People, Person, and Target. A missing icon uses the default for that card position. The honeycomb pattern and the green divider are part of the design.

Button URLs can point at `/#contact` for the homepage contact band, or at `#stages` and `#tiers` on this page.

The offering grid uses two columns. A final item with no pair spans the row, as in the Foresight block. The page uses the same header and footer as the homepage. The Services menu item points at `/services/`, and Foundation, Momentum, and Foresight open `#foundation`, `#momentum`, and `#foresight`. The Explore buttons stay on those anchors until a destination URL is set. The fractional CFO and investor photos are cropped from the supplied frames. Replace them in WordPress when full-size files are available. One investor card was cut off in the frame, so the slider includes the three complete cards and moves with the arrow buttons. More for Investors stays on this section until that page exists.
