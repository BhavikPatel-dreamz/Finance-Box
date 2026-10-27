import Image from "next/image";
import { GreenButton } from "./green-button";

type FooterHeroProps = {
  title: string;
  highlight: string;
  text: string;
  buttonLabel: string;
  buttonUrl: string;
  bgImage?: string;
};

export function FooterHero({
  title,
  highlight,
  text,
  buttonLabel,
  buttonUrl,
  bgImage = "/media/Footer-bg.png",
}: FooterHeroProps) {
  return (
    <section className="bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-6xl">
        {/* Container with exact height/width constraints */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col items-center justify-center text-center px-6 py-16 md:py-24 min-h-[342px] w-full max-w-[1279px] mx-auto">
          
          {bgImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={bgImage}
                alt="Background"
                fill
                className="object-cover opacity-100"
                priority
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center max-w-3xl">
            <h2 className="text-[36px] md:text-[50px] leading-[1.1] font-medium tracking-[-0.8px] text-white">
              {title}{" "}
              <span className="block font-extrabold italic">{highlight}</span>
            </h2>
            
            <p className="mx-auto mt-6 max-w-2xl text-[16px] font-normal leading-[160%] text-white/80">
              {text}
            </p>
            
            <div className="mt-10 flex justify-center">
              <GreenButton label={buttonLabel} href={buttonUrl} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}