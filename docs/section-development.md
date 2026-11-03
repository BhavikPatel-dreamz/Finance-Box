# Section development guide

How to add a page-builder section that WordPress editors can place on any page. A new ACF layout is **not** rendered until a developer completes these steps; until then the site skips it (with a notice in development).

Throughout, the example is a new layout called **Pricing Comparison**.

## 1. Create the ACF layout

In WordPress: **ACF → Field Groups → Page Builder → Page Builder** (the Flexible Content field, GraphQL name `pageBuilder`). Add a layout. Do not create a new field group or a per-page field.

- **Label** `Pricing Comparison`, **Name** `pricing_comparison_section`.
- Add its fields with stable snake_case names, e.g. `title` (Text), `description` (WYSIWYG), `plans` (Repeater: `name`, `price`, `features`), `cta_button` (Link, return format *Link Array*).
- Images: return format *Image Array* (any format works; WPGraphQL always exposes `image { node { sourceUrl altText } }`).
- If the design has variations, add a **Select** field (e.g. `variant`) instead of asking for a per-page code switch.

### GraphQL exposure

On the field group, *Show in GraphQL* is already on. WPGraphQL for ACF generates the type name from the layout name:

| ACF | GraphQL |
| --- | --- |
| layout `pricing_comparison_section` | type `PageBuilderPageBuilderPricingComparisonSectionLayout` → layout key `PricingComparisonSection` |
| field `cta_button` | field `ctaButton` |

Do not assume — always confirm in the next step.

## 2. Refresh the schema snapshot

```bash
npm run schema              # downloads the live schema to src/lib/wordpress/schema.graphql
npm run sections:inventory  # prints every layout and its GraphQL fields
```

Find the new layout in the inventory output and note the exact field names and types. Commit the updated `schema.graphql`.

## 3. Write the fragment

Create `src/lib/wordpress/queries/sections/PricingComparisonSection.graphql`. The fragment name must equal the layout key and must select `__typename`:

```graphql
fragment PricingComparisonSection on PageBuilderPageBuilderPricingComparisonSectionLayout {
  __typename
  title
  description
  plans { name price features }
  ctaButton { title url }
}
```

Request only fields the component uses. If a field name is used by another layout with a **different type**, alias it (`plansList: plans { … }`) — `npm run sections:check` reports such conflicts.

## 4. Generate types

```bash
npm run codegen
```

This validates the fragment against the schema and generates `PricingComparisonSectionFragment` in `src/lib/wordpress/generated/graphql.ts`. Never hand-write response types.

## 5. Build the component and its definition

Create `src/components/sections/pricing-comparison-section.tsx`:

```tsx
import { defineSection } from "@/lib/page-builder/types";
import type { PricingComparisonSectionFragment } from "@/lib/wordpress/generated/graphql";
import { link, text } from "@/lib/wordpress/fields";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";

type Plan = { name: string; price: string };

export function PricingComparison({ title, plans, cta }: { title: string; plans: Plan[]; cta: { label: string; url: string } | null }) {
  if (plans.length === 0) return null;
  return (
    <Section theme="light" spacing="both">
      <Container>
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-medium">{title}</h2>
        {/* … */}
      </Container>
    </Section>
  );
}

export const pricingComparisonSection = defineSection<PricingComparisonSectionFragment>({
  layout: "PricingComparisonSection", // type-checked against the fragment's __typename
  render: (data) => (
    <PricingComparison
      title={text(data.title)}
      plans={(data.plans ?? []).map((plan) => ({ name: text(plan?.name), price: text(plan?.price) }))}
      cta={data.ctaButton?.url ? link(data.ctaButton, { label: "", url: "" }) : null}
    />
  ),
});
```

Rules:

- **Server Component by default.** Add `"use client"` only to a small child that needs state or effects (see `ui/accordion.tsx`, `home/trusted-by.tsx`).
- **Every field is optional.** Use the readers in `src/lib/wordpress/fields.ts` (`text`, `link`, `media`, `listItems`, `splitEmphasis`); render nothing for empty repeaters; never pass an empty `src` to an image.
- **Never inject WordPress HTML** (`dangerouslySetInnerHTML`). Read text with `text()`, lists with `listItems()`.
- Reuse `ui/` components (`Section`, `Container`, `Eyebrow`, `GreenButton`, `Reveal`) and existing Tailwind tokens. Follow the Figma frame at desktop and mobile widths.
- Use `next/image` for WordPress images (the WordPress host is already allowed in `next.config.ts`); below-the-fold images lazy-load by default.
- Stable keys for repeated items (an id, or index when the list has no ids).
- **Hero sections**: if the section can be first on a page and has a dark background behind the header, set `hero: true` and render `context.header` at the top of the background (see `common-banner-section.tsx`). Otherwise the header is drawn on a dark band above it.
- **Variants**: prefer an ACF select field read from `data`. Only if that is impossible, add the layout to `src/components/page-builder/section-variants.ts`.

## 6. Register it

Add the import and entry to `src/components/page-builder/section-registry.ts`. Only registered components can ever render; the registry throws at startup if a layout is registered twice.

## 7. Check and test

```bash
npm run sections:check   # fragment ↔ registry parity, composed-query validation
npm run typecheck
npm run lint
npm run dev
```

In WordPress, add the section to a draft page and open the preview (see `docs/wordpress-setup.md`). Check:

- It renders in the position it has in WordPress, and a second instance holds different content.
- Empty optional fields, an empty repeater and a missing image do not break it.
- Desktop and mobile widths match Figma.
- Moving it up and down in WordPress changes the page order after publish.

## 8. Document and deploy

1. Run `npm run sections:inventory` and update `docs/sections/inventory.md` (add the layout row with its component and status).
2. Update `agent.md` (completed tasks, inventory status).
3. Deploy the Next.js app **before** editors use the layout on published pages. Publishing then triggers `/api/revalidate`, which refreshes the page.

If the layout reaches production before the frontend, the page still renders: the unknown section is skipped and logged as `[page-builder] Skipped section … (no registered component)`.

## Removing or renaming a layout

Delete the fragment file, the section file and its registry entry, then `npm run schema && npm run codegen && npm run sections:check`. If a layout is removed in WordPress before the frontend is updated, the page query still works: `content.ts` only requests fragments for layout types the live schema reports (it introspects the schema and caches the result under the `schema` tag).
