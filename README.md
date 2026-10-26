# Financebox

Next.js renders every page on the server from the external WordPress GraphQL API. Editors change content in WordPress. This repository does not contain WordPress.

Status notes live in `agent.md`. The section workflow lives in `.cursor/skills/financebox/SKILL.md`.

Node 22 is required (`.nvmrc`).

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

`npm run codegen` refreshes GraphQL types. Set `WORDPRESS_GRAPHQL_URL` first when regenerating from a live schema.
