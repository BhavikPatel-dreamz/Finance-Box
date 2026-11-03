import Link from "next/link";

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-[14px] font-medium text-[#121826] hover:text-[#23C55E] transition-colors duration-300"
    >
      <span aria-hidden="true">←</span> {children}
    </Link>
  );
}
