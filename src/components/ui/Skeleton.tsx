"use client";

import React from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-brand-line bg-brand-tarmac/60",
        className,
      ].join(" ")}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-60 [background:linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.06)_50%,transparent_75%)] [background-size:200%_100%] motion-safe:animate-[shimmer_1.5s_linear_infinite]" />
      <div className="invisible select-none">.</div>
    </div>
  );
}


