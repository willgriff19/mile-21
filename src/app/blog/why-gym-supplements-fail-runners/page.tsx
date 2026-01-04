import { InteriorLayout } from "../../../components/figma/InteriorLayout";

export const metadata = {
  title: "Why 99% of Pre-Workouts are Terrible for Runners (The Manifesto)",
  description:
    "Learn why gym pre-workouts fail endurance runners. Discover the difference between phosphagen and oxidative energy systems, and why your pre-workout needs to match your sport.",
  keywords: [
    "pre workout for runners",
    "endurance pre workout",
    "why pre workout bad for running",
    "phosphagen vs oxidative",
    "marathon pre workout",
  ],
  openGraph: {
    title: "Why 99% of Pre-Workouts are Terrible for Runners",
    description:
      "The bioenergetics of running vs. lifting—and why your pre-workout is probably working against you.",
  },
};

export default function WhyGymSupplementsFailRunners() {
  return (
    <InteriorLayout
      title="WHY 99% OF PRE-WORKOUTS ARE TERRIBLE FOR RUNNERS"
      subtitle="The Manifesto: Understanding bioenergetics and why your supplement might be sabotaging your runs."
    >
      <article className="prose prose-invert max-w-none">
        {/* Coming Soon Banner */}
        <div className="not-prose mb-10 border-l-4 border-[var(--callouts)] bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo font-bold text-[var(--callouts)]">
            COMING SOON
          </p>
          <p className="mt-2 font-sans text-[var(--light)] opacity-80">
            This article is currently being written. Sign up for our newsletter
            to be notified when it's published.
          </p>
        </div>

        {/* Article Outline */}
        <div className="space-y-8">
          <section>
            <h2 className="font-archivo text-[1.5rem] font-bold text-[var(--light)]">
              Article Outline
            </h2>
            <p className="mt-4 font-sans text-[var(--light)] opacity-70">
              This deep-dive will cover the science of why traditional
              pre-workouts are designed for the wrong energy system.
            </p>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              1. The Three Energy Systems
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>
                <strong>Phosphagen (ATP-CP):</strong> Explosive power for 0-10
                seconds (powerlifting, sprints)
              </li>
              <li>
                <strong>Glycolytic:</strong> High-intensity for 30 seconds to 2
                minutes (HIIT, CrossFit)
              </li>
              <li>
                <strong>Oxidative Phosphorylation:</strong> Sustained endurance
                for 2+ minutes (running, cycling)
              </li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              2. Why Gym Pre-Workouts Target the Wrong System
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Beta-Alanine: Designed for lactic acid buffering in short bursts</li>
              <li>Creatine: Optimized for ATP regeneration in explosive movements</li>
              <li>High caffeine (300mg+): Creates jitters and heart rate spikes</li>
              <li>Pump ingredients: Water retention that adds dead weight</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              3. What Endurance Athletes Actually Need
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Nitric oxide for oxygen delivery (L-Citrulline, Beet Root)</li>
              <li>Moderate caffeine with L-Theanine for sustained focus</li>
              <li>Electrolyte balance for cramp prevention</li>
              <li>Gut-friendly ingredients to prevent GI distress</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              4. The Mile 21 Approach
            </h3>
            <p className="mt-3 font-sans text-[var(--light)] opacity-70">
              How we engineered a pre-workout specifically for oxidative
              phosphorylation—the energy system that powers every mile after the
              first few minutes.
            </p>
          </section>
        </div>

        {/* Newsletter CTA */}
        <div className="not-prose mt-12 bg-[var(--void-extra-light)] p-8 text-center">
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--light)]">
            BE THE FIRST TO READ THIS
          </h2>
          <p className="mt-3 font-sans text-[var(--light)] opacity-70">
            Join our newsletter and get this article delivered straight to your
            inbox when it's published.
          </p>
          <a
            href="/#signup"
            className="mt-6 inline-flex h-12 items-center justify-center border-2 border-[var(--callouts)] bg-[var(--light)] px-8 font-mono text-[12px] font-bold uppercase tracking-wider text-[var(--dark)] transition-all duration-200 hover:border-[var(--light)] hover:bg-[var(--callouts)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Subscribe →
          </a>
        </div>
      </article>
    </InteriorLayout>
  );
}

