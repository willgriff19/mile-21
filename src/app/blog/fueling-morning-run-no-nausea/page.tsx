import { InteriorLayout } from "../../../components/figma/InteriorLayout";

export const metadata = {
  title: "How to Fuel for a Morning Run Without Throwing Up",
  description:
    "Solve runner's stomach issues with science-backed strategies. Learn about hypo-osmotic principles, avoiding sugar alcohols, and gut-friendly pre-run nutrition.",
  keywords: [
    "supplement for runner stomach",
    "running nausea",
    "GI distress running",
    "pre run nutrition",
    "morning run fuel",
    "runner stomach problems",
    "hypo-osmotic supplements",
  ],
  openGraph: {
    title: "How to Fuel for a Morning Run Without Throwing Up",
    description:
      "Science-backed solutions for runner's stomach: GI distress, hypo-osmotic principles, and gut-friendly nutrition.",
  },
};

export default function FuelingMorningRunNoNausea() {
  return (
    <InteriorLayout
      title="HOW TO FUEL FOR A MORNING RUN WITHOUT THROWING UP"
      subtitle="GI distress solutions, hypo-osmotic principles, and why your stomach hates your current pre-workout."
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
              A practical guide to eliminating GI distress during runs—from the
              science of osmolality to the ingredients that wreck your stomach.
            </p>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              1. Why Runners Get Nauseous (The Physiology)
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Blood flow redirection away from the gut during exercise</li>
              <li>Mechanical stress from the impact of running</li>
              <li>The gut-brain axis and anxiety-induced GI issues</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              2. The Osmolality Problem
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>What is osmolality and why it matters for absorption</li>
              <li>Hypertonic vs. hypotonic vs. isotonic solutions</li>
              <li>Why most pre-workouts create hypertonic solutions that cause cramping</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              3. Ingredients That Destroy Your Stomach
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li><strong>Sugar alcohols</strong> (sorbitol, xylitol): Draw water into the intestines</li>
              <li><strong>Artificial sweeteners</strong> (sucralose): Disrupt gut bacteria</li>
              <li><strong>High caffeine doses</strong>: Increase gastric acid and motility</li>
              <li><strong>Creatine monohydrate</strong>: Causes water retention and bloating</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              4. Gut-Friendly Alternatives
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>L-Glutamine: Supports gut barrier integrity</li>
              <li>Ginger: Natural anti-nausea and gastroprotective effects</li>
              <li>Sodium Citrate: Gentler than Sodium Chloride for absorption</li>
              <li>Natural sweeteners: Stevia and monk fruit without GI side effects</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              5. Timing and Practical Strategies
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>The 30-45 minute pre-run window</li>
              <li>Training your gut: How to build tolerance</li>
              <li>Morning-specific considerations (fasted running, coffee interactions)</li>
            </ul>
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

