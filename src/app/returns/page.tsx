import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Returns & Refunds | Mile 21",
  description:
    "30-day money-back guarantee on all Mile 21 products. Learn about our hassle-free return policy.",
};

export default function ReturnsPage() {
  return (
    <InteriorLayout
      title="RETURNS & REFUNDS"
      subtitle="30-day money-back guarantee. No questions asked."
    >
      <section className="space-y-10">
        {/* Guarantee */}
        <div className="border-l-4 border-[var(--callouts)] bg-[var(--void-extra-light)] p-6">
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            THE MILE 21 GUARANTEE
          </h2>
          <p className="mt-3 font-sans leading-relaxed text-[var(--light)] opacity-80">
            We're confident Mile 21 will help you run better. But if it doesn't
            work for you—for any reason—we'll give you a full refund within 30
            days of purchase. No hoops. No hassle. No awkward questions.
          </p>
        </div>

        {/* Return Policy */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            RETURN POLICY
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--callouts)] font-mono text-[12px] font-bold text-[var(--dark)]">
                1
              </div>
              <div>
                <p className="font-archivo font-bold text-[var(--light)]">
                  30-Day Window
                </p>
                <p className="mt-1 font-sans text-[var(--light)] opacity-70">
                  You have 30 days from the delivery date to request a return or
                  refund.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--callouts)] font-mono text-[12px] font-bold text-[var(--dark)]">
                2
              </div>
              <div>
                <p className="font-archivo font-bold text-[var(--light)]">
                  Opened or Unopened
                </p>
                <p className="mt-1 font-sans text-[var(--light)] opacity-70">
                  We accept returns on both opened and unopened products. We'd
                  rather you try it and know it's not for you than never try it
                  at all.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--callouts)] font-mono text-[12px] font-bold text-[var(--dark)]">
                3
              </div>
              <div>
                <p className="font-archivo font-bold text-[var(--light)]">
                  Full Refund
                </p>
                <p className="mt-1 font-sans text-[var(--light)] opacity-70">
                  We refund your full purchase price. Original shipping costs
                  are non-refundable unless we made an error.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* How to Return */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            HOW TO REQUEST A RETURN
          </h2>
          <ol className="mt-6 list-inside list-decimal space-y-4 font-sans text-[var(--light)] opacity-80">
            <li>
              <span className="font-bold text-[var(--light)]">
                Email us at{" "}
                <a
                  href="mailto:returns@mile21.com"
                  className="text-[var(--callouts)] underline"
                >
                  returns@mile21.com
                </a>
              </span>
              <br />
              <span className="opacity-70">
                Include your order number and reason for return (optional but
                helpful).
              </span>
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Receive your return label
              </span>
              <br />
              <span className="opacity-70">
                We'll email you a prepaid return shipping label within 24 hours.
              </span>
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Ship it back
              </span>
              <br />
              <span className="opacity-70">
                Drop off your package at any USPS location. No need for original
                packaging.
              </span>
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">Get refunded</span>
              <br />
              <span className="opacity-70">
                Once we receive your return, we'll process your refund within
                3-5 business days.
              </span>
            </li>
          </ol>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Exchanges */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            EXCHANGES
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Need a different product or quantity? We're happy to help with
            exchanges. Contact us at{" "}
            <a
              href="mailto:support@mile21.com"
              className="text-[var(--callouts)] underline"
            >
              support@mile21.com
            </a>{" "}
            and we'll arrange a swap.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Damaged/Wrong Items */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            DAMAGED OR INCORRECT ORDERS
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            If your order arrived damaged or we sent the wrong item, we'll make
            it right immediately:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-[var(--light)] opacity-80">
            <li>Free replacement shipped priority</li>
            <li>No need to return the damaged item</li>
            <li>Full refund option if you prefer</li>
          </ul>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Just email{" "}
            <a
              href="mailto:support@mile21.com"
              className="text-[var(--callouts)] underline"
            >
              support@mile21.com
            </a>{" "}
            with photos of the issue and your order number.
          </p>
        </div>

        {/* Note */}
        <div className="mt-8 border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo font-bold text-[var(--light)]">
            A Note on Trust
          </p>
          <p className="mt-2 font-sans text-[var(--light)] opacity-70">
            We believe in our product and we believe in treating you right. If
            Mile 21 doesn't work for you, we want to know—and we want you to
            feel good about trying it. That's why our guarantee exists.
          </p>
        </div>
      </section>
    </InteriorLayout>
  );
}

