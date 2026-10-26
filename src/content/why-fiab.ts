export type WhyLink = { label: string; url: string };

export type WhyPoint = { number: string; title: string };

export type WhyColumn = {
  label: string;
  featured: boolean;
  logo: { url: string; alt: string } | null;
};

export type WhyRow = { label: string; values: boolean[] };

export type WhyContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    cta: WhyLink;
    points: WhyPoint[];
  };
  compare: {
    title: string;
    highlight: string;
    text: string;
    featureLabel: string;
    columns: WhyColumn[];
    rows: WhyRow[];
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
};
