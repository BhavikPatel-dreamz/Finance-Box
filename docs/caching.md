# Caching and revalidation

Public GraphQL reads are not cached during this development phase. `publicReadsAreCached()` returns false, so every refresh loads the current WordPress content. There is no loading screen. The page response is the rendered page.

The hour-long `use cache` wrappers remain in `src/lib/wordpress/content.ts` for a later production launch. Authenticated preview requests use `cache: "no-store"`.

## Tags

| Tag | Data |
| --- | --- |
| `page:<uri>` | One public page, including its sections |
| `settings` | `generalSettings` |
| `menus`, `menu:PRIMARY`, `menu:FOOTER` | Navigation |
| `schema` | GraphQL introspection used to discover sections and SEO fields |
| `sitemap` | The list of public page URIs |

## Invalidation

Saving a page or post, or updating a menu, makes the WordPress plugin POST to `/api/revalidate`.

The plugin sends `REVALIDATE_SECRET`. Next.js checks it with a timing-safe compare, then marks the page tag, settings, menus, schema, and sitemap stale with `revalidateTag(tag, { expire: 0 })`. It also calls `revalidatePath` for the page URI. The next visit loads fresh content.

Preview responses are never given those public tags.

## When WordPress is unavailable

Cached public pages can still be served until their cache entry expires. A request with no cached entry renders the unavailable message instead of a 404. Missing pages, confirmed by a successful GraphQL response, return 404.

The in-process contact rate limit is not shared across servers and resets when the process restarts.
