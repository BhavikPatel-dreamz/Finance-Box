export interface FoundationPageContent {
  banner: {
    subTitle: string;
    title: string;
    highlight: string;
    description: string;
    ctaButton: {
      label: string;
      url: string;
    };
    backgroundImage: string;
  };
  intro: {
    subTitle: string;
    title: string;
    highlight: string;
    description: string;
    ctaButton: {
      label: string;
      url: string;
    };
    highlightCards: Array<{
      title: string;
      icon: string;
      image: string;
    }>;
  };
  services: {
    subTitle: string;
    title: string;
    highlight: string;
    ctaButton: {
      label: string;
      url: string;
    };
    serviceCards: Array<{
      title: string;
      tagLine: string;
      points: string[];
      icon: string;
    }>;
  };
  process: {
    title: string;
    highlight: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
}

export const fallbackFoundationContent: FoundationPageContent = {
  banner: {
    subTitle: "FOUNDATION",
    title: "Build your foundation-",
    highlight: "accurate, compliant, audit-ready",
    description:
      "Establish tight controls and reliable operations from day one. We standardize policies, document processes, and implement systems so your finance and people functions run predictably at scale.",
    ctaButton: {
      label: "Get a Foundations Checklist",
      url: "/contact-us/",
    },
    backgroundImage: "/foundation/foundation-hero-bg.jpg",
  },
  intro: {
    subTitle: "Stability Before Scale",
    title: "Lay the groundwork with smart automation and",
    highlight: "seamless compliance.",
    description:
      "Before you scale, you must stabilize. Foundation services are built to establish an efficient, tech-enabled financial structure - eliminating manual errors, ensuring compliance, and setting up for long-term performance.",
    ctaButton: {
      label: "Start your Transformation",
      url: "/contact-us/",
    },
    highlightCards: [
      {
        title: "Automated Bookkeeping",
        icon: "/foundation/emojione-monotone_laptop.svg",
        image: "/foundation/Automated-Bookkeeping.png",
      },
      {
        title: "Regulatory Compliance",
        icon: "/foundation/boxicons_receipt-filled.svg",
        image: "/foundation/RegulatoryCompliance.png",
      },
      {
        title: "System & Tool Setup",
        icon: "/foundation/tdesign_system-code-filled.svg",
        image: "/foundation/System-Tool-Setup.png",
      },
      {
        title: "Workflow Automation",
        icon: "/foundation/coolicons_robot-fill-round.svg",
        image: "/foundation/Workflow-Automation.png",
      },
    ],
  },
  services: {
    subTitle: "Smart Efficiency",
    title: "What We",
    highlight: "Automate & Deliver",
    ctaButton: {
      label: "See our Services",
      url: "/services/",
    },
    serviceCards: [
      {
        title: "Accounting Operations",
        tagLine: "Keep your numbers right and your close on time—every month.",
        points: [
          "Close, AP/AR, billing & collections, cash app, GL",
          "SLAs for accuracy, timeliness, responsiveness",
          "Dashboards and controls built in",
        ],
        icon: "/foundation/accounting-operations.svg",
      },
      {
        title: "Compliance & Filings",
        tagLine: "Stay current with entity and tax requirements in every state.",
        points: [
          "1099/Form 3921, Sales & Use Tax",
          "Delaware & other state annual filings",
          "Business & Individual income tax returns, other filings",
        ],
        icon: "/foundation/compliance-filings.svg",
      },
      {
        title: "People Operations & Payroll",
        tagLine: "Set up clean employee data, pay cycles, and compliance calendars.",
        points: [
          "Onboarding & offboarding flows, HR support",
          "Payroll administration and reconciliations",
          "Policy docs mapped to approvals and audits",
        ],
        icon: "/foundation/people-operations-payroll.svg",
      },
      {
        title: "ERP Foundations",
        tagLine: "Configure core systems the right way—once.",
        points: [
          "Role-based access, audit logs and segregation of duties",
          "Clean chart of accounts and dimensions",
          "Master data governance and change control",
        ],
        icon: "/foundation/erp-foundations.svg",
      },
    ],
  },
  process: {
    title: "How Foundation Engagements",
    highlight: "Work Automation?",
    steps: [
      {
        title: "Discover",
        description: "Baseline risks, policies, and current stack",
      },
      {
        title: "Design",
        description: "SOPs, SLAs, charts, and approvals",
      },
      {
        title: "Implement",
        description: "Stand up teams, close cadences, and compliance calendars",
      },
      {
        title: "Stabilize",
        description: "Measure against KPIs, tune controls",
      },
      {
        title: "Hand off",
        description: "Playbooks, access, and training for continuity",
      },
    ],
  },
};
