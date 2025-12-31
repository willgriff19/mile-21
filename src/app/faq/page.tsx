"use client";

import { useState } from "react";
import { InteriorLayout } from "../../components/figma/InteriorLayout";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "How is Mile 21 different from other pre-workouts?",
    answer:
      "Most pre-workouts are designed for weight lifting—they prioritize muscle pump, Beta-Alanine tingles, and massive caffeine doses. Mile 21 is formulated specifically for endurance runners. We focus on nitric oxide production for oxygen delivery, smooth sustained energy without jitters, and electrolyte balance to prevent cramping. No Beta-Alanine, no water-retention ingredients, no unnecessary stimulants.",
  },
  {
    question: "When should I take Mile 21?",
    answer:
      "Take one serving 30-45 minutes before your run. This gives the L-Citrulline and beet root extract time to convert to nitric oxide, and allows the caffeine/L-theanine stack to reach peak effectiveness. For races, we recommend testing during training runs first to dial in your personal timing.",
  },
  {
    question: "Can I take it for short runs or only for long distances?",
    answer:
      "Mile 21 works for any distance. While the formula shines during longer efforts (half marathon and beyond), you'll notice improved oxygen delivery and focus even on tempo runs, track workouts, and 5Ks. Many athletes use it for any quality session where performance matters.",
  },
  {
    question: "Will the caffeine mess with my heart rate or pacing?",
    answer:
      "Unlike high-stim pre-workouts with 300mg+ caffeine, Mile 21 contains a moderate 100mg dose paired with 200mg of L-Theanine. This 1:2 ratio produces what researchers call 'alpha wave' focus—alertness without the anxiety, jitters, or heart rate spikes that destroy pacing strategies.",
  },
  {
    question: "Is it safe to use with gels or other race nutrition?",
    answer:
      "Yes. Mile 21 is designed to complement your existing race nutrition strategy. The electrolytes (sodium and potassium) work alongside what you'll get from gels and sports drinks. Just be mindful of total caffeine intake if your gels also contain caffeine.",
  },
  {
    question: "Does it cause the tingles like other pre-workouts?",
    answer:
      "No. The tingling sensation (paresthesia) comes from Beta-Alanine, which we intentionally exclude from our formula. Beta-Alanine is designed for short burst efforts like weight lifting sets—it provides no benefit for endurance running and many runners find it uncomfortable and distracting.",
  },
  {
    question: "What does it taste like?",
    answer:
      "Mile 21 has a natural berry flavor with a mild earthiness from the beet root powder. It's intentionally not overly sweet or artificial-tasting. Most runners prefer mixing with 8-12oz of cold water.",
  },
  {
    question: "Is it third-party tested?",
    answer:
      "Yes. Every batch of Mile 21 is tested by an independent lab for purity, potency, and banned substances. We're committed to transparency and can provide certificates of analysis upon request. Our facility is cGMP certified.",
  },
  {
    question: "Can I use it while training for a specific race?",
    answer:
      "Absolutely—that's exactly what it's designed for. We recommend incorporating Mile 21 into your long runs and quality sessions during your training block. This lets you experience the benefits and fine-tune your timing before race day.",
  },
  {
    question: "Is there a subscription option?",
    answer:
      "Yes. Founding Runners who subscribe save 20% on every order and get priority access to new products. You can pause, skip, or cancel anytime—no commitments, no hassle.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We offer a 30-day money-back guarantee. If Mile 21 doesn't help you run better, we'll refund your purchase—no questions asked. We're confident in our formula and want you to be too.",
  },
  {
    question: "Is it vegan/gluten-free?",
    answer:
      "Yes to both. Mile 21 contains no animal products, gluten, soy, dairy, or artificial colors. It's formulated to be inclusive for runners with various dietary requirements.",
  },
];

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[var(--void-extra-light)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-archivo font-semibold text-[var(--light)]" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
          {item.question}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center text-[var(--callouts)] transition-transform duration-200 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="font-sans leading-relaxed text-[var(--light)] opacity-70" style={{ fontSize: "clamp(0.8rem, 1.3vw, 1rem)" }}>
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <InteriorLayout
      title="FREQUENTLY ASKED QUESTIONS"
      subtitle="Everything you need to know about Mile 21."
    >
      <div className="space-y-0">
        {FAQS.map((faq, index) => (
          <FAQAccordion
            key={index}
            item={faq}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      <div className="mt-12 bg-[var(--void-extra-light)] p-6">
        <p className="font-archivo font-bold text-[var(--light)]">
          Still have questions?
        </p>
        <p className="mt-2 font-sans text-[var(--light)] opacity-70">
          Reach out to us at{" "}
          <a
            href="mailto:support@mile21.com"
            className="text-[var(--callouts)] underline transition-opacity hover:opacity-80"
          >
            support@mile21.com
          </a>{" "}
          and we'll get back to you within 24 hours.
        </p>
      </div>
    </InteriorLayout>
  );
}

