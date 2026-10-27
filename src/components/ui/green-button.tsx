import Link from "next/link";

type GreenButtonProps = {
  label: string;
  href: string;
  className?: string;
};

export function GreenButton({ label, href, className = "" }: GreenButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-[12px] rounded-[50px] bg-[#23C55E] px-[30px] py-[10px] text-[16px] font-semibold text-[#07110d] transition-colors hover:bg-[#1da34b] min-h-[62px] min-w-[297px] ${className}`}
    >
      {label}
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#07110d]">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          <path
            d="M4 8h8M9 4.5 12.5 8 9 11.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}