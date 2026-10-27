import Link from "next/link";
import Image from "next/image";

type GreenButtonProps = {
  label: string;
  href: string;
  className?: string;
  bgColor?: string;       // Background Color (Hex)
  textColor?: string;     // Text Color (Hex)
  hoverColor?: string;    // Hover Color (Hex)
  size?: {                // Custom Size Object
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
  
  // Default size classes
  const defaultSizeClasses = "px-[30px] py-[10px] text-[16px] min-h-[62px] min-w-[297px]";
  
  // Custom styles jab user size pass kare
  const customStyles = size
    ? {
        width: size.width || "auto",
        height: size.height || "auto",
        paddingLeft: size.paddingX || "30px",
        paddingRight: size.paddingX || "30px",
        paddingTop: size.paddingY || "10px",
        paddingBottom: size.paddingY || "10px",
        fontSize: size.fontSize || "16px",
        backgroundColor: bgColor,
        color: textColor,
      }
    : { backgroundColor: bgColor, color: textColor };

  // Text color ke basis par arrow image select karo
  const isDarkText = textColor === "#07110d" || textColor === "#000000" || textColor === "black";
  const arrowIcon = isDarkText ? "/icons/arrow-black.png" : "/icons/aroow-white.png";

  return (
    <Link
      href={href}
      style={customStyles}
      className={`inline-flex items-center justify-center rounded-[50px] font-semibold transition-colors hover:opacity-90 gap-2 ${!size ? defaultSizeClasses : ""} ${className}`}
    >
      <span className="whitespace-nowrap">{label}</span>
      
      {/* Arrow Container: No border, exact text size */}
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