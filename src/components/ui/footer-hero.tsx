import Image from "next/image";
import { GreenButton } from "./green-button";
import Container from "./container";
import Section from "./section";

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
    <Section theme="light" spacing="both" className="footer-cta-section">
      <Container>
        {/* Container exactly 1280x342 on desktop, flexible height on mobile */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-10 sm:py-12 lg:py-13 min-h-[320px] lg:h-[342px] w-full max-w-[1280px] mx-auto">

          {bgImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={bgImage}
                alt="Background"
                fill
                className="object-cover opacity-100" // object-cover se image container ke andar crop hogi, stretch nahi
                priority
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-[26px] sm:text-[36px] md:text-[50px] leading-[1.15] font-medium tracking-[-0.8px] text-white">
              {title}{" "}
              <span className="font-extrabold italic">{highlight}</span>
            </h2>

            <p className="mx-auto mt-4 sm:mt-6 text-[14px] sm:text-[16px] font-normal leading-[160%] text-white/70">
              {text}
            </p>

            <div className="mt-6 sm:mt-8 lg:mt-10 flex justify-center">
              <GreenButton
                label={buttonLabel}
                href={buttonUrl}
                onDark={true}
                className="hover:!bg-white hover:!text-[#121826]"
              />
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}