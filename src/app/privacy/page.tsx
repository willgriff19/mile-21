import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Privacy Policy | Mile 21",
  description:
    "Mile 21 Privacy Policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <InteriorLayout
      title="PRIVACY POLICY"
      subtitle="Last updated: January 1, 2025"
    >
      <section className="space-y-8 font-sans text-[var(--light)] opacity-80">
        <p>
          Mile 21 Labs ("Mile 21," "we," "us," or "our") is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our
          website mile21.com (the "Site") or make a purchase from us.
        </p>

        <p>
          Please read this Privacy Policy carefully. By using the Site, you
          agree to the collection and use of information in accordance with this
          policy.
        </p>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            1. INFORMATION WE COLLECT
          </h2>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Personal Information You Provide
          </h3>
          <p className="mt-3">
            We collect personal information that you voluntarily provide when
            you:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Create an account or place an order</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us with inquiries or feedback</li>
            <li>Participate in promotions or surveys</li>
          </ul>
          <p className="mt-3">This information may include:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Name and email address</li>
            <li>Billing and shipping address</li>
            <li>Phone number</li>
            <li>Payment information (processed securely by our payment provider)</li>
            <li>Order history and preferences</li>
          </ul>

          <h3 className="mt-6 font-archivo font-bold text-[var(--light)]">
            Information Collected Automatically
          </h3>
          <p className="mt-3">
            When you visit our Site, we automatically collect certain
            information, including:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>IP address and browser type</li>
            <li>Device information and operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website or source</li>
            <li>Geographic location (country/region level)</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            2. HOW WE USE YOUR INFORMATION
          </h2>
          <p className="mt-4">We use the information we collect to:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations, shipping updates, and receipts</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website, products, and services</li>
            <li>Analyze usage patterns and trends</li>
            <li>Prevent fraud and maintain security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            3. COOKIES AND TRACKING TECHNOLOGIES
          </h2>
          <p className="mt-4">
            We use cookies and similar tracking technologies to enhance your
            experience on our Site. Cookies are small data files stored on your
            device that help us:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Remember your preferences and cart contents</li>
            <li>Understand how you use our Site</li>
            <li>Deliver relevant advertising</li>
            <li>Analyze Site performance</li>
          </ul>
          <p className="mt-4">
            You can control cookies through your browser settings. Note that
            disabling cookies may affect Site functionality.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            4. SHARING YOUR INFORMATION
          </h2>
          <p className="mt-4">
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>
              <span className="font-bold text-[var(--light)]">
                Service Providers:
              </span>{" "}
              Companies that help us operate our business (payment processors,
              shipping carriers, email services, analytics providers)
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Legal Requirements:
              </span>{" "}
              When required by law, court order, or government request
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Business Transfers:
              </span>{" "}
              In connection with a merger, acquisition, or sale of assets
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                With Your Consent:
              </span>{" "}
              When you have given us permission to share
            </li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            5. DATA SECURITY
          </h2>
          <p className="mt-4">
            We implement appropriate technical and organizational security
            measures to protect your personal information, including:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>SSL/TLS encryption for data transmission</li>
            <li>Secure payment processing (PCI-DSS compliant)</li>
            <li>Regular security assessments</li>
            <li>Limited access to personal information on a need-to-know basis</li>
          </ul>
          <p className="mt-4">
            However, no method of transmission over the Internet is 100% secure.
            While we strive to protect your information, we cannot guarantee
            absolute security.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            6. YOUR RIGHTS AND CHOICES
          </h2>
          <p className="mt-4">Depending on your location, you may have the right to:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Object to certain processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p className="mt-4">
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:privacy@mile21.com"
              className="text-[var(--callouts)] underline"
            >
              privacy@mile21.com
            </a>
            .
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            7. DATA RETENTION
          </h2>
          <p className="mt-4">
            We retain your personal information for as long as necessary to
            fulfill the purposes for which it was collected, including:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Processing orders and maintaining order history</li>
            <li>Providing customer support</li>
            <li>Complying with legal and regulatory requirements</li>
            <li>Resolving disputes</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            8. CHILDREN'S PRIVACY
          </h2>
          <p className="mt-4">
            Our Site is not intended for children under 18 years of age. We do
            not knowingly collect personal information from children. If we
            learn we have collected information from a child under 18, we will
            delete that information promptly.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            9. CALIFORNIA PRIVACY RIGHTS (CCPA)
          </h2>
          <p className="mt-4">
            California residents have additional rights under the California
            Consumer Privacy Act (CCPA), including the right to:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Know what personal information is collected</li>
            <li>Know whether personal information is sold or disclosed</li>
            <li>Say no to the sale of personal information</li>
            <li>Access your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Not be discriminated against for exercising your rights</li>
          </ul>
          <p className="mt-4">
            We do not sell personal information as defined by the CCPA.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            10. CHANGES TO THIS POLICY
          </h2>
          <p className="mt-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting the new policy on this page
            and updating the "Last updated" date. We encourage you to review
            this policy periodically.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            11. CONTACT US
          </h2>
          <p className="mt-4">
            If you have questions about this Privacy Policy or our privacy
            practices, please contact us at:
          </p>
          <div className="mt-4 bg-[var(--void-extra-light)] p-6">
            <p className="font-bold text-[var(--light)]">Mile 21 Labs</p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:privacy@mile21.com"
                className="text-[var(--callouts)] underline"
              >
                privacy@mile21.com
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

