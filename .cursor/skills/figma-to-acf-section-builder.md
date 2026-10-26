---
description: Convert supplied Figma screenshots or design references
  into responsive Next.js/Tailwind sections, importable ACF Flexible
  Content JSON layouts, GraphQL fields, and registered page-builder
  components. Use when adding a new design section to the existing
  WordPress headless website.
name: figma-to-acf-section-builder
---

# Figma Screenshot to Next.js + ACF Section Builder

## Purpose

Use this skill whenever the user provides a Figma screenshot, exported
design image, reference image, or section specification for the existing
Next.js + WordPress headless project.

Turn each supplied section into a complete, reusable implementation
across:

1.  Responsive Next.js/React component.
2.  Tailwind CSS styling that matches the supplied design.
3.  ACF field definitions in importable JSON.
4.  Registration in the existing shared ACF Flexible Content page
    builder.
5.  GraphQL query/schema integration.
6.  TypeScript types and runtime data handling.
7.  Documentation and `agent.md` updates.

Do not invent final page sections before the user provides their design.
Preserve existing application conventions and inspect the repository
before choosing paths or patterns.

## Mandatory first steps

1.  Read `agent.md` and relevant project documentation.
2.  Inspect the existing Next.js version, App Router structure, Tailwind
    setup, section components, ACF JSON configuration, GraphQL
    client/queries/types, and current page-builder renderer.
3.  Find the existing ACF Flexible Content field and its field key/name,
    parent field group, location rules, GraphQL exposure, and current
    layout names.
4.  Inspect at least one existing section from all relevant layers:
    React component, ACF JSON, GraphQL query/type, registry/renderer,
    and page template.
5.  Follow existing naming, styling, data-fetching, accessibility, and
    test conventions. Do not create a second page builder if one already
    exists.
6.  If a screenshot is supplied, inspect its full visible composition.
    Identify hierarchy, widths, spacing, typography, colors, imagery,
    borders, responsive behavior, and interactions. Distinguish observed
    details from assumptions.
7.  If a key design detail is unclear, use a reasonable, documented
    implementation assumption rather than inventing unrelated design
    elements.

## Core architecture rule: one shared page builder

Use one shared ACF Flexible Content field on the relevant WordPress page
field group, unless repository inspection proves the project uses an
equivalent existing architecture.

Conceptual structure:

-   Page field group
    -   `page_sections` (one Flexible Content field)
        -   `hero_banner` layout
        -   `feature_grid` layout
        -   `image_text` layout
        -   future layouts supplied by the user

Each layout owns its own subfields. The editor should be able to add
multiple layouts, reorder them, and enter different content for each
instance. Multiple instances of the same layout must work.

Do not create a separate top-level page-builder field group for every
section. Do not overwrite or replace existing layouts when adding a new
one.

If ACF field groups are managed as JSON files, update the existing
page-builder field-group JSON so the new layout is included in the same
Flexible Content field. If the repository instead uses PHP registration
or another established mechanism, follow that mechanism and document
why. Avoid maintaining conflicting sources of truth.

## Per-section implementation workflow

For each supplied design, complete the following.

### A. Analyze the design

Write a short implementation note that identifies:

-   Section purpose and visual hierarchy.
-   Desktop and mobile layout.
-   Content fields that should be editable in WordPress.
-   Repeatable items, such as cards, logos, links, slides, or feature
    rows.
-   Image crop/aspect-ratio requirements.
-   Buttons and link destinations.
-   Interactive behavior, if any.
-   Accessibility requirements.
-   Design details that remain uncertain.

Do not turn fixed decorative elements into CMS fields unless the design
or project convention calls for it. Editable content should be separated
from presentation styling.

### B. Build the React component

Create one reusable component in the existing section-component
directory. Use TypeScript and Tailwind CSS following project
conventions.

Requirements:

-   Match the screenshot as closely as practical at supplied viewport
    dimensions.
-   Use semantic HTML and accessible labels.
-   Implement responsive behavior for mobile, tablet, and desktop.
-   Use the project's established image component and optimization
    strategy.
-   Avoid unnecessary client-side JavaScript; use a Server Component
    unless interactivity requires a Client Component.
-   Handle absent optional fields without layout crashes.
-   Do not hardcode copy or image URLs that should be editable through
    WordPress.
-   Do not use arbitrary placeholder images as final assets when the
    design provides an asset.
-   Avoid unsafe HTML rendering from CMS values.
-   Keep styles scoped through Tailwind utilities and existing design
    tokens; do not add global CSS rules unless necessary.
-   Do not add dependencies unless justified and compatible with the
    project.
-   Use stable React keys for repeated items.

### C. Generate ACF JSON

Generate or update an ACF field-group JSON file that WordPress can
import through the supported ACF field-group import workflow.

Requirements:

-   Use valid JSON and the ACF schema supported by the project's
    installed version.
-   Include a field-group title, key, fields, and location rules where
    appropriate.
-   Define the layout as a layout inside the existing shared Flexible
    Content field.
-   Use stable, unique field keys and clear snake_case field names.
-   Include appropriate field types, labels, instructions, required
    settings, defaults, and return formats.
-   Configure image fields consistently with the existing GraphQL and
    frontend conventions.
-   Use repeaters or nested Flexible Content only when suitable and
    supported by the installed ACF setup.
-   Add conditional logic where it materially improves the editor
    experience.
-   Configure sensible minimum/maximum values for repeatable items when
    appropriate.
-   Keep layout names stable because the frontend registry and GraphQL
    query depend on them.
-   Preserve all existing field groups and layouts.
-   Never reuse an existing field key for a different field.
-   Do not invent a field key or parent field name before inspecting the
    existing project.
-   Ensure JSON syntax is valid and field keys are unique across the
    relevant project configuration.

The JSON must be importable and must add the layout to the existing
builder; it must not create an unrelated builder that the page editor
cannot use.

### D. Use a generator script when useful

Prefer a repeatable Node.js script if the repository is primarily
TypeScript/JavaScript, or Python if the project already uses Python for
content generation.

The script should accept structured section metadata and generate the
ACF JSON deterministically.

Example conceptual command (adapt it to actual repository scripts):

`npm run acf:generate -- --section feature-grid`

Do not assume this exact command exists before creating and documenting
it.

The generator should:

-   Validate required metadata.
-   Create stable field keys or use a documented stable-key strategy.
-   Avoid duplicate field names and keys.
-   Update/merge the shared page-builder JSON without deleting existing
    layouts.
-   Produce deterministic output for unchanged inputs.
-   Fail safely on conflicts rather than silently overwriting existing
    fields.
-   Format JSON consistently.
-   Report the output file path and the layout added.
-   Support a dry-run or validation mode if practical.

If a generator is unnecessary for the existing project, create the JSON
directly and document the repeatable manual process. Do not add a script
just for appearance.

### E. Integrate GraphQL

Inspect the real WPGraphQL and ACF schema before writing final queries.

-   Add the fields needed by the new layout to the existing page query
    or fragments.
-   Follow the project's GraphQL naming conventions.
-   Update generated GraphQL types if code generation is configured.
-   Handle nullable and optional fields accurately.
-   Ensure all layout instances and their order are preserved.
-   Avoid fetching unnecessary fields.
-   Avoid querying a field that is not exposed by the actual WordPress
    schema.
-   Document any WordPress plugin setting or field-group configuration
    needed to expose the data.

If the backend schema is unavailable, implement against a clearly marked
proposed contract and list the exact schema verification needed. Do not
claim end-to-end integration is complete until confirmed against the
real schema.

### F. Register the section

Add the layout-to-component mapping to the existing section registry or
renderer.

Requirements:

-   Match the ACF layout name exactly.
-   Map the layout to the correct React component.
-   Use typed data and safe runtime handling.
-   Preserve order from WordPress.
-   Support repeated instances.
-   Provide an explicit diagnostic for unknown layout names.
-   Do not silently render unknown content as the wrong section.
-   Keep the renderer extensible without building one huge conditional
    component.
-   Preserve backward compatibility with all existing layouts.

If the current architecture uses a discriminated union, component map,
or generated registry, extend that mechanism instead of creating a
parallel one.

### G. Document the WordPress editor workflow

For each section, document:

1.  ACF layout name.
2.  Fields and their intended use.
3.  Repeatable fields and limits.
4.  Expected image sizes or aspect ratios.
5.  Link/button configuration.
6.  How to import or deploy the ACF JSON.
7.  How to add the section to a page.
8.  GraphQL fields expected by Next.js.
9.  Any known limitations.

## Field design principles

Create fields for content editors need to change. Keep visual design
decisions in the component/design tokens.

Examples of suitable editable fields:

-   Heading, eyebrow, body text.
-   Image or background image.
-   CTA label and URL.
-   Repeatable cards or feature items.
-   Alignment or style variant when the design genuinely offers
    variants.
-   Optional visibility toggle when useful.

Avoid creating dozens of fields for fixed spacing, font sizes, or purely
decorative styling. Use a small number of controlled style variants when
required.

For links and images, follow existing project return formats and GraphQL
data shapes. Do not assume ACF image fields return IDs, arrays, or URLs
without checking configuration.

## Page renderer requirements

The page template should:

1.  Fetch a WordPress page by slug through the centralized GraphQL
    client.
2.  Read the shared Flexible Content sections in the returned order.
3.  Resolve each layout using the section registry.
4.  Pass the layout's field data to its component.
5.  Render all supported sections on the page.
6.  Handle a missing page with the proper 404 behavior.
7.  handle missing optional fields gracefully.
8.  Use the existing caching and revalidation strategy.

The page should not require a new hardcoded route for each new section.
Adding a layout to the shared builder and registering its component
should make it available for pages that use that builder.

## Naming conventions

Inspect the current project before finalizing names. If no convention
exists, use a consistent pattern such as:

-   ACF layout: `feature_grid`
-   Component: `FeatureGridSection.tsx`
-   GraphQL fragment: `FeatureGridSectionFields`
-   Type: `FeatureGridSectionData`
-   ACF layout label: `Feature Grid`
-   Documentation: `docs/sections/feature-grid.md`

Keep ACF layout names stable and use the exact same name in the frontend
registry.

## Performance, caching, and SEO

-   Use server-side GraphQL fetching and the existing Next.js caching
    strategy.
-   Keep section components compatible with server rendering by default.
-   Use optimized image loading and appropriate image dimensions.
-   Avoid duplicate GraphQL requests for the same page data.
-   Ensure WordPress content updates trigger the existing page/cache
    revalidation mechanism.
-   Do not cache private previews as public pages.
-   Preserve semantic heading order and accessibility.
-   Do not add section-specific cache layers unless justified by
    measured requirements.

## Validation and quality process

The project's chosen workflow may defer comprehensive testing until the
final integration phase. During implementation, still perform the
minimum checks required to safely generate files and prevent destructive
changes.

For each section:

-   Validate JSON syntax and ACF structure.
-   Validate generator output where a script is used.
-   Inspect TypeScript types and integration points.
-   Preserve existing layouts and registry entries.
-   Do not run destructive imports against production WordPress.
-   Do not claim that ACF import or live GraphQL rendering has been
    verified unless it was actually verified.

At the final testing phase, test the complete flow: import ACF JSON into
a development WordPress environment, edit a page with multiple section
layouts, fetch the page via GraphQL, and render the correct responsive
Next.js components.

## Required output for every supplied design

Deliver:

1.  A brief design analysis.
2.  The React/Tailwind component.
3.  The ACF JSON field-group update containing the new layout in the
    shared builder.
4.  GraphQL query/fragment updates.
5.  TypeScript type updates.
6.  Section registry integration.
7.  Any generator-script changes.
8.  WordPress import and editor instructions.
9.  A short section README or documentation entry.
10. `agent.md` updates describing files changed and implementation
    status.

## Safety and change-management rules

-   Read before writing.
-   Do not overwrite existing sections.
-   Do not recreate the page builder when one already exists.
-   Do not assume GraphQL field names.
-   Do not invent screenshot content or assets.
-   Do not introduce duplicate field keys.
-   Do not silently discard unknown layout data.
-   Do not make production WordPress or DNS changes without approval.
-   Keep generated files deterministic and reviewable.
-   Record assumptions and unresolved dependencies.
-   Follow the repository's established conventions whenever they
    conflict with illustrative examples in this skill.

## Completion criteria

A section is implementation-complete only when the React component, ACF
layout JSON, GraphQL data requirements, TypeScript data handling, and
shared registry mapping agree on the same layout and field names.

The editor must be able to add that layout to the existing page builder
and populate its fields. The Next.js page renderer must be able to
recognize and render the layout in the correct position.

A JSON file by itself does not constitute a complete section
implementation.
