import Link from "next/link";

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--void-extra-light)] text-[var(--light)] opacity-60 transition-all hover:border-[var(--callouts)] hover:text-[var(--callouts)] hover:opacity-100"
  >
    {children}
  </a>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--void-extra-light)] bg-[var(--dark)]">
      <div
        className="mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-14 lg:px-16"
        style={{ maxWidth: "min(100%, 1440px)" }}
      >
        {/* Main footer content */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo + tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-archivo text-[22px] font-bold leading-none">
              <span className="text-[var(--light)]">MILE[</span>
              <span className="text-[var(--red)]">21</span>
              <span className="text-[var(--red)]">]</span>
            </Link>
            <p className="mt-3 font-sans text-[13px] leading-relaxed text-[var(--light)] opacity-60">
              The runner's pre-workout. Built for miles, not sets.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="X (Twitter)">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://tiktok.com" label="TikTok">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Links column 1 */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--light)]">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Links column 2 */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--light)]">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  About Mile 21
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Links column 3 */}
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--light)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="font-sans text-[13px] text-[var(--light)] opacity-60 transition-opacity hover:opacity-100"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-[var(--void-extra-light)]" />

        {/* Disclaimer */}
        <div className="space-y-3">
          <p className="font-sans text-[11px] leading-relaxed text-[var(--light)] opacity-40">
            *These statements have not been evaluated by the Food and Drug
            Administration. This product is not intended to diagnose, treat,
            cure, or prevent any disease.
          </p>
          <p className="font-sans text-[11px] leading-relaxed text-[var(--light)] opacity-40">
            * Individual results may vary. ** 30-Day Money Back Guarantee on all
            products.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-40">
            © {currentYear} Mile 21 Labs • All Rights Reserved
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-40">
            Made for runners, by runners.
          </p>
        </div>
      </div>
    </footer>
  );
}
