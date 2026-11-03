import type { SectionDefinition } from "@/lib/page-builder/types";
import { aboutAgenticSection } from "@/components/sections/about-agentic-section";
import { agenticOfficialPartnerStack } from "@/components/sections/agentic-official-partner-stack";
import { agenticOpsComplianceSection } from "@/components/sections/agentic-ops-compliance-section";
import { agenticPeopleOpsPayrollItSection } from "@/components/sections/agentic-people-ops-payroll-it-section";
import { agenticProvenArchitectureSection } from "@/components/sections/agentic-proven-architecture-section";
import { careersBenefitsSection } from "@/components/sections/careers-benefits-section";
import { careersStandOutSection } from "@/components/sections/careers-stand-out-section";
import { careersWhyWorkSection } from "@/components/sections/careers-why-work-section";
import { caseStudySection } from "@/components/sections/case-study-section";
import { clientsBannerSection } from "@/components/sections/clients-banner-section";
import { clientsFeaturedCaseStudiesSection } from "@/components/sections/clients-featured-case-studies-section";
import { clientsTestimonialsSection } from "@/components/sections/clients-testimonials-section";
import { clientsTrustedCompaniesSection } from "@/components/sections/clients-trusted-companies-section";
import { clientsWhereFiabWorksSection } from "@/components/sections/clients-where-fiab-works-section";
import { commonBannerSection } from "@/components/sections/common-banner-section";
import { contactBannerSection } from "@/components/sections/contact-banner-section";
import { contactConnectedSection } from "@/components/sections/contact-connected-section";
import { contactFormSection } from "@/components/sections/contact-form-section";
import { ctaSection } from "@/components/sections/cta-section";
import { faqSection } from "@/components/sections/faq-section";
import { homeBannerSection } from "@/components/sections/home-banner-section";
import { homeClientPerspectiveSection } from "@/components/sections/home-client-perspective-section";
import { homeFinanceThatGrowsSection } from "@/components/sections/home-finance-that-grows-section";
import { homeLeadershipSection } from "@/components/sections/home-leadership-section";
import { homeWhatMakesFiabDifferentSection } from "@/components/sections/home-what-makes-fiab-different-section";
import { homeWhenFinanceMattersSection } from "@/components/sections/home-when-finance-matters-section";
import { joinWaitlistSection } from "@/components/sections/join-waitlist-section";
import { ourBlogSection } from "@/components/sections/our-blog-section";
import { peopleOperationsIntroSection } from "@/components/sections/people-operations-intro-section";
import { peopleOperationsWhatWeDoSection } from "@/components/sections/people-operations-what-we-do-section";
import { peopleOperationsWhereWeHelpSection } from "@/components/sections/people-operations-where-we-help-section";
import { servicesBannerSection } from "@/components/sections/services-banner-section";
import { servicesFindYourStageSection } from "@/components/sections/services-find-your-stage-section";
import { servicesFractionalCfoSection } from "@/components/sections/services-fractional-cfo-section";
import { servicesInvestorsSection } from "@/components/sections/services-investors-section";
import { servicesOperatingCadenceSection } from "@/components/sections/services-operating-cadence-section";
import { servicesTiersInDepthSection } from "@/components/sections/services-tiers-in-depth-section";
import { simpleCtaSection } from "@/components/sections/simple-cta-section";
import { teamMembersSection } from "@/components/sections/team-members-section";
import { whyFiabBannerSection } from "@/components/sections/why-fiab-banner-section";
import { whyFiabComparisonSection } from "@/components/sections/why-fiab-comparison-section";
import { whyFiabExistsSection } from "@/components/sections/why-fiab-exists-section";
import { whyFiabHowWeWorkSection } from "@/components/sections/why-fiab-how-we-work-section";
import { whyFiabLetsTalkSection } from "@/components/sections/why-fiab-lets-talk-section";
import { whyFiabTrustedBySection } from "@/components/sections/why-fiab-trusted-by-section";
import { yourOwnAgenticSection } from "@/components/sections/your-own-agentic-section";

/**
 * Every page-builder layout the site can render, keyed by ACF layout name
 * (the GraphQL type name without `PageBuilderPageBuilder` / `Layout`).
 *
 * Only these trusted components are ever rendered. A layout WordPress returns
 * that is not listed here is skipped safely (see `section-renderer.tsx`).
 * To add a section, follow docs/section-development.md.
 */
const definitions = [
  aboutAgenticSection,
  agenticOfficialPartnerStack,
  agenticOpsComplianceSection,
  agenticPeopleOpsPayrollItSection,
  agenticProvenArchitectureSection,
  careersBenefitsSection,
  careersStandOutSection,
  careersWhyWorkSection,
  caseStudySection,
  clientsBannerSection,
  clientsFeaturedCaseStudiesSection,
  clientsTestimonialsSection,
  clientsTrustedCompaniesSection,
  clientsWhereFiabWorksSection,
  commonBannerSection,
  contactBannerSection,
  contactConnectedSection,
  contactFormSection,
  ctaSection,
  faqSection,
  homeBannerSection,
  homeClientPerspectiveSection,
  homeFinanceThatGrowsSection,
  homeLeadershipSection,
  homeWhatMakesFiabDifferentSection,
  homeWhenFinanceMattersSection,
  joinWaitlistSection,
  ourBlogSection,
  peopleOperationsIntroSection,
  peopleOperationsWhatWeDoSection,
  peopleOperationsWhereWeHelpSection,
  servicesBannerSection,
  servicesFindYourStageSection,
  servicesFractionalCfoSection,
  servicesInvestorsSection,
  servicesOperatingCadenceSection,
  servicesTiersInDepthSection,
  simpleCtaSection,
  teamMembersSection,
  whyFiabBannerSection,
  whyFiabComparisonSection,
  whyFiabExistsSection,
  whyFiabHowWeWorkSection,
  whyFiabLetsTalkSection,
  whyFiabTrustedBySection,
  yourOwnAgenticSection,
] satisfies SectionDefinition[];

function buildRegistry(list: readonly SectionDefinition[]) {
  const registry: Record<string, SectionDefinition> = {};
  for (const definition of list) {
    if (registry[definition.layout]) {
      throw new Error(`Page-builder layout "${definition.layout}" is registered twice.`);
    }
    registry[definition.layout] = definition;
  }
  return Object.freeze(registry);
}

export const sectionRegistry: Readonly<Record<string, SectionDefinition>> = buildRegistry(definitions);

export function getSectionDefinition(layout: string): SectionDefinition | undefined {
  return Object.hasOwn(sectionRegistry, layout) ? sectionRegistry[layout] : undefined;
}
