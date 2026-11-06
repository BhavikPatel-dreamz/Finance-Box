export type LegalBullet = string | { label: string; text: string };

export type LegalSection = {
  id: string;
  number: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: LegalBullet[];
  note?: string;
  email?: string;
  link?: { label: string; url: string };
};

export type LegalDocContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    effectiveDate: string;
    contactEmail: string;
  };
  sections: LegalSection[];
  contactCta: {
    title: string;
    text: string;
    email: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  pressure: {
    title: string;
    emphasis: string;
    text: string;
    cta: {
      label: string;
      url: string;
    };
  };
};

export const privacyPolicyContent: LegalDocContent = {
  hero: {
    eyebrow: "LEGAL & COMPLIANCE",
    title: "Privacy",
    highlight: "Policy",
    text: "This Policy describes how we collect, use, disclose, and protect personal data when you visit our websites, use our services, or interact with us.",
    effectiveDate: "November 2026",
    contactEmail: "info@financeinabox.com",
  },
  sections: [
    {
      id: "who-we-are",
      number: "1",
      title: "Who we are",
      paragraphs: [
        "Finance in a Box (“FIAB”, “we”, “us”) provides on-demand, tech-enabled finance, people ops, payroll, and recruiting services, plus software integrations and analytics.",
      ],
      email: "info@financeinabox.com",
    },
    {
      id: "scope",
      number: "2",
      title: "Scope",
      paragraphs: [
        "This Policy describes how we collect, use, disclose, and protect personal data when you visit our websites, use our services, or interact with us. It applies to www.financeinabox.com and related sub-domains, products, and portals.",
      ],
      link: {
        label: "www.financeinabox.com",
        url: "https://financeinabox.com",
      },
    },
    {
      id: "roles-under-data-protection-law",
      number: "3",
      title: "Roles under data protection law",
      intro: "Depending on the engagement:",
      bullets: [
        {
          label: "Controller",
          text: "We act as a Controller for the data we collect about website visitors, prospects, and our own personnel.",
        },
        {
          label: "Processor",
          text: "We act as a Processor for client data processed to deliver our services (e.g., accounting, HR/payroll, recruiting). In those cases, a Data Processing Addendum (DPA) governs our processing.",
        },
      ],
    },
    {
      id: "data-we-collect",
      number: "4",
      title: "Data we collect",
      bullets: [
        {
          label: "Provided by you",
          text: "contact details, company info, job application data, support requests, and any documents you upload.",
        },
        {
          label: "From your use of our sites/services",
          text: "log data, device information, IP address, analytics, cookies, and similar technologies.",
        },
      ],
    },
    {
      id: "purposes-legal-bases-gdpr",
      number: "5",
      title: "Purposes & legal bases (GDPR)",
      intro: "We process data to:",
      bullets: [
        "Provide and improve services, fulfill contracts (Art. 6(1)(b)).",
        "Communicate about proposals, updates, and service notices (Art. 6(1)(b), (f)).",
        "Run security, fraud prevention, and compliance checks (Art. 6(1)(c), (f)).",
        "Deliver marketing with your consent (Art. 6(1)(a)) or legitimate interest ((f) where permitted).",
      ],
      note: "You can withdraw consent any time without affecting prior processing.",
    },
    {
      id: "cookies-analytics",
      number: "6",
      title: "Cookies & analytics",
      paragraphs: [
        "We use necessary cookies and, with consent where required, analytics/advertising cookies. Manage preferences via our Cookie Banner or browser settings. See Cookie Notice for details.",
      ],
    },
    {
      id: "sharing-disclosures",
      number: "7",
      title: "Sharing & disclosures",
      intro: "We share data with:",
      bullets: [
        "Service providers/sub-processors (hosting, email, analytics, payment, support).",
        "Partners at your direction (e.g., Salesforce, NetSuite, Zoho, Power BI, Keka, Rippling, ManageEngine).",
        "Legal/regulatory bodies where required.",
      ],
      note: "We do not sell personal information. We do not permit sub-processors to use data for their own purposes.",
    },
    {
      id: "international-transfers",
      number: "8",
      title: "International transfers",
      paragraphs: [
        "Where data moves outside your jurisdiction, we use appropriate safeguards (e.g., EU Standard Contractual Clauses, UK IDTA/Addendum) and conduct transfer risk assessments.",
      ],
    },
    {
      id: "retention",
      number: "9",
      title: "Retention",
      paragraphs: [
        "We keep data only as long as needed for the purposes above, our agreements, and legal requirements. Typical periods: prospect data 24 months, support records 24–36 months, contract data 7 years (or as required by tax/audit law).",
      ],
    },
    {
      id: "your-rights",
      number: "10",
      title: "Your rights",
      paragraphs: [
        "Subject to law, you may request access, correction, deletion, restriction, portability, or objection. California residents have additional rights under CCPA/CPRA.",
        "We may verify your identity before fulfilling a request.",
      ],
      email: "info@financeinabox.com",
    },
    {
      id: "security",
      number: "11",
      title: "Security",
      paragraphs: [
        "We apply administrative, technical, and physical safeguards (least privilege, MFA, encryption in transit/at rest where supported, logging/monitoring, vulnerability management, and vendor due diligence).",
      ],
    },
    {
      id: "children",
      number: "12",
      title: "Children",
      paragraphs: [
        "Our services are not intended for children under 16. We do not knowingly collect children’s data.",
      ],
    },
    {
      id: "third-party-links",
      number: "13",
      title: "Third-party links",
      paragraphs: [
        "Our sites may link to third-party services. Their privacy practices are governed by their own policies.",
      ],
    },
    {
      id: "changes",
      number: "14",
      title: "Changes",
      paragraphs: [
        "We may update this Policy from time to time. Material changes will be posted here with an updated effective date.",
      ],
    },
  ],
  contactCta: {
    title: "Questions about your privacy?",
    text: "Contact our dedicated data protection and security officers for privacy inquiries, data subject access requests, or custom Data Processing Addenda (DPAs).",
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
