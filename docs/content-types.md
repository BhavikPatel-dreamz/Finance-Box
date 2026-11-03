# Posts, case studies and team members

WordPress post types other than pages have their own Next.js routes (they do not use the Page Builder).

| WordPress type | GraphQL | WordPress URL | Site route | Route file |
| --- | --- | --- | --- | --- |
| `post` | `Post` | `/<slug>/` (redirected) | `/blog/<slug>/`; archive `/blog/`, `/blog/page/<n>/` | `src/app/blog/` |
| `case-study` | `CaseStudy` (+ ACF `caseStudiesOptions`) | `/case-study/<slug>/` | same; archive `/case-study/` | `src/app/case-study/` |
| `team` | `Team` | `/team/<slug>/` | same (no archive; the team list is on Why FIAB) | `src/app/team/[slug]/` |

URL helpers for all of these live in `src/lib/wordpress/paths.ts`; change routes there only.

## Data

- Card fragments `src/lib/wordpress/queries/fragments/{PostCard,CaseStudyCard,TeamCard}.graphql` are shared by the detail/list queries (`posts.graphql`, `case-studies.graphql`, `team.graphql`) **and** by the page-builder sections that embed these types (Our Blog, Case Study, Clients Featured Case Studies, Team Members). One change updates every place.
- Loaders: `src/lib/wordpress/collections.ts` (`getPost`, `getPosts`, `getCaseStudy`, `getCaseStudies`, `getTeamMember`, `getTeamMembers`). Only `publish` status is public. Cache tags: `post:<slug>`, `list:post`, `case-study:<slug>`, `list:case-study`, `team:<slug>`, `list:team`.
- Mappers: `src/lib/wordpress/cards.ts` (blog and case study cards, reading time, primary category, Challenge/Solution/Outcome parsing) and `src/components/team/team-member.ts` (team bio parsing).
- Body HTML (`content`) is rendered only through `src/components/content/rich-text.tsx`, which sanitizes with a strict allowlist (`src/lib/wordpress/rich-text.ts`): no scripts, styles, iframes, forms, event handlers, classes or `javascript:`/`data:` URLs; links to the WordPress host become site-relative; external links open in a new tab with `rel="noopener noreferrer"`. Tested against common XSS payloads on 2026-11-03.

## Shared components (moved out of the page sections)

| Component | From | Used by |
| --- | --- | --- |
| `components/blog/blog-card.tsx` | Knowledge Hub "Our Blog" | Knowledge Hub, `/blog`, post "More articles" |
| `components/case-studies/case-study-card.tsx` | Clients featured case studies | Clients, `/case-study` |
| `components/team/team-card.tsx` (`TeamProfileCard`) | Why FIAB team | Why FIAB (links to profile), `/team/<slug>/` |
| `components/content/article-hero.tsx` | Legal page banner | legal pages, all routes above |

## Editor notes

- **Case studies**: write *Featured Content* as paragraphs starting with bold labels — **Challenge:**, **Solution:**, **Outcome:**. They fill the three boxes on cards and on the detail page. *Tag Line* is the green label; *Excerpt* is the intro. The body (*content*) appears below the three boxes.
- **Posts**: the most specific category (not "Blog") is shown on cards. Reading time is estimated from the body.
- **Team**: *Excerpt* is the role. In the body, the first paragraph is the quote, then the bio; lines starting with "Focus & expertise:", "Partnerships:", "Notable work:", "Tools & platforms:", "Industries:" fill those fields.
- `/category/<name>/` redirects to `/blog/`.

## Webhook

`/api/revalidate` accepts `type` `post`, `case-study` (or `case_study`), `team` with `slug` (and `oldSlug` after a slug change) or `uri`. It expires the item, its list, the sitemap and all pages (pages embed these types). See `docs/caching.md`.

## Not covered yet

- Draft preview for these types (`/api/preview` previews pages only).
- Blog category/tag archives, search.
