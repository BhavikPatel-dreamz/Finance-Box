# Homepage

The homepage is the designed page at `/`. It renders from local defaults in `src/content/home.ts` until WordPress returns the homepage layouts.

## Layouts

Add these layouts, in any order, to Page Sections on the WordPress front page. The field group already lives on the external WordPress server. Public GraphQL introspection must be enabled before the app can read the fields.

| Layout name | What it edits |
| --- | --- |
| `home_header` | Logo, navigation links, dropdown links, and the contact button |
| `home_hero` | Only the marked hero copy: eyebrow, headline, description, discovery button, close card, runway card, chart labels, and call button |
| `home_logos` | Trust line and logo row. Missing brand files can repeat the supplied logos. |
| `home_founders` | Eyebrow, title, green highlight, text, button, and accordion cards |
| `home_difference` | Heading, five cards, and the green outcome panel. The first card is the white card. |
| `home_growth` | Eyebrow, heading, intro, photo, caption, stage labels, three cards with lists, and the services button |
| `home_partners` | Heading and partner logos with captions. A missing logo file shows the partner name. |
| `home_decisions` | Photo label, quote, name, role, portrait, eyebrow, heading, intro, result cards, and button |
| `home_leadership` | Eyebrow, heading, text, and people. The arrows move the portrait row. |
| `home_pressure` | Heading, italic phrase, supporting line, and button |
| `home_footer` | Logo, intro, email, link columns, and legal line |

The hero layout `home_hero` exposes only the marked content:

- Eyebrow, title, highlighted title, description
- Discovery button label and URL
- Close card: label, value, unit, trend
- Runway card: label, value, unit, trend
- Chart title and range label
- Call button label and URL

The chart line and month labels are part of the design. An empty hero field keeps the matching default. Import `acf-json/group_fb_page_builder.json` through ACF → Tools → Import. That file keeps the other homepage layouts.

Every text, link, and image in the other layouts is an ACF field. An empty field keeps the matching default. Repeaters replace the whole list when at least one complete row is saved.

Images are ACF image fields. Logos need an image and a name. Cards can include an icon. People need a name; the photo is optional.

The page order stays the design order. Reordering layouts in WordPress does not reorder the homepage.

## Assets in the defaults

- `public/home/finance-logo.svg`
- `public/home/ondas-logo.svg`
- `public/home/american-logo.svg`
- `public/home/built-icon.svg`
- `public/home/growth.jpg`

The hero chart is drawn in the component. Leadership and testimonial photos were not in the supplied asset folder, so those frames stay empty until images are uploaded.
