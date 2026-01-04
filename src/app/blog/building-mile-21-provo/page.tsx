import { InteriorLayout } from "../../../components/figma/InteriorLayout";

export const metadata = {
  title: "Our Journey: Building Mile 21 from a Provo Kitchen",
  description:
    "The story of Mile 21—built in Provo, Utah by runners, for runners. Discover our transparent approach to creating the first pre-workout engineered for endurance.",
  keywords: [
    "Mile 21 Provo Utah",
    "endurance supplement company",
    "running supplement startup",
    "Provo pre workout",
    "Utah running company",
    "build in public supplement",
  ],
  openGraph: {
    title: "Our Journey: Building Mile 21 from a Provo Kitchen",
    description:
      "The transparent story of building Mile 21 in Provo, Utah—by runners, for runners.",
  },
};

export default function BuildingMile21Provo() {
  return (
    <InteriorLayout
      title="BUILDING MILE 21 FROM A PROVO KITCHEN"
      subtitle="Our Journey: Transparency, local roots, and the story of creating the first endurance-focused pre-workout."
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
              The behind-the-scenes story of Mile 21—from frustration with
              existing supplements to building something better in Provo, Utah.
            </p>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              1. The Problem We Experienced
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Training for marathons in Utah's mountain trails</li>
              <li>Every pre-workout we tried caused jitters, crashes, or GI issues</li>
              <li>The realization: these products weren't designed for our sport</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              2. Why Provo, Utah?
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Access to world-class running terrain (mountains, canyons, trails)</li>
              <li>A community of serious endurance athletes to test with</li>
              <li>Utah's growing supplement manufacturing ecosystem</li>
              <li>Altitude training benefits that informed our formula</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              3. The Build-in-Public Philosophy
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Why we share our formulation process openly</li>
              <li>No proprietary blends—every ingredient and dose disclosed</li>
              <li>Third-party testing and certificates of analysis</li>
              <li>Community feedback shaping our product</li>
            </ul>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              4. The Name: Why "Mile 21"?
            </h3>
            <p className="mt-3 font-sans text-[var(--light)] opacity-70">
              Every marathoner knows mile 21. It's where the wall hits. It's
              where your training, nutrition, and mental fortitude are truly
              tested. We built this product for that moment—when your legs say
              stop, but you need to keep going.
            </p>
          </section>

          <section>
            <h3 className="font-archivo text-[1.25rem] font-semibold text-[var(--callouts)]">
              5. What's Next
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 font-sans text-[var(--light)] opacity-70">
              <li>Expanding our Founding Runner community</li>
              <li>First production batch timeline</li>
              <li>Future products in development</li>
              <li>How to be part of our journey</li>
            </ul>
          </section>
        </div>

        {/* Local SEO Section */}
        <div className="not-prose mt-10 border-t border-[var(--void-extra-light)] pt-8">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-40">
            Made in Provo, Utah • Built for runners, by runners
          </p>
        </div>

        {/* Newsletter CTA */}
        <div className="not-prose mt-8 bg-[var(--void-extra-light)] p-8 text-center">
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--light)]">
            FOLLOW OUR JOURNEY
          </h2>
          <p className="mt-3 font-sans text-[var(--light)] opacity-70">
            Join our newsletter to get updates as we build Mile 21 in public.
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

