import "server-only";
import { Kind, print, type DocumentNode, type FragmentDefinitionNode } from "graphql";
import * as generated from "@/lib/wordpress/generated/graphql";
import { LAYOUT_TYPE_PREFIX, LAYOUT_TYPE_SUFFIX, layoutFromTypename } from "@/lib/page-builder/layout";

/**
 * Every fragment in `src/lib/wordpress/queries/sections/*.graphql`, discovered
 * from the codegen output. Adding a fragment file and running `npm run codegen`
 * is enough for its layout to be requested; rendering still requires a
 * registered component (see `section-registry.ts`).
 */
export type SectionFragment = {
  layout: string;
  typename: string;
  name: string;
  /** The layout fragment followed by the fragments it spreads (e.g. `PostCard`). */
  definitions: FragmentDefinitionNode[];
};

function collectSectionFragments(): SectionFragment[] {
  const seen = new Map<string, SectionFragment>();
  for (const value of Object.values(generated)) {
    const document = value as DocumentNode | undefined;
    if (!document || typeof document !== "object" || document.kind !== Kind.DOCUMENT) continue;
    // Codegen emits each fragment document as [the fragment, …fragments it depends on].
    const [definition, ...dependencies] = document.definitions;
    if (definition?.kind !== Kind.FRAGMENT_DEFINITION) continue;
    const typename = definition.typeCondition.name.value;
    if (!typename.startsWith(LAYOUT_TYPE_PREFIX) || !typename.endsWith(LAYOUT_TYPE_SUFFIX)) continue;
    const layout = layoutFromTypename(typename);
    if (!layout || seen.has(typename)) continue;
    const nested = dependencies.filter((node): node is FragmentDefinitionNode => node.kind === Kind.FRAGMENT_DEFINITION);
    seen.set(typename, { layout, typename, name: definition.name.value, definitions: [definition, ...nested] });
  }
  return [...seen.values()].sort((a, b) => a.layout.localeCompare(b.layout));
}

export const sectionFragments: readonly SectionFragment[] = collectSectionFragments();

function uniqueDefinitions(fragments: readonly SectionFragment[]) {
  const byName = new Map<string, FragmentDefinitionNode>();
  for (const fragment of fragments) {
    for (const definition of fragment.definitions) byName.set(definition.name.value, definition);
  }
  return [...byName.values()];
}

const selectionCache = new Map<string, { spreads: string; definitions: string }>();

/**
 * Builds the `pageBuilder { pageBuilder { … } }` selection for the given live
 * layout types. Pass `null` when the schema cannot be introspected; every
 * known fragment is then requested.
 */
export function sectionSelection(liveTypes: ReadonlySet<string> | null) {
  const key = liveTypes ? [...liveTypes].sort().join(",") : "*";
  const cached = selectionCache.get(key);
  if (cached) return cached;

  const fragments = sectionFragments.filter((fragment) => !liveTypes || liveTypes.has(fragment.typename));
  const result = {
    spreads: fragments.map((fragment) => `...${fragment.name}`).join("\n"),
    definitions: uniqueDefinitions(fragments).map((definition) => print(definition)).join("\n\n"),
  };
  selectionCache.set(key, result);
  return result;
}
