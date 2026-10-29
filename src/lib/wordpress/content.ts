import { cacheLife, cacheTag } from "next/cache";
import { menuTag, menusTag, pageTag, publicReadsAreCached, schemaTag, settingsTag, sitemapTag } from "@/lib/cache/tags";
import { sectionRegistry } from "@/components/sections/registry";
import { graphqlEndpoint, graphqlRequest } from "@/lib/wordpress/client";
import { GraphQLConfigError, GraphQLRequestError } from "@/lib/wordpress/errors";
import {
  MenuByLocationDocument,
  PageByUriDocument,
  PreviewPageDocument,
  PublishedPagesDocument,
  SiteSettingsDocument,
  type MenuByLocationQuery,
  type PageByUriQuery,
  type PreviewPageQuery,
  type PublishedPagesQuery,
  type SiteSettingsQuery,
} from "@/lib/wordpress/generated/graphql";
import { canonicalUrl, plainText, siteOrigin } from "@/lib/wordpress/text";

const PAGE_BUILDER_FIELD = "pageBuilder";
const PAGE_SECTIONS_FIELD = "pageBuilder";
const IDENTIFIER = /^[_A-Za-z][_0-9A-Za-z]*$/;
type TypeRef = {
  kind?: string | null;
  name?: string | null;
  ofType?: TypeRef | null;
} | null;

type TypeByNameResult = {
  __type?: {
    name?: string | null;
    kind?: string | null;
    fields?: Array<{ name?: string | null; type?: TypeRef } | null> | null;
    enumValues?: Array<{ name?: string | null } | null> | null;
    possibleTypes?: Array<{ name?: string | null } | null> | null;
  } | null;
};

const TYPE_BY_NAME_QUERY = `
  query TypeByName($name: String!) {
    __type(name: $name) {
      name
      kind
      fields {
        name
        type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
      enumValues {
        name
      }
      possibleTypes {
        name
      }
    }
  }
`;

export type CmsImage = {
  sourceUrl: string;
  altText: string;
  width: number | null;
  height: number | null;
};

export type RawSection = Record<string, unknown> & { __typename?: string };

export type PublicPage = {
  title: string;
  slug: string;
  uri: string;
  description: string;
  featuredImage: CmsImage | null;
  sections: RawSection[];
  sectionError: string | null;
  seo: {
    title: string;
    description: string;
    canonical: string;
    openGraphTitle: string;
    openGraphDescription: string;
    image: string | null;
  };
};

export type PageLoadResult =
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

export type NavigationItem = {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  target: string;
};

type IntrospectedField = {
  name: string;
  typeName: string | null;
  kind: string | null;
};

type IntrospectedType = {
  name: string;
  kind: string | null;
  fields: IntrospectedField[];
  enumValues: string[];
  possibleTypes: string[];
};

type PageNode = {
  title?: string | null;
  slug?: string | null;
  uri?: string | null;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
      mediaDetails?: { width?: number | null; height?: number | null } | null;
    } | null;
  } | null;
};

const fallbackSettings: SiteSettings = {
  name: "Financebox",
  description: "",
  url: siteOrigin(),
  source: "fallback",
};

function unwrapType(type: TypeRef | null | undefined): { name: string | null; kind: string | null } {
  let current = type;
  while (current && (current.kind === "NON_NULL" || current.kind === "LIST")) {
    current = current.ofType;
  }
  return { name: current?.name ?? null, kind: current?.kind ?? null };
}

function normalizeType(type: TypeByNameResult["__type"]): IntrospectedType | null {
  if (!type?.name) return null;
  return {
    name: type.name,
    kind: type.kind ?? null,
    fields: (type.fields ?? []).flatMap((field) => {
      if (!field?.name) return [];
      const unwrapped = unwrapType(field.type);
      return [{ name: field.name, typeName: unwrapped.name, kind: unwrapped.kind }];
    }),
    enumValues: (type.enumValues ?? []).flatMap((value) => (value?.name ? [value.name] : [])),
    possibleTypes: (type.possibleTypes ?? []).flatMap((value) => (value?.name ? [value.name] : [])),
  };
}

function assertIdentifier(value: string) {
  if (!IDENTIFIER.test(value)) {
    throw new GraphQLRequestError("Refusing to query an unexpected GraphQL name.");
  }
  return value;
}

function confirmedSelection(selection: string, confirmed: Set<string>) {
  const chunks: string[] = [];
  const source = selection.trim();
  let index = 0;
  while (index < source.length) {
    while (index < source.length && /\s/.test(source[index])) index += 1;
    if (index >= source.length) break;
    const start = index;
    while (index < source.length && /[A-Za-z0-9_]/.test(source[index])) index += 1;
    const name = source.slice(start, index);
    while (index < source.length && /\s/.test(source[index])) index += 1;
    if (source[index] === "{") {
      let depth = 1;
      index += 1;
      while (index < source.length && depth > 0) {
        if (source[index] === "{") depth += 1;
        else if (source[index] === "}") depth -= 1;
        index += 1;
      }
    }
    if (confirmed.has(name)) chunks.push(source.slice(start, index).trim());
  }
  return chunks.join(" ");
}

async function readTypeInfo(name: string) {
  if (!graphqlEndpoint()) return null;
  const data = await graphqlRequest<TypeByNameResult>(TYPE_BY_NAME_QUERY, { name });
  return normalizeType(data.__type);
}

async function cachedTypeInfo(name: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(schemaTag);
  return readTypeInfo(name);
}

async function getTypeInfo(name: string) {
  if (!publicReadsAreCached()) return readTypeInfo(name);
  return cachedTypeInfo(name);
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

function mapPage(page: PageNode, sections: RawSection[], sectionError: string | null): PublicPage {
  const title = plainText(page.title) || "Untitled";
  const description = plainText(page.content).slice(0, 160);
  const uri = page.uri || "/";
  const image = mapImage(page);
  return {
    title,
    slug: page.slug || "",
    uri,
    description,
    featuredImage: image,
    sections,
    sectionError,
    seo: {
      title,
      description,
      canonical: canonicalUrl(uri),
      openGraphTitle: title,
      openGraphDescription: description,
      image: image?.sourceUrl ?? null,
    },
  };
}

const PAGE_SEO_QUERY = `
  query PageSeo($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Page {
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  }
`;

type PageSeoResult = {
  nodeByUri?: {
    seo?: {
      title?: string | null;
      metaDesc?: string | null;
      canonical?: string | null;
      opengraphTitle?: string | null;
      opengraphDescription?: string | null;
      opengraphImage?: { sourceUrl?: string | null } | null;
    } | null;
  } | null;
};

async function loadSeo(uri: string, page: PublicPage, preview: boolean) {
  try {
    const data = await graphqlRequest<PageSeoResult>(PAGE_SEO_QUERY, { uri }, { preview });
    const seo = data.nodeByUri?.seo;
    if (!seo) return page;

    return {
      ...page,
      seo: {
        title: plainText(seo.title) || page.seo.title,
        description: plainText(seo.metaDesc) || page.seo.description,
        canonical: seo.canonical || page.seo.canonical,
        openGraphTitle: plainText(seo.opengraphTitle) || plainText(seo.title) || page.seo.openGraphTitle,
        openGraphDescription:
          plainText(seo.opengraphDescription) || plainText(seo.metaDesc) || page.seo.openGraphDescription,
        image: seo.opengraphImage?.sourceUrl || page.seo.image,
      },
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!/Cannot query field "seo"/i.test(message)) {
      console.error(`Financebox SEO query failed for ${uri}: ${message}`);
    }
    return page;
  }
}

async function loadSections(uri: string, preview: boolean) {
  try {
    const pageType = await getTypeInfo("Page");
    const builderField = pageType?.fields.find((field) => field.name === PAGE_BUILDER_FIELD);
    if (!builderField?.typeName) {
      return { sections: [] as RawSection[], sectionError: null };
    }

    const builderType = await getTypeInfo(builderField.typeName);
    const sectionsField = builderType?.fields.find((field) => field.name === PAGE_SECTIONS_FIELD);
    if (!sectionsField?.typeName) {
      return { sections: [] as RawSection[], sectionError: null };
    }

    const sectionsType = await getTypeInfo(sectionsField.typeName);
    const possibleTypes = sectionsType?.possibleTypes ?? [];
    const fragments: string[] = [];

    for (const typeName of possibleTypes) {
      const registration = sectionRegistry.find((section) => section.matchesType(typeName));
      if (!registration) continue;
      const layoutType = await getTypeInfo(typeName);
      const fields = registration.fields.filter((field) =>
        layoutType?.fields.some((candidate) => candidate.name === field),
      );
      if (fields.length === 0) continue;
      const confirmed = new Set(fields);
      const selection =
        registration.selection && fields.length === registration.fields.length
          ? registration.selection
          : registration.selection
            ? confirmedSelection(registration.selection, confirmed)
            : fields.map(assertIdentifier).join(" ");
      if (!/^[\sA-Za-z0-9_{}]+$/.test(selection)) {
        throw new GraphQLRequestError("Refusing to query an unexpected GraphQL selection.");
      }
      fragments.push(`... on ${assertIdentifier(typeName)} { __typename ${selection} }`);
    }

    if (possibleTypes.length === 0) {
      return { sections: [] as RawSection[], sectionError: null };
    }

    const query = `
      query PageSections($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            ${assertIdentifier(PAGE_BUILDER_FIELD)} {
              ${assertIdentifier(PAGE_SECTIONS_FIELD)} {
                __typename
                ${fragments.join("\n")}
              }
            }
          }
        }
      }
    `;

    const data = await graphqlRequest<{
      nodeByUri?: {
        pageBuilder?: Record<string, any> | null;
      } | null;
    }>(query, { uri }, { preview });

    const sections = data.nodeByUri?.pageBuilder?.[PAGE_SECTIONS_FIELD] ?? [];

    return {
      sections: sections as RawSection[],
      sectionError: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Section query failed.";
    if (/introspection is not allowed/i.test(message)) {
      return { sections: [] as RawSection[], sectionError: null };
    }
    console.error(`Financebox section query failed for ${uri}: ${message}`);
    return {
      sections: [] as RawSection[],
      sectionError: "Page sections could not be loaded.",
    };
  }
}

async function readSettings(): Promise<SiteSettings> {
  if (!graphqlEndpoint()) return fallbackSettings;

  try {
    const data = await graphqlRequest<SiteSettingsQuery>(SiteSettingsDocument, {});
    const settings = data.generalSettings;
    if (!settings?.title) return fallbackSettings;
    return {
      name: settings.title,
      description: settings.description ?? "",
      url: settings.url || siteOrigin(),
      source: "wordpress",
    };
  } catch {
    return fallbackSettings;
  }
}

async function cachedSettings() {
  "use cache";
  cacheLife("hours");
  cacheTag(settingsTag);
  return readSettings();
}

export async function getSettings(): Promise<SiteSettings> {
  if (!publicReadsAreCached()) return readSettings();
  return cachedSettings();
}

async function readMenu(location: "PRIMARY" | "FOOTER"): Promise<NavigationItem[]> {
  if (!graphqlEndpoint()) return [];

  try {
    const enumType = await getTypeInfo("MenuLocationEnum");
    if (!enumType?.enumValues.includes(location)) return [];

    const data = await graphqlRequest<MenuByLocationQuery>(MenuByLocationDocument, { location });
    return (data.menuItems?.nodes ?? []).flatMap((item) => {
      if (!item?.id || !item.label) return [];
      return [
        {
          id: item.id,
          label: item.label,
          url: item.url ?? "",
          path: item.path ?? "",
          parentId: item.parentId ?? null,
          target: item.target ?? "",
        },
      ];
    });
  } catch {
    return [];
  }
}

async function cachedMenu(location: "PRIMARY" | "FOOTER") {
  "use cache";
  cacheLife("hours");
  cacheTag(menusTag, menuTag(location));
  return readMenu(location);
}

export async function getMenu(location: "PRIMARY" | "FOOTER"): Promise<NavigationItem[]> {
  if (!publicReadsAreCached()) return readMenu(location);
  return cachedMenu(location);
}

async function readPublicPage(uri: string): Promise<PageLoadResult> {
  if (!graphqlEndpoint()) return { status: "unconfigured" };

  try {
    const data = await graphqlRequest<PageByUriQuery>(PageByUriDocument, { uri });
    const node = data.nodeByUri;
    if (!node || node.__typename !== "Page") return { status: "not-found" };

    const loaded = await loadSections(node.uri || uri, false);
    const page = await loadSeo(node.uri || uri, mapPage(node, loaded.sections, loaded.sectionError), false);
    return { status: "ok", page };
  } catch (error) {
    if (error instanceof GraphQLConfigError) return { status: "unconfigured" };
    return { status: "unavailable" };
  }
}

async function cachedPublicPage(uri: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(pageTag(uri));
  return readPublicPage(uri);
}

export async function getPublicPage(uri: string): Promise<PageLoadResult> {
  if (!publicReadsAreCached()) return readPublicPage(uri);
  return cachedPublicPage(uri);
}

export async function getPreviewPage(uri: string): Promise<PageLoadResult> {
  if (!graphqlEndpoint()) return { status: "unconfigured" };

  try {
    const data = await graphqlRequest<PreviewPageQuery>(
      PreviewPageDocument,
      { id: uri },
      { preview: true },
    );
    if (!data.page?.uri) return { status: "not-found" };

    const loaded = await loadSections(data.page.uri, true);
    const page = await loadSeo(data.page.uri, mapPage(data.page, loaded.sections, loaded.sectionError), true);
    return { status: "ok", page };
  } catch (error) {
    if (error instanceof GraphQLConfigError) return { status: "unconfigured" };
    return { status: "unavailable" };
  }
}

async function readPublicPageUris(): Promise<string[]> {
  if (!graphqlEndpoint()) return [];

  const uris: string[] = [];
  let after: string | null = null;

  try {
    for (let index = 0; index < 20; index += 1) {
      const data: PublishedPagesQuery = await graphqlRequest<PublishedPagesQuery>(
        PublishedPagesDocument,
        { after },
      );
      for (const node of data.pages?.nodes ?? []) {
        if (node?.uri) uris.push(node.uri);
      }
      if (!data.pages?.pageInfo?.hasNextPage || !data.pages.pageInfo.endCursor) break;
      after = data.pages.pageInfo.endCursor;
    }
  } catch {
    return uris;
  }

  return uris;
}

async function cachedPublicPageUris() {
  "use cache";
  cacheLife("hours");
  cacheTag(sitemapTag);
  return readPublicPageUris();
}

export async function getPublicPageUris(): Promise<string[]> {
  if (!publicReadsAreCached()) return readPublicPageUris();
  return cachedPublicPageUris();
}