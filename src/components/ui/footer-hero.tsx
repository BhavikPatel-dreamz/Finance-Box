import Image from "next/image";
import { GreenButton } from "./green-button";
import Container from "./container";

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
    <section className="bg-white px-6 py-20">
      <Container>
        {/* Container exactly 1280x342 */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#121826] flex flex-col items-center justify-center text-center px-6 py-13 h-[342px] w-full max-w-[1280px] mx-auto">

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

          <div className="relative z-10 flex flex-col items-center max-w-4xl">
            <h2 className="text-[36px] md:text-[50px] leading-[1.1] font-medium tracking-[-0.8px] text-white">
              {title}{" "}
              <span className="block font-extrabold italic">{highlight}</span>
            </h2>

            <p className="mx-auto mt-6 text-[16px] font-normal leading-[160%] text-white/70">
              {text}
            </p>

            <div className="mt-10 flex justify-center">
              <GreenButton label={buttonLabel} href={buttonUrl} />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}