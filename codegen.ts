import type { CodegenConfig } from "@graphql-codegen/cli";

// The schema is a committed snapshot of the live WPGraphQL schema, so builds are
// reproducible and do not depend on WordPress being reachable.
// Refresh it with `npm run schema` after changing ACF fields, then run `npm run codegen`.
const config: CodegenConfig = {
  schema: "src/lib/wordpress/schema.graphql",
  documents: ["src/lib/wordpress/queries/*.graphql", "src/lib/wordpress/queries/sections/*.graphql"],
  generates: {
    "src/lib/wordpress/generated/graphql.ts": {
      plugins: ["typescript-operations", "typed-document-node"],
      config: {
        enumsAsTypes: true,
        onlyOperationTypes: true,
        preResolveTypes: true,
        avoidOptionals: false,
      },
    },
  },
};

export default config;
