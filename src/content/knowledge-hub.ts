export type KnowledgeHubLink = { label: string; url: string };

export type KnowledgeHubBlog = {
  image: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  author: { name: string; avatar: string };
  url: string;
};

export type KnowledgeHubResources = {
  title: string;
  highlight: string;
  text: string;
  cta: KnowledgeHubLink;
};

export type KnowledgeHubCaseStudy = {
  title: string;
  titleHighlight: string;
  text: string;
  cta: KnowledgeHubLink;
  items: {
    image: string;
    title: string;
    text: string;
  }[];
};

// Naya: Newsletter Section Type
export type KnowledgeHubNewsletter = {
  title: string;
  highlight: string;
  text: string;
  cta: KnowledgeHubLink;
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    rolePlaceholder: string;
    messagePlaceholder: string;
    submitLabel: string;
  };
};

export type KnowledgeHubContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
    cta: KnowledgeHubLink;
  };
  blogs: {
    title: string;
    items: KnowledgeHubBlog[];
    cta: KnowledgeHubLink;
  };
  resources: {
    title: string;
    highlight: string;
    text: string;
    cta: KnowledgeHubLink;
  };
  caseStudy: {
    title: string;
    items: {
      image: string;
      title: string;
      text: string;
    }[];
    cta: KnowledgeHubLink;
  };
  // Naya Section
  newsletter: {
    title: string;
    highlight: string;
    text: string;
    cta: KnowledgeHubLink;
  };
};

export const knowledgeHubContent: KnowledgeHubContent = {
  hero: {
    eyebrow: "— KNOWLEDGE HUB",
    title: "Finance, people ops & ",
    highlight: "RevOps playbooks",
    text: "Automation isn't just speed, it's better decisions, fewer errors, and time back for growth. Explore expert guides, templates, and case studies to help you automate, scale, and stay compliant.",
    cta: { label: "Subscribe for Updates", url: "/#subscribe" },
  },
  blogs: {
    title: "Our Blogs",
    cta: { label: "Explore Blogs", url: "/blogs" },
    items: [
      {
        image: "/knowledge-hub/blog1.png",
        category: "Consulting",
        date: "09 Oct, 2023",
        readTime: "3 min read",
        title: "The Most Effective Strategies For Right-Sizing Your R&D Team",
        author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
        url: "/blogs/1",
      },
      {
        image: "/knowledge-hub/blog2.png",
        category: "Consulting",
        date: "09 Oct, 2023",
        readTime: "3 min read",
        title: "Is Your Financial Model Worthless?",
        author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
        url: "/blogs/2",
      },
      {
        image: "/knowledge-hub/blog3.png",
        category: "Consulting",
        date: "09 Oct, 2023",
        readTime: "3 min read",
        title: "Compensation Evolution: Reflecting On The Past To Navigate The Future",
        author: { name: "By Guruprasad", avatar: "/knowledge-hub/guruprasad.png" },
        url: "/blogs/3",
      },
    ],
  },
  resources: {
    title: "Resources to ",
    highlight: "Help You Grow",
    text: "Access useful guides, tools, and insights to help you navigate finance, operations, and growth with confidence.",
    cta: { label: "Download Templates", url: "/resources" },
  },
  caseStudy: {
    title: "Case Study",
    cta: { label: "Explore Case Studies", url: "/case-studies" },
    items: [
      {
        image: "/knowledge-hub/case-study1.png",
        title: "FLYR Labs – Global finance rebuilt, fast",
        text: "The initial engagement was to provide Fractional CFO services, focusing on investor...",
      },
      {
        image: "/knowledge-hub/case-study2.png",
        title: "DeepScribe – Hiring engine to match growth",
        text: "DeepScribe is a healthcare technology company specializing in AI-powered medical transcription services.",
      },
      {
        image: "/knowledge-hub/case-study3.png",
        title: "Offshoring Enablement – Lower cost, wider talent pool",
        text: "We've enabled offshore capability in India for multiple North American clients...",
      },
    ],
  },
  // Naya Data
  newsletter: {
    title: "Want automation",
    highlight: "insights in your inbox?",
    text: "Monthly summaries of new guides, templates, and case studies. No spam.",
    cta: { label: "Join our Talent Network", url: "/careers" },
  },
};