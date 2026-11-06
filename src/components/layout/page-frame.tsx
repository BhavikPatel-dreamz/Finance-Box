import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import type { SiteChrome } from "@/lib/wordpress/site-chrome";

/**
 * Shared page shell: neutral surface, page content, shared footer.
 * The header is rendered once globally at root layout.
 */
export function PageFrame({ chrome, children }: { chrome: SiteChrome; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#07090f] text-white">
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter footer={chrome.footer} />
    </div>
  );
}

/** Simple page body: header offset band, then a title and optional message. */
export function MessagePage({ chrome, title, body }: { chrome: SiteChrome; title: string; body?: string }) {
  return (
    <PageFrame chrome={chrome}>
      <div className="h-[81px] sm:h-[97px] lg:h-[112px] bg-[#121826]" aria-hidden="true" />
      <Section theme="light" spacing="both">
        <Container>
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-[54px]">{title}</h1>
          {body ? <p className="mt-4 max-w-2xl text-[16px] font-light leading-[160%] text-[#16181d]/70">{body}</p> : null}
        </Container>
      </Section>
    </PageFrame>
  );
}
