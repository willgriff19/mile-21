"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [shy, setShy] = useState(false); // Shrink when over interactive elements

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse/trackpad).
    if (typeof window === "undefined") return;
    const fine = window.matchMedia?.("(pointer: fine)");
    if (fine && !fine.matches) return;
    setEnabled(true);

    let raf = 0;
    let lastX = window.innerWidth * 0.5;
    let lastY = window.innerHeight * 0.35;

    const isOverInteractive = (target: EventTarget | null): boolean => {
      if (!target || !(target instanceof HTMLElement)) return false;
      // Check if the element or any parent has data-glow-shy attribute
      // or is a button, link, or has role="button"
      const el = target.closest(
        '[data-glow-shy], button, a, [role="button"], [data-interactive]'
      );
      return el !== null;
    };

    const update = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      const overInteractive = isOverInteractive(e.target);

      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        setPos({ x: lastX, y: lastY });
        setActive(true);
        setShy(overInteractive);
      });
    };

    const onLeave = () => {
      setActive(false);
      setShy(false);
    };

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerdown", update, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerdown", update);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  if (!enabled) return null;

  // When shy, shrink the radius and reduce opacity
  const radius = shy ? 40 : 100;
  const opacity = active ? (shy ? 0.15 : 0.35) : 0;
  const blur = shy ? 2 : 4;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity,
        transition: "opacity 150ms ease, filter 150ms ease",
        background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(34, 211, 238, 0.12), transparent 80%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}
