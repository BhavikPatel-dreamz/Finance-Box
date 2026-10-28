export type PeopleOperationsContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
  };
  intro: {
    image: string;
    title: string;
    highlight: string;
    text: string;
  };
  whatWeDo: {
    title: string;
    items: {
      title: string;
      text: string;
      bullets: string[];
      image: string;
      bgImage: string;
      reverse: boolean;
    }[];
  };
  // Naya Section
  whereWeHelp: {
    title: string;
    highlight: string;
    cards: { title: string; text: string }[];
  };
};

export const peopleOperationsContent: PeopleOperationsContent = {
  hero: {
    eyebrow: "— PEOPLE OPERATIONS",
    title: "Build a people function that keeps ",
    highlight: "pace with your business.",
    text: "As companies grow, people operations quickly become more complex — from hiring and onboarding to payroll, policies, compliance, performance management and employee engagement.",
  },
  intro: {
    image: "/people-operations/FIAB-people.png",
    title: "FIAB's People Operations team provides the structure, systems and operational support businesses ",
    highlight: "need to build and manage an effective people function.",
    text: "Whether you are building your HR function from the ground up or looking to streamline an existing one, we provide the people operations support to help your organization scale.",
  },
  whatWeDo: {
    title: "What We Do",
    items: [
      {
        title: "Strategic Human Resources Partnering",
        text: "Build a people strategy and operating model aligned to your business priorities, growth stage and workforce needs.",
        bullets: [
          "HR strategy and people roadmap",
          "Organization design and workforce planning",
          "HR operating model and governance",
          "Leadership and workforce advisory",
          "Organization restructuring and change support",
          "People metrics and management dashboards",
        ],
        image: "/people-operations/what-we-do-1.png",
        bgImage: "/people-operations/right-side-image.png",
        reverse: false,
      },
      {
        title: "HR Shared Services & People Operations",
        text: "Create efficient, scalable HR operations that simplify the employee lifecycle and reduce administrative complexity.",
        bullets: [
          "Employee lifecycle management from onboarding to exit",
          "HR operations and employee service delivery",
          "Policies, SOPs and HR process frameworks",
          "Employee records and documentation management",
          "Leave, attendance and workforce administration",
          "HR process standardization and shared-services setup",
        ],
        image: "/people-operations/what-we-do-2.png",
        bgImage: "/people-operations/left-side-image.png",
        reverse: true,
      },
      {
        title: "Talent Acquisition & Workforce Solutions",
        text: "Build the talent engine required to hire critical skills, leadership talent and high-volume workforce at scale.",
        bullets: [
          "Workforce demand and hiring planning",
          "Executive, professional and volume hiring",
          "Talent sourcing and market mapping",
          "Screening and assessment frameworks",
          "Interview and selection management",
          "Recruitment process optimization and hiring analytics",
        ],
        image: "/people-operations/what-we-do-3.png",
        bgImage: "/people-operations/right-side-image.png",
        reverse: false,
      },
      {
        title: "Talent, Performance & Leadership Development",
        text: "Build high-performing teams by aligning goals, developing capability and strengthening leadership across the organization.",
        bullets: [
          "Performance management frameworks",
          "Goal, KPI and OKR alignment",
          "Talent reviews and succession planning",
          "Career paths and competency frameworks",
          "Leadership and manager development",
          "Capability and skill-gap assessment",
          "Learning and development frameworks",
          "Executive and performance coaching",
          "Employee engagement and retention programs",
          "Recognition and high-performance culture initiatives",
        ],
        image: "/people-operations/what-we-do-4.png",
        bgImage: "/people-operations/left-side-image.png",
        reverse: true,
      },
      {
        title: "Payroll, Compliance & Workforce Governance",
        text: "Build reliable payroll, benefits and compliance operations with strong controls, accurate employee data and clear workforce governance.",
        bullets: [
          "Payroll management, validation and reconciliation",
          "Compensation and benefits administration",
          "Payroll and benefits vendor management",
          "Employment policies, contracts and documentation",
          "Statutory compliance and workforce governance",
          "POSH policy, training and implementation",
          "HR compliance audits and risk reviews",
          "Compliance calendars, controls and reporting",
        ],
        image: "/people-operations/what-we-do-5.png",
        bgImage: "/people-operations/right-side-image.png",
        reverse: false,
      },
      {
        title: "HR Technology, Automation & People Analytics",
        text: "Digitize the HR function to reduce manual effort, improve employee experience and give leadership better workforce visibility.",
        bullets: [
          "HR technology strategy and HRIS implementation",
          "Employee lifecycle automation",
          "Digital onboarding and employee self-service",
          "HR workflows and approval automation",
          "People dashboards and workforce analytics",
          "HR systems integration and process optimization",
        ],
        image: "/people-operations/what-we-do-6.png",
        bgImage: "/people-operations/left-side-image.png",
        reverse: true,
      },
    ],
  },
  // Naya Data
  whereWeHelp: {
    title: "Where we ",
    highlight: "help",
    cards: [
      { title: "Build", text: "Building your HR function from the ground up" },
      { title: "Scale", text: "Scaling your people operations" },
      { title: "Optimize", text: "Improving an existing HR function" },
    ],
  },
};