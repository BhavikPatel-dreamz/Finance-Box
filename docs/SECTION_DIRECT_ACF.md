# Direct ACF section pattern (no merge/fallback)

Use this when converting an adapter-based section to direct WordPress fields.

## 1. Section component
- Import fields from `@/lib/wordpress/fields` (`text`, `media`, `link`, `listItems`, `splitEmphasis`).
- Read from `data` directly.
- Build the component props object manually.
- Use empty strings / empty arrays when a field is missing; never fall back to static content.
- Leave the `<pre>{JSON.stringify(data)}</pre>` only while testing; replace with real JSX.

## 2. Mapping examples

### Hero-ish banner (title + highlight + CTA)
```tsx
const parts = splitEmphasis(data.title);
const title = parts ? [parts.before, parts.after].filter(Boolean).join(" ").trim() : text(data.title, "");
const highlight = parts ? parts.emphasis : "";
return <HeroSection ... overrides={{ title, highlight, ... }} />;
```

### Bullets from a textarea/list
```tsx
const bullets = listItems(data.description);
const tagLine = text(data.tagLine, "");
```

### Image + link
```tsx
image: media(data.image)?.url || "",
cta: link(data.ctaButton, { label: "", url: "" }),
```

### Repeater (numbered cards)
```tsx
const cards = Array.isArray(data.workCards)
  ? data.workCards.map((c: any) => ({
      number: c?.number != null ? String(c.number).padStart(2, "0") : "",
      title: text(c?.title, ""),
      text: text(c?.description, ""),
    }))
  : [];
```

## 3. Checklist
1. Remove `fromSection`/`merge*`/`*Content` imports.
2. Use fragment field names exactly as in GraphQL.
3. Add `?.` guards for nested/optional objects.
4. Run `npm run schema` + `npm run codegen` if WP schema changed.
5. Typecheck: `npm run typecheck`.

## 4. Do NOT
- Do not add `uri`, `pathname`, or page-based conditions.
- Do not reintroduce static fallback text.
- Do not rename ACF layouts or field keys.