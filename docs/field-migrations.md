# ACF field migration guide

Renaming or retyping an ACF field changes the WPGraphQL schema. Because the
frontend sends one validated page query, an incompatible field can make every
page return the "unavailable" message. Use additive migrations only.

## Zero-downtime sequence

1. Add the new field in WordPress with a new Name and Type. Keep the old field.
2. Update the fragment in `src/lib/wordpress/queries/sections/*.graphql` to select both.
3. Map both in the component, preferring the new field and falling back to the old one.
4. Run `npm run schema && npm run codegen && npm run sections:check && npm run typecheck`.
5. Deploy Next.js.
6. Migrate content in WordPress.
7. Remove the old field in a later change.

## Defensive reads

Use `asArray`, `asObject` and `asString` from `src/lib/wordpress/fields.ts` so a
renamed or retyped field degrades to a fallback instead of throwing during render.
