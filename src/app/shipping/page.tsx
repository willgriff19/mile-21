import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Shipping & Delivery | Mile 21",
  description:
    "Free shipping on orders over $50. Learn about Mile 21 shipping times, delivery options, and international shipping.",
};

export default function ShippingPage() {
  return (
    <InteriorLayout
      title="SHIPPING & DELIVERY"
      subtitle="Getting Mile 21 to your door, fast."
    >
      <section className="space-y-10">
        {/* Shipping Rates */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            SHIPPING RATES
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[var(--void-extra-light)]">
                  <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-[var(--light)] opacity-60">
                    Shipping Method
                  </th>
                  <th className="py-3 text-left font-mono text-[11px] uppercase tracking-wider text-[var(--light)] opacity-60">
                    Delivery Time
                  </th>
                  <th className="py-3 text-right font-mono text-[11px] uppercase tracking-wider text-[var(--light)] opacity-60">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--void-extra-light)]">
                  <td className="py-4 font-sans text-[var(--light)]">
                    Standard Shipping
                  </td>
                  <td className="py-4 font-sans text-[var(--light)] opacity-70">
                    5-7 business days
                  </td>
                  <td className="py-4 text-right font-sans text-[var(--light)]">
                    $5.99
                  </td>
                </tr>
                <tr className="border-b border-[var(--void-extra-light)]">
                  <td className="py-4 font-sans text-[var(--light)]">
                    Expedited Shipping
                  </td>
                  <td className="py-4 font-sans text-[var(--light)] opacity-70">
                    2-3 business days
                  </td>
                  <td className="py-4 text-right font-sans text-[var(--light)]">
                    $12.99
                  </td>
                </tr>
                <tr className="border-b border-[var(--void-extra-light)]">
                  <td className="py-4 font-sans text-[var(--light)]">
                    Overnight Shipping
                  </td>
                  <td className="py-4 font-sans text-[var(--light)] opacity-70">
                    1 business day
                  </td>
                  <td className="py-4 text-right font-sans text-[var(--light)]">
                    $24.99
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 border-l-4 border-[var(--callouts)] bg-[var(--void-extra-light)] p-4">
            <p className="font-archivo font-bold text-[var(--callouts)]">
              FREE SHIPPING
            </p>
            <p className="mt-1 font-sans text-[var(--light)] opacity-70">
              All orders over $50 qualify for free standard shipping within the
              continental United States.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Processing */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            ORDER PROCESSING
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Orders placed before 2:00 PM CST Monday–Friday are processed and
            shipped the same business day. Orders placed after 2:00 PM CST or on
            weekends/holidays will be processed the next business day.
          </p>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            Once your order ships, you'll receive a confirmation email with
            tracking information. You can also track your order status in your
            account dashboard.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* International */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            INTERNATIONAL SHIPPING
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            We currently ship to the following countries:
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 font-sans text-[var(--light)] opacity-70 sm:grid-cols-3">
            <span>🇺🇸 United States</span>
            <span>🇨🇦 Canada</span>
            <span>🇬🇧 United Kingdom</span>
            <span>🇦🇺 Australia</span>
            <span>🇩🇪 Germany</span>
            <span>🇫🇷 France</span>
          </div>
          <p className="mt-6 font-sans leading-relaxed text-[var(--light)] opacity-80">
            International orders typically arrive within 7-14 business days.
            Shipping rates are calculated at checkout based on destination and
            package weight.
          </p>
          <p className="mt-4 font-sans text-[13px] leading-relaxed text-[var(--light)] opacity-60">
            Note: International customers are responsible for any customs
            duties, import taxes, or fees imposed by their country. These
            charges are not included in our shipping rates.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        {/* Tracking */}
        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)] md:text-[1.5rem]">
            TRACKING YOUR ORDER
          </h2>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            All orders include tracking. Once your order ships, you'll receive
            an email with:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 font-sans text-[var(--light)] opacity-80">
            <li>Carrier name and tracking number</li>
            <li>Direct link to track your package</li>
            <li>Estimated delivery date</li>
          </ul>
          <p className="mt-4 font-sans leading-relaxed text-[var(--light)] opacity-80">
            If you haven't received tracking within 48 hours of placing your
            order, please check your spam folder or contact us at{" "}
            <a
              href="mailto:support@mile21.com"
              className="text-[var(--callouts)] underline"
            >
              support@mile21.com
            </a>
            .
          </p>
        </div>

        {/* Questions */}
        <div className="mt-8 bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo font-bold text-[var(--light)]">
            Have a shipping question?
          </p>
          <p className="mt-2 font-sans text-[var(--light)] opacity-70">
            Contact our support team at{" "}
            <a
              href="mailto:support@mile21.com"
              className="text-[var(--callouts)] underline"
            >
              support@mile21.com
            </a>{" "}
            and include your order number for fastest assistance.
          </p>
        </div>
      </section>
    </InteriorLayout>
  );
}

