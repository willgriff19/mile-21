import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Terms of Use | Mile 21",
  description:
    "Mile 21 Terms of Use. Terms and conditions for using our website and purchasing our products.",
};

export default function TermsPage() {
  return (
    <InteriorLayout title="TERMS OF USE" subtitle="Last updated: January 1, 2025">
      <section className="space-y-8 font-sans text-[var(--light)] opacity-80">
        <p>
          Welcome to Mile 21. These Terms of Use ("Terms") govern your access to
          and use of the Mile 21 website located at mile21.com (the "Site") and
          the purchase of products from Mile 21 Labs ("Mile 21," "we," "us," or
          "our").
        </p>

        <p>
          By accessing or using the Site, you agree to be bound by these Terms.
          If you do not agree to these Terms, please do not use the Site.
        </p>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            1. ELIGIBILITY
          </h2>
          <p className="mt-4">
            You must be at least 18 years old to use this Site and purchase our
            products. By using the Site, you represent and warrant that you are
            at least 18 years of age and have the legal capacity to enter into
            these Terms.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            2. ACCOUNT REGISTRATION
          </h2>
          <p className="mt-4">
            To make purchases, you may need to create an account. You agree to:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activity under your account</li>
          </ul>
          <p className="mt-4">
            We reserve the right to suspend or terminate accounts that violate
            these Terms.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            3. PRODUCTS AND ORDERS
          </h2>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Product Information
          </h3>
          <p className="mt-3">
            We strive to display accurate product descriptions, images, and
            pricing. However, we do not warrant that product descriptions or
            other content is accurate, complete, or error-free. Colors may vary
            based on monitor settings.
          </p>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Pricing
          </h3>
          <p className="mt-3">
            All prices are listed in US dollars and are subject to change
            without notice. We reserve the right to correct pricing errors and
            cancel orders placed at incorrect prices.
          </p>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Order Acceptance
          </h3>
          <p className="mt-3">
            Your order is an offer to purchase. We reserve the right to accept
            or decline any order for any reason, including product availability,
            suspected fraud, or errors in product information or pricing.
          </p>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Payment
          </h3>
          <p className="mt-3">
            We accept major credit cards and other payment methods as displayed
            at checkout. By providing payment information, you represent that
            you are authorized to use the payment method. All payments are
            processed securely through our third-party payment processor.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            4. SHIPPING AND DELIVERY
          </h2>
          <p className="mt-4">
            Shipping times and costs are estimates only. We are not responsible
            for delays caused by carriers, customs, weather, or other factors
            outside our control. Risk of loss passes to you upon delivery to the
            carrier.
          </p>
          <p className="mt-4">
            For complete shipping information, please see our{" "}
            <a href="/shipping" className="text-[var(--callouts)] underline">
              Shipping & Delivery
            </a>{" "}
            page.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            5. RETURNS AND REFUNDS
          </h2>
          <p className="mt-4">
            We offer a 30-day money-back guarantee on our products. For complete
            details on our return policy, please see our{" "}
            <a href="/returns" className="text-[var(--callouts)] underline">
              Returns & Refunds
            </a>{" "}
            page.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            6. PRODUCT DISCLAIMERS
          </h2>
          <div className="mt-4 border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-4">
            <p className="font-bold text-[var(--light)]">Important Notice</p>
            <p className="mt-2 text-[13px]">
              These statements have not been evaluated by the Food and Drug
              Administration. Our products are not intended to diagnose, treat,
              cure, or prevent any disease.
            </p>
          </div>
          <p className="mt-4">
            Our products are dietary supplements intended for use by healthy
            adults. You should consult with a healthcare professional before
            using any dietary supplement, especially if you:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Are pregnant, nursing, or trying to become pregnant</li>
            <li>Have a medical condition</li>
            <li>Are taking prescription or over-the-counter medications</li>
            <li>Have allergies or sensitivities to any ingredients</li>
          </ul>
          <p className="mt-4">
            Individual results may vary. Do not exceed recommended serving
            sizes.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            7. INTELLECTUAL PROPERTY
          </h2>
          <p className="mt-4">
            All content on this Site—including text, graphics, logos, images,
            product descriptions, and software—is the property of Mile 21 Labs
            or its content suppliers and is protected by intellectual property
            laws.
          </p>
          <p className="mt-4">You may not:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Copy, reproduce, or distribute our content without permission</li>
            <li>Modify or create derivative works from our content</li>
            <li>Use our trademarks without written authorization</li>
            <li>
              Use our content for commercial purposes without our consent
            </li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            8. USER CONDUCT
          </h2>
          <p className="mt-4">When using our Site, you agree not to:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on the rights of others</li>
            <li>Submit false or misleading information</li>
            <li>
              Attempt to gain unauthorized access to our systems or other users'
              accounts
            </li>
            <li>
              Use automated systems (bots, scrapers) to access the Site without
              permission
            </li>
            <li>Interfere with or disrupt the Site's operation</li>
            <li>
              Engage in any activity that could damage our reputation or
              business
            </li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            9. DISCLAIMER OF WARRANTIES
          </h2>
          <p className="mt-4">
            THE SITE AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE"
            WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL
            WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="mt-4">
            We do not warrant that the Site will be uninterrupted, error-free,
            or free of viruses or other harmful components.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            10. LIMITATION OF LIABILITY
          </h2>
          <p className="mt-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, MILE 21 LABS SHALL NOT BE
            LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR PRODUCTS.
          </p>
          <p className="mt-4">
            OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS SHALL NOT
            EXCEED THE AMOUNT YOU PAID FOR THE SPECIFIC PRODUCT GIVING RISE TO
            THE CLAIM.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            11. INDEMNIFICATION
          </h2>
          <p className="mt-4">
            You agree to indemnify and hold harmless Mile 21 Labs, its officers,
            directors, employees, and agents from any claims, damages, losses,
            or expenses (including attorneys' fees) arising from your use of the
            Site, violation of these Terms, or infringement of any rights of a
            third party.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            12. GOVERNING LAW AND DISPUTES
          </h2>
          <p className="mt-4">
            These Terms are governed by the laws of the State of Texas, without
            regard to conflict of law principles. Any disputes arising from
            these Terms or your use of the Site shall be resolved in the state
            or federal courts located in Travis County, Texas.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            13. CHANGES TO TERMS
          </h2>
          <p className="mt-4">
            We may modify these Terms at any time. Changes will be effective
            immediately upon posting on this page. Your continued use of the
            Site after changes are posted constitutes acceptance of the modified
            Terms.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            14. SEVERABILITY
          </h2>
          <p className="mt-4">
            If any provision of these Terms is found to be invalid or
            unenforceable, the remaining provisions will continue in full force
            and effect.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            15. CONTACT US
          </h2>
          <p className="mt-4">
            If you have questions about these Terms, please contact us at:
          </p>
          <div className="mt-4 bg-[var(--void-extra-light)] p-6">
            <p className="font-bold text-[var(--light)]">Mile 21 Labs</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:legal@mile21.com"
                className="text-[var(--callouts)] underline"
              >
                legal@mile21.com
              </a>
            </p>
            <p className="mt-1">Austin, TX 78701</p>
            <p className="mt-1">United States</p>
          </div>
        </div>
      </section>
    </InteriorLayout>
  );
}

