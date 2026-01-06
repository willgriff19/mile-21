"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import MagneticWrapper from "../ui/MagneticWrapper";
import { usePostHog } from 'posthog-js/react'

type SignupStatus = "idle" | "loading" | "success" | "error";

export function EmailSignup({ 
  ctaOverride, 
  isModal = false,
  onModalClose,
  onSuccess,
}: { 
  ctaOverride?: string;
  isModal?: boolean;
  onModalClose?: () => void;
  onSuccess?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confettiSeed, setConfettiSeed] = useState<number | null>(null);
  const [confettiOrigin, setConfettiOrigin] = useState<{ x: number; y: number } | null>(null);
  const posthog = usePostHog()
  const inputRef = useRef<HTMLInputElement>(null)
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const successCardRef = useRef<HTMLDivElement | null>(null);

  const showConfetti = status === "success" && confettiSeed !== null;
  const [canPortal, setCanPortal] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Autofocus input when in modal
  useEffect(() => {
    if (isModal && status !== "success") {
      // Small timeout to ensure modal animation has started
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isModal, status])

  useEffect(() => {
    setCanPortal(typeof document !== "undefined");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(!!mql.matches);
    update();
    mql.addEventListener?.("change", update);
    return () => mql.removeEventListener?.("change", update);
  }, []);

  // Trigger a confetti burst once per successful submit.
  useEffect(() => {
    if (status === "success") {
      setConfettiSeed(Date.now());
      onSuccess?.();
    }
  }, [status, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Capture the visual "origin" of the action so confetti feels attached to the submit moment.
    if (typeof window !== "undefined") {
      const rect = submitBtnRef.current?.getBoundingClientRect();
      if (rect) {
        setConfettiOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        setConfettiOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      }
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      // 1. Identify and capture in PostHog
      posthog.identify(email, {
        email: email,
        signup_date: new Date().toISOString(),
        source: ctaOverride || "footer_signup",
      });
      // Track the attempt (success is tracked only on a true 200 OK response)
      posthog.capture("email_signup_submitted", {
        cta: ctaOverride || "Founding Runner",
        is_modal: isModal,
      });

      const distinctId = posthog.get_distinct_id();

      // 2. Start the Notion submission in the background
      // We don't await this directly to make the UI feel faster
      const submissionPromise = fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          distinctId,
          cta: ctaOverride || "Founding Runner",
        }),
      }).then(async (response) => {
        if (response.ok) {
          posthog.capture("waitlist_submitted", {
            cta: ctaOverride || "Founding Runner",
            is_modal: isModal,
          });
          posthog.capture("email_signup_success");
        } else {
          console.error("Background submission failed");
          posthog.capture("email_signup_failed", {
            cta: ctaOverride || "Founding Runner",
            is_modal: isModal,
            status: response.status,
          });
        }
      }).catch((err) => {
        console.error("Background submission error:", err);
        posthog.capture("email_signup_failed", {
          cta: ctaOverride || "Founding Runner",
          is_modal: isModal,
          status: "network_error",
        });
      });

      // 3. Wait for 750ms before showing success
      // This gives the user a sense of "work" being done without being slow
      await new Promise((resolve) => setTimeout(resolve, 750));

      setStatus("success");
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  const ConfettiCanvasBurst = ({ seed }: { seed: number }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
      if (prefersReducedMotion) {
        setDone(true);
        return;
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const resize = () => {
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      const colors = ["#22d3ee", "#ff3b30", "#fafafa"];
      const now = performance.now();
      const durationMs = 2200;

      type Particle = {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        vr: number;
        w: number;
        h: number;
        color: string;
        kind: "rect" | "ribbon" | "dot";
        born: number;
        life: number;
        sway: number;
      };

      const rand = (min: number, max: number) => min + Math.random() * (max - min);

      const particles: Particle[] = [];
      const emit = (originX: number, originY: number, bias: number) => {
        const count = 70;
        for (let i = 0; i < count; i++) {
          const angle = rand(-Math.PI * 0.85, -Math.PI * 0.15) + bias;
          const speed = rand(520, 980);
          const vx = Math.cos(angle) * speed * 0.001;
          const vy = Math.sin(angle) * speed * 0.001;
          const size = rand(7, 15);
          const kind: Particle["kind"] = i % 8 === 0 ? "dot" : i % 3 === 0 ? "ribbon" : "rect";
          particles.push({
            x: originX + rand(-12, 12),
            y: originY + rand(-8, 8),
            vx,
            vy,
            r: rand(-Math.PI, Math.PI),
            vr: rand(-10, 10) * 0.001,
            w: kind === "dot" ? size : size * rand(1.0, 1.6),
            h: kind === "dot" ? size : size * rand(0.45, 0.75),
            color: colors[Math.floor(rand(0, colors.length))],
            kind,
            born: now,
            life: rand(1500, durationMs),
            sway: rand(0.6, 1.4),
          });
        }
      };

      // Emit from where the user actually submitted (button center), or fall back to the success card center.
      const fallback = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const origin = confettiOrigin ?? fallback;
      emit(origin.x, origin.y, rand(-0.08, 0.08));

      const gravity = 1.25; // px/ms^2-ish (scaled in update)
      const drag = 0.992;

      const drawParticle = (p: Particle, alpha: number) => {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.color;

        if (p.kind === "dot") {
          ctx.beginPath();
          ctx.arc(0, 0, p.w * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "ribbon") {
          // a slightly curved ribbon-ish quad
          const w = p.w;
          const h = p.h;
          ctx.beginPath();
          ctx.moveTo(-w / 2, -h / 2);
          ctx.quadraticCurveTo(0, -h, w / 2, -h / 2);
          ctx.lineTo(w / 2, h / 2);
          ctx.quadraticCurveTo(0, h, -w / 2, h / 2);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        ctx.restore();
      };

      let last = now;
      const tick = (t: number) => {
        const dt = Math.min(32, t - last);
        last = t;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (const p of particles) {
          const age = t - p.born;
          const life = p.life;
          if (age > life) continue;

          // More alive: subtle sway + gravity + drag
          p.vy += gravity * dt * 0.001;
          p.vx += Math.sin((t + seed) * 0.008 + p.sway) * 0.0012 * dt;
          p.vx *= drag;
          p.vy *= drag;
          p.x += p.vx * dt * 1.6;
          p.y += p.vy * dt * 1.6;
          p.r += p.vr * dt * 6;

          const fadeIn = Math.min(1, age / 90);
          const fadeOut = Math.min(1, (life - age) / 350);
          const alpha = 0.95 * fadeIn * fadeOut;

          drawParticle(p, alpha);
        }

        if (t - now < durationMs) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
      const timeout = window.setTimeout(() => setDone(true), durationMs + 200);

      return () => {
        window.removeEventListener("resize", resize);
        window.clearTimeout(timeout);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seed, prefersReducedMotion, confettiOrigin]);

    if (done) return null;

    const overlay = (
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden="true"
      />
    );

    if (canPortal) return createPortal(overlay, document.body);
    return overlay;
  };

  if (isModal) {
    return (
      <div className="relative w-full">
        {status === "success" ? (
          <div
            ref={successCardRef}
            className="relative overflow-hidden rounded-sm border border-[var(--callouts)] bg-[var(--void-extra-light)] p-6"
          >
            {showConfetti && <ConfettiCanvasBurst seed={confettiSeed!} />}

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--callouts)] bg-black/20 font-mono text-[13px] font-black text-[var(--callouts)]">
                ✓
              </div>
              <div className="min-w-0">
                <p className="font-archivo text-[22px] font-black italic text-[var(--light)]">
                  YOU&apos;RE IN.
                </p>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-[var(--light)] opacity-80">
                  We&apos;ll email you when Mile 21 is ready to purchase—plus you&apos;ll keep your{" "}
                  <span className="font-bold text-[var(--callouts)]">20% off</span>.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="/#formula"
                onClick={() => onModalClose?.()}
                className="flex h-14 items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] px-5 font-mono text-[12px] font-black uppercase tracking-widest text-[var(--dark)] transition hover:scale-[1.02] hover:border-[var(--light)] hover:bg-[var(--light)]"
              >
                Back to The Stack →
              </a>
              <a
                href="/#research"
                onClick={() => onModalClose?.()}
                className="flex h-14 items-center justify-center border-2 border-[var(--void-extra-light)] bg-black/30 px-5 font-mono text-[12px] font-black uppercase tracking-widest text-[var(--light)] transition hover:scale-[1.02] hover:border-[var(--callouts)] hover:text-[var(--callouts)]"
              >
                Read The Science →
              </a>
            </div>

            <button
              type="button"
              onClick={() => onModalClose?.()}
              className="mt-3 w-full rounded-sm border border-[var(--void-extra-light)] bg-black/20 py-3 text-center font-mono text-[11px] font-black uppercase tracking-widest text-[var(--light)] opacity-90 transition hover:border-[var(--callouts)] hover:text-[var(--callouts)]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div
                role="alert"
                className="rounded-sm border border-[var(--red)] bg-black/20 px-4 py-3 font-sans text-[13px] text-[var(--light)]"
              >
                {errorMessage}
              </div>
            )}
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Enter your email"
              required
              className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[16px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)] sm:text-[14px]"
            />
            <button
              ref={submitBtnRef}
              type="submit"
              disabled={status === "loading"}
              className="flex h-12 w-full items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] font-mono text-[14px] font-black uppercase tracking-widest text-[var(--dark)] transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--light)] hover:border-[var(--light)] disabled:opacity-50"
            >
              {status === "loading" ? "JOINING..." : "SECURE MY DISCOUNT →"}
            </button>
          </form>
        )}
      </div>
    );
  }

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
            {status === "success" ? (
              <div
                ref={successCardRef}
                className="relative overflow-hidden rounded-sm border border-[var(--callouts)] bg-[var(--void-extra-light)] p-6"
              >
                {showConfetti && <ConfettiCanvasBurst seed={confettiSeed!} />}
                <p className="font-archivo text-[18px] font-black italic text-[var(--light)]">
                  YOU&apos;RE ON THE LIST.
                </p>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-[var(--light)] opacity-80">
                  Watch your inbox—we&apos;ll email you when Mile 21 is ready to purchase.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="/#formula"
                    className="inline-flex h-10 items-center justify-center border border-[var(--void-extra-light)] bg-black/20 px-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--light)] transition hover:border-[var(--callouts)] hover:text-[var(--callouts)]"
                  >
                    The Stack →
                  </a>
                  <a
                    href="/#research"
                    className="inline-flex h-10 items-center justify-center border border-[var(--void-extra-light)] bg-black/20 px-4 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--light)] transition hover:border-[var(--callouts)] hover:text-[var(--callouts)]"
                  >
                    The Science →
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-sm border border-[var(--red)] bg-black/20 px-4 py-3 font-sans text-[13px] text-[var(--light)]"
                  >
                    {errorMessage}
                  </div>
                )}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="runner@example.com"
                    required
                    className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[16px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)] sm:text-[14px]"
                  />
                </div>
                <MagneticWrapper>
                  <button
                    ref={submitBtnRef}
                    type="submit"
                    disabled={status === "loading"}
                    className="flex h-12 w-full items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] font-mono text-[14px] font-black uppercase tracking-widest text-[var(--dark)] transition-all duration-200 hover:scale-105 hover:border-[var(--light)] hover:bg-[var(--light)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed md:h-14 md:text-[16px]"
                  >
                    {status === "loading" ? "Signing Up..." : "Sign Up Now →"}
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

