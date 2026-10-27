export type CareersLink = { label: string; url: string };

export type CareersBenefit = {
  icon: string;
  title: string;
  text: string;
};

export type CareersHiringStep = {
  number: string;
  title: string;
  text: string;
};

// Naya: FAQ Item Type
export type CareersFaq = {
  question: string;
  answer: string;
};

export type CareersContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    highlight2: string;
    text: string;
    cta: CareersLink;
  };
  whyWork: {
    title: string;
    highlight: string;
    image: string;
    points: string[];
  };
  standOut: {
    title: string;
    cards: { image: string; title: string; text: string }[];
  };
  benefits: {
    title: string;
    items: CareersBenefit[];
  };
  howWeHire: {
    title: string;
    text: string;
    steps: CareersHiringStep[];
  };
  // Naya: FAQ Section
  faq: {
    title: string;
    items: CareersFaq[];
  };
};

export const careersContent: CareersContent = {
  hero: {
    eyebrow: "— CAREERS",
    title: "Build the operating system",
    highlight: "for growth",
    highlight2: "companies",
    text: "Join a team redefining finance and operations for startups and high-growth companies. We're remote-first, results-driven, and focused on delivering quality work without unnecessary bureaucracy.",
    cta: { label: "See Open Roles", url: "/careers/open-roles" },
  },
  whyWork: {
    title: "Why work",
    highlight: "at FIAB?",
    image: "/careers/why-work-FIAB.png",
    points: [
      "We grow people, not just titles. Clear goals, mentorship, and room to lead.",
      "We solve real problems. From month-end to RevOps, we standardise the work, automate hand-offs, and surface the decisions.",
      "We ship at startup speed—without cutting corners. SLAs, SOPs, and dashboards keep quality real.",
    ],
  },
  standOut: {
    title: "What Makes FIAB Stand Out?",
    cards: [
      {
        image: "/careers/stand-out-1.png",
        title: "Cross-border expertise (US → India) & multi-industry depth",
        text: "Work with a team that understands both US and India compliance and the realities of scaling across time zones. We bring proven playbooks from Saas, Health Tech, Logistics Tech, Telecom, Real-Estate Tech, Robotics, and Insurance Tech to your stack.",
      },
      {
        image: "/careers/stand-out-2.png",
        title: "Hands-on with modern stacks",
        text: "We implement, integrate, and manage your tools so data flows and teams move faster: NetSuite, Zoho, QuickBooks, Tipalti, Airbase, Rippling, ADP, Gusto, Lever (ATS), ManageEngine, plus BI (Power BI / Tableau / Looker / Qlik).",
      },
      {
        image: "/careers/stand-out-3.png",
        title: "Ownership with support",
        text: "Get a dedicated pod that runs your day-to-day and drives continuous improvement—without adding headcount. You keep the strategic control; we handle the execution.",
      },
    ],
  },
  benefits: {
    title: "Benefits & Perks",
    items: [
      { icon: "/icons/health-insurance.png", title: "Health Insurance", text: "Company-sponsored medical coverage" },
      { icon: "/icons/paid-time-off.png", title: "Paid Time Off", text: "Guaranteed Annual Paid Leave" },
      { icon: "/icons/remote-first.png", title: "Remote-First", text: "Work from anywhere" },
      { icon: "/icons/learn-grow.png", title: "Learn & Grow", text: "Training access for continuous learning" },
      { icon: "/icons/Recognition.png", title: "Recognition", text: "Bonusly points and shout-outs" },
      { icon: "/icons/tools.png", title: "Tools", text: "Company Laptop Provided" },
    ],
  },
  howWeHire: {
    title: "How We Hire?",
    text: "A simple, transparent process that guides you from your first conversation with us to joining the team.",
    steps: [
      { number: "01", title: "Apply", text: "Tell us where you want to contribute and share links (LinkedIn, portfolio, Git/Sheets, dashboards)" },
      { number: "02", title: "Intro", text: "Quick conversation about goals, role fit, and time-zone/location." },
      { number: "03", title: "Skills", text: "A practical exercise mirroring the role (e.g., reconciliation, model build, workflow map)." },
      { number: "04", title: "Panel", text: "Meet future teammates; discuss decisions you've made and how you work." },
      { number: "05", title: "Offer", text: "We align on scope, SLAs, and a ramp plan." },
    ],
  },
  // Naya Data
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Do you hire remotely?",
        answer: "Yes. We're remote-first across the US and India, with time-zone aligned roles",
      },
      { question: "What tools do I need to know?", answer: "" }, // Blank answer
      { question: "Do you offer growth paths?", answer: "" },   // Blank answer
      { question: "What's the work culture like?", answer: "" }, // Blank answer
    ],
  },
};