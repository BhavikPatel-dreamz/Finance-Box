import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.WORDPRESS_GRAPHQL_URL || "src/lib/wordpress/schema.graphql",
  documents: "src/lib/wordpress/queries/*.graphql",
  generates: {
    "src/lib/wordpress/generated/graphql.ts": {
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        enumsAsTypes: true,
        onlyOperationTypes: true,
        preResolveTypes: true,
      },
    },
  },
};

export default config;
