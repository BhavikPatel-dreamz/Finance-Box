import { defineSection } from "@/lib/page-builder/types";
import type { TeamMemberHelpFormSectionFragment } from "@/lib/wordpress/generated/graphql";
import { TeamContact } from "@/components/team/team-sections";
import { CmsFormLoader } from "@/components/forms/cms-form-loader";
import { media, multilineText, text } from "@/lib/wordpress/fields";
import { teamPageContent } from "@/content/team";
import type { FormField } from "@/lib/forms/types";

export const CONSULTATION_FALLBACK_FIELDS: FormField[] = [
  { name: "your-name", type: "text", label: "Your name", required: true, options: [], multiple: false },
  { name: "last-name", type: "text", label: "Last name", required: true, options: [], multiple: false },
  { name: "your-email", type: "email", label: "Email address", required: true, options: [], multiple: false },
  { name: "your-phone", type: "tel", label: "Phone Number", required: true, options: [], multiple: false },
  {
    name: "your-option",
    type: "select",
    label: "Please Choose Option",
    required: true,
    options: [
      "Tax Advisory",
      "Financial Advise",
      "Corporate Guidance",
      "Pension Advisory",
    ],
    multiple: false,
  },
  { name: "your-message", type: "textarea", label: "Write your notes...", required: false, options: [], multiple: false },
];

export const teamMemberHelpFormSection = defineSection<TeamMemberHelpFormSectionFragment>({
  layout: "TeamMemberHelpFormSection",
  render: (data) => {
    const rawFormId = typeof data.formId === "string" ? data.formId.trim() : "";
    const formId = rawFormId === "ca45309" || !rawFormId || rawFormId === "1284" ? "2148" : rawFormId;
    const title = text(data.title, teamPageContent.contact.title);
    const subtitle = multilineText(data.description) || teamPageContent.contact.subtitle;
    const img = media(data.image)?.url;

    return (
      <TeamContact
        contact={{
          title,
          subtitle,
          image: img || "/here-to-help-img.jpg",
          formId,
        }}
        form={
          <CmsFormLoader
            formId={formId}
            fallback={CONSULTATION_FALLBACK_FIELDS}
            appearance="contact"
          />
        }
      />
    );
  },
});
