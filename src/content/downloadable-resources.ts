export type DownloadableResource = {
  id: string;
  badge: "XLSX" | "DOCX" | "PPTX";
  title: string;
  description: string;
  downloadUrl: string;
  fileName: string;
};

export type DownloadableResourcesContent = {
  bannerTitle: string;
  backgroundImage?: string;
  sectionTitle: string;
  resources: DownloadableResource[];
};

export const downloadableResourcesContent: DownloadableResourcesContent = {
  bannerTitle: "Downloadable Resources",
  backgroundImage: "/knowledge-hub/knowledge-hub-hero-bg.webp",
  sectionTitle: "Downloadable Resources",
  resources: [
    {
      id: "month-end-close-checklist",
      badge: "XLSX",
      title: "Month‑End Close Checklist",
      description: "Roles, inputs, dependencies, and sign‑offs.",
      downloadUrl: "/downloads/month-end-close-checklist.xlsx",
      fileName: "month-end-close-checklist.xlsx",
    },
    {
      id: "ar-collections-playbook",
      badge: "DOCX",
      title: "AR Collections Playbook",
      description:
        "Email/call cadences, dispute codes, and escalation tree.",
      downloadUrl: "/downloads/ar-collections-playbook.docx",
      fileName: "ar-collections-playbook.docx",
    },
    {
      id: "ap-vendor-onboarding-pack",
      badge: "DOCX",
      title: "AP Vendor Onboarding Pack",
      description:
        "W‑9/W‑8, banking, compliance, and master data fields.",
      downloadUrl: "/downloads/ap-vendor-onboarding-pack.docx",
      fileName: "ap-vendor-onboarding-pack.docx",
    },
    {
      id: "kpi-dictionary",
      badge: "XLSX",
      title: "KPI Dictionary",
      description:
        "Finance + RevOps KPIs with definitions and owners.",
      downloadUrl: "/downloads/kpi-dictionary.xlsx",
      fileName: "kpi-dictionary.xlsx",
    },
    {
      id: "board-pack-template",
      badge: "PPTX",
      title: "Board Pack Template",
      description:
        "Metrics, variance reads, and decisions required.",
      downloadUrl: "/downloads/board-pack-template.pptx",
      fileName: "board-pack-template.pptx",
    },
    {
      id: "rpo-interview-scorecard",
      badge: "XLSX",
      title: "RPO Interview Scorecard",
      description:
        "Role‑specific rubrics for structured hiring.",
      downloadUrl: "/downloads/rpo-interview-scorecard.xlsx",
      fileName: "rpo-interview-scorecard.xlsx",
    },
  ],
};
