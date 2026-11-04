import Link from "next/link";
import type { SiteFooterContent } from "@/lib/wordpress/site-chrome";
import { Container } from "@/components/ui/container";

/** Shared site footer. Rendered once per page by the page template. */
export function SiteFooter({ footer }: { footer: SiteFooterContent }) {
  return (
    <footer className="footer-section relative bg-[linear-gradient(180deg,#121826_38.14%,#141D32_93.71%)] text-white border-t border-white/[0.08]">
      <Container>
        <div className="grid gap-10 sm:gap-12 lg:gap-10 xl:gap-16 2xl:gap-20 py-12 sm:py-14 lg:py-16 xl:py-20 lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr] 2xl:grid-cols-[310px_1fr] items-start">
          {/* Brand Info Column */}
          <div className="flex flex-col items-start max-w-sm lg:max-w-none">
            <img
              src={footer.logo.url}
              alt={footer.logo.alt}
              className="max-w-[182px] w-full object-contain"
            />
            <p className="mt-4 sm:mt-5 lg:mt-6 max-w-[17rem] text-[13px] sm:text-[14px] xl:text-[15px] font-light leading-[155%] text-white/75">
              {footer.text}
            </p>
            <a
              href={`mailto:${footer.email}`}
              className="mt-6 sm:mt-8 lg:mt-7 xl:mt-8 inline-flex items-center gap-2.5 sm:gap-3 text-[14px] sm:text-[15px] xl:text-base font-medium text-white hover:text-[#23C55E] transition-colors duration-300 group"
            >
              <svg
                width="14"
                height="11"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition duration-300"
              >
                <path
                  d="M1.5 12C1.0875 12 0.7345 11.8533 0.441 11.5597C0.1475 11.2662 0.0005 10.913 0 10.5V1.5C0 1.0875 0.147 0.7345 0.441 0.441C0.735 0.1475 1.088 0.0005 1.5 0H13.5C13.9125 0 14.2657 0.147 14.5597 0.441C14.8538 0.735 15.0005 1.088 15 1.5V10.5C15 10.9125 14.8533 11.2657 14.5597 11.5597C14.2662 11.8538 13.913 12.0005 13.5 12H1.5ZM7.69725 6.591C7.76575 6.572 7.83125 6.54375 7.89375 6.50625L13.2 3.1875C13.3 3.125 13.375 3.047 13.425 2.9535C13.475 2.86 13.5 2.75675 13.5 2.64375C13.5 2.39375 13.3938 2.20625 13.1813 2.08125C12.9688 1.95625 12.75 1.9625 12.525 2.1L7.5 5.25L2.475 2.1C2.25 1.9625 2.03125 1.9595 1.81875 2.091C1.60625 2.2225 1.5 2.40675 1.5 2.64375C1.5 2.76875 1.525 2.87825 1.575 2.97225C1.625 3.06625 1.7 3.138 1.8 3.1875L7.10625 6.50625C7.16875 6.54375 7.2345 6.572 7.3035 6.591C7.3725 6.61 7.438 6.61925 7.5 6.61875C7.562 6.61825 7.62775 6.609 7.69725 6.591Z"
                  fill="white"
                  className="group-hover:fill-[#23C55E] transition duration-300"
                />
              </svg>
              <span className="truncate">{footer.email}</span>
            </a>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-between lg:items-start gap-x-6 sm:gap-x-8 lg:gap-x-4 xl:gap-x-8 gap-y-8 sm:gap-y-10 w-full">
            {footer.columns.map((column) => {
              const isSocialColumn =
                column.title.toLowerCase().includes("follow") ||
                column.title.toLowerCase().includes("social");

              return (
                <div key={column.title} className="min-w-0 shrink-0">
                  <h2 className="text-xs sm:text-sm font-medium tracking-[1.4px] xl:tracking-[1.6px] text-white/70 uppercase">
                    {column.title}
                  </h2>
                  <ul className="mt-4 sm:mt-5 lg:mt-4 xl:mt-6 space-y-3 sm:space-y-3.5 xl:space-y-4 text-[13px] sm:text-[14px] font-normal text-white">
                    {column.links.map((item) => {
                      const isSocial =
                        isSocialColumn ||
                        /linkedin|twitter|x\.com|facebook|instagram|youtube/i.test(
                          item.label
                        ) ||
                        /linkedin|twitter|x\.com|facebook|instagram|youtube/i.test(
                          item.url
                        );

                      return (
                        <li key={item.label} className="min-w-0">
                          <Link
                            href={item.url}
                            className={`group relative inline-flex items-center gap-2 leading-snug whitespace-nowrap hover:text-[#23C55E] transition-colors duration-200 ${
                              isSocial ? "" : "pb-1"
                            }`}
                          >
                            {item.label.toLowerCase() === "linkedin" ? (
                              <LinkedInMark />
                            ) : null}
                            <span>{item.label}</span>
                            {!isSocial && (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#23C55E] transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-5 sm:py-6">
        <Container>
          <p className="text-center text-xs sm:text-[13px] font-light text-white/60">
            {footer.legal}
          </p>
        </Container>
      </div>
    </footer>
  );
}

function LinkedInMark() {
  return (
    <span className="inline-flex h-7 w-7 xl:h-7.5 xl:w-7.5 items-center justify-center rounded-full bg-white/10 group-hover:bg-[#23C55E] transition duration-300 shrink-0">
      <svg
        width="13"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.68268 0C0.752805 0 0.000150441 0.755307 0 1.68467C0 2.61494 0.752654 3.3701 1.68283 3.3701C2.61044 3.3701 3.36415 2.61494 3.36415 1.68467C3.36415 0.755156 2.61029 0 1.68268 0ZM0.231378 4.64848H3.13293V14H0.231378V4.64848ZM10.5196 4.41595C9.10812 4.41595 8.1617 5.19115 7.77432 5.92626H7.7355V4.64848H4.9525V13.9998H7.85149V9.37367C7.85149 8.15406 8.08332 6.97272 9.59284 6.97272C11.0807 6.97272 11.1006 8.3676 11.1006 9.45188V13.9997H14V8.87048C14 6.35274 13.4577 4.41595 10.5196 4.41595Z"
          fill="white"
          className="group-hover:fill-[#121826] transition-colors duration-300"
        />
      </svg>
    </span>
  );
}
