import "server-only";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import {
  menuTag,
  menusTag,
  pageTag,
  pagesTag,
  publicReadsAreCached,
  schemaTag,
  settingsTag,
  sitemapTag,
} from "@/lib/cache/tags";
import { sectionSelection } from "@/lib/page-builder/section-fragments";
import { graphqlEndpoint, graphqlRequest } from "@/lib/wordpress/client";
import { GraphQLConfigError } from "@/lib/wordpress/errors";
import {
  MenuByLocationDocument,
  PageCoreFragmentDoc,
  PublishedPagesDocument,
  SchemaCapabilitiesDocument,
  SiteSettingsDocument,
  type MenuByLocationQuery,
  type PageCoreFragment,
  type PublishedPagesQuery,
  type SchemaCapabilitiesQuery,
  type SiteSettingsQuery,
} from "@/lib/wordpress/generated/graphql";
import type { SectionData } from "@/lib/page-builder/types";
import { canonicalUrl, plainText, siteOrigin } from "@/lib/wordpress/text";
import { blogPath, isSlug } from "@/lib/wordpress/paths";
import { print } from "graphql";

export type CmsImage = {
  sourceUrl: string;
  altText: string;
  width: number | null;
  height: number | null;
};

/** One Flexible Content row exactly as WPGraphQL returned it. */
export type RawSection = Record<string, unknown> & { __typename?: string };

export type PageSeo = {
  title: string;
  description: string;
  canonical: string;
  openGraphTitle: string;
  openGraphDescription: string;
  image: string | null;
  noindex: boolean;
};

export type PublicPage = {
  databaseId: number;
  title: string;
  slug: string;
  uri: string;
  isFrontPage: boolean;
  featuredImage: CmsImage | null;
  sections: SectionData[];
  seo: PageSeo;
};

export type PageLoadResult =
  | { status: "redirect"; to: string }
  | { status: "unconfigured" }
  | { status: "unavailable" }
  | { status: "not-found" }
  | { status: "ok"; page: PublicPage };

export type SiteSettings = {
  name: string;
  description: string;
  url: string;
  source: "wordpress" | "fallback";
};

export type MenuLocation = "PRIMARY" | "FOOTER";

export type NavigationItem = {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  target: string;
  cssClasses: string[];
};

/* -------------------------------------------------------------------------- */
/*                             Schema capabilities                            */
/* -------------------------------------------------------------------------- */

type SchemaCapabilities = {
  /** Live layout type names, or null when introspection is unavailable. */
  layoutTypes: string[] | null;
  /** Whether a Yoast-compatible `Page.seo` field exists. */
  hasSeo: boolean;
};

async function readCapabilities(): Promise<SchemaCapabilities> {
  try {
    const data = await graphqlRequest<SchemaCapabilitiesQuery>(SchemaCapabilitiesDocument);
    const layoutTypes = (data.layouts?.possibleTypes ?? []).flatMap((type) => (type.name ? [type.name] : []));
    const pageFields = new Set((data.page?.fields ?? []).map((field) => field.name));
    return { layoutTypes: layoutTypes.length > 0 ? layoutTypes : null, hasSeo: pageFields.has("seo") };
  } catch (error) {
    // Introspection can be disabled on hardened sites. Request every known
    // fragment instead; GraphQL validation then reports any removed layout.
    console.warn(`[wordpress] schema introspection unavailable: ${errorMessage(error)}`);
    return { layoutTypes: null, hasSeo: false };
  }
}

async function cachedCapabilities() {
  "use cache";
  cacheLife("hours");
  cacheTag(schemaTag);
  return readCapabilities();
}

const getCapabilities = cache(async (): Promise<SchemaCapabilities> => {
  return publicReadsAreCached() ? cachedCapabilities() : readCapabilities();
});

/* -------------------------------------------------------------------------- */
/*                                 Page query                                 */
/* -------------------------------------------------------------------------- */

const SEO_SELECTION = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
    metaRobotsNoindex
  }
`;

const pageCoreDefinition = print(PageCoreFragmentDoc);

function pageSelection(capabilities: SchemaCapabilities) {
  const sections = sectionSelection(capabilities.layoutTypes ? new Set(capabilities.layoutTypes) : null);
  const selection = `
    ...PageCore
    ${capabilities.hasSeo ? SEO_SELECTION : ""}
    pageBuilder {
      pageBuilder {
        __typename
        ${sections.spreads}
      }
    }
  `;
  return { selection, definitions: `${pageCoreDefinition}\n\n${sections.definitions}` };
}

function publicPageQuery(capabilities: SchemaCapabilities) {
  const { selection, definitions } = pageSelection(capabilities);
  return `
    query PageByUri($uri: String!) {
      nodeByUri(uri: $uri) {
        __typename
        ... on Page { ${selection} }
        ... on Post { slug status }
      }
    }
    ${definitions}
  `;
}

function previewPageQuery(capabilities: SchemaCapabilities) {
  const { selection, definitions } = pageSelection(capabilities);
  // `preview.node` is the latest unsaved revision of a published page. For a
  // draft that was never published, the page itself is the draft.
  return `
    query PreviewPage($id: ID!) {
      page(id: $id, idType: DATABASE_ID) {
        desiredSlug
        ${selection}
        preview {
          node { ${selection} }
        }
      }
    }
    ${definitions}
  `;
}

type YoastSeo = {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphImage?: { sourceUrl?: string | null } | null;
  metaRobotsNoindex?: string | null;
};

type PageNode = PageCoreFragment & {
  __typename?: string;
  seo?: YoastSeo | null;
  pageBuilder?: { pageBuilder?: Array<SectionData | null> | null } | null;
};

type PublicPageResponse = { nodeByUri?: (PageNode | { __typename: "Post"; slug?: string | null; status?: string | null }) | null };
type PreviewPageResponse = {
  page?: (PageNode & { desiredSlug?: string | null; preview?: { node?: PageNode | null } | null }) | null;
};

/* -------------------------------------------------------------------------- */
/*                                  Mapping                                   */
/* -------------------------------------------------------------------------- */

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function mapImage(page: PageNode): CmsImage | null {
  const image = page.featuredImage?.node;
  if (!image?.sourceUrl) return null;
  return {
    sourceUrl: image.sourceUrl,
    altText: image.altText ?? "",
    width: image.mediaDetails?.width ?? null,
    height: image.mediaDetails?.height ?? null,
  };
}

/** Keeps only well-formed rows; order is exactly as WordPress returned it. */
function mapSections(page: PageNode): SectionData[] {
  const rows = page.pageBuilder?.pageBuilder ?? [];
  return rows.filter(
    (row): row is SectionData => row !== null && typeof row === "object" && typeof row.__typename === "string",
  );
}

/** Without an SEO plugin, the first section that has a description stands in for the meta description. */
function fallbackDescription(page: PageNode, sections: SectionData[]) {
  const content = plainText(page.content);
  if (content) return content.slice(0, 160);
  for (const section of sections) {
    const description = "description" in section ? plainText(section.description as string | null) : "";
    if (description) return description.slice(0, 160);
  }
  return "";
}

/** The first section's title, used for the front page when no SEO plugin supplies one ("Home" is not a useful title). */
function leadSectionTitle(sections: SectionData[]) {
  const first = sections[0];
  return first && typeof first.title === "string" ? plainText(first.title) : "";
}

function mapPage(page: PageNode, uri: string): PublicPage {
  const sections = mapSections(page);
  const title = plainText(page.title) || "Untitled";
  const documentTitle = (page.isFrontPage && leadSectionTitle(sections)) || title;
  const description = fallbackDescription(page, sections);
  const image = mapImage(page);
  const seo = page.seo;

  return {
    databaseId: page.databaseId,
    title,
    slug: page.slug ?? "",
    uri,
    isFrontPage: page.isFrontPage,
    featuredImage: image,
    sections,
    seo: {
      title: plainText(seo?.title) || documentTitle,
      description: plainText(seo?.metaDesc) || description,
      canonical: seo?.canonical || canonicalUrl(uri),
      openGraphTitle: plainText(seo?.opengraphTitle) || plainText(seo?.title) || documentTitle,
      openGraphDescription: plainText(seo?.opengraphDescription) || plainText(seo?.metaDesc) || description,
      image: seo?.opengraphImage?.sourceUrl || image?.sourceUrl || null,
      noindex: seo?.metaRobotsNoindex === "noindex",
    },
  };
}

function failure(error: unknown, context: string): PageLoadResult {
  if (error instanceof GraphQLConfigError) return { status: "unconfigured" };
  console.error(`[wordpress] ${context}: ${errorMessage(error)}`);
  return { status: "unavailable" };
}

/* -------------------------------------------------------------------------- */
/*                                Public pages                                */
/* -------------------------------------------------------------------------- */

async function readPublicPage(uri: string): Promise<PageLoadResult> {
  if (!graphqlEndpoint()) return { status: "unconfigured" };

  try {
    const capabilities = await getCapabilities();
    const data = await graphqlRequest<PublicPageResponse>(publicPageQuery(capabilities), { uri });
    const node = data.nodeByUri;
    // WordPress puts posts at /<slug>/; the site serves them under /blog/.
    if (node?.__typename === "Post") {
      return node.status === "publish" && isSlug(node.slug) ? { status: "redirect", to: blogPath(node.slug) } : { status: "not-found" };
    }
    // Only published WordPress pages are public. Posts, terms and attachments
    // resolve through nodeByUri too, but they are not rendered by this template.
    if (!node || node.__typename !== "Page" || node.status !== "publish") return { status: "not-found" };
    return { status: "ok", page: mapPage(node, node.uri || uri) };
  } catch (error) {
    return failure(error, `page query failed for ${uri}`);
  }
}

async function cachedPublicPage(uri: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(pageTag(uri), pagesTag);
  return readPublicPage(uri);
}

/** Published page by URI. Deduplicated per request, cached across requests in production. */
export const getPublicPage = cache(async (uri: string): Promise<PageLoadResult> => {
  return publicReadsAreCached() ? cachedPublicPage(uri) : readPublicPage(uri);
});

/**
 * Draft or latest revision by database ID, fetched with the server-only
 * preview credentials. Never cached.
 */
export const getPreviewPage = cache(async (databaseId: number): Promise<PageLoadResult & { path?: string }> => {
  if (!graphqlEndpoint()) return { status: "unconfigured" };

  try {
    const capabilities = await getCapabilities();
    const data = await graphqlRequest<PreviewPageResponse>(
      previewPageQuery(capabilities),
      { id: String(databaseId) },
      { preview: true },
    );
    const page = data.page;
    if (!page) return { status: "not-found" };

    // Unpublished drafts have no URI yet. Preview them at their intended slug.
    const path = page.uri || `/${page.desiredSlug || page.slug || `draft-${page.databaseId}`}/`;
    const source = page.preview?.node ?? page;
    const mapped = mapPage({ ...source, databaseId: page.databaseId, uri: page.uri }, path);
    return { status: "ok", page: { ...mapped, seo: { ...mapped.seo, noindex: true } }, path };
  } catch (error) {
    return failure(error, `preview query failed for page ${databaseId}`);
  }
});

/* -------------------------------------------------------------------------- */
/*                               Global settings                              */
/* -------------------------------------------------------------------------- */

const fallbackSettings: SiteSettings = {
  name: "Financebox",
  description: "",
  url: siteOrigin(),
  source: "fallback",
};

async function readSettings(): Promise<SiteSettings> {
  if (!graphqlEndpoint()) return fallbackSettings;

  try {
    const data = await graphqlRequest<SiteSettingsQuery>(SiteSettingsDocument);
    const settings = data.generalSettings;
    if (!settings?.title) return fallbackSettings;
    return {
      name: settings.title,
      description: settings.description ?? "",
      url: settings.url || siteOrigin(),
      source: "wordpress",
    };
  } catch (error) {
    console.warn(`[wordpress] settings query failed: ${errorMessage(error)}`);
    return fallbackSettings;
  }
}

async function cachedSettings() {
  "use cache";
  cacheLife("hours");
  cacheTag(settingsTag);
  return readSettings();
}

export const getSettings = cache(async (): Promise<SiteSettings> => {
  return publicReadsAreCached() ? cachedSettings() : readSettings();
});

async function readMenu(location: MenuLocation): Promise<NavigationItem[]> {
  if (!graphqlEndpoint()) return [];

  try {
    const data = await graphqlRequest<MenuByLocationQuery>(MenuByLocationDocument, { location });
    return (data.menuItems?.nodes ?? []).flatMap((item) => {
      if (!item.id || !item.label) return [];
      return [
        {
          id: item.id,
          label: plainText(item.label),
          url: item.url ?? "",
          path: item.path ?? "",
          parentId: item.parentId ?? null,
          target: item.target ?? "",
          cssClasses: (item.cssClasses ?? []).filter((value): value is string => Boolean(value)),
        },
      ];
    });
  } catch (error) {
    console.warn(`[wordpress] ${location} menu query failed: ${errorMessage(error)}`);
    return [];
  }
}

async function cachedMenu(location: MenuLocation) {
  "use cache";
  cacheLife("hours");
  cacheTag(menusTag, menuTag(location));
  return readMenu(location);
}

/** Menu assigned to a WordPress menu location. Empty when none is assigned. */
export const getMenu = cache(async (location: MenuLocation): Promise<NavigationItem[]> => {
  return publicReadsAreCached() ? cachedMenu(location) : readMenu(location);
});

/* -------------------------------------------------------------------------- */
/*                                   Sitemap                                  */
/* -------------------------------------------------------------------------- */

async function readPublicPageUris(): Promise<string[]> {
  if (!graphqlEndpoint()) return [];

  const uris: string[] = [];
  let after: string | null = null;

  try {
    for (let index = 0; index < 20; index += 1) {
      const data: PublishedPagesQuery = await graphqlRequest<PublishedPagesQuery>(PublishedPagesDocument, { after });
      for (const node of data.pages?.nodes ?? []) {
        if (node?.uri) uris.push(node.uri);
      }
      if (!data.pages?.pageInfo?.hasNextPage || !data.pages.pageInfo.endCursor) break;
      after = data.pages.pageInfo.endCursor;
    }
  } catch (error) {
    console.warn(`[wordpress] sitemap query failed: ${errorMessage(error)}`);
  }

  return uris;
}

async function cachedPublicPageUris() {
  "use cache";
  cacheLife("hours");
  cacheTag(sitemapTag, pagesTag);
  return readPublicPageUris();
}

export async function getPublicPageUris(): Promise<string[]> {
  return publicReadsAreCached() ? cachedPublicPageUris() : readPublicPageUris();
}
