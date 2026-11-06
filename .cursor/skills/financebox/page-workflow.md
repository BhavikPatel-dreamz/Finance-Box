# Section workflow

Follow [SKILL.md](SKILL.md) and `docs/section-development.md`. Figma frames become section components, never page files.

A new marketing URL is a WordPress page, not a new Next.js route, unless it must be reserved from the CMS (`RESERVED_SEGMENTS` in `src/lib/wordpress/uri.ts`).
