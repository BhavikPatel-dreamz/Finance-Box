import { StatusMessage } from "@/components/layout/page-shell";

export default function NotFound() {
  return (
    <StatusMessage
      title="Page not found"
      body="That page is not published in WordPress."
    />
  );
}
