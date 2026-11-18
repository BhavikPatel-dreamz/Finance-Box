export type TeamMemberProfile = {
  slug: string;
  aliases?: string[];
  name: string;
  role: string;
  image: string;
  quote: string;
  bio: string;
  extraNotes?: string;
  focusTitle?: string;
  focusText?: string;
  work?: string;
  partnerships?: string;
  tools?: string;
  industries?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
};

export const TEAM_MEMBERS_DATA: TeamMemberProfile[] = [
  {
    slug: "jitheesh",
    name: "Jitheesh",
    role: "Head of OTC RevOps",
    image: "/team/jitheesh.png",
    quote: "Runs a tight, insight-rich Order-to-Cash engine and revenue operations.",
    bio: "Jitheesh runs quote-to-cash end-to-end—contract management, usage, billing, collections, cash application, and revenue hygiene. He codifies SOPs, builds scalable RevOps frameworks and dashboards, and partners with Sales & Success so policy, pricing, and process stay aligned. With strong AI enablement, he automates billing, collections, and forecasting to cut disputes, reduce DSO, and stabilize close cadence while improving forecast accuracy.",
    focusTitle: "Focus & expertise",
    focusText: "Contract management; order-to-cash excellence; revenue operations strategy & governance; AI-enabled billing, collections & forecasting",
    tools: "NetSuite, SAP, Microsoft Dynamics, billing/usage platforms, Tipalti, Airbase, Salesforce & CRM systems, BI dashboards.",
    industries: "SaaS & technology services (finance-led operations)",
  },
  {
    slug: "siddharth-nagrath",
    aliases: ["siddharth"],
    name: "Siddharth Nagrath",
    role: "Training Manager – L&D Operations",
    image: "/team/siddharth-nagrath.png",
    quote: "Improves clarity and cadence across distributed teams.",
    bio: "Siddharth helps FIAB teams communicate crisply with clients and each other. He creates playbooks for status updates, incident comms, and stakeholder expectations—raising signal-to-noise and shortening feedback loops.",
    focusTitle: "Focus & expertise",
    focusText: "Communication playbooks • Stakeholder management • Enablement & workshops • Remote collaboration",
    work: "Rolled out weekly update frameworks; improved client NPS through clearer comms and hand-offs.",
    tools: "Docs/Slides suites • PM tools • Loom/video",
    industries: "Cross-industry enablement",
  },
  {
    slug: "galina-puzankova",
    aliases: ["galina"],
    name: "Galina Puzankova",
    role: "Vice President, Delivery",
    image: "/team/galina-puzankova.png",
    quote: "Leads end-to-end delivery for finance operations with predictable SLAs and quality.",
    bio: "Galina's work centers on monthly/quarterly close, audit requests/representations, and GAAP-compliant financial statements. She owns reconciliations, schedules, and tie-outs, partners with auditors to deliver clean reviews, and documents processes to keep controls consistent across entities. (Note: she does not work on BI dashboards or collections.)",
    focusTitle: "Focus & expertise",
    focusText: "Month-/quarter-end close; GL reconciliations; audit representations & PBC lists; GAAP financial statements; variance analysis; SOP/policy documentation & control adherence.",
    tools: "ERP/GL systems, Microsoft Excel, Google Sheets.",
    industries: "Finance & accounting services.",
  },
  {
    slug: "aswathy-vijayakumar",
    aliases: ["aiyan-sakla"],
    name: "Aswathy Vijayakumar",
    role: "Director FP&A",
    image: "/team/aswathy-vijayakumar.png",
    quote: "Turns data into direction with driver-based planning.",
    bio: "Aswathy partners with founders and functional leaders to translate strategy into numbers. She builds budgets, rolling forecasts, and scenario models that clarify trade-offs and support faster decisions—backed by clean reporting cadence and KPI dictionaries.",
    focusTitle: "Focus & expertise",
    focusText: "Budgets & forecasts • Scenario modelling • Variance analysis • Exec reporting • KPI design",
    work: "Implemented driver-based planning; standardised board packs; improved forecast accuracy with telemetry",
    tools: "NetSuite (GL/Reports) • BI (Power BI/Tableau/Looker/Qlik) • Excel/Sheets",
    industries: "SaaS • Healthtech • Logistics tech",
  },
  {
    slug: "neeti-chauhan",
    aliases: ["neeti"],
    name: "Neeti Chauhan",
    role: "Finance Controller",
    image: "/team/neeti-chauhan.png",
    quote: "Technical accounting and controllership with strong compliance discipline.",
    bio: "Controllership leader with deep experience in multi-entity close, revenue recognition, audit readiness, and compliance. Partners with founders and department heads to standardize policies, strengthen controls, and deliver accurate, decision-ready reporting—while embedding automation to reduce cycle time and errors.",
    focusTitle: "Focus & expertise",
    focusText: "Financial reporting & controllership; month-end close; revenue recognition (ASC 606); audit readiness & internal controls; tax & statutory filings; policy/SOP design; cross-functional stakeholder management; process improvements and automation enablement.",
    tools: "NetSuite, QuickBooks, SaaS Optics, Airbase, Bill.com, Anrok, Power BI, Microsoft Office, Google Sheets.",
    industries: "SaaS & technology-enabled services.",
  },
  {
    slug: "amit-mulchandani",
    name: "Amit Mulchandani",
    role: "Founder & CEO",
    image: "/why/why-team-member-1.png",
    quote: "Founder & operator focused on automation-first finance and predictable scale.",
    bio: "Amit leads Finance in a Box with a builder's mindset, pairing senior finance leadership with AI-enabled systems and disciplined operations. He has scaled distributed teams, implemented modern ERP/AP stacks, and set up audit-ready processes that let companies grow without chaos.",
    focusTitle: "Focus & expertise",
    focusText: "Growth strategy • Finance transformation • Operating cadence",
    partnerships: "US–India execution",
    work: "Established automation-first close/playbooks; modernised ERP/AP stack patterns; guided multi-entity scale-ups.",
    tools: "NetSuite • Tipalti • Airbase • Rippling • Power BI/Tableau/Looker/Qlik",
    industries: "Logistics tech • Healthcare tech • Telecom • Real estate tech • Robotics • Insurance tech",
    linkedin: "https://www.linkedin.com/in/amit-mulchandani-0685529/",
    twitter: "https://x.com/",
  },
  {
    slug: "berena-reynoso",
    name: "Berena Reynoso",
    role: "Head of Operations",
    image: "/why/why-team-member-2.png",
    quote: "Builds win-win alliances that turn solutions into measurable outcomes.",
    bio: "Berena leads FIAB’s partner and customer alliances. She aligns success plans, SLAs, and enablement so engagements run smoothly, from scoping to value realisation. Her focus:predictable outcomes, clear communication, and long-term trust.",
    extraNotes: "Her focus: predictable outcomes, clear communication, and long-term trust.",
    focusTitle: "Focus & expertise",
    focusText: "Client success • Partner ecosystem • Delivery excellence • Executive alignment",
    work: "Co-created success scorecards; streamlined co-selling and implementation",
    tools: "NetSuite • Tipalti • Airbase • Rippling • CRM & project hubs",
    industries: "SaaS • Healthtech • Logistics tech • Telecom",
    linkedin: "https://www.linkedin.com/in/berena-reynoso-b4bb2461/",
    twitter: "https://x.com/",
  },
  {
    slug: "denise-uniacke",
    name: "Denise Uniacke",
    role: "Business Development & Client Success Manager",
    image: "/team/denise-uniacke.png",
    quote: "Builds revenue-driven partnerships that turn relationships into predictable growth.",
    bio: "Denise leads FIAB's client acquisition and account growth initiatives. She drives full-cycle revenue — from prospecting and deal closure to onboarding, retention, and expansion — ensuring long-term client value and sustained growth. Her focus: revenue predictability, strong client relationships, and scalable growth strategies.",
    focusTitle: "Focus & expertise",
    focusText: "Business development • Account management • Revenue growth • Client retention • Contract negotiation • Executive stakeholder engagement",
    work: "Managed $7.2M+ client portfolio; consistently exceeded targets by 15–35%; expanded accounts by 30%+; delivered 25–40% YoY growth across self-owned ventures; secured multi-year enterprise renewals",
    tools: "Salesforce • LinkedIn Sales Navigator • Microsoft 365 • Zoom • DocuSign • QuickBooks • Digital marketing tools",
    industries: "SaaS • Healthcare • Media & Advertising • SMB & Mid-market services",
  },
];

export function getTeamMemberProfile(slug: string): TeamMemberProfile | undefined {
  const normalized = slug.toLowerCase().trim();
  return TEAM_MEMBERS_DATA.find(
    (m) => m.slug === normalized || m.aliases?.some((a) => a.toLowerCase() === normalized),
  );
}

export function getAllTeamMemberSlugs(): string[] {
  const slugs: string[] = [];
  for (const m of TEAM_MEMBERS_DATA) {
    slugs.push(m.slug);
    if (m.aliases) {
      slugs.push(...m.aliases);
    }
  }
  return slugs;
}
