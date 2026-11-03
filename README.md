# Financebox

Next.js renders every page on the server from the external WordPress GraphQL API. Editors build pages in WordPress from Page Builder sections; this repository does not contain WordPress.

- Status: `agent.md`
- Architecture: `docs/architecture.md`
- Adding a section: `docs/section-development.md`
- Section inventory: `docs/sections/inventory.md`
- WordPress setup, menus, preview: `docs/wordpress-setup.md`
- Caching and webhook: `docs/caching.md`

Node 22 is required (`.nvmrc`).

```bash
cp .env.example .env.local
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run schema` | Download the live WordPress schema to `src/lib/wordpress/schema.graphql` |
| `npm run codegen` | Validate GraphQL documents and generate types |
| `npm run sections:inventory` | List every ACF layout and its GraphQL fields |
| `npm run sections:check` | Check fragment ↔ registry wiring and the composed page query |
| `npm run typecheck` / `npm run lint` / `npm run build` | Checks |
