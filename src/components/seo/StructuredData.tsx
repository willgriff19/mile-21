export function StructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Mile 21 Endurance Pre-Workout",
    description:
      "Specialized pre-workout for long-distance runners. Gut-friendly, sustained-energy formula with clinical doses of L-Citrulline, Beet Root, and electrolytes. Designed for the 21st mile.",
    brand: {
      "@type": "Brand",
      name: "Mile 21",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
      price: "0.00",
      priceCurrency: "USD",
      priceValidUntil: "2026-12-31",
      url: "https://mile21.com",
    },
    category: "Sports Nutrition",
    audience: {
      "@type": "Audience",
      audienceType: "Endurance Runners",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does pre-workout hurt my stomach when running?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most pre-workouts use artificial sweeteners (sucralose) and high caffeine, which cause GI distress. Mile 21 uses natural sweeteners and gut-neutral ingredients like L-Glutamine and ginger to eliminate mid-run stomach issues.",
        },
      },
      {
        "@type": "Question",
        name: "Is Beta-Alanine good for runners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beta-Alanine buffers lactic acid but can cause distracting tingling (paresthesia). Mile 21 intentionally excludes Beta-Alanine because it provides no benefit for endurance running and many runners find it uncomfortable during long efforts.",
        },
      },
      {
        "@type": "Question",
        name: "Can I take pre-workout before a marathon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but only if it is designed for oxidative phosphorylation (endurance) rather than explosive power (lifting). Mile 21 is specifically formulated for endurance events, focusing on oxygen delivery, sustained energy, and electrolyte balance rather than muscle pump and high stimulants.",
        },
      },
    ],
  };

  return (
    <>
      <script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

