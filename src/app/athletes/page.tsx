import { InteriorLayout } from "../../components/figma/InteriorLayout";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Athletes | Mile 21",
  description:
    "Meet the runners who fuel their training with Mile 21. From ultramarathoners to weekend warriors.",
};

const ATHLETES = [
  {
    name: "Marcus Chen",
    title: "Ultramarathon Runner",
    location: "Boulder, CO",
    stats: "100+ mile finisher, Western States qualifier",
    quote:
      "Mile 21 is the only pre-workout that doesn't wreck my stomach during ultras. The smooth energy is exactly what I need at hour 15.",
    image: null,
  },
  {
    name: "Sarah Williams",
    title: "Marathon Runner",
    location: "Boston, MA",
    stats: "2:58 PR, Boston Marathon finisher x4",
    quote:
      "I was skeptical about pre-workouts for running. Mile 21 changed my mind. The focus during my tempo runs is unmatched.",
    image: null,
  },
  {
    name: "David Okonkwo",
    title: "Trail Runner",
    location: "Asheville, NC",
    stats: "50K trail champion, FKT holder",
    quote:
      "On technical trails, you need your legs AND your head. Mile 21 delivers both without the jitters.",
    image: null,
  },
  {
    name: "Elena Rodriguez",
    title: "Track & Marathon",
    location: "Austin, TX",
    stats: "Olympic Trials qualifier, 2:32 marathon",
    quote:
      "The 2:1 L-Theanine to caffeine ratio is the real deal. Calm focus, not wired energy. That's what elite racing demands.",
    image: null,
  },
  {
    name: "James Park",
    title: "Running Coach & Athlete",
    location: "Portland, OR",
    stats: "USATF certified, 20+ years coaching",
    quote:
      "I recommend Mile 21 to my athletes because it's transparent, properly dosed, and designed for how runners actually train.",
    image: null,
  },
  {
    name: "Aisha Johnson",
    title: "Half Marathon Specialist",
    location: "Chicago, IL",
    stats: "1:14 half marathon, sub-35 10K",
    quote:
      "Finally, a pre-workout that understands running isn't lifting. No tingles, no bloat, just oxygen and go.",
    image: null,
  },
];

export default function AthletesPage() {
  notFound();

  return (
    <InteriorLayout
      title="OUR ATHLETES"
      subtitle="The runners who push their limits with Mile 21."
    >
      <section className="space-y-10">
        <p className="font-sans leading-relaxed text-[var(--light)] opacity-80">
          We partner with runners across every distance—from the track to
          100-mile ultras. These athletes test our formula in the crucible of
          real training and racing. Their feedback shapes everything we do.
        </p>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Athletes Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {ATHLETES.map((athlete, index) => (
            <div
              key={index}
              className="border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-6"
            >
              <div className="mb-4">
                <div className="flex h-12 w-12 items-center justify-center bg-[var(--callouts)] font-archivo text-[1.25rem] font-bold text-[var(--dark)]">
                  {athlete.name.charAt(0)}
                </div>
              </div>
              <h3 className="font-archivo text-[1.125rem] font-bold text-[var(--light)]">
                {athlete.name}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--callouts)]">
                {athlete.title}
              </p>
              <p className="mt-1 font-sans text-[12px] text-[var(--light)] opacity-50">
                {athlete.location}
              </p>
              <p className="mt-3 font-sans text-[13px] italic leading-relaxed text-[var(--light)] opacity-80">
                "{athlete.quote}"
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-50">
                {athlete.stats}
              </p>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Ambassador CTA */}
        <div className="bg-[var(--void-extra-light)] p-8 text-center">
          <h2 className="font-archivo text-[1.5rem] font-bold italic text-[var(--callouts)]">
            BECOME AN AMBASSADOR
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Are you a competitive runner who believes in training smarter? We're
            always looking for dedicated athletes to join our team.
          </p>
          <p className="mt-4 font-sans text-[var(--light)] opacity-80">
            Ambassadors receive:
          </p>
          <ul className="mt-3 space-y-1 font-sans text-[var(--light)] opacity-70">
            <li>• Free product for training and racing</li>
            <li>• Exclusive discount code for your community</li>
            <li>• Early access to new formulas</li>
            <li>• Feature on our website and social channels</li>
          </ul>
          <a
            href="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center border-2 border-[var(--callouts)] bg-[var(--light)] px-8 font-mono text-[12px] font-bold uppercase tracking-wider text-[var(--dark)] transition-all duration-200 hover:border-[var(--light)] hover:bg-[var(--callouts)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Apply Now →
          </a>
        </div>
      </section>
    </InteriorLayout>
  );
}

