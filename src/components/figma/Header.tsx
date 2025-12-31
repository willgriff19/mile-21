"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--void-lite)]/95 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 md:h-16 md:px-8 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="font-archivo text-[24px] font-black leading-none md:text-[32px]"
        >
          <span className="text-[var(--light)]">MILE[</span>
          <span className="text-[var(--red)]">21</span>
          <span className="text-[var(--red)]">]</span>
        </Link>

        {/* Nav links - hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#formula"
            className="font-sans text-[13px] text-[var(--light)] opacity-70 transition-opacity hover:opacity-100"
          >
            Formula
          </Link>
          <Link
            href="/#research"
            className="font-sans text-[13px] text-[var(--light)] opacity-70 transition-opacity hover:opacity-100"
          >
            Research
          </Link>
          <Link
            href="/about"
            className="font-sans text-[13px] text-[var(--light)] opacity-70 transition-opacity hover:opacity-100"
          >
            About
          </Link>
          <Link
            href="/faq"
            className="font-sans text-[13px] text-[var(--light)] opacity-70 transition-opacity hover:opacity-100"
          >
            FAQ
          </Link>
        </nav>

        {/* CTA Button */}
        <a
          href="#order"
          className="flex h-9 items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] px-5 font-mono text-[12px] font-black uppercase tracking-widest text-[var(--dark)] transition-all duration-200 hover:scale-105 hover:border-[var(--light)] hover:bg-[var(--light)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] md:h-11 md:px-7 md:text-[14px]"
        >
          Order Now →
        </a>
      </div>
    </header>
  );
}
