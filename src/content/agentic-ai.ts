export type AgenticAiLink = { label: string; url: string };

export type AgenticAiFeature = {
  image: string;
  title: string;
  text: string;
};

export type AgenticAiAgent = {
  icon: string;
  title: string;
  text: string;
};

export type AgenticAiPeopleOps = {
  title: string;
  agents: AgenticAiAgent[];
};

export type AgenticAiOpsCompliance = {
  title: string;
  cards: { image: string; title: string; text: string }[];
};

export type AgenticAiPartner = {
  name: string;
  logo: string;
};

export type AgenticAiArchitectureCard = {
  image: string;
  title: string;
  text: string;
  bullets: { boldText: string; normalText: string }[];
};

// Naya: FAQ Type
export type AgenticAiFaq = {
  question: string;
  answer: string;
};

export type AgenticAiContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    bullets: string[];
    cta: AgenticAiLink;
  };
  whatIs: {
    eyebrow: string;
    title: string;
    highlight: string;
    text1: string;
    text2: string;
    features: AgenticAiFeature[];
  };
  buildYourOwn: {
    title: string;
    highlight: string;
    text: string;
    agents: AgenticAiAgent[];
  };
  peopleOps: {
    title: string;
    agents: AgenticAiAgent[];
  };
  opsCompliance: {
    title: string;
    cards: { image: string; title: string; text: string }[];
  };
  partners: {
    title: string;
    logos: AgenticAiPartner[];
  };
  provenArchitecture: {
    title: string;
    highlight: string;
    cards: AgenticAiArchitectureCard[];
  };
  waitlist: {
    title: string;
    highlight: string;
    text: string;
  };
  // Naya Section
  faq: {
    title: string;
    items: AgenticAiFaq[];
  };
};

export const agenticAiContent: AgenticAiContent = {
  hero: {
    eyebrow: "AGENTIC AI",
    title: "Agentic AI for Finance, ",
    highlight: "People Ops & Talent",
    text: "Give your back office autonomous superpowers—safer, faster, and fully auditable",
    bullets: [
      "Give your back office autonomous superpowers—safer, faster, and fully auditable",
      "Real-time visibility: Approvals, postings, tickets, and updates happen automatically",
      "Faster go-lives: Deploy in weeks, not quarters, using prebuilt playbooks",
    ],
    cta: { label: "Join the Waitlist", url: "/#waitlist" },
  },
  whatIs: {
    eyebrow: "WHY NOW?",
    title: "What is ",
    highlight: "Agentic AI",
    text1: "Think: Fewer clicks and handoffs, more outcomes and audit trails!",
    text2: "Agentic AI moves beyond chat. It's a set of policy-aware, goal-driven agents that can observe data, decide with context, and take actions across your stack-while keeping humans in control.",
    features: [
      {
        image: "/agentic-ai/time-saved.png",
        title: "Time Saved",
        text: "Recurring tasks automated (close, payroll, onboarding, collections)",
      },
      {
        image: "/agentic-ai/money-saved.png",
        title: "Money Saved",
        text: "Fewer tools and touchpoints; better accuracy reduces rework",
      },
      {
        image: "/agentic-ai/expanded-operations.png",
        title: "Expanded Operations",
        text: "Scale across regions and teams without adding headcount",
      },
      {
        image: "/agentic-ai/speed-to-value.png",
        title: "Speed to Value",
        text: "Typical pilots designed to go live in 12–18 days with a defined scope",
      },
    ],
  },
  buildYourOwn: {
    title: "Build your own ",
    highlight: "Agentic AI",
    text: "Pick from ready agents, then tailor the policies, data sources, and approvals to your environment",
    agents: [
      {
        icon: "/icons/collections-agent.png",
        title: "Collections Agent",
        text: "monitors aging, sends nudges, proposes payment plans, updates CRM, and creates tasks for exceptions.",
      },
      {
        icon: "/icons/ap-agent.png",
        title: "AP Agent",
        text: "monitors aging, sends nudges, proposes payment plans, updates CRM, and creates tasks for exceptions.",
      },
      {
        icon: "/icons/billing-agent.png",
        title: "Billing Agent",
        text: "validates entitlements, drafts invoices/credit memos, flags anomalies, and posts to ERP after approval.",
      },
      {
        icon: "/icons/fp-a-copilot.png",
        title: "FP&A Copilot",
        text: "builds rolling forecasts, variance notes, and \"what-if\" scenarios; populates board pack sections.",
      },
    ],
  },
  peopleOps: {
    title: "People Ops, Payroll & IT",
    agents: [
      {
        icon: "/icons/on-offboarding-agent.png",
        title: "On/Offboarding Agent",
        text: "Creates offers, checklists, access tickets; provisions in HRIS/ITSM; books orientation; confirms completion.",
      },
      {
        icon: "/icons/service-desk-agent.png",
        title: "Service Desk Agent",
        text: "Triages HR/IT tickets, answers FAQs, resolves routine requests, escalates when needed.",
      },
      {
        icon: "/icons/payrol.png",
        title: "Payroll Prep Agent",
        text: "Creates offers, checklists, access tickets; provisions in HRIS/ITSM; books orientation; confirms completion.",
      },
    ],
  },
  opsCompliance: {
    title: "Ops & Compliance",
    cards: [
      {
        image: "/agentic-ai/procurement-agent.png",
        title: "Procurement Agent",
        text: "Enforces vendor policies, gathers W-9/KYC, creates POs, tracks delivery, updates asset records.",
      },
      {
        image: "/agentic-ai/compliance-filling-agent.png",
        title: "Compliance Filing Agent",
        text: "Compiles filings, checks thresholds, reminds owners, and maintains the evidence store",
      },
    ],
  },
  partners: {
    title: "Official Partner Stack",
    logos: [
      { name: "NetSuite", logo: "/agentic-ai/logo/netsuite.png" },
      { name: "Gusto", logo: "/agentic-ai/logo/gusto.png" },
      { name: "Zoho", logo: "/agentic-ai/logo/zoho.png" },
      { name: "Power BI", logo: "/agentic-ai/logo/power-bi.png" },
      { name: "Lever", logo: "/agentic-ai/logo/lever.png" },
      { name: "ManageEngine", logo: "/agentic-ai/logo/manage-engine.png" },
      { name: "Keka", logo: "/agentic-ai/logo/keka.png" },
    ],
  },
  provenArchitecture: {
    title: "Proven Architecture.",
    highlight: "Real Results. Enterprise Trust.",
    cards: [
      {
        image: "/agentic-ai/Architecture.png",
        title: "Architecture",
        text: "Connect → Understand → Decide → Act → Log",
        bullets: [
          { boldText: "Connectors", normalText: " to ERP/HRIS/ATS/ITSM/BI" },
          { boldText: "Policy engine", normalText: " for SoD and approvals" },
          { boldText: "Reasoning & tools", normalText: " for decisions and actions" },
          { boldText: "Audit & observability", normalText: " for every step" },
        ],
      },
      {
        image: "/agentic-ai/case-examples.png",
        title: "Case examples",
        text: "",
        bullets: [
          { boldText: "SaaS (Series B):", normalText: " Collections & billing agents cut DSO by 18% and dispute volume by 30% in 8 weeks." },
          { boldText: "Global services:", normalText: " Onboarding agent reduced day-1 access issues by 90%; payroll prep time by 40%." },
          { boldText: "E-commerce:", normalText: " AP agent achieved 70% touchless invoice processing with PO match and GL coding rules." },
        ],
      },
      {
        image: "/agentic-ai/security-compliance.png",
        title: "Security & Compliance",
        text: "",
        bullets: [
          { boldText: "Data stays within your systems,", normalText: " and agents use least-privilege access." },
          { boldText: "Full audit trails and change logs,", normalText: " export to your BI/SIEM." },
          { boldText: "Supports SoD,", normalText: " maker–checker flows, and region-specific privacy needs." },
        ],
      },
    ],
  },
  waitlist: {
    title: "Join the",
    highlight: "Waitlist",
    text: "Be among the first to deploy Agentic AI with FIAB specialists.",
  },
  // Naya Data
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Is this a chatbot?",
        answer: "No. Agents reason over data, follow policies, and take actions (with approvals).",
      },
      { question: "Do humans still approve?", answer: "" },
      { question: "Will it work with our current tools?", answer: "" },
      { question: "How do we price pilots?", answer: "" },
    ],
  },
};