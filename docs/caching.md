# Caching and revalidation

Next.js 16 with Cache Components. WordPress reads are wrapped in `"use cache"` functions in `src/lib/wordpress/content.ts`, with `cacheLife("hours")` (revalidate after 1 hour, expire after 1 day) and cache tags.

- **Production** (`next build && next start`): cached. Set `WORDPRESS_CACHE=off` to disable (e.g. a staging server where editors expect every refresh to be live).
- **Development** (`next dev`): never cached, every refresh reads WordPress.
- **Draft Mode**: Next.js re-executes cached functions without saving their results, and preview requests use separate, credentialed, uncached fetches. Draft content can never enter the public cache.

Every loader is also wrapped in React `cache()`, so `generateMetadata` and the page share one WordPress request per render.

Measured on 2026-11-03 against the live site (`next start`): first `/` request 13.3 s (cold WordPress), repeat 0.08 s; `/careers` repeat 0.04 s; after a `page` webhook, the next request refetched (1.5 s) and the following one was cached again (0.1 s).

## Tags

| Tag | Data |
| --- | --- |
| `page:<uri>` | One public page, including its sections and SEO |
| `pages` | Every page entry (slug changes and deletions) |
| `settings` | `generalSettings` |
| `menus`, `menu:PRIMARY`, `menu:FOOTER` | Navigation |
| `schema` | Live layout types / SEO field detection |
| `sitemap` | Published page URIs |

## Webhook

`POST /api/revalidate` with header `x-revalidate-secret: <REVALIDATE_SECRET>` (or `"secret"` in the JSON body, as the existing plugin sends). The secret is compared in constant time; missing or wrong secrets get 401.

| `type` | Expires |
| --- | --- |
| `page` / `post` (+ `uri`, optional `oldUri`) | `page:<uri>`, `page:<oldUri>`, `pages`, `sitemap`, and the route paths |
| `menu` | `menus`, `menu:PRIMARY`, `menu:FOOTER` |
| `settings` / `options` | `settings` |
| `schema` | `schema` and everything a `page` event expires |
| `all`, missing or unknown | everything (backwards compatible with the current plugin) |

Expiry is immediate (`{ expire: 0 }`): the next visitor gets fresh data. Calls are idempotent, so duplicate deliveries and retries are safe. Failures return 500 and are logged as `[revalidate]`.

Slug changes and deletions: the `pages` tag clears every cached page, so the old URI stops resolving even if WordPress only reports the new one.

## When WordPress is unavailable

Cached pages keep being served until they expire. An uncached request renders an "unavailable" message with `noindex`; it is never cached as a 404. Only a successful GraphQL response that has no published page produces a 404.

## Known limitation: 404 status

The catch-all route is partially prerendered, so its response starts streaming before WordPress answers. When a page does not exist, Next.js renders the 404 page with `<meta name="robots" content="noindex">` but the HTTP status stays **200** in production (`next dev` returns 404). This is documented framework behaviour and was the same before the refactor. To return a real 404, add a Proxy check against a cached list of published URIs (see the Next.js `loading.js` "Status codes" docs).
