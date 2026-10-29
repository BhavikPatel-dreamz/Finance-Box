import type { ReactNode } from "react";
import { Hero, HomeFooter } from "@/components/home/home-page"; // Sirf yehi exist karte hain
import { HomeHeader } from "@/components/home/home-header";
import { mergeHome } from "@/components/home/merge";
import { homeContent } from "@/content/home";
import type { SectionRegistration } from "@/components/sections/registry";
import type { RawSection } from "@/lib/wordpress/content";

const image = "{ node { sourceUrl altText } }";

const linkFields = `
  label
  url
`;

const logoFields = `
  name
  image ${image}
`;

function homeSection(
  key: string,
  typePattern: RegExp,
  fields: readonly string[],
  selection: string,
  render: (section: RawSection) => ReactNode,
): SectionRegistration {
  return {
    key,
    matchesType(typeName) {
      return typePattern.test(typeName);
    },
    fields,
    selection,
    render(value) {
      if (!value || typeof value !== "object") return { ok: false };
      return { ok: true, node: render(value as RawSection) };
    },
  };
}

function contentFrom(section: RawSection) {
  return mergeHome(homeContent, [section]);
}

export const homeSections: readonly SectionRegistration[] = [
  homeSection(
    "home_header",
    /HomeHeader$/,
    ["logo", "links", "ctaLabel", "ctaUrl"],
    `logo ${image} links { ${linkFields} } ctaLabel ctaUrl`,
    (section) => <HomeHeader header={contentFrom(section).header} />,
  ),
  homeSection(
    "home_hero",
    /HomeHero$/,
    [
      "eyebrow",
      "title",
      "highlight",
      "text",
      "primaryLabel",
      "primaryUrl",
      "closeLabel",
      "closeValue",
      "closeUnit",
      "closeTrend",
      "runwayLabel",
      "runwayValue",
      "runwayUnit",
      "runwayTrend",
      "chartTitle",
      "chartRange",
      "callLabel",
      "callUrl",
    ],
    "eyebrow title highlight text primaryLabel primaryUrl closeLabel closeValue closeUnit closeTrend runwayLabel runwayValue runwayUnit runwayTrend chartTitle chartRange callLabel callUrl",
    (section) => <Hero hero={contentFrom(section).hero} header={contentFrom(section).header} />,
  ),
  homeSection(
    "home_footer",
    /HomeFooter$/,
    ["logo", "text", "email", "columns", "legal"],
    `text email legal logo ${image} columns { title links { ${linkFields} } }`,
    (section) => <HomeFooter footer={contentFrom(section).footer} />,
  ),
];