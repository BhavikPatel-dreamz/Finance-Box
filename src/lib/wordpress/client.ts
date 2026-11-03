import "server-only";
import { print, type DocumentNode } from "graphql";
import { GraphQLConfigError, GraphQLRequestError } from "@/lib/wordpress/errors";

type GraphQLResponse<T> = {
  data?: T | null;
  errors?: Array<{ message?: string; path?: Array<string | number> }>;
};

export type GraphQLRequestOptions = {
  /** Sends the server-only preview credentials and bypasses every cache. */
  preview?: boolean;
  /** Per-attempt timeout. */
  timeoutMs?: number;
  /** Extra attempts after the first one, for transient failures only. */
  retries?: number;
};

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_RETRIES = 2;

export function graphqlEndpoint() {
  const value = process.env.WORDPRESS_GRAPHQL_URL?.trim();
  return value || null;
}

function previewAuthorization() {
  const user = process.env.WORDPRESS_PREVIEW_USER?.trim();
  const password = process.env.WORDPRESS_PREVIEW_PASSWORD?.trim();
  if (!user || !password) {
    throw new GraphQLConfigError("Preview credentials are not configured.");
  }

  return `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
}

/** Failures worth retrying: network errors, timeouts, 429, 5xx and non-JSON bodies from the host. */
class TransientError extends GraphQLRequestError {}

const printed = new WeakMap<DocumentNode, string>();
function queryText(document: DocumentNode | string) {
  if (typeof document === "string") return document;
  let text = printed.get(document);
  if (!text) {
    text = print(document);
    printed.set(document, text);
  }
  return text;
}

function operationName(query: string) {
  return query.match(/\b(?:query|mutation)\s+([_A-Za-z][_0-9A-Za-z]*)/)?.[1] ?? "anonymous";
}

async function attempt<TData>(
  endpoint: string,
  body: string,
  headers: Record<string, string>,
  options: GraphQLRequestOptions,
): Promise<GraphQLResponse<TData>> {
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    });
  } catch (error) {
    const reason = error instanceof Error && error.name === "TimeoutError" ? "timed out" : "could not be reached";
    throw new TransientError(`The WordPress GraphQL endpoint ${reason}.`);
  }

  if (response.status === 429 || response.status >= 500) {
    throw new TransientError(`WordPress GraphQL responded with HTTP ${response.status}.`);
  }
  if (!response.ok) {
    // Log which layer refused the request: Cloudflare adds cf-ray / cf-mitigated,
    // a server firewall (ModSecurity, Imunify360) usually returns an HTML page.
    const snippet = (await response.text().catch(() => "")).replace(/\s+/g, " ").slice(0, 300);
    console.error("[wordpress] GraphQL request refused", {
      status: response.status,
      server: response.headers.get("server"),
      cfRay: response.headers.get("cf-ray"),
      cfMitigated: response.headers.get("cf-mitigated"),
      body: snippet,
    });
    throw new GraphQLRequestError(`WordPress GraphQL responded with HTTP ${response.status}.`);
  }

  try {
    return (await response.json()) as GraphQLResponse<TData>;
  } catch {
    throw new TransientError("WordPress GraphQL returned a response that was not JSON.");
  }
}

/**
 * Server-side WPGraphQL request. Never import this from a Client Component:
 * the `server-only` import fails the build if that happens.
 *
 * Caching is the caller's job (`"use cache"` wrappers in `content.ts`); the
 * fetch itself is always uncached so preview responses can never leak into a
 * shared cache entry.
 */
export async function graphqlRequest<TData>(
  document: DocumentNode | string,
  variables?: Record<string, unknown>,
  options: GraphQLRequestOptions = {},
): Promise<TData> {
  const endpoint = graphqlEndpoint();
  if (!endpoint) {
    throw new GraphQLConfigError("WORDPRESS_GRAPHQL_URL is not configured.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    // A named client is easier to allow in a firewall than the default "node" agent.
    "User-Agent": "Financebox-Headless/1.0 (+Next.js)",
  };
  if (options.preview) headers.Authorization = previewAuthorization();

  const query = queryText(document);
  const body = JSON.stringify({ query, variables });
  const retries = options.retries ?? DEFAULT_RETRIES;

  let result: GraphQLResponse<TData> | null = null;
  for (let tries = 0; ; tries += 1) {
    try {
      result = await attempt<TData>(endpoint, body, headers, options);
      break;
    } catch (error) {
      if (!(error instanceof TransientError) || tries >= retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 250 * 2 ** tries));
    }
  }

  const messages = result.errors?.map((error) => error.message).filter(Boolean) ?? [];
  if (!result.data) {
    throw new GraphQLRequestError(messages.join("; ") || "WordPress GraphQL returned no data.");
  }
  if (messages.length > 0) {
    // Partial success: a resolver failed but the rest of the data is usable.
    console.warn(`[wordpress] ${operationName(query)} returned errors: ${messages.join("; ")}`);
  }

  return result.data;
}
