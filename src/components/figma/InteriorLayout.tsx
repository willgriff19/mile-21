"use client";

import { Header } from "./Header";
import { Footer } from "./Footer";

type InteriorLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export function InteriorLayout({ children, title, subtitle }: InteriorLayoutProps) {
  return (
    <>
      <Header />
      <main className="relative z-10 text-[var(--light)]">
        {/* Hero banner */}
        <div
          className="border-b border-[var(--void-extra-light)] bg-[var(--void-lite)]"
          style={{ paddingTop: "clamp(6rem, 14vw, 10rem)" }}
        >
          <div
            className="mx-auto px-5 pb-10 sm:px-8 sm:pb-12 md:px-12 md:pb-16 lg:px-16"
            style={{ maxWidth: "min(100%, 1440px)" }}
          >
            <h1
              className="font-archivo font-black italic leading-[1.1] text-[var(--light)]"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                textShadow: "2px 2px 0.5px rgba(0,0,0,1)",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-70"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Page content */}
        <div
          className="mx-auto px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20"
          style={{ maxWidth: "min(100%, 920px)" }}
        >
          <div className="prose-invert prose prose-sm max-w-none md:prose-base">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

