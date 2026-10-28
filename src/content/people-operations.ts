export type PeopleOperationsContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
  };
  // Naya Section
  intro: {
    image: string;
    title: string;
    highlight: string;
    text: string;
  };
};

export const peopleOperationsContent: PeopleOperationsContent = {
  hero: {
    eyebrow: "— PEOPLE OPERATIONS",
    title: "Build a people function that keeps ",
    highlight: "pace with your business.",
    text: "As companies grow, people operations quickly become more complex — from hiring and onboarding to payroll, policies, compliance, performance management and employee engagement.",
  },
  // Naya Data
  intro: {
    image: "/people-operations/FIAB-people.png",
    title: "FIAB's People Operations team provides the structure, systems and operational support businesses ",
    highlight: "need to build and manage an effective people function.",
    text: "Whether you are building your HR function from the ground up or looking to streamline an existing one, we provide the people operations support to help your organization scale.",
  },
};