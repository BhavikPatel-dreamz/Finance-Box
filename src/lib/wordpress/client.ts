import { print, type DocumentNode } from "graphql";
import { GraphQLConfigError, GraphQLRequestError } from "@/lib/wordpress/errors";

type GraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message?: string }>;
};

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

export async function graphqlRequest<TData>(
  document: DocumentNode | string,
  variables?: Record<string, unknown>,
  options?: { preview?: boolean },
): Promise<TData> {
  const endpoint = graphqlEndpoint();
  if (!endpoint) {
    throw new GraphQLConfigError("WORDPRESS_GRAPHQL_URL is not configured.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (options?.preview) {
    headers.Authorization = previewAuthorization();
  }

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: typeof document === "string" ? document : print(document),
        variables,
      }),
      cache: options?.preview ? "no-store" : undefined,
    });
  } catch {
    throw new GraphQLRequestError("The WordPress GraphQL endpoint could not be reached.");
  }

  if (!response.ok) {
    throw new GraphQLRequestError(`WordPress GraphQL responded with HTTP ${response.status}.`);
  }

  let body: GraphQLResponse<TData>;
  try {
    body = (await response.json()) as GraphQLResponse<TData>;
  } catch {
    throw new GraphQLRequestError("WordPress GraphQL returned a response that was not JSON.");
  }

  if (!body.data) {
    const message = body.errors?.map((error) => error.message).filter(Boolean).join("; ");
    throw new GraphQLRequestError(message || "WordPress GraphQL returned no data.");
  }

  return body.data;
}
