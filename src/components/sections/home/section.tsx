import type { ReactNode } from "react";
import { FounderMoments } from "@/components/home/founder-moments";
import {
  Decisions,
  Difference,
  Growth,
  Hero,
  HomeFooter,
  Leadership,
  LogoRow,
  Partners,
  Pressure,
} from "@/components/home/home-page";
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

const cardFields = `
  title
  text
  icon ${image}
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
    (section) => <Hero hero={contentFrom(section).hero} />,
  ),
  homeSection(
    "home_logos",
    /HomeLogos$/,
    ["trustLead", "trustStat", "trustDetail", "logos"],
    `trustLead trustStat trustDetail logos { ${logoFields} }`,
    (section) => {
      const content = contentFrom(section);
      return <LogoRow trust={content.trust} logos={content.logos} />;
    },
  ),
  homeSection(
    "home_founders",
    /HomeFounders$/,
    ["eyebrow", "title", "highlight", "text", "ctaLabel", "ctaUrl", "cards"],
    `eyebrow title highlight text ctaLabel ctaUrl cards { ${cardFields} }`,
    (section) => <FounderMoments founders={contentFrom(section).founders} />,
  ),
  homeSection(
    "home_difference",
    /HomeDifference$/,
    ["title", "cards", "statEyebrow", "statValue", "statLabel"],
    `title statEyebrow statValue statLabel cards { ${cardFields} }`,
    (section) => <Difference difference={contentFrom(section).difference} />,
  ),
  homeSection(
    "home_growth",
    /HomeGrowth$/,
    ["eyebrow", "title", "text", "image", "overlay", "stages", "cards", "ctaLabel", "ctaUrl"],
    `eyebrow title text overlay ctaLabel ctaUrl image ${image} stages { label } cards { ${cardFields} }`,
    (section) => <Growth growth={contentFrom(section).growth} />,
  ),
  homeSection(
    "home_partners",
    /HomePartners$/,
    ["title", "logos"],
    `title logos { ${logoFields} }`,
    (section) => <Partners partners={contentFrom(section).partners} />,
  ),
  homeSection(
    "home_decisions",
    /HomeDecisions$/,
    ["badge", "quote", "name", "role", "portrait", "eyebrow", "title", "text", "cards", "ctaLabel", "ctaUrl"],
    `badge quote name role eyebrow title text ctaLabel ctaUrl portrait ${image} cards { ${cardFields} }`,
    (section) => <Decisions decisions={contentFrom(section).decisions} />,
  ),
  homeSection(
    "home_leadership",
    /HomeLeadership$/,
    ["eyebrow", "title", "text", "ctaLabel", "ctaUrl", "people"],
    `eyebrow title text ctaLabel ctaUrl people { name role image ${image} }`,
    (section) => <Leadership leadership={contentFrom(section).leadership} />,
  ),
  homeSection(
    "home_pressure",
    /HomePressure$/,
    ["title", "emphasis", "text", "ctaLabel", "ctaUrl"],
    "title emphasis text ctaLabel ctaUrl",
    (section) => <Pressure pressure={contentFrom(section).pressure} />,
  ),
  homeSection(
    "home_footer",
    /HomeFooter$/,
    ["logo", "text", "email", "columns", "legal"],
    `text email legal logo ${image} columns { title links { ${linkFields} } }`,
    (section) => <HomeFooter footer={contentFrom(section).footer} />,
  ),
];
