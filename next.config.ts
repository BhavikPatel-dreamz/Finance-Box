import type { NextConfig } from "next";

type RemotePattern = NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]>[number];

function wordpressImagePatterns(): RemotePattern[] {
  const site = process.env.WORDPRESS_URL;
  const hosts = [process.env.WORDPRESS_URL, process.env.WORDPRESS_GRAPHQL_URL];
  const patterns: RemotePattern[] = [];
  let uploadPath = "/wp-content/uploads/**";

  if (site) {
    try {
      const siteUrl = new URL(site);
      const base = siteUrl.pathname.replace(/\/$/, "");
      uploadPath = `${base}/wp-content/uploads/**`;
    } catch {
      uploadPath = "/wp-content/uploads/**";
    }
  }

  for (const raw of hosts) {
    if (!raw) continue;
    try {
      const url = new URL(raw);
      for (const protocol of ["http", "https"] as const) {
        patterns.push({
          protocol,
          hostname: url.hostname,
          port: url.port,
          pathname: uploadPath,
        });
      }
    } catch {
      continue;
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: wordpressImagePatterns(),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
