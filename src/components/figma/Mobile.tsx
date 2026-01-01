"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "./Header";
import { EmailSignup } from "./EmailSignup";
import { Footer } from "./Footer";
import MagneticWrapper from "../ui/MagneticWrapper";
import { ClientOnly } from "../ui/ClientOnly";

const CaretDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 8"
    width="12"
    height="8"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M6 8 0 0h12L6 8Z" fill="currentColor" />
  </svg>
);

type IngredientData = {
  name: string;
  amount: string;
  headline: string;
  description: string;
};

type ScienceSlide = {
  focus: string;
  headlineStat: string;
  result: string;
  takeaway: string;
  proof: string;
  citation: string;
  link: string;
};

const SCIENCE_SLIDES: ScienceSlide[] = [
  {
    focus: "OXYGEN EFFICIENCY",
    headlineStat: "16%",
    result: "LONGER RUNS",
    takeaway: "Your engine becomes more efficient, allowing you to maintain pace with significantly less oxygen.",
    proof:
      "In a double-blind study, dietary nitrates reduced submaximal oxygen cost by ~5% and extended time-to-exhaustion by 16%.",
    citation: "Bailey et al., J Appl Physiol (2009)",
    link: "https://pubmed.ncbi.nlm.nih.gov/19661447/",
  },
  {
    focus: "EXERCISE TOLERANCE",
    headlineStat: "12%",
    result: "GREATER ENDURANCE",
    takeaway: "Clinically proven to speed up oxygen kinetics and increase how long you push before failure.",
    proof:
      "Subjects supplementing with 6g of L-Citrulline saw a 12% increase in exercise tolerance and 9% higher peak power.",
    citation: "Bailey et al., J Appl Physiol (2015)",
    link: "https://pubmed.ncbi.nlm.nih.gov/26023227/",
  },
  {
    focus: "COGNITIVE FLOW",
    headlineStat: "SHARP",
    result: "REACTION TIME",
    takeaway: "The 2:1 L-Theanine stack neutralizes caffeine jitters for calm, focused alertness.",
    proof:
      "Research shows the 'Golden Ratio' improves both speed and accuracy while reducing susceptibility to distraction.",
    citation: "Haskell et al., Biol Psychol (2008)",
    link: "https://pubmed.ncbi.nlm.nih.gov/18006208/",
  },
  {
    focus: "SPEED & POWER",
    headlineStat: "HIGHER",
    result: "POWER OUTPUT",
    takeaway: "Red Spinach extract is shown to significantly improve power output and speed in time trials.",
    proof:
      "A randomized crossover study found RSE significantly reduced time-to-completion in a 4-km time trial vs placebo.",
    citation: "Gonzalez et al., J Strength Cond Res (2021)",
    link: "https://pubmed.ncbi.nlm.nih.gov/31136549/",
  },
  {
    focus: "HYDRATION SAFETY",
    headlineStat: "2.5X",
    result: "CRAMP RESISTANCE",
    takeaway: "Proper electrolyte hydration more than doubles the time you can run before muscle failure sets in.",
    proof:
      "Subjects exercised for 36.8 minutes before cramping with electrolytes, compared to only 14.6 minutes without.",
    citation: "Jung et al., J Athl Train (2005)",
    link: "https://pubmed.ncbi.nlm.nih.gov/15970952/",
  },
];

const INGREDIENTS: IngredientData[] = [
  {
    name: "L-CITRULLINE",
    amount: "6000MG",
    headline: "THE OXYGEN DRIVER.",
    description:
      'We use a full clinical 6g dose to maximize Nitric Oxide production. This dilates your blood vessels, widening the "highways" to deliver more oxygen and fuel to working muscles when the pace gets hard. No fillers, just flow.',
  },
  {
    name: "BEET ROOT POWDER",
    amount: "4000MG",
    headline: "THE AEROBIC BASE.",
    description:
      'High-grade beet extract provides a natural nitrate reservoir. This improves mitochondrial efficiency, effectively reducing the "oxygen cost" of running. It helps you hold a faster pace while burning less energy.',
  },
  {
    name: "RED SPINACH EXTRACT",
    amount: "1000MG",
    headline: "THE NITRATE ACCELERANT.",
    description:
      "Red Spinach is 4x more potent in nitrates than beets alone. This extract ensures you hit the physiological saturation point for vasodilation, keeping your legs feeling lighter deeper into the run.",
  },
  {
    name: "CAFFEINE + L-THEANINE",
    amount: "100MG : 200MG",
    headline: "THE 1:2 GOLDEN RATIO.",
    description:
      'We pair 100mg of Caffeine (kinetic energy) with 200mg of L-Theanine (calm focus) to neutralize the jitters. The result is "Alpha Wave" focus—alertness without the anxiety or heart rate spikes.',
  },
  {
    name: "SODIUM",
    amount: "500MG",
    headline: "HYDRATION FUEL.",
    description:
      "Sourced from Pink Himalayan Salt. This 500mg dose replaces exactly what you sweat out, maintaining blood volume to keep your heart rate stable and preventing the muscle cramps that kill late-race performance.",
  },
  {
    name: "POTASSIUM CITRATE",
    amount: "500MG",
    headline: "CRAMP INSURANCE.",
    description:
      'While sodium manages fluid, potassium regulates muscle firing. We include a matching 500mg dose to prevent involuntary twitching and that heavy "dead leg" feeling that sets in after Mile 15.',
  },
];

type IngredientRowProps = {
  data: IngredientData;
  isOpen: boolean;
  onToggle: () => void;
};

function IngredientRow({ data, isOpen, onToggle }: IngredientRowProps) {
  return (
    <div className="group shadow-[-2px_2px_0px_0px_var(--red)] transition-shadow duration-300">
      {/* Header row - clickable */}
      <button
        type="button"
        onClick={onToggle}
        className="relative flex w-full cursor-pointer items-center bg-[var(--void-lite)]"
        style={{ height: "clamp(3rem, 5vw, 3.75rem)" }}
        aria-expanded={isOpen}
      >
        <div className="flex w-full items-center gap-3 px-3 sm:px-4 md:px-5">
          <div
            className="flex-1 text-left font-archivo font-black italic leading-tight text-[var(--light)]"
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              textShadow: "2px 2px 0.5px rgba(0,0,0,1)",
            }}
          >
            {data.name}
          </div>
          <div
            className="font-inter font-extralight leading-tight text-[var(--light)]"
            style={{ fontSize: "clamp(0.75rem, 1.5vw, 1rem)" }}
          >
            {data.amount}
          </div>
          {/* Triangle with hover pop effect */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 1
            }}
            className="flex w-3 items-center justify-center sm:w-4 group-hover:scale-125 group-hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
          >
            <CaretDown className="h-2 w-3 text-[var(--callouts)] sm:h-[9px] sm:w-[14px]" />
          </motion.div>
        </div>
      </button>

      {/* Dropdown content with animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              mass: 1,
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--void-extra-light)] px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5">
              <p
                className="font-archivo font-bold italic text-[var(--callouts)]"
                style={{ fontSize: "clamp(0.6875rem, 1.3vw, 0.875rem)" }}
              >
                {data.headline}
              </p>
              <p
                className="mt-2 font-sans leading-relaxed text-[var(--light)] opacity-90"
                style={{ fontSize: "clamp(0.625rem, 1.2vw, 0.875rem)" }}
              >
                {data.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScienceCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const total = SCIENCE_SLIDES.length;

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Trackpad scroll handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Check horizontal scroll or trackpad swipe
    if (Math.abs(e.deltaX) > 30 && !isTransitioning) {
      setIsTransitioning(true);
      if (e.deltaX > 0) {
        setIndex((prev) => prev + 1);
      } else {
        setIndex((prev) => prev - 1);
      }
      // Cooldown to prevent flying through slides
      setTimeout(() => setIsTransitioning(false), 600);
    }
  }, [isTransitioning]);

  // Wrap index for data fetching
  const activeSlide = ((index % total) + total) % total;

  return (
    <div 
      id="research"
      className="w-full scroll-mt-[100px] pb-10 sm:pb-12 md:pb-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onWheel={handleWheel}
    >
      {/* Header */}
      <div className="mx-auto mb-4 px-5 text-center sm:mb-6 sm:px-8 md:px-12 lg:px-16" style={{ maxWidth: "min(100%, 1440px)" }}>
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--callouts)] sm:text-[10px]">
          Backed by Research
        </p>
        <h2
          className="font-archivo font-black italic text-[var(--light)]"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
          }}
        >
          THE SCIENCE
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        {/* Arrows - Positioned to the sides */}
        <button
          onClick={() => setIndex(index - 1)}
          className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--void-extra-light)] bg-[var(--dark)]/50 p-2 text-[var(--light)] backdrop-blur-sm transition-all hover:border-[var(--callouts)] hover:text-[var(--callouts)] md:flex"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setIndex(index + 1)}
          className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-[var(--void-extra-light)] bg-[var(--dark)]/50 p-2 text-[var(--light)] backdrop-blur-sm transition-all hover:border-[var(--callouts)] hover:text-[var(--callouts)] md:flex"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative h-[380px] w-full overflow-hidden sm:h-[400px] md:h-[420px]">
          <div className="flex h-full items-center justify-center">
            <AnimatePresence initial={false} mode="popLayout">
              {[-1, 0, 1].map((offset) => {
                const slideIndex = ((index + offset % total) + total) % total;
                const slide = SCIENCE_SLIDES[slideIndex];
                const isActive = offset === 0;

                return (
                  <motion.div
                    key={`${slideIndex}-${index + offset}`}
                    drag={isActive ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_, { offset, velocity }) => {
                      const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
                      if (swipe) {
                        if (offset.x > 0) {
                          setIndex(index - 1);
                        } else {
                          setIndex(index + 1);
                        }
                      }
                    }}
                    initial={{ 
                      x: offset * 100 + "%",
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.2,
                      zIndex: isActive ? 10 : 0
                    }}
                    animate={{ 
                      x: offset * 85 + "%", // Creates the peek effect
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 10 : 0
                    }}
                    exit={{ 
                      x: (offset - (Math.sign(offset) || 1)) * 100 + "%",
                      opacity: 0,
                      scale: 0.8
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.2 }
                    }}
                    className={`absolute w-[85%] max-w-[600px] ${isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"}`}
                    onClick={() => {
                      if (offset !== 0) setIndex(index + offset);
                    }}
                  >
                    <div className="h-[340px] border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-6 sm:h-[360px] sm:p-8 md:p-10">
                      <div className="flex h-full flex-col">
                        {/* Eyebrow: Focus Category */}
                        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--callouts)] sm:text-[10px]">
                          {slide.focus}
                        </p>

                        {/* Headline: Huge Stat + Result */}
                        <div className="flex flex-col leading-none">
                          <span
                            className="font-archivo font-black italic text-[var(--light)]"
                            style={{ fontSize: "clamp(2.5rem, 8vw, 4.5rem)" }}
                          >
                            {slide.headlineStat}
                          </span>
                          <span className="font-archivo text-[18px] font-black italic text-[var(--callouts)] sm:text-[22px]">
                            {slide.result}
                          </span>
                        </div>

                        {/* Key Takeaway: Bold & High Contrast */}
                        <p className="mt-6 font-archivo text-[15px] font-bold leading-tight text-[var(--light)] sm:text-[18px]">
                          {slide.takeaway}
                        </p>

                        {/* Deep Dive: Smaller Technical Proof */}
                        <p className="mt-4 font-sans text-[12px] leading-relaxed text-[var(--light)] opacity-50 sm:text-[13px]">
                          {slide.proof}
                        </p>

                        {/* Citation: More Obvious Clickable Link */}
                        <div className={`mt-auto transition-opacity duration-300 ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          <a
                            href={slide.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 border-b border-[var(--callouts)] pb-1 transition-all hover:border-[var(--light)]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--callouts)] group-hover:text-[var(--light)]">
                              READ THE STUDY: {slide.citation}
                            </span>
                            <svg
                              className="h-3 w-3 text-[var(--callouts)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--light)]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation - Centered Dots */}
      <div className="mx-auto mt-6 flex justify-center px-5" style={{ maxWidth: "min(100%, 1440px)" }}>
        <div className="flex gap-2">
          {SCIENCE_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - activeSlide;
                setIndex(index + diff);
              }}
              className={`h-2 rounded-full transition-all ${
                activeSlide === i
                  ? "w-6 bg-[var(--callouts)]"
                  : "w-2 bg-[var(--void-extra-light)] hover:bg-[var(--callouts)]/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Mobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <Header />
      <main className="relative z-10 text-[var(--light)]">
        {/* Fluid container with percentage-based padding */}
        <div
          className="mx-auto w-full px-5 pb-0 sm:px-8 md:px-12 lg:px-16 pt-[clamp(3.5rem,8vh,12rem)] lg:pt-64 lg:pb-24"
          style={{
            maxWidth: "min(100%, 1440px)",
          }}
        >
          {/* Hero Section - Two Column: Headline scales, Image stays stable */}
          <div className="grid items-center lg:grid-cols-2 lg:gap-16" style={{ gap: "clamp(0.5rem, 3vh, 4rem)" }}>
            {/* Left Column - Content */}
            <div className="order-1 flex min-w-0 flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
              {/* Eyebrow */}
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--callouts)] sm:mb-8 sm:text-[10px]">
                The Runner&apos;s Pre-Workout
              </p>

              {/* Main Headline - Adaptive scaling: wider on mobile, constrained on desktop */}
              <h1
                className="font-archivo font-black uppercase leading-[1.1] text-[var(--light)] text-[clamp(1.5rem,8.5vw,3.5rem)] lg:text-[clamp(2rem,5.5vw,4.75rem)]"
                style={{
                  textShadow: "3px 3px 0px rgba(0,0,0,0.9)",
                }}
              >
                <span className="mb-2 block whitespace-nowrap opacity-90 sm:mb-4" style={{ fontSize: "0.4em" }}>
                  <span className="font-normal">When your legs say </span>
                  <span className="italic">stop.</span>
                </span>
                <span className="block whitespace-nowrap">
                  MILE[<span className="text-[var(--red)]">21</span><span className="text-[var(--red)]">]</span> SAYS <span className="italic">GO.</span>
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="mt-4 max-w-[480px] font-sans leading-relaxed text-[var(--light)] opacity-70 sm:mt-10 lg:mx-0"
                style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)" }}
              >
                Pre-workout built for endurance—not the weight room.
              </p>

              {/* CTA */}
              <div className="relative z-20 mt-6 sm:mt-12">
                <MagneticWrapper>
                  <a
                    href="#order"
                    className="inline-flex h-12 w-full max-w-[320px] items-center justify-center border-2 border-[var(--callouts)] bg-[var(--callouts)] px-10 font-mono text-[14px] font-black uppercase tracking-widest text-[var(--dark)] transition-all duration-200 hover:scale-105 hover:border-[var(--light)] hover:bg-[var(--light)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] sm:h-16 sm:text-[16px]"
                  >
                    Get Mile 21 →
                  </a>
                </MagneticWrapper>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div 
              className="order-2 flex items-center justify-center lg:order-2 lg:-mr-32 lg:justify-end"
              style={{
                marginTop: "clamp(-4rem, -8vh, 0rem)",
                marginBottom: "clamp(-4rem, -8vh, 0rem)"
              }}
            >
              <MagneticWrapper>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src="/assets/product-best.png"
                    alt="Mile 21 Cherry Ice Pre-Workout"
                    className="h-auto w-full"
                    style={{
                      maxWidth: "clamp(320px, 65vw, 900px)"
                    }}
                  />
                </motion.div>
              </MagneticWrapper>
            </div>
          </div>

        </div>

        {/* Full-width Divider */}
        <div 
          className="h-px w-full bg-[var(--void-extra-light)]" 
          style={{ 
            marginTop: "clamp(0.5rem, 2vh, 4rem)",
            marginBottom: "clamp(1rem, 3vh, 4rem)"
          }} 
        />

        <div
          className="mx-auto w-full px-5 pb-0 sm:px-8 md:px-12 lg:px-16"
          style={{ maxWidth: "min(100%, 1440px)" }}
        >
          {/* Stack Section - Ingredients left, Title right on lg+ */}
          <div className="grid gap-6 lg:grid-cols-[1fr_240px] lg:gap-10">
            {/* Section Title + Trust Badges - appears first on mobile, second on lg */}
            <div className="order-1 lg:order-2 lg:self-center">
              {/* Mobile: Title + badges inline / lg: stacked & centered */}
              <div className="flex items-center justify-between gap-4 lg:block lg:text-center">
                <h2
                  className="font-archivo font-black italic text-[var(--light)]"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                    textShadow: "2px 2px 0px rgba(0,0,0,0.8)",
                  }}
                >
                  THE STACK
                </h2>
                
                {/* Trust badges - inline on mobile, stacked & centered on lg */}
                <div className="flex flex-wrap gap-2 lg:mt-6 lg:flex-col lg:items-center lg:gap-3">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--light)] opacity-40 sm:text-[9px] lg:text-[11px]">
                    ✓ Clinical Dosing
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--light)] opacity-40 sm:text-[9px] lg:text-[11px]">
                    ✓ 3rd Party Tested
                  </span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-[var(--light)] opacity-40 sm:text-[9px] lg:text-[11px]">
                    ✓ Zero Fillers
                  </span>
                </div>
              </div>
            </div>

            {/* Ingredients section - appears second on mobile, first on lg */}
            <section
              id="formula"
              className="order-2 scroll-mt-[100px] space-y-3 sm:space-y-4 lg:order-1"
              aria-label="Formula"
              data-glow-shy
            >
              {INGREDIENTS.map((ingredient, index) => (
                <IngredientRow
                  key={ingredient.name}
                  data={ingredient}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </section>
          </div>
        </div>

        {/* Full-width Divider */}
        <div 
          className="h-px w-full bg-[var(--void-extra-light)]" 
          style={{ 
            marginTop: "clamp(1rem, 3vh, 4rem)",
            marginBottom: "clamp(1rem, 3vh, 4rem)"
          }} 
        />

        {/* Science Section */}
        <ScienceCarousel />
      </main>

      <EmailSignup />
      <Footer />
    </>
  );
}
