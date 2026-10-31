export type WhyLink = { label: string; url: string };

export type WhyPoint = { number: string; title: string };

export type WhyColumn = {
  label: string;
  featured: boolean;
  logo: { url: string; alt: string } | null;
};

export type WhyRow = { label: string; values: boolean[] };

export type WhyWorkCard = {
  number: string;
  title: string;
  text: string;
};

export type WhyTeamMember = {
  name: string;
  role: string;
  quote: string;
  bio: string;
  focusTitle: string;
  focusText: string;
  partnerships?: string;
  work: string;
  tools: string;
  industries: string;
  image: string;
  imagePosition?: "left" | "right";
};

export type WhyContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    cta: WhyLink;
    points: WhyPoint[];
  };
  trust: {
    title: string;
    logos: { url: string; alt: string }[];
  };
  compare: {
    title: string;
    highlight: string;
    text: string;
    featureLabel: string;
    columns: WhyColumn[];
    rows: WhyRow[];
  };
  howWeWork: {
    title: string;
    cards: WhyWorkCard[];
  };
  talk: {
    title: string;
    highlight: string;
    text: string;
    image: string;
    cta: WhyLink;
  };
  aboutSection: {
    image: string;
    title: string;
    text: string;
    missionLabel: string;
    missionText: string;
    bgImage: string;
  };
  team: {
    title: string;
    members: WhyTeamMember[];
    cta: WhyLink;
  };
  // 👇 Ye naya CTA section add kiya gaya hai
  cta: {
    title: string;
    highlight: string;
    text: string;
    buttonLabel: string;
    buttonUrl: string;
  };
};

const logo = { url: "/home/finance-logo.svg", alt: "Finance" };

export const whyContent: WhyContent = {
  hero: {
    eyebrow: "Why FIAB",
    title: "Why Growing",
    highlight: "Companies Choose\nFIAB",
    text: "Finance in a Box is an embedded finance operating partner. CFO-level strategy, controller execution, and full operational support come together in one flexible engagement that scales with the business and works to reduce costs at every stage.",
    cta: { label: "Book a Discovery Call", url: "/#contact" },
    points: [
      { number: "01", title: "CFO-level strategy" },
      { number: "02", title: "Controller execution" },
      { number: "03", title: "Full operational support" },
    ],
  },
  trust: {
    title: "Trusted By",
    logos: [],
  },
  compare: {
    title: "How FIAB Compares",
    highlight: "to your other Options",
    text: "Most companies weighing FIAB are also weighing a software platform, a freelance CFO, or an in-house hire. Each works for someone. Here is where the differences show up.",
    featureLabel: "Features",
    columns: [
      { label: "Finance", featured: true, logo },
      { label: "Software Platform", featured: false, logo: null },
      { label: "Freelance CFO", featured: false, logo: null },
      { label: "In House Hire", featured: false, logo: null },
    ],
    rows: [
      { label: "End-to-end financial support", values: [true, false, false, false] },
      { label: "Day-to-day execution", values: [true, true, false, true] },
      { label: "Strategic guidance", values: [true, false, true, false] },
      { label: "Cost efficiency", values: [true, true, false, false] },
      { label: "Speed to value", values: [true, true, false, false] },
      { label: "Scalability", values: [true, false, true, false] },
    ],
  },
  howWeWork: {
    title: "How We Work",
    cards: [
      {
        number: "01",
        title: "Partnership and communication",
        text: "We operate as part of your team, with clear, candid communication and no surprises saved for month-end.",
      },
      {
        number: "02",
        title: "Technology with judgment",
        text: "We automate the routine and keep senior people on the decisions that carry risk.",
      },
      {
        number: "03",
        title: "Integrity",
        text: "We act in the client's best interest, and we raise problems early, including the ones we find in our own work.",
      },
      {
        number: "04",
        title: "Outcomes over activity",
        text: "We measure ourselves on closed books, clean audits, cost found and removed, and decisions made faster.",
      },
    ],
  },
  talk: {
    title: "Let's Talk",
    highlight: "About Your Business",
    text: "Connect with our team to explore how FIAB can support your goals, challenges, and next stage of growth.",
    image: "/why/coins.png",
    cta: { label: "Talk to Our Team", url: "/#contact" },
  },
  aboutSection: {
    image: "/why/two-person.png",
    title: "Why FIAB Exists",
    text: "Finance in a Box was founded by Amit Mulchandani to give growing companies direct access to senior finance operators, practical systems expertise, and decision-ready insight.",
    missionLabel: "MISSION",
    missionText:
      "Give growing companies the finance function they need at every stage: expert people, automated systems, and clear reporting they can run the business on.",
    bgImage: "/why/bg-color.png",
  },
  team: {
    title: "The People Behind the Work",
    cta: { label: "Meet the Full Team", url: "/team" },
    members: [
      {
        name: "Amit Mulchandani",
        role: "FOUNDER & CEO",
        quote: "Founder and operator focused on automation-first finance and predictable growth.",
        bio: "Amit leads Finance in a Box with a builder's mindset, pairing senior finance leadership with AI-enabled systems and disciplined operations. He has scaled distributed teams, implemented modern ERP/AP stacks, and set up audit-ready processes that let companies grow without chaos.",
        focusTitle: "FOCUS & EXPERTISE:",
        focusText: "Growth strategy · Finance modernization · Operating cadence",
        partnerships: "PARTNERSHIPS:\nUS-India execution",
        work: "Established automation-first close playbooks; modernized ERP/AP stack patterns; guided multi-entity scale-ups.",
        tools: "NetSuite · Tipalti · Airbase · Rippling · Power BI / Tableau / Looker / Qlik",
        industries: "Logistics tech · Healthcare tech · Telecom · Real estate tech · Robotics · Insurance tech",
        image: "/why/why-team-member-1.png",
        imagePosition: "right",
      },
      {
        name: "Berena Reynoso",
        role: "Head of Operations",
        quote: "Builds win-win alliances that turn solutions into measurable outcomes.",
        bio: "Berena leads FIAB's partner and customer alliances. She aligns success plans, SLAs, and enablement so engagements run smoothly, from scoping to value realization.",
        focusTitle: "HER FOCUS:",
        focusText: "Predictable outcomes, clear communication, and long-term trust.",
        work: "Co-created success scorecards; streamlined co-selling and implementation.",
        tools: "NetSuite · Tipalti · Airbase · Rippling · CRM and project hubs",
        industries: "SaaS · Healthtech · Logistics tech · Telecom",
        image: "/why/why-team-member-2.png",
        imagePosition: "left",
      },
    ],
  },
  // 👇 Ye naya static CTA fallback data hai
  cta: {
    title: "See What an Embedded",
    highlight: "Finance Team Changes",
    text: "A 30-minute discovery call maps where your finance function is leaking time or cash, and what to fix first.",
    buttonLabel: "Join the Talent Network",
    buttonUrl: "/#contact",
  },
};