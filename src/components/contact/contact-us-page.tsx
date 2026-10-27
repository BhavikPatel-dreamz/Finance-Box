import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-page";
import { homeContent } from "@/content/home";

export function ContactUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#16181d]">
      <div className="bg-[#07140f]">
        <HomeHeader header={homeContent.header} surface="plain" logoHref="/" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#3DDC84]/10 mb-8">
          <svg className="w-10 h-10 text-[#3DDC84]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact Us Page Under Development
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-500">
          We are currently crafting a brand new experience for this page. Please check back soon!
        </p>
      </main>
      <HomeFooter footer={homeContent.footer} />
    </div>
  );
}