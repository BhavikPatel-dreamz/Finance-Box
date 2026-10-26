import type { MetadataRoute } from "next";
import { getPublicPageUris } from "@/lib/wordpress/content";
import { canonicalUrl } from "@/lib/wordpress/text";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const uris = await getPublicPageUris();
  return uris.map((uri) => ({
    url: canonicalUrl(uri),
  }));
}
