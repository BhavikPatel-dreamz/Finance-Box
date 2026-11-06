import "server-only";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import type { DocumentNode } from "graphql";
import { collectionTag, itemTag, publicReadsAreCached, type ContentType } from "@/lib/cache/tags";
import { graphqlEndpoint, graphqlRequest } from "@/lib/wordpress/client";
import { GraphQLConfigError } from "@/lib/wordpress/errors";
import {
  CaseStudiesListDocument,
  CaseStudyBySlugDocument,
  PostBySlugDocument,
  PostsListDocument,
  TeamListDocument,
  TeamMemberBySlugDocument,
  type CaseStudiesListQuery,
  type CaseStudyBySlugQuery,
  type PostBySlugQuery,
  type PostsListQuery,
  type TeamListQuery,
  type TeamMemberBySlugQuery,
} from "@/lib/wordpress/generated/graphql";
import { isSlug } from "@/lib/wordpress/paths";

/**
 * Published blog posts, case studies and team members (WordPress post types
 * `post`, `case-study`, `team`). Same contract as page loading: cached in
 * production under per-item and per-collection tags, never cached in
 * development, and "unavailable" (not "not found") when WordPress fails.
 */

export type ItemResult<T> =
  | { status: "ok"; item: T }
  | { status: "not-found" }
  | { status: "unavailable" }
  | { status: "unconfigured" };

export type ListResult<T> = { status: "ok"; items: T[] } | { status: "unavailable" } | { status: "unconfigured" };

export type Post = NonNullable<PostBySlugQuery["post"]>;
export type PostSummary = PostsListQuery["posts"] extends infer C
  ? C extends { nodes: Array<infer N> } ? N : never
  : never;
export type CaseStudy = NonNullable<CaseStudyBySlugQuery["caseStudy"]>;
export type CaseStudySummary = CaseStudiesListQuery["caseStudies"] extends infer C
  ? C extends { nodes: Array<infer N> } ? N : never
  : never;
export type TeamMember = NonNullable<TeamMemberBySlugQuery["team"]>;
export type TeamMemberSummary = TeamListQuery["teams"] extends infer C
  ? C extends { nodes: Array<infer N> } ? N : never
  : never;

const PAGE_SIZE = 100;
const MAX_PAGES = 10;

function failure(error: unknown, context: string): { status: "unavailable" } | { status: "unconfigured" } {
  if (error instanceof GraphQLConfigError) return { status: "unconfigured" };
  console.error(`[wordpress] ${context}: ${error instanceof Error ? error.message : String(error)}`);
  return { status: "unavailable" };
}

type Connection<N> = { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: N[] } | null | undefined;

async function readAll<Q, N>(document: DocumentNode, pick: (data: Q) => Connection<N>, type: ContentType): Promise<ListResult<N>> {
  if (!graphqlEndpoint()) return { status: "unconfigured" };
  const items: N[] = [];
  let after: string | null = null;
  try {
    for (let page = 0; page < MAX_PAGES; page += 1) {
      const connection: Connection<N> = pick(await graphqlRequest<Q>(document, { first: PAGE_SIZE, after }));
      items.push(...(connection?.nodes ?? []));
      if (!connection?.pageInfo.hasNextPage || !connection.pageInfo.endCursor) break;
      after = connection.pageInfo.endCursor;
    }
    return { status: "ok", items };
  } catch (error) {
    return failure(error, `${type} list query failed`);
  }
}

async function readOne<Q, N extends { status?: string | null }>(
  document: DocumentNode,
  pick: (data: Q) => N | null | undefined,
  type: ContentType,
  slug: string,
): Promise<ItemResult<N>> {
  if (!isSlug(slug)) return { status: "not-found" };
  if (!graphqlEndpoint()) return { status: "unconfigured" };
  try {
    const item = pick(await graphqlRequest<Q>(document, { slug }));
    // Only published items are public. Drafts are reachable through preview only.
    if (!item || item.status !== "publish") return { status: "not-found" };
    return { status: "ok", item };
  } catch (error) {
    return failure(error, `${type} query failed for ${slug}`);
  }
}

/* ------------------------------- Blog posts ------------------------------- */

const readPost = (slug: string) => readOne<PostBySlugQuery, Post>(PostBySlugDocument, (d) => d.post, "post", slug);
const readPosts = () => readAll<PostsListQuery, PostSummary>(PostsListDocument, (d) => d.posts, "post");

async function cachedPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(itemTag("post", slug), collectionTag("post"));
  return readPost(slug);
}
async function cachedPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag("post"));
  return readPosts();
}

export const getPost = cache((slug: string) => (publicReadsAreCached() ? cachedPost(slug) : readPost(slug)));
/** Every published post, newest first. */
export const getPosts = cache(() => (publicReadsAreCached() ? cachedPosts() : readPosts()));

/* ------------------------------ Case studies ------------------------------ */

const readCaseStudy = (slug: string) =>
  readOne<CaseStudyBySlugQuery, CaseStudy>(CaseStudyBySlugDocument, (d) => d.caseStudy, "case-study", slug);
const readCaseStudies = () =>
  readAll<CaseStudiesListQuery, CaseStudySummary>(CaseStudiesListDocument, (d) => d.caseStudies, "case-study");

async function cachedCaseStudy(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(itemTag("case-study", slug), collectionTag("case-study"));
  return readCaseStudy(slug);
}
async function cachedCaseStudies() {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag("case-study"));
  return readCaseStudies();
}

export const getCaseStudy = cache((slug: string) => (publicReadsAreCached() ? cachedCaseStudy(slug) : readCaseStudy(slug)));
export const getCaseStudies = cache(() => (publicReadsAreCached() ? cachedCaseStudies() : readCaseStudies()));

/* ---------------------------------- Team ---------------------------------- */

const readTeamMember = (slug: string) =>
  readOne<TeamMemberBySlugQuery, TeamMember>(TeamMemberBySlugDocument, (d) => d.team, "team", slug);
const readTeamMembers = () => readAll<TeamListQuery, TeamMemberSummary>(TeamListDocument, (d) => d.teams, "team");

async function cachedTeamMember(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(itemTag("team", slug), collectionTag("team"));
  return readTeamMember(slug);
}
async function cachedTeamMembers() {
  "use cache";
  cacheLife("hours");
  cacheTag(collectionTag("team"));
  return readTeamMembers();
}

export const getTeamMember = cache((slug: string) => (publicReadsAreCached() ? cachedTeamMember(slug) : readTeamMember(slug)));
export const getTeamMembers = cache(() => (publicReadsAreCached() ? cachedTeamMembers() : readTeamMembers()));
