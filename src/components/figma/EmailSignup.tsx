"use client";

import { useState } from "react";
import MagneticWrapper from "../ui/MagneticWrapper";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In production, this would send to your email service
    }
  };

  return (
    <section
      id="signup"
      className="scroll-mt-[100px] border-t border-[var(--void-extra-light)] bg-[var(--void-lite)]"
    >
      <div
        id="order"
        className="mx-auto px-5 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20"
        style={{ maxWidth: "min(100%, 1440px)" }}
      >
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:items-center">
          {/* Left side - Copy */}
          <div>
            <h2
              className="font-archivo font-black italic leading-[1.1] text-[var(--light)]"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.625rem)",
                textShadow: "2px 2px 0.5px rgba(0,0,0,1)",
              }}
            >
              JOIN THE{" "}
              <span className="text-[var(--red)]">FOUNDING RUNNERS</span>
            </h2>
            <p
              className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80"
              style={{ fontSize: "clamp(0.8rem, 1.5vw, 1rem)" }}
            >
              Be first to know when we drop new formulas, exclusive offers, and
              training insights. Plus, get{" "}
              <span className="font-bold text-[var(--callouts)]">
                early access pricing
              </span>{" "}
              on your first order—delivered right to your inbox.
            </p>
          </div>

          {/* Right side - Form */}
          <div>
            {submitted ? (
              <div className="flex h-[120px] items-center justify-center rounded-sm border border-[var(--callouts)] bg-[var(--void-extra-light)] p-6">
                <p className="text-center font-mono text-[13px] text-[var(--callouts)]">
                  ✓ You're on the list. Watch your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-60"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="runner@example.com"
                    required
                    className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[14px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)]"
                  />
                </div>
                <MagneticWrapper>
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] font-mono text-[14px] font-black uppercase tracking-widest text-[var(--dark)] transition-all duration-200 hover:scale-105 hover:border-[var(--light)] hover:bg-[var(--light)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] md:h-14 md:text-[16px]"
                  >
                    Sign Up Now →
                  </button>
                </MagneticWrapper>
                <p className="font-sans text-[11px] text-[var(--light)] opacity-50">
                  No spam. Unsubscribe anytime. We respect your inbox.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

