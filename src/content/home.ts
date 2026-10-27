export type HomeMedia = {
  url: string;
  alt: string;
};

export type HomeLink = {
  label: string;
  url: string;
};

export type HomeCard = {
  icon: HomeMedia | null;
  title: string;
  text: string;
};

export type HomeLogo = {
  image: HomeMedia;
  name: string;
};

export type HomePerson = {
  image: HomeMedia | null;
  name: string;
  role: string;
};

export type HomeContent = {
  header: {
    logo: HomeMedia;
    links: Array<HomeLink & { children: HomeLink[] }>;
    cta: HomeLink;
  };
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    primary: HomeLink;
    closeLabel: string;
    closeValue: string;
    closeUnit: string;
    closeTrend: string;
    runwayLabel: string;
    runwayValue: string;
    runwayUnit: string;
    runwayTrend: string;
    chartTitle: string;
    chartRange: string;
    call: HomeLink;
  };
  trust: {
    lead: string;
    stat: string;
    detail: string;
  };
  logos: HomeLogo[];
  founders: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    cta: HomeLink;
    cards: HomeCard[];
  };
  difference: {
    title: string;
    cards: Array<HomeCard & { tone: "light" | "dark" }>;
    statEyebrow: string;
    statValue: string;
    statLabel: string;
  };
  growth: {
    eyebrow: string;
    title: string;
    text: string;
    image: HomeMedia;
    overlay: string;
    stages: string[];
    cards: Array<HomeCard & { items: string[] }>;
    cta: HomeLink;
  };
  partners: {
    title: string;
    logos: Array<{ image: HomeMedia | null; name: string; caption: string }>;
  };
  decisions: {
    badge: string;
    quote: string;
    name: string;
    role: string;
    portrait: HomeMedia | null;
    eyebrow: string;
    title: string;
    text: string;
    cards: HomeCard[];
    cta: HomeLink;
  };
  leadership: {
    eyebrow: string;
    title: string;
    text: string;
    cta: HomeLink;
    people: HomePerson[];
  };
  pressure: {
    title: string;
    emphasis: string;
    text: string;
    cta: HomeLink;
  };
  footer: {
    logo: HomeMedia;
    text: string;
    email: string;
    columns: { title: string; links: HomeLink[] }[];
    legal: string;
  };
};

const logo: HomeMedia = { url: "/home/finance-logo.svg", alt: "Finance" };
const growth: HomeMedia = {
  url: "/home/growth.jpg",
  alt: "Three people reviewing financial reports at a table",
};

export const homeContent: HomeContent = {
  header: {
    logo,
    links: [
      {
        label: "Services",
        url: "/services/",
        children: [
          { label: "Foundation", url: "/services/#foundation" },
          { label: "Momentum", url: "/services/#momentum" },
          { label: "Foresight", url: "/services/#foresight" },
          { label: "Partner With Us", url: "#contact" },
          { label: "People Operations", url: "/people-operations/" }, // Updated Link
        ],
      },
      {
        label: "Clients",
        url: "/clients/", // Updated Link
        children: [
          { label: "Client stories", url: "/clients/" }, // Updated Link
          { label: "Technology partners", url: "/clients/#partners" }, // Updated Link
        ],
      },
      {
        label: "About Us",
        url: "/#about",
        children: [
          { label: "Why FIAB", url: "/why-fiab/" },
          { label: "Team", url: "/#team" },
          { label: "Careers", url: "/careers/" }, // Updated Link
          { label: "Knowledge Hub", url: "/knowledge-hub/" }, // New Link
        ],
      },
      { label: "Agentic AI", url: "/agentic-ai/", children: [] }, // Updated Link
    ],
    cta: { label: "Contact Us", url: "/contact/" }, // Updated Link
  },
  hero: {
    eyebrow: "Embedded finance for founder-led companies",
    title: "Your Finance Function,",
    highlight: "Built and Run For You",
    text: "Finance in a Box works as your embedded finance team. One engagement covers CFO strategy, accounting, payroll, compliance, and the systems that connect them, with coverage that grows as you do.",
    primary: { label: "Book a Discovery Call", url: "#contact" },
    closeLabel: "Month-end close",
    closeValue: "6",
    closeUnit: "days",
    closeTrend: "42% cycle time",
    runwayLabel: "Runway",
    runwayValue: "24.6",
    runwayUnit: "months",
    runwayTrend: "+3.2 this quarter",
    chartTitle: "Cash visibility",
    chartRange: "12 month view",
    call: { label: "Book a Call", url: "#contact" },
  },
  trust: {
    lead: "Trusted by",
    stat: "40+",
    detail: "growing companies in the USA and globally",
  },
  logos: [
    { image: { url: "/home/american-logo.svg", alt: "American Robotics" }, name: "American Robotics" },
    { image: { url: "/home/ondas-logo.svg", alt: "Ondas" }, name: "Ondas" },
    { image: logo, name: "Finance" },
    { image: { url: "/home/american-logo.svg", alt: "American Robotics" }, name: "American Robotics mark" },
    { image: { url: "/home/ondas-logo.svg", alt: "Ondas" }, name: "Ondas mark" },
    { image: logo, name: "Finance mark" },
  ],
  founders: {
    eyebrow: "When finance matters",
    title: "Founders Call Us At",
    highlight: "Moments Like These",
    text: "FIAB steps in when finance becomes too complex, or too important, to manage on the side.",
    cta: { label: "Explore All", url: "#about" },
    cards: [
      {
        icon: null,
        title: "A fundraise is coming.",
        text: "Your data room needs clean books and defensible numbers before investors start asking for them.",
      },
      {
        icon: null,
        title: "The board wants reporting you don't have.",
        text: "The pack has to be ready before the meeting, in language the board can read.",
      },
      {
        icon: null,
        title: "Month-end close keeps slipping.",
        text: "The books stay open when the close still depends on the founder.",
      },
      {
        icon: null,
        title: "You need finance leadership, but a $200K hire doesn't add up.",
        text: "A senior finance lead for the close and the board, without a full-time hire.",
      },
    ],
  },
  difference: {
    title: "What Makes FIAB Different",
    cards: [
      {
        icon: null,
        tone: "light",
        title: "One finance team, every function",
        text: "Strategy and execution come from the same team. Your forecast, close, payroll, and compliance stay connected rather than split across vendors.",
      },
      {
        icon: null,
        tone: "dark",
        title: "Built for growing companies",
        text: "From funded startups to mid-size businesses, we work in the tools and reporting rhythms your stage demands, and we have sat through the fundraises, board meetings, and audits you are heading into.",
      },
      {
        icon: null,
        tone: "dark",
        title: "Scales with the company",
        text: "Coverage adjusts with your stage on a subscription model. Building the same capability in-house means a VP of Finance plus a controller plus support, which typically costs three times more.",
      },
      {
        icon: null,
        tone: "dark",
        title: "Cost intelligence as a practice",
        text: "Every month we look for where you are losing money, from vendor spend to process waste, and bring it to you before you ask. (reduced monthly burn by 40% within 90 days)",
      },
      {
        icon: null,
        tone: "dark",
        title: "Automation and AI-powered FinOps Platform",
        text: "Workflow automation already runs through our engagements, speeding up reporting, close, and routine operations. FinOps, our AI product for finance operations, is in development, and FIAB clients will be the first to get access when it launches. Senior operators stay behind every decision either way.",
      },
    ],
    statEyebrow: "Client outcome",
    statValue: "42%",
    statLabel: "faster month-end close",
  },
  growth: {
    eyebrow: "One partner. Every stage.",
    title: "Finance that grows with the company.",
    text: "Start where the pressure is highest and add coverage as the business evolves. Clients move between tiers without changing partners.",
    image: growth,
    overlay: "Clarity is Built Together.",
    stages: ["Align", "Build", "Evolve"],
    cards: [
      {
        icon: null,
        title: "Set up and standardize.",
        text: "Build an accurate, compliant finance core for the company you are becoming.",
        items: ["Accounting operations", "Compliance & tax", "Payroll & people operations", "ERP / HRIS setup & migration"],
      },
      {
        icon: null,
        title: "Scale and automate.",
        text: "Remove manual friction and create a reliable operating cadence.",
        items: ["Financial reporting automation", "Revenue operations", "Process automation", "Risk & governance"],
      },
      {
        icon: null,
        title: "Plan and lead.",
        text: "Turn financial data into forward-looking decisions and senior finance leadership.",
        items: ["FP&A & forecasting", "Fractional CFO", "BI dashboards & KPIs", "Strategy & operating model"],
      },
    ],
    cta: { label: "Explore Services", url: "#product" },
  },
  partners: {
    title: "Our Technology Partners",
    logos: [
      { image: null, name: "keka", caption: "Human Resources Management Systems" },
      { image: null, name: "Quonto", caption: "Software Development" },
      { image: null, name: "Power BI", caption: "Executive analytics" },
      { image: null, name: "Suite", caption: "Integrated SMB suite" },
      { image: null, name: "Oracle NetSuite", caption: "Enterprise Resource Planning Software" },
      { image: null, name: "Recruity", caption: "Software Development" },
      { image: null, name: "Salesforce", caption: "AI Customer Relationship" },
    ],
  },
  decisions: {
    badge: "Client perspective",
    quote: "They offer more customized services than the bigger firms, which is great when you're in the early stage and figuring things out.",
    name: "Curran Hughes",
    role: "Founder & CEO, Renegade Plastics",
    portrait: null,
    eyebrow: "What clients say",
    title: "Built for Better Business Decisions.",
    text: "FIAB steps in at the moments when finance becomes too complex or too important to manage casually.",
    cards: [
      {
        icon: null,
        title: "6 days",
        text: "Month-end close through standardized workflows and clear ownership",
      },
      {
        icon: null,
        title: "Real time",
        text: "Cash and KPI visibility across one connected operating model.",
      },
    ],
    cta: { label: "View Client Stories", url: "#insights" },
  },
  leadership: {
    eyebrow: "Experience meets action",
    title: "Finance Leadership Without the Overhead.",
    text: "Finance in a Box was founded by Amit Mulchandani to give growing businesses direct access to senior finance operators, practical systems expertise and decision-ready insight.\n\nOur teams combine hands-on execution with the judgment to know what matters next.",
    cta: { label: "Book a call", url: "#contact" },
    people: [
      { image: null, name: "Amit Mulchandani", role: "Founder & CEO, Finance in a Box" },
      { image: null, name: "Berena Reynoso", role: "Head of Operations" },
    ],
  },
  pressure: {
    title: "Tell Us Where The Pressure Is",
    emphasis: "The Pressure Is",
    text: "A 30-minute discovery call is enough to map where your finance function is leaking time or cash, and what to fix first.",
    cta: { label: "Join the Talent Network", url: "#contact" },
  },
  footer: {
    logo,
    text: "Embedded finance operations for companies built to scale.",
    email: "info@financeinabox.com",
    columns: [
      {
        title: "Company",
        links: [
          { label: "Why FIAB", url: "/why-fiab/" },
          { label: "Team", url: "/#about" },
          { label: "Careers", url: "/careers/" }, // Updated Link
          { label: "Contact", url: "/contact/" }, // Updated Link
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Foundation", url: "/services/#foundation" },
          { label: "Momentum", url: "/services/#momentum" },
          { label: "Foresight", url: "/services/#foresight" },
          { label: "Partner With Us", url: "#contact" },
          { label: "People Operations", url: "/people-operations/" }, // Updated Link
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Clients", url: "/clients/" }, // Updated Link
          { label: "Agentic AI", url: "/agentic-ai/" }, // Updated Link
          { label: "Knowledge Hub", url: "/knowledge-hub/" }, // Updated Link
          { label: "For VCs & Advisors", url: "#contact" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Privacy Policy", url: "/privacy-policy" },
          { label: "Terms & Conditions", url: "/privacy-policy" },
        ],
      },
      {
        title: "Follow us",
        links: [{ label: "LinkedIn", url: "https://www.linkedin.com/" }],
      },
    ],
    legal: "© 2026 Finance in a Box. All rights reserved.",
  },
};