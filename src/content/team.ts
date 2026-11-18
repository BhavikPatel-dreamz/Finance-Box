export type TeamLeader = {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  slug?: string;
};

export type TeamExpert = {
  name: string;
  role: string;
  image: string;
  slug?: string;
  scale?: number;
};

export type TeamPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    paragraphs: string[];
    backgroundImage?: string;
  };
  leaders: {
    title: string;
    highlight: string;
    subtitle: string;
    people: TeamLeader[];
  };
  experts: {
    title: string;
    highlight: string;
    subtitle: string;
    description: string;
    people: TeamExpert[];
  };
  banner: {
    title: string;
    description: string;
    image: string;
  };
  contact: {
    title: string;
    subtitle: string;
    image: string;
    formId: string;
  };
};

export const teamPageContent: TeamPageContent = {
  hero: {
    eyebrow: "TEAM MEMBER",
    title: "Experts Behind Your",
    highlight: "Back-Office\nTransformation",
    paragraphs: [
      "We pair senior operators with automation-first thinking.",
      "The result? Reliable finance and operations, faster closes, and decisions you can trust.",
    ],
  },
  leaders: {
    title: "Meet our",
    highlight: "Leaders",
    subtitle: "Steering vision with values.",
    people: [
      {
        name: "Amit Mulchandani",
        role: "FOUNDER & CEO",
        image: "/home/amit-mulchandani.png",
        linkedin: "https://www.linkedin.com/in/amit-mulchandani-0685529/",
        twitter: "https://x.com/",
        slug: "amit-mulchandani",
      },
      {
        name: "Berena Reynoso",
        role: "HEAD OF OPERATIONS",
        image: "/home/Berena-Reynoso.png",
        linkedin: "https://www.linkedin.com/in/berena-reynoso-b4bb2461/",
        twitter: "https://x.com/",
        slug: "berena-reynoso",
      },
    ],
  },
  experts: {
    title: "Meet our",
    highlight: "Experts",
    subtitle: "Where experience meets action.",
    description:
      "Our expert team brings deep domain knowledge across finance, operations, technology, and people strategy. From controllers and FP&A analysts to RPA engineers, ERP specialists, and HR partners. We solve, We simplify, We scale!",
    people: [
      {
        name: "Jitheesh",
        role: "Head of OTC RevOps",
        image: "/team/jitheesh.png",
        slug: "jitheesh",
      },
      {
        name: "Siddharth Nagrath",
        role: "Training Manager -\nL&D Operations",
        image: "/team/siddharth-nagrath.png",
        slug: "siddharth-nagrath",
      },
      {
        name: "Galina Puzankova",
        role: "Vice President, Delivery",
        image: "/team/galina-puzankova.png",
        slug: "galina-puzankova",
      },
      {
        name: "Aswathy Vijayakumar",
        role: "Director FP&A",
        image: "/team/aswathy-vijayakumar.png",
        slug: "aswathy-vijayakumar",
      },
      {
        name: "Neeti Chauhan",
        role: "Finance Controller",
        image: "/team/neeti-chauhan.png",
        slug: "neeti-chauhan",
      },
    ],
  },
  banner: {
    title: "Built for Growing Businesses,\nBacked by Experts",
    description:
      "From early stage startups to established companies, we support businesses through fundraising, scaling, restructuring, and beyond. Wherever you are in your journey, we bring the right blend of expertise, systems, and heart.",
    image: "/backed-by-experts.png",
  },
  contact: {
    title: "We're here to help",
    subtitle:
      "Have a question or a project in mind? Tell us what you're building and we'll share a right-sized plan. Get Free Consultation.",
    image: "/here-to-help-img.jpg",
    formId: "1284",
  },
};
