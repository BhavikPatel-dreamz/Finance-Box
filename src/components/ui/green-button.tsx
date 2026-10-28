import Link from "next/link";
import Image from "next/image";

type GreenButtonProps = {
  label: string;
  href: string;
  className?: string;
  bgColor?: string;       // Background Color (Hex)
  textColor?: string;     // Text Color (Hex)
  hoverColor?: string;    // Hover Color (Hex)
  size?: {                // Custom Size Object (Applies on lg+ screens)
    width?: string;
    height?: string;
    paddingX?: string;
    paddingY?: string;
    fontSize?: string;
  };
};

export function GreenButton({
  label,
  href,
  className = "",
  bgColor = "#23C55E",       // Default Green
  textColor = "#07110d",     // Default Dark Text
  hoverColor = "#1da34b",    // Default Hover
  size,                      // Agar size nahi diya toh default classes lagegi
}: GreenButtonProps) {
  
  // Default size classes (Mobile -> Tablet -> Desktop)
  const defaultSizeClasses = "px-5 py-2.5 text-sm min-h-[48px] md:px-6 md:py-3 md:text-[15px] md:min-h-[52px] lg:px-[30px] lg:py-[10px] lg:text-[16px] lg:min-h-[62px] lg:min-w-[297px]";
  
  // Custom styles (Colors are inline, size uses CSS Variables)
  const customStyles = size
    ? {
        "--btn-width-lg": size.width || "auto",
        "--btn-height-lg": size.height || "auto",
        "--btn-px-lg": size.paddingX || "30px",
        "--btn-py-lg": size.paddingY || "10px",
        "--btn-fs-lg": size.fontSize || "16px",
        backgroundColor: bgColor,
        color: textColor,
      } as React.CSSProperties
    : { backgroundColor: bgColor, color: textColor };

  // Text color ke basis par arrow image select karo
  const isDarkText = textColor === "#07110d" || textColor === "#000000" || textColor === "black";
  const arrowIcon = isDarkText ? "/icons/arrow-black.png" : "/icons/aroow-white.png";

  // Custom size classes (Responsive: Mobile -> Tablet -> Desktop)
  const customSizeClasses = size
    ? `px-4 py-2 text-sm md:px-5 md:py-2.5 md:text-[15px] lg:w-[var(--btn-width-lg)] lg:h-[var(--btn-height-lg)] lg:px-[var(--btn-px-lg)] lg:py-[var(--btn-py-lg)] lg:text-[var(--btn-fs-lg)]`
    : "";

  return (
    <Link
      href={href}
      style={customStyles}
      className={`inline-flex items-center justify-center rounded-[50px] font-semibold transition-colors hover:opacity-90 gap-2 ${!size ? defaultSizeClasses : customSizeClasses} ${className}`}
    >
      <span className="whitespace-nowrap">{label}</span>
      
      {/* Arrow Container */}
      <span className="flex shrink-0 items-center justify-center h-[1em] w-[1em]">
        <Image
          src={arrowIcon}
          alt="Arrow"
          width={16}
          height={16}
          className="object-contain w-full h-full"
        />
      </span>
    </Link>
  );
}