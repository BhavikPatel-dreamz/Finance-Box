export type ServicesLink = { label: string; url: string };

export type ServicesTier = {
  number: string;
  label: string;
  title: string;
  highlight: string;
  text: string;
};

export type ServicesStage = {
  title: string;
  label: string;
  text: string;
  icon: "gear" | "people" | "person" | "target";
};

export type ServicesContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    primary: ServicesLink;
    secondary: ServicesLink;
    tiers: ServicesTier[];
  };
  stages: {
    eyebrow: string;
    title: string;
    text: string;
    cards: ServicesStage[];
  };
  depth: {
    eyebrow: string;
    title: string;
    cta: ServicesLink;
  };
  details: ServicesDetail[];
  cfo: {
    title: string;
    text: string;
    cta: ServicesLink;
    cards: ServicesPhotoCard[];
  };
  process: {
    title: string;
    text: string;
    steps: ServicesStep[];
  };
  investors: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    primary: ServicesLink;
    secondary: ServicesLink;
    cards: ServicesPhotoCard[];
  };
};

export type ServicesPhotoCard = {
  title: string;
  text: string;
  image: { url: string; alt: string } | null;
};

export type ServicesStep = {
  number: string;
  title: string;
  text: string;
};

export type ServicesDetail = {
  anchor: string;
  number: string;
  title: string;
  text: string;
  cta: ServicesLink;
  items: { title: string; text: string }[];
};

export const servicesContent: ServicesContent = {
  hero: {
    eyebrow: "Services",
    title: "A Complete Finance Function,",
    highlight: "Organized by Stage",
    text: "FIAB delivers finance through three tiers. Foundation sets up the core, Momentum scales and automates it, and Foresight adds senior financial leadership. Start with the tier that matches today's pressure and expand as the company grows.",
    primary: { label: "Book a Discovery Call", url: "/#contact" },
    secondary: { label: "See How an Engagement Works", url: "#stages" },
    tiers: [
      {
        number: "01",
        label: "Tier one",
        title: "Foundation.",
        highlight: "Set up and standardize.",
        text: "Build an accurate, compliant finance core.",
      },
      {
        number: "02",
        label: "Tier two",
        title: "Momentum.",
        highlight: "Scale and automate.",
        text: "Remove manual friction and create a reliable operating cadence.",
      },
      {
        number: "03",
        label: "Tier three",
        title: "Foresight.",
        highlight: "Plan and lead.",
        text: "Turn financial data into forward-looking decisions.",
      },
    ],
  },
  stages: {
    eyebrow: "Find your stage",
    title: "Where is your Company Today?",
    text: "Every engagement is built from the same three tiers. Your situation decides where we start.",
    cards: [
      {
        title: "Set the foundation",
        label: "Typically pre-seed or newly established companies",
        text: "Get audit-ready books, clean structure, and compliance handled before it becomes technical debt.",
        icon: "gear",
      },
      {
        title: "Build momentum",
        label: "Typically seed stage or growing businesses",
        text: "Automate the back office, tighten revenue operations, and give your board the reporting they expect.",
        icon: "people",
      },
      {
        title: "Lead with foresight",
        label: "Typically Series A/B or established companies without a full-time CFO",
        text: "Strategic finance leadership, board-grade dashboards, and capital strategy, without hiring a full-time CFO.",
        icon: "person",
      },
      {
        title: "Optimize and expand",
        label: "Growth-stage and mid-size companies",
        text: "Cost reduction, offshore team buildout, and operating model design as you scale toward profitability, Series C, IPO readiness, or M&A.",
        icon: "target",
      },
    ],
  },
  depth: {
    eyebrow: "The three tiers in depth",
    title: "What's Inside Each Tier",
    cta: { label: "Talk to Our Team", url: "/#contact" },
  },
  details: [
    {
      anchor: "foundation",
      number: "01",
      title: "Foundation. Set up and standardize.",
      text: "Build an accurate, compliant finance core for the company you are becoming.",
      cta: { label: "Explore Foundation", url: "#foundation" },
      items: [
        { title: "Accounting operations", text: "Investor-ready financials" },
        { title: "Compliance & filings", text: "Zero compliance surprises" },
        { title: "Payroll & people operations", text: "A people function that scales" },
        { title: "ERP / HRIS foundations", text: "Audit-proof structure" },
      ],
    },
    {
      anchor: "momentum",
      number: "02",
      title: "Momentum. Scale and automate.",
      text: "Remove manual friction and create a reliable operating cadence.",
      cta: { label: "Explore Momentum", url: "#momentum" },
      items: [
        { title: "Financial reporting", text: "Reporting that holds up under review" },
        { title: "Revenue operations", text: "Clean revenue recognition" },
        { title: "ERP & automation", text: "More output without more headcount" },
        { title: "Risk management", text: "Diligence-ready at any time" },
        { title: "Business operations", text: "Scale without chaos" },
        { title: "Build Operate Transfer (BOT)", text: "Your own team, built the right way" },
      ],
    },
    {
      anchor: "foresight",
      number: "03",
      title: "Foresight. Plan and lead.",
      text: "Turn financial data into forward-looking decisions and senior finance leadership.",
      cta: { label: "Explore Foresight", url: "#foresight" },
      items: [
        { title: "FP&A & forecasting", text: "Board-ready every quarter" },
        { title: "Fractional CFO", text: "CFO-level judgment at a fraction of the cost" },
        { title: "BI dashboards & KPIs", text: "Real-time visibility" },
        { title: "Strategy & operating model", text: "IPO and M&A ready" },
        { title: "Cost optimization programs (DOGE Services)", text: "Lower burn, higher margins" },
      ],
    },
  ],
  cfo: {
    title: "What our Fractional\nCFOs Deliver",
    text: "A CFO's job is more than reporting what happened. It is shaping what happens next.",
    cta: { label: "Explore Foresight", url: "#foresight" },
    cards: [
      {
        title: "Strategic",
        text: "Fundraising preparation, investor reporting, board decks, KPI design, forecasting, runway planning.",
        image: { url: "/services/cfo-strategic.jpg", alt: "Notebook, charts, and a phone on a wooden desk" },
      },
      {
        title: "Operational",
        text: "Budgeting, spend controls, hiring models, pricing analysis, AP/AR workflows, financial systems.",
        image: { url: "/services/cfo-operational.jpg", alt: "Two people reviewing printed charts at a table" },
      },
      {
        title: "Leadership",
        text: "Turning numbers into decisions, helping founders prioritize, reducing financial uncertainty, creating accountability.",
        image: { url: "/services/cfo-leadership.jpg", alt: "People reviewing reports with a calculator and sticky notes" },
      },
    ],
  },
  process: {
    title: "From First Call to Operating Cadence",
    text: "A structured five-step process takes you from discovery call to a running finance function. With complete onboarding inputs, launch takes about two weeks.",
    steps: [
      { number: "01", title: "Meet.", text: "We align on goals, pain points, and what success looks like." },
      { number: "02", title: "Match.", text: "We assemble the right mix of senior talent and automation for your stage." },
      { number: "03", title: "Launch.", text: "SOPs, controls, and dashboards go live with clear SLAs." },
      { number: "04", title: "Achieve", text: "We run the operation, report against KPIs, and keep improving it." },
      { number: "05", title: "Evolve.", text: "Quarterly roadmap updates with data-backed recommendations as you grow." },
    ],
  },
  investors: {
    eyebrow: "For VCs & advisors",
    title: "Why investors\nrefer FIAB to their\nportfolio",
    highlight: "their",
    text: "You want your portfolio companies focused on building, with a finance function that quietly works. When it does, fundraises move faster and boards get real answers. Here is what FIAB takes off their plate, and what you can see along the way.",
    primary: { label: "Talk to Us About Your Portfolio", url: "/#contact" },
    secondary: { label: "More for Investors", url: "#investors" },
    cards: [
      {
        title: "Fast deployment",
        text: "Discovery in days and go-live in about two weeks, with onboarding kept light.",
        image: { url: "/services/investor-deployment.jpg", alt: "A founder thinking beside a whiteboard of notes" },
      },
      {
        title: "Modular by stage",
        text: "Add or swap coverage as the portfolio company scales, with no renegotiation of the engagement.",
        image: { url: "/services/investor-modular.jpg", alt: "A laptop, charts, and notes on a round table" },
      },
      {
        title: "Shared dashboards",
        text: "KPIs and SLAs tracked in dashboards that you and your founders both access.",
        image: { url: "/services/investor-dashboards.jpg", alt: "Two people reviewing papers and a laptop" },
      },
    ],
  },
};
