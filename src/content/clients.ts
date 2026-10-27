export type ClientLogo = {
  name: string;
  logo: { url: string; alt: string } | null;
};

export type ClientsContent = {
  hero: {
    title: string;
    highlight: string;
    text: string;
  };
  logos: {
    title: string;
    items: ClientLogo[];
  };
};

export const clientsContent: ClientsContent = {
  hero: {
    title: "Testing Clients Page",
    highlight: "Working Perfectly",
    text: "Yeh ek dummy text hai. Figma design aane ke baad isko update kar diya jayega.",
  },
  logos: {
    title: "Trusted by 40+ growing companies",
    items: [
      { name: "Standard Boots", logo: { url: "/home/american-logo.svg", alt: "Standard Boots" } },
      { name: "Ondas", logo: { url: "/home/ondas-logo.svg", alt: "Ondas" } },
      { name: "Neumera", logo: { url: "/home/growth.jpg", alt: "Neumera" } },
    ],
  },
};