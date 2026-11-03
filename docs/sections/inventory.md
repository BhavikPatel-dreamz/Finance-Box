# Section inventory

Updated 2026-11-03. Regenerate the field table with `npm run sections:inventory`; check wiring with `npm run sections:check`.

All 46 layouts of the WordPress **Page Builder** flexible field (`Page.pageBuilder.pageBuilder`) have a registered React component.

**Status** — *Completed*: fragment validated against the live schema by codegen, component registered, rendered with live WordPress content and compared against the pre-refactor site (2026-11-03). Every layout is currently used on at least one live page.

**Names**: the GraphQL type is `PageBuilderPageBuilder<Layout key>Layout`. WordPress admin access was not available, so the snake_case ACF layout names are not recorded here; WPGraphQL derives the key from them (`home_banner_section` → `HomeBannerSection`).

## Layouts

| Layout key | Section file (`src/components/sections/`) | Fragment (`src/lib/wordpress/queries/`) | Hero | Variant source | Live on | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `AboutAgenticSection` | `about-agentic-section.tsx` | `sections/AboutAgenticSection.graphql` |  |  | /agentic-ai/ | Completed |
| `AgenticOfficialPartnerStack` | `agentic-official-partner-stack.tsx` | `sections/AgenticOfficialPartnerStack.graphql` |  | `logoView` | /, /agentic-ai/ | Completed |
| `AgenticOpsComplianceSection` | `agentic-ops-compliance-section.tsx` | `sections/AgenticOpsComplianceSection.graphql` |  |  | /agentic-ai/ | Completed |
| `AgenticPeopleOpsPayrollItSection` | `agentic-people-ops-payroll-it-section.tsx` | `sections/AgenticPeopleOpsPayrollItSection.graphql` |  |  | /agentic-ai/ | Completed |
| `AgenticProvenArchitectureSection` | `agentic-proven-architecture-section.tsx` | `sections/AgenticProvenArchitectureSection.graphql` |  |  | /agentic-ai/ | Completed |
| `CareersBenefitsSection` | `careers-benefits-section.tsx` | `sections/CareersBenefitsSection.graphql` |  |  | /careers/ | Completed |
| `CareersStandOutSection` | `careers-stand-out-section.tsx` | `sections/CareersStandOutSection.graphql` |  |  | /careers/ | Completed |
| `CareersWhyWorkSection` | `careers-why-work-section.tsx` | `sections/CareersWhyWorkSection.graphql` |  |  | /careers/ | Completed |
| `CaseStudySection` | `case-study-section.tsx` | `sections/CaseStudySection.graphql` |  |  | /knowledge-hub/ | Completed |
| `ClientsBannerSection` | `clients-banner-section.tsx` | `sections/ClientsBannerSection.graphql` | yes |  | /clients/ | Completed |
| `ClientsFeaturedCaseStudiesSection` | `clients-featured-case-studies-section.tsx` | `sections/ClientsFeaturedCaseStudiesSection.graphql` |  |  | /clients/ | Completed |
| `ClientsTestimonialsSection` | `clients-testimonials-section.tsx` | `sections/ClientsTestimonialsSection.graphql` |  |  | /clients/ | Completed |
| `ClientsTrustedCompaniesSection` | `clients-trusted-companies-section.tsx` | `sections/ClientsTrustedCompaniesSection.graphql` |  |  | /clients/ | Completed |
| `ClientsWhereFiabWorksSection` | `clients-where-fiab-works-section.tsx` | `sections/ClientsWhereFiabWorksSection.graphql` |  |  | /clients/ | Completed |
| `CommonBannerSection` | `common-banner-section.tsx` | `sections/CommonBannerSection.graphql` | yes | page map | /careers/, /agentic-ai/, /knowledge-hub/, /people-operations/ | Completed |
| `ContactBannerSection` | `contact-banner-section.tsx` | `sections/ContactBannerSection.graphql` | yes |  | /contact-us/ | Completed |
| `ContactConnectedSection` | `contact-connected-section.tsx` | `sections/ContactConnectedSection.graphql` |  |  | /contact-us/ | Completed |
| `ContactFormSection` | `contact-form-section.tsx` | `sections/ContactFormSection.graphql` |  |  | /contact-us/ | Completed |
| `CtaSection` | `cta-section.tsx` | `sections/CtaSection.graphql` |  | page map | /, /services/, /why-fiab/, /clients/, /careers/, /agentic-ai/, /knowledge-hub/, /people-operations/ | Completed |
| `FaqSection` | `faq-section.tsx` | `sections/FaqSection.graphql` |  |  | /careers/, /agentic-ai/ | Completed |
| `HomeBannerSection` | `home-banner-section.tsx` | `sections/HomeBannerSection.graphql` | yes |  | / | Completed |
| `HomeClientPerspectiveSection` | `home-client-perspective-section.tsx` | `sections/HomeClientPerspectiveSection.graphql` |  |  | / | Completed |
| `HomeFinanceThatGrowsSection` | `home-finance-that-grows-section.tsx` | `sections/HomeFinanceThatGrowsSection.graphql` |  |  | / | Completed |
| `HomeLeadershipSection` | `home-leadership-section.tsx` | `sections/HomeLeadershipSection.graphql` |  |  | / | Completed |
| `HomeWhatMakesFiabDifferentSection` | `home-what-makes-fiab-different-section.tsx` | `sections/HomeWhatMakesFiabDifferentSection.graphql` |  |  | / | Completed |
| `HomeWhenFinanceMattersSection` | `home-when-finance-matters-section.tsx` | `sections/HomeWhenFinanceMattersSection.graphql` |  |  | / | Completed |
| `JoinWaitlistSection` | `join-waitlist-section.tsx` | `sections/JoinWaitlistSection.graphql` |  | page map | /agentic-ai/, /knowledge-hub/ | Completed |
| `OurBlogSection` | `our-blog-section.tsx` | `sections/OurBlogSection.graphql` |  |  | /knowledge-hub/ | Completed |
| `PeopleOperationsIntroSection` | `people-operations-intro-section.tsx` | `sections/PeopleOperationsIntroSection.graphql` |  |  | /people-operations/ | Completed |
| `PeopleOperationsWhatWeDoSection` | `people-operations-what-we-do-section.tsx` | `sections/PeopleOperationsWhatWeDoSection.graphql` |  |  | /people-operations/ | Completed |
| `PeopleOperationsWhereWeHelpSection` | `people-operations-where-we-help-section.tsx` | `sections/PeopleOperationsWhereWeHelpSection.graphql` |  |  | /people-operations/ | Completed |
| `ServicesBannerSection` | `services-banner-section.tsx` | `sections/ServicesBannerSection.graphql` | yes |  | /services/ | Completed |
| `ServicesFindYourStageSection` | `services-find-your-stage-section.tsx` | `sections/ServicesFindYourStageSection.graphql` |  |  | /services/ | Completed |
| `ServicesFractionalCfoSection` | `services-fractional-cfo-section.tsx` | `sections/ServicesFractionalCfoSection.graphql` |  |  | /services/ | Completed |
| `ServicesInvestorsSection` | `services-investors-section.tsx` | `sections/ServicesInvestorsSection.graphql` |  |  | /services/ | Completed |
| `ServicesOperatingCadenceSection` | `services-operating-cadence-section.tsx` | `sections/ServicesOperatingCadenceSection.graphql` |  | `sectionSetting` | /services/, /careers/ | Completed |
| `ServicesTiersInDepthSection` | `services-tiers-in-depth-section.tsx` | `sections/ServicesTiersInDepthSection.graphql` |  |  | /services/ | Completed |
| `SimpleCtaSection` | `simple-cta-section.tsx` | `sections/SimpleCtaSection.graphql` |  |  | /knowledge-hub/ | Completed |
| `TeamMembersSection` | `team-members-section.tsx` | `sections/TeamMembersSection.graphql` |  |  | /why-fiab/ | Completed |
| `WhyFiabBannerSection` | `why-fiab-banner-section.tsx` | `sections/WhyFiabBannerSection.graphql` | yes |  | /why-fiab/ | Completed |
| `WhyFiabComparisonSection` | `why-fiab-comparison-section.tsx` | `sections/WhyFiabComparisonSection.graphql` |  |  | /why-fiab/ | Completed |
| `WhyFiabExistsSection` | `why-fiab-exists-section.tsx` | `sections/WhyFiabExistsSection.graphql` |  |  | /why-fiab/ | Completed |
| `WhyFiabHowWeWorkSection` | `why-fiab-how-we-work-section.tsx` | `sections/WhyFiabHowWeWorkSection.graphql` |  |  | /why-fiab/ | Completed |
| `WhyFiabLetsTalkSection` | `why-fiab-lets-talk-section.tsx` | `sections/WhyFiabLetsTalkSection.graphql` |  |  | /why-fiab/ | Completed |
| `WhyFiabTrustedBySection` | `why-fiab-trusted-by-section.tsx` | `sections/WhyFiabTrustedBySection.graphql` |  |  | /, /why-fiab/ | Completed |
| `YourOwnAgenticSection` | `your-own-agentic-section.tsx` | `sections/YourOwnAgenticSection.graphql` |  |  | /agentic-ai/ | Completed |

*Hero*: receives the shared header when it is the first section. *Variant source*: an editor-controlled ACF field, or the presentation map in `src/components/page-builder/section-variants.ts`.

## Variants

| Layout | Variant | Design |
| --- | --- | --- |
| `ServicesOperatingCadenceSection` | ACF `sectionSetting` = `up-down` (default) | Centered heading above steps (Services) |
| | `side-by-side` | Heading left, text right (Careers "How We Hire") |
| `AgenticOfficialPartnerStack` | ACF `logoView` = `simple` (default) | Plain logo marquee (Home) |
| | `boxed` | Logos in bordered cards (Agentic AI) |
| `CommonBannerSection` | page map: `knowledge-hub` (default), `careers`, `agentic-ai`, `people-operations` | Four inner-page hero designs |
| `CtaSection` | page map: `default`, `home`, `services`, `why`, `clients`, `careers`, `agentic-ai`, `knowledge-hub`, `people-operations` | `FooterHero` title width/line breaks; each keeps its page's fallback copy |
| `JoinWaitlistSection` | page map: `waitlist` (default), `newsletter` | Agentic AI waitlist form / Knowledge Hub newsletter with CTA |

## Field reference (live schema)

`image` = `{ node { sourceUrl altText } }`; `link` = `{ title url target }`; `AcfContentNodeConnection` = relationship to posts (`nodes { … }`).

| Layout key | Fields |
| --- | --- |
| `AboutAgenticSection` | aboutAgentics: repeater { content: String; image: image; title: String }<br>description: String<br>subTitle: String<br>tagLine: String<br>title: String |
| `AgenticOfficialPartnerStack` | logoView: String<br>officialPartners: repeater { logo: image }<br>title: String |
| `AgenticOpsComplianceSection` | agents: repeater { content: String; greatFor: String; icon: image; title: String }<br>title: String |
| `AgenticPeopleOpsPayrollItSection` | agents: repeater { content: String; greatFor: String; icon: image; title: String }<br>title: String |
| `AgenticProvenArchitectureSection` | architectureCards: repeater { content: String; image: image; title: String }<br>highlightTitle: String<br>title: String |
| `CareersBenefitsSection` | benefits: repeater { description: String; icon: image; title: String }<br>title: String |
| `CareersStandOutSection` | cards: repeater { backgroundImage: image; content: String; hoverContent: String; title: String }<br>title: String |
| `CareersWhyWorkSection` | image: image<br>points: repeater { content: String }<br>title: String |
| `CaseStudySection` | allCaseStudy: String<br>selectCaseStudy: AcfContentNodeConnection<br>title: String |
| `ClientsBannerSection` | clientProof: String<br>description: String<br>stats: repeater { label: String; number: String }<br>subTitle: String<br>title: String |
| `ClientsFeaturedCaseStudiesSection` | caseStudies: AcfContentNodeConnection<br>title: String |
| `ClientsTestimonialsSection` | featuredDesignation: String<br>featuredImage: image<br>featuredName: String<br>featuredQuote: String<br>testimonials: repeater { authorImage: image; authorInfo: String; content: String }<br>title: String |
| `ClientsTrustedCompaniesSection` | logos: repeater { logo: image }<br>title: String |
| `ClientsWhereFiabWorksSection` | description: String<br>image: image<br>industries: repeater { title: String }<br>portfolioCtaButton: link {title url target}<br>portfolioDescription: String<br>portfolioImage: image<br>portfolioTitle: String<br>title: String |
| `CommonBannerSection` | ctaButton: link {title url target}<br>description: String<br>subTitle: String<br>tagLine: String<br>title: String |
| `ContactBannerSection` | description: String<br>subtitle: String<br>title: String |
| `ContactConnectedSection` | connectedDescription: String<br>connectedTitle: String<br>linkedinBox: group { ctaButton: link {title url target}; description: String; image: image; title: String }<br>newsletterBox: group { description: String; newsletterFormShortcode: String; title: String } |
| `ContactFormSection` | contactEmail: String<br>contactImage: image<br>contactInformation: String<br>formDescription: String<br>formShortcode: String<br>formTitle: String |
| `CtaSection` | ctaButton: link {title url target}<br>description: String<br>title: String |
| `FaqSection` | faqs: repeater { answer: String; question: String }<br>title: String |
| `HomeBannerSection` | ctaButton: link {title url target}<br>description: String<br>floatingCtaButton: link {title url target}<br>statCards: repeater { label: String; note: String; value: String }<br>subTitle: String<br>title: String |
| `HomeClientPerspectiveSection` | ctaButton: link {title url target}<br>description: String<br>designation: String<br>image: image<br>imageLabel: String<br>metrics: repeater { description: String; value: String }<br>name: String<br>quote: String<br>subTitle: String<br>title: String |
| `HomeFinanceThatGrowsSection` | ctaButton: link {title url target}<br>description: String<br>image: image<br>imageSteps: repeater { label: String }<br>imageTitle: String<br>subTitle: String<br>tiers: repeater { ctaButton: link {title url target}; description: String; number: Float; services: repeater { description: String; hoverContent: String; title: String }; title: String }<br>title: String |
| `HomeLeadershipSection` | slides: repeater { description: String; title: String }<br>subTitle: String<br>teamMembers: repeater { designation: String; image: image; name: String } |
| `HomeWhatMakesFiabDifferentSection` | cards: repeater { backgroundImage: image; content: String; hoverContent: String; title: String }<br>outcomeLabel: String<br>outcomeText: String<br>outcomeValue: String<br>title: String |
| `HomeWhenFinanceMattersSection` | ctaButton: link {title url target}<br>description: String<br>moments: repeater { content: String; title: String }<br>subTitle: String<br>title: String |
| `JoinWaitlistSection` | ctaButton: link {title url target}<br>description: String<br>formShortcode: String<br>title: String |
| `OurBlogSection` | allBlogCta: link {title url target}<br>selectBlog: AcfContentNodeConnection<br>title: String |
| `PeopleOperationsIntroSection` | description: String<br>image: image<br>title: String |
| `PeopleOperationsWhatWeDoSection` | title: String<br>whatWeDoItems: repeater { description: String; image: image; points: String; title: String } |
| `PeopleOperationsWhereWeHelpSection` | helpItems: repeater { description: String; title: String }<br>title: String |
| `ServicesBannerSection` | description: String<br>primaryCtaButton: link {title url target}<br>secondaryCtaButton: link {title url target}<br>subTitle: String<br>tierCards: repeater { description: String; label: String; title: String }<br>title: String |
| `ServicesFindYourStageSection` | description: String<br>stageCards: repeater { description: String; icon: image; stageLabel: String; title: String }<br>subTitle: String<br>title: String |
| `ServicesFractionalCfoSection` | ctaButton: link {title url target}<br>deliverables: repeater { description: String; image: image; label: String }<br>description: String<br>title: String |
| `ServicesInvestorsSection` | description: String<br>investorCards: repeater { description: String; image: image; title: String }<br>primaryCtaButton: link {title url target}<br>secondaryCtaButton: link {title url target}<br>subTitle: String<br>title: String |
| `ServicesOperatingCadenceSection` | description: String<br>sectionSetting: String<br>steps: repeater { description: String; number: Float; title: String }<br>title: String |
| `ServicesTiersInDepthSection` | ctaButton: link {title url target}<br>subTitle: String<br>tiers: repeater { ctaButton: link {title url target}; description: String; number: Float; services: repeater { description: String; hoverContent: String; title: String }; title: String }<br>title: String |
| `SimpleCtaSection` | ctaButton: link {title url target}<br>description: String<br>title: String |
| `TeamMembersSection` | ctaButton: link {title url target}<br>teamMembers: AcfContentNodeConnection<br>title: String |
| `WhyFiabBannerSection` | ctaButton: link {title url target}<br>description: String<br>highlights: repeater { number: Float; title: String }<br>subTitle: String<br>title: String |
| `WhyFiabComparisonSection` | comparisonRows: repeater { feature: String; fiab: Boolean; freelanceCfo: Boolean; inHouseHire: Boolean; softwarePlatform: Boolean }<br>description: String<br>featuresColumnLabel: String<br>fiabLogo: image<br>freelanceCfoLabel: String<br>inHouseHireLabel: String<br>softwarePlatformLabel: String<br>title: String |
| `WhyFiabExistsSection` | backgroundImage: image<br>description: String<br>missionContent: String<br>missionSubTitle: String<br>title: String |
| `WhyFiabHowWeWorkSection` | title: String<br>workCards: repeater { description: String; number: Float; title: String } |
| `WhyFiabLetsTalkSection` | ctaButton: link {title url target}<br>description: String<br>image: image<br>title: String |
| `WhyFiabTrustedBySection` | logos: repeater { logo: image }<br>title: String |
| `YourOwnAgenticSection` | buildYourOwnAgentic: repeater { content: String; greatFor: String; icon: image; title: String }<br>description: String<br>title: String |
