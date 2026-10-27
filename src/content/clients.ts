export type ClientStat = {
  value: string;
  label: string;
};

export type ClientCaseStudy = {
  id: string;
  label: string;
  title: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  ctaUrl: string;
};

export type ClientLogosItem = {
  name: string;
  image: string;
};

// Naya: Review Section Type
export type ClientReview = {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
};

export type ClientsContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    clientProofTitle: string;
    clientProofItems: string[];
    stats: ClientStat[];
  };
  caseStudies: {
    title: string;
    items: ClientCaseStudy[];
  };
  logosSection: {
    title1: string;
    highlight1: string;
    title2: string;
    logos: ClientLogosItem[];
  };
  // Naya: Reviews Section
  reviewsSection: {
    title: string;
    mainReview: {
      quote: string;
      author: string;
      role: string;
      image: string;
    };
    reviews: ClientReview[];
  };
};

export const clientsContent: ClientsContent = {
  hero: {
    eyebrow: "CLIENTS",
    title: "The Work,",
    highlight: "Measured",
    text: "Companies bring FIAB a finance function under strain. Here is what changed for some of them.",
    clientProofTitle: "CLIENT PROOF",
    clientProofItems: ["300+ successful projects", "95% client retention", "20+ industries served"],
    stats: [
      { value: "300+", label: "Successful projects" },
      { value: "95%", label: "Client retention" },
      { value: "20+", label: "Industries served" },
    ],
  },
  caseStudies: {
    title: "Featured Case Studies",
    items: [
      {
        id: "1", label: "CASE STUDY 1: FLYR LABS", title: "Global finance, rebuilt fast",
        challenge: "From Amit's team: what state was FLYR's finance function in, and what was at stake.",
        solution: "What FIAB actually did: which tiers, which systems, what team.",
        outcome: "One headline metric plus two supporting results. Real numbers only.",
        image: "/clients/case-study-1.png", ctaUrl: "/clients/case-study-1",
      },
      {
        id: "2", label: "CASE STUDY 2: DEEPSCRIBE", title: "A hiring engine to match growth",
        challenge: "From Amit's team: what state was FLYR's finance function in, and what was at stake.",
        solution: "What FIAB actually did: which tiers, which systems, what team.",
        outcome: "One headline metric plus two supporting results. Real numbers only.",
        image: "/clients/case-study-2.png", ctaUrl: "/clients/case-study-2",
      },
      {
        id: "3", label: "CASE STUDY 3: OFFSHORING ENABLEMENT", title: "Lower cost, wider talent pool",
        challenge: "From Amit's team: what state was FLYR's finance function in, and what was at stake.",
        solution: "What FIAB actually did: which tiers, which systems, what team.",
        outcome: "One headline metric plus two supporting results. Real numbers only.",
        image: "/clients/case-study-3.png", ctaUrl: "/clients/case-study-3",
      },
    ],
  },
  logosSection: {
    title1: "Trusted by",
    highlight1: "40+ Growing",
    title2: "Companies in the USA and Globally",
    logos: [
      { name: "Pawlicy Advisor", image: "/clients/logos/pawlicy-advisor.png" },
      { name: "CareMessage", image: "/clients/logos/care-message.png" },
      { name: "Dusty Robotics", image: "/clients/logos/dusty-robotics.png" },
      { name: "Standard Bots", image: "/clients/logos/standard-bots.png" },
      { name: "American Robotics", image: "/clients/logos/american-robotics.png" },
      { name: "Chatfuel", image: "/clients/logos/chatfuel.png" },
      { name: "Plexxikon", image: "/clients/logos/plexxikon.png" },
      { name: "FLYR", image: "/clients/logos/flyr.png" },
      { name: "Embolx", image: "/clients/logos/embolx.png" },
      { name: "Airlinq", image: "/clients/logos/Airlinq.png" },
      { name: "Fastly", image: "/clients/logos/fastly.png" },
      { name: "Neumera Consulting", image: "/clients/logos/neumera.png" },
      { name: "Lifelink Systems", image: "/clients/logos/lifelink.png" },
      { name: "Aionics", image: "/clients/logos/Aionics.png" },
      { name: "Vetcelerator", image: "/clients/logos/vetceleratar.png" },
      { name: "Ondas", image: "/clients/logos/ondas.png" },
      { name: "Nova Access", image: "/clients/logos/nova-access.png" },
      { name: "Kimia", image: "/clients/logos/kimia.png" },
      { name: "Cargomatic", image: "/clients/logos/cargomatic.png" },
      { name: "Loopio", image: "/clients/logos/loopio.png" },
      { name: "Yobi", image: "/clients/logos/yobi.png" },
    ],
  },
  // Naya Data
  reviewsSection: {
    title: "In Their Words",
    mainReview: {
      quote: "“They offer more customized services than the bigger firms, which is great when you're in the early stage and figuring things out.”",
      author: "Curran Hughes",
      role: "Founder & CEO, Renegade Plastics",
      image: "/clients/ceo.png",
    },
    reviews: [
      {
        id: "1",
        text: "Venture-savvy CFO partner. Reports built around metrics that matter.",
        author: "Co-Founder & CEO, Tribute",
        role: "",
        avatar: "/clients/review1.png",
      },
      {
        id: "2",
        text: "Flexible structure, seamless daily communication, real cost savings.",
        author: "CEO, Pawlicy Advisor Inc",
        role: "",
        avatar: "/clients/review2.png",
      },
      {
        id: "3",
        text: "Personalized guidance and integrity. An outstanding partnership.",
        author: "Head of Finance & BizOps, Mutiny",
        role: "",
        avatar: "/clients/review3.png",
      },
      {
        id: "4",
        text: "Delivers at startup speed while doing it right.",
        author: "Founder & CEO, FLYR Labs",
        role: "",
        avatar: "/clients/review4.png",
      },
    ],
  },
};