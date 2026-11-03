import { sanitizeRichText } from "@/lib/wordpress/rich-text";

/**
 * WordPress body content (posts, case studies, team bios), sanitized with a
 * strict allowlist on the server and styled to match the legal pages'
 * reading column. Renders nothing when the body is empty.
 */
export function RichText({ html, className = "" }: { html: string | null | undefined; className?: string }) {
  const safe = sanitizeRichText(html);
  if (!safe) return null;

  return (
    <div
      className={`text-[15px] sm:text-[16px] leading-[1.75] text-[#374151] [&>*+*]:mt-4 [&_h2]:mt-10 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#121826] [&_h3]:mt-8 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#121826] [&_h4]:mt-6 [&_h4]:font-semibold [&_h4]:text-[#121826] [&_strong]:font-semibold [&_strong]:text-[#121826] [&_a]:text-[#23C55E] [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-1.5 [&_blockquote]:border-l-4 [&_blockquote]:border-[#23C55E] [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-[10px] [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-[#6b7280] [&_table]:w-full [&_table]:text-sm [&_th]:border [&_td]:border [&_th]:p-2 [&_td]:p-2 [&_pre]:overflow-x-auto [&_pre]:rounded-[8px] [&_pre]:bg-[#121826] [&_pre]:p-4 [&_pre]:text-white ${className}`.trim()}
      // Safe: sanitizeRichText() strips everything outside an allowlist (see src/lib/wordpress/rich-text.ts).
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
