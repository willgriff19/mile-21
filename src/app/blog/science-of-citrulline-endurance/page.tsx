import { InteriorLayout } from "../../../components/figma/InteriorLayout";

export const metadata = {
  title: "The Science of Citrulline: Why Oxygen Matters More Than The Pump",
  description:
    "Discover why L-Citrulline Malate 2:1 is superior to Arginine for endurance runners. Learn how nitric oxide improves aerobic capacity and oxygen delivery during long runs.",
  keywords: [
    "citrulline for running",
    "L-citrulline endurance",
    "citrulline vs arginine",
    "nitric oxide running",
    "citrulline malate 2:1",
    "oxygen delivery supplements",
  ],
  openGraph: {
    title: "The Science of Citrulline: Why Oxygen Matters More Than The Pump",
    description:
      "How L-Citrulline Malate 2:1 improves aerobic capacity and oxygen delivery for endurance athletes.",
  },
};

export default function ScienceOfCitrullineEndurance() {
  return (
    <InteriorLayout
      title="THE SCIENCE OF CITRULLINE"
      subtitle="Why Oxygen Matters More Than The Pump: L-Citrulline Malate 2:1 for aerobic capacity."
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
              A comprehensive look at L-Citrulline, the amino acid that's
              revolutionizing endurance performance through enhanced oxygen
              delivery.
            </p>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              1. Citrulline vs. Arginine: The Bioavailability Problem
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Why direct Arginine supplementation fails (first-pass metabolism)</li>
              <li>How Citrulline bypasses the liver to raise Arginine levels more effectively</li>
              <li>The research: Citrulline produces 2x more plasma Arginine than Arginine itself</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              2. The Nitric Oxide Pathway
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Citrulline → Arginine → Nitric Oxide (NO)</li>
              <li>How NO dilates blood vessels and improves oxygen delivery</li>
              <li>The "oxygen cost" reduction: running faster with less effort</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              3. Why 2:1 Malate Ratio Matters
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Malate's role in the Krebs cycle for ATP production</li>
              <li>How the 2:1 ratio optimizes both oxygen delivery AND energy production</li>
              <li>Clinical dosing: Why 6g is the research-backed effective dose</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              4. Real-World Endurance Benefits
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Study: 12% increase in time-to-exhaustion (Bailey et al., 2015)</li>
              <li>Reduced perceived exertion during sustained efforts</li>
              <li>Faster recovery between training sessions</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              5. Pump vs. Performance: Different Goals
            </h3>
            <p className="mt-3 font-sans text-[var(--light)] opacity-70">
              Why bodybuilders use Citrulline for the "pump" aesthetic, but
              runners should care about the oxygen delivery benefits instead.
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

