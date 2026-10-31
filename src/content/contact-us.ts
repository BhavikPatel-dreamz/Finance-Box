export type ContactUsContent = {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    text: string;
  };
  formSection: {
    title: string;
    subtitle: string;
    image: string;
    contactTitle: string;
    contactSubtitle: string;
    email: { label: string; value: string; icon: string };
    form: {
      fields: { name: string; placeholder: string; type: string }[];
      notesPlaceholder: string;
      submitLabel: string;
    };
  };
  socialSection: {
    title: string;
    highlight: string;
    subtitle: string;
    linkedin: {
      title: string;
      text: string;
      buttonLabel: string;
      buttonUrl: string;
      image: string;
    };
    newsletter: {
      title: string;
      text: string;
      placeholder: string;
      buttonLabel: string;
    };
  };
};

export const contactUsContent: ContactUsContent = {
  hero: {
    eyebrow: "GET IN TOUCH",
    title: "Let's start",
    highlight: "a conversation",
    text: "Ready to transform your financial operations? Reach out and we'll get back to you within 24 hours.",
  },
  formSection: {
    title: "Let's Talk About Your Business",
    subtitle: "Give us a little context about your business so we can better understand how to help.",
    image: "/contact-us/contact-information.png",
    contactTitle: "Contact Information",
    contactSubtitle: "We'd love to hear from you. Here's how you can reach us.",
    email: {
      label: "Email",
      value: "info@financeinbox.com",
      icon: "/icons/email.png",
    },
    form: {
      fields: [
        { name: "name", placeholder: "Your name", type: "text" },
        { name: "email", placeholder: "Write your email", type: "email" },
        { name: "company", placeholder: "Your company", type: "text" },
        { name: "website", placeholder: "", type: "text" },
      ],
      notesPlaceholder: "Write your notes...",
      submitLabel: "Send Message",
    },
  },
  socialSection: {
    title: "Stay Connected",
    highlight: "with FIAB",
    subtitle: "It works nicely above both LinkedIn and Newsletter without making either one feel like the main focus.",
    linkedin: {
      title: "Join Us on LinkedIn",
      text: "Follow us for expert tips and updates designed to help your business scale.",
      buttonLabel: "LinkedIn",
      buttonUrl: "https://linkedin.com",
      image: "/contact-us/gift.svg",
    },
    newsletter: {
      title: "Join our Newsletter",
      text: "Get practical insights on finance operations, automation, compliance, and scaling smarter, straight from our experts. No fluff, just actionable value.",
      placeholder: "Write your email",
      buttonLabel: "Subscribe",
    },
  },
};