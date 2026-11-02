import type { LegalDocContent } from "./privacy-policy";

export const termsConditionsContent: LegalDocContent = {
  hero: {
    eyebrow: "LEGAL & COMPLIANCE",
    title: "Terms &",
    highlight: "Conditions",
    text: "These Terms govern access to and use of FIAB websites, materials, and services (“Services”). By using the Services, you agree to these Terms and any applicable Order, SOW, or Master Services Agreement (MSA).",
    effectiveDate: "November 2026",
    contactEmail: "info@financeinabox.com",
  },
  sections: [
    {
      id: "agreement",
      number: "1",
      title: "Agreement",
      paragraphs: [
        "These Terms govern access to and use of FIAB websites, materials, and services (“Services”). By using the Services, you agree to these Terms and any applicable Order, SOW, or Master Services Agreement (MSA). If there’s a conflict, the MSA or SOW prevails.",
      ],
    },
    {
      id: "services",
      number: "2",
      title: "Services",
      paragraphs: [
        "FIAB provides on-demand, tech-enabled finance teams and related implementation, integration, and advisory services (including compliance, SOX support, analytics, HR/payroll ops, and recruiting). Scope, deliverables, timelines, and fees are defined in an Order/SOW.",
      ],
    },
    {
      id: "no-professional-advice",
      number: "3",
      title: "No professional advice",
      paragraphs: [
        "Unless explicitly stated in your SOW, FIAB does not provide legal, tax, or investment advice. You remain responsible for decisions made using outputs from our Services.",
      ],
    },
    {
      id: "client-responsibilities",
      number: "4",
      title: "Client responsibilities",
      intro: "You will:",
      bullets: [
        "(a) provide timely access to systems, data, and stakeholders;",
        "(b) ensure necessary rights to data shared;",
        "(c) maintain appropriate internal approvals; and",
        "(d) use the Services in compliance with law (including privacy, labor, export control).",
      ],
    },
    {
      id: "accounts-eligibility",
      number: "5",
      title: "Accounts & eligibility",
      paragraphs: [
        "You must be at least 18 and authorized to bind your organization. You are responsible for keeping credentials confidential and for actions under your accounts.",
      ],
    },
    {
      id: "fees-payment",
      number: "6",
      title: "Fees & payment",
      paragraphs: [
        "Fees are as stated in the Order/SOW (fixed, milestone, or time-and-materials). Invoices are due [Net 15/30]. Late amounts may accrue [1.5% per month] or the maximum allowed by law. Taxes and withholdings are your responsibility unless legally exempt.",
      ],
    },
    {
      id: "term-termination",
      number: "7",
      title: "Term & termination",
      paragraphs: [
        "Each Order/SOW states its term. Either party may terminate for material breach not cured within [30] days. Either party may terminate for convenience with [30/60] days’ notice if allowed by the Order. Upon termination, you pay for Services rendered and reasonable wind-down costs.",
      ],
    },
    {
      id: "acceptable-use",
      number: "8",
      title: "Acceptable use",
      intro: "You will not:",
      bullets: [
        "(a) misuse the Sites;",
        "(b) reverse engineer or interfere with security;",
        "(c) upload harmful code;",
        "(d) use outputs to violate rights or law.",
      ],
    },
    {
      id: "intellectual-property",
      number: "9",
      title: "Intellectual property",
      paragraphs: [
        "Pre-existing IP of each party remains with that party. Unless otherwise stated, deliverables created for you under a paid SOW become your property upon full payment, subject to FIAB’s underlying methodologies, templates, and tools, which remain FIAB IP (licensed to you for internal use).",
      ],
    },
    {
      id: "confidentiality",
      number: "10",
      title: "Confidentiality",
      paragraphs: [
        "Each party will protect the other’s confidential information and use it only for the engagement. This obligation survives termination for [3–5] years (or longer for trade secrets).",
      ],
    },
    {
      id: "privacy-data",
      number: "11",
      title: "Privacy & data",
      paragraphs: [
        "Processing of personal data is governed by our Privacy Policy and, where applicable, a DPA. You represent that you have lawful grounds and notices to share personal data with us.",
      ],
    },
    {
      id: "third-party-services",
      number: "12",
      title: "Third-party services",
      paragraphs: [
        "We may integrate or administer third-party systems (e.g., Salesforce, NetSuite). Those services are governed by their own terms; we are not responsible for third-party outages or changes.",
      ],
    },
    {
      id: "warranties-disclaimers",
      number: "13",
      title: "Warranties & disclaimers",
      paragraphs: [
        "We warrant that we will perform Services in a professional and workmanlike manner. Except as stated, the Services and Sites are provided “as is” and FIAB disclaims all other warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.",
      ],
    },
    {
      id: "limitation-of-liability",
      number: "14",
      title: "Limitation of liability",
      paragraphs: [
        "To the maximum extent permitted by law, FIAB’s aggregate liability arising out of or related to the Services shall not exceed the fees paid by you for the 12 months preceding the event giving rise to the claim. No indirect, incidental, special, consequential, or punitive damages. These limits apply even if a remedy fails of its essential purpose.",
      ],
    },
    {
      id: "indemnification",
      number: "15",
      title: "Indemnification",
      paragraphs: [
        "You will indemnify and hold FIAB harmless against third-party claims arising from your misuse of the Services or violation of law. FIAB will indemnify you for third-party claims alleging that FIAB-provided deliverables infringe IP rights, subject to standard exclusions and procedures.",
      ],
    },
    {
      id: "governing-law-disputes",
      number: "16",
      title: "Governing law & disputes",
      paragraphs: [
        "Governing law: [State/Country], without regard to conflict-of-laws rules. Disputes will be resolved in [City, State/Country] courts, or by [arbitration forum] if agreed in the MSA. Each party consents to jurisdiction there.",
      ],
    },
    {
      id: "changes-to-terms",
      number: "17",
      title: "Changes to Terms",
      paragraphs: [
        "We may update these Terms occasionally. Material changes will be posted with an updated effective date. Continued use after changes means acceptance.",
      ],
    },
  ],
  contactCta: {
    title: "Questions about these Terms?",
    text: "Have inquiries regarding our Master Services Agreement, service level commitments, or billing arrangements? We are happy to help.",
    email: "info@financeinabox.com",
    buttonLabel: "Contact us",
    buttonUrl: "/contact-us/",
  },
  pressure: {
    title: "Tell Us Where The",
    emphasis: "Pressure Is.",
    text: "Strategic finance, accounting, and people ops designed for high-growth businesses.",
    cta: {
      label: "Book a Discovery Call",
      url: "/contact-us/",
    },
  },
};
