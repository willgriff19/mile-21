import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "About Mile 21 | The Runner's Pre-Workout",
  description:
    "Learn about Mile 21 - the pre-workout built specifically for endurance runners. Our story, mission, and the science behind our formula.",
};

export default function AboutPage() {
  return (
    <InteriorLayout
      title="ABOUT MILE 21"
      subtitle="Built for runners, by runners. This is our story."
    >
      <section className="space-y-8">
        <div>
          <h2 className="font-archivo text-[1.5rem] font-bold italic text-[var(--callouts)] md:text-[1.75rem]">
            THE WALL THAT STARTED IT ALL
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Mile 21. Every marathoner knows it. It's where glycogen stores hit
            empty. Where your legs turn to concrete. Where the voice in your
            head screams to stop.
          </p>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            We've been there—staring at that wall, wondering why every
            pre-workout on the market was built for gym bros chasing pump, not
            runners chasing PRs. The itchy skin from Beta-Alanine. The
            water-retention bloat. The heart-racing jitters that destroy your
            pacing strategy.
          </p>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            So we built something different. Something designed from the ground
            up for the unique demands of endurance running.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.5rem] font-bold italic text-[var(--callouts)] md:text-[1.75rem]">
            OUR MISSION
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Mile 21 exists to give every runner—from first-time 5K finishers to
            elite ultramarathoners—the physiological edge they deserve. We
            believe in:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-[var(--light)] opacity-80">
            <li>
              <span className="font-bold text-[var(--light)]">
                Clinical dosing.
              </span>{" "}
              No pixie-dusting. Every ingredient at the dose that science proves
              works.
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Runner-specific formulation.
              </span>{" "}
              Ingredients chosen for oxygen delivery, not muscle pump.
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Complete transparency.
              </span>{" "}
              No proprietary blends. You know exactly what you're putting in
              your body.
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Zero compromise.
              </span>{" "}
              No artificial colors, no unnecessary fillers, no ingredients that
              hurt performance.
            </li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.5rem] font-bold italic text-[var(--callouts)] md:text-[1.75rem]">
            THE TEAM
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            We're a small team of runners, sports scientists, and formulators
            based in Austin, Texas. Combined, we've logged over 50,000 miles,
            finished 23 marathons, and tested more pre-workout formulas than
            we'd like to admit.
          </p>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Every decision we make—from ingredient sourcing to packaging—is
            filtered through one question:{" "}
            <span className="italic text-[var(--callouts)]">
              "Would this help me run faster?"
            </span>
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.5rem] font-bold italic text-[var(--callouts)] md:text-[1.75rem]">
            THE SCIENCE
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Our formula is built on peer-reviewed research, not marketing hype.
            Each ingredient is selected based on clinical studies demonstrating
            measurable improvements in:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-[var(--light)] opacity-80">
            <li>Oxygen delivery and VO2 max efficiency</li>
            <li>Time to exhaustion at threshold pace</li>
            <li>Lactate clearance and muscle fatigue resistance</li>
            <li>Cognitive focus without cardiovascular stress</li>
            <li>Electrolyte balance and cramp prevention</li>
          </ul>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            We dose at clinical levels—not the minimum effective dose, but the
            dose used in successful trials. That's why we use 6g of L-Citrulline
            (not 3g), 4g of Beet Root (not 500mg), and a true 2:1 ratio of
            L-Theanine to Caffeine.
          </p>
        </div>

        <div className="mt-12 border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo text-[1rem] font-bold italic text-[var(--light)] md:text-[1.125rem]">
            "We didn't set out to build a supplement company. We set out to
            break through Mile 21. The company was just what happened next."
          </p>
          <p className="mt-3 font-mono text-[0.75rem] uppercase tracking-wider text-[var(--callouts)]">
            — The Mile 21 Team
          </p>
        </div>
      </section>
    </InteriorLayout>
  );
}

