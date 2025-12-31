import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Blog | Mile 21",
  description:
    "Training insights, nutrition science, and running tips from the Mile 21 team.",
};

const POSTS = [
  {
    title: "The Science Behind Beet Root and VO2 Max",
    excerpt:
      "Why elite runners are turning to dietary nitrates for measurable performance gains. We break down the research.",
    date: "Coming Soon",
    category: "Science",
  },
  {
    title: "Pre-Workout Timing: A Complete Guide for Runners",
    excerpt:
      "When you take your pre-workout matters almost as much as what's in it. Here's how to dial in your timing.",
    date: "Coming Soon",
    category: "Training",
  },
  {
    title: "Why Most Pre-Workouts Fail Runners",
    excerpt:
      "Beta-alanine, excessive caffeine, water-retention pumps—here's why gym formulas don't translate to the road.",
    date: "Coming Soon",
    category: "Science",
  },
  {
    title: "The L-Theanine + Caffeine Stack Explained",
    excerpt:
      "How a 2:1 ratio creates 'alpha wave' focus and why it's perfect for race-day clarity.",
    date: "Coming Soon",
    category: "Science",
  },
  {
    title: "Heat Training and Electrolyte Strategy",
    excerpt:
      "Summer running demands smart hydration. Here's how to balance sodium, potassium, and performance.",
    date: "Coming Soon",
    category: "Training",
  },
  {
    title: "Mile 21: Why the Name?",
    excerpt:
      "The wall. The moment of truth. Here's the story behind our name and what it means to us.",
    date: "Coming Soon",
    category: "Company",
  },
];

export default function BlogPage() {
  return (
    <InteriorLayout
      title="THE MILE 21 BLOG"
      subtitle="Training insights, nutrition science, and running tips."
    >
      <section className="space-y-10">
        <div className="border-l-4 border-[var(--callouts)] bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo font-bold text-[var(--callouts)]">
            COMING SOON
          </p>
          <p className="mt-2 font-sans text-[var(--light)] opacity-80">
            We're putting the finishing touches on our first articles. Sign up
            for our newsletter to be notified when we publish.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
          UPCOMING ARTICLES
        </h2>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {POSTS.map((post, index) => (
            <article
              key={index}
              className="group border border-[var(--void-extra-light)] bg-[var(--void-lite)] p-6 transition-all hover:border-[var(--callouts)]"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--callouts)]">
                  {post.category}
                </span>
                <span className="text-[var(--light)] opacity-30">•</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--light)] opacity-50">
                  {post.date}
                </span>
              </div>
              <h3 className="mt-3 font-archivo text-[1rem] font-bold text-[var(--light)] transition-colors group-hover:text-[var(--callouts)]">
                {post.title}
              </h3>
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-[var(--light)] opacity-60">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-8 bg-[var(--void-extra-light)] p-8 text-center">
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--light)]">
            DON'T MISS A POST
          </h2>
          <p className="mt-3 font-sans text-[var(--light)] opacity-70">
            Join our newsletter and get new articles delivered straight to your
            inbox.
          </p>
          <a
            href="/#signup"
            className="mt-6 inline-flex h-12 items-center justify-center border-2 border-[var(--callouts)] bg-[var(--light)] px-8 font-mono text-[12px] font-bold uppercase tracking-wider text-[var(--dark)] transition-all duration-200 hover:border-[var(--light)] hover:bg-[var(--callouts)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Subscribe →
          </a>
        </div>
      </section>
    </InteriorLayout>
  );
}

