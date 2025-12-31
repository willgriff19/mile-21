import { InteriorLayout } from "../../components/figma/InteriorLayout";

export const metadata = {
  title: "Accessibility | Mile 21",
  description:
    "Mile 21 Accessibility Statement. Our commitment to making our website accessible to everyone.",
};

export default function AccessibilityPage() {
  return (
    <InteriorLayout
      title="ACCESSIBILITY STATEMENT"
      subtitle="Our commitment to digital inclusion."
    >
      <section className="space-y-8 font-sans text-[var(--light)] opacity-80">
        <p>
          Mile 21 Labs is committed to ensuring digital accessibility for people
          of all abilities. We are continually improving the user experience for
          everyone and applying the relevant accessibility standards.
        </p>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            OUR COMMITMENT
          </h2>
          <p className="mt-4">
            We strive to ensure that our website conforms to the Web Content
            Accessibility Guidelines (WCAG) 2.1 Level AA standards. These
            guidelines explain how to make web content more accessible for
            people with disabilities and more user-friendly for everyone.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            ACCESSIBILITY FEATURES
          </h2>
          <p className="mt-4">
            We have implemented the following features to support accessibility:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-3">
            <li>
              <span className="font-bold text-[var(--light)]">
                Keyboard Navigation:
              </span>{" "}
              All interactive elements can be accessed using a keyboard alone
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Screen Reader Compatibility:
              </span>{" "}
              Our site is designed to work with popular screen readers
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Alternative Text:
              </span>{" "}
              Images include descriptive alt text for screen reader users
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Color Contrast:
              </span>{" "}
              Text and interactive elements meet minimum contrast ratios
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Resizable Text:
              </span>{" "}
              Text can be resized up to 200% without loss of functionality
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Focus Indicators:
              </span>{" "}
              Clear visual indicators show which element has keyboard focus
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">
                Semantic HTML:
              </span>{" "}
              Proper heading structure and landmark regions for easy navigation
            </li>
            <li>
              <span className="font-bold text-[var(--light)]">Form Labels:</span>{" "}
              All form inputs have associated labels for clarity
            </li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            ASSISTIVE TECHNOLOGIES
          </h2>
          <p className="mt-4">
            Our website is designed to be compatible with the following
            assistive technologies:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
            <li>Screen magnification software</li>
            <li>Speech recognition software</li>
            <li>Keyboard-only navigation</li>
            <li>Switch devices</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            BROWSER COMPATIBILITY
          </h2>
          <p className="mt-4">
            For the best experience, we recommend using the latest versions of:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>Google Chrome</li>
            <li>Mozilla Firefox</li>
            <li>Apple Safari</li>
            <li>Microsoft Edge</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            KNOWN LIMITATIONS
          </h2>
          <p className="mt-4">
            While we strive for full accessibility, some content may have
            limitations:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>
              Some older PDF documents may not be fully accessible; we are
              working to remediate these
            </li>
            <li>
              Third-party content or embedded widgets may have their own
              accessibility limitations
            </li>
            <li>
              Some complex interactive features may require additional
              improvements
            </li>
          </ul>
          <p className="mt-4">
            We are actively working to address these issues and improve
            accessibility across our site.
          </p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            FEEDBACK AND ASSISTANCE
          </h2>
          <p className="mt-4">
            We welcome your feedback on the accessibility of our website. If you
            encounter any accessibility barriers or have suggestions for
            improvement, please contact us:
          </p>
          <div className="mt-4 bg-[var(--void-extra-light)] p-6">
            <p className="font-bold text-[var(--light)]">
              Accessibility Feedback
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:accessibility@mile21.com"
                className="text-[var(--callouts)] underline"
              >
                accessibility@mile21.com
              </a>
            </p>
            <p className="mt-3 text-[13px] opacity-70">
              Please include the following in your message:
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[13px] opacity-70">
              <li>The page URL where you encountered the issue</li>
              <li>A description of the accessibility barrier</li>
              <li>The assistive technology you were using (if applicable)</li>
            </ul>
          </div>
          <p className="mt-4">We aim to respond to accessibility feedback within 5 business days.</p>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            ALTERNATIVE ACCESS
          </h2>
          <p className="mt-4">
            If you are unable to access any content or feature on our website,
            please contact us and we will work to provide the information in an
            alternative format or assist you in completing your purchase.
          </p>
          <p className="mt-4">
            You can reach our customer support team at:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:support@mile21.com"
                className="text-[var(--callouts)] underline"
              >
                support@mile21.com
              </a>
            </li>
            <li>Phone: Available upon request</li>
          </ul>
        </div>

        <div className="h-px w-full bg-[var(--void-extra-light)]" />

        <div>
          <h2 className="font-archivo text-[1.25rem] font-bold italic text-[var(--callouts)]">
            ONGOING EFFORTS
          </h2>
          <p className="mt-4">Our accessibility efforts include:</p>
          <ul className="mt-4 list-inside list-disc space-y-2">
            <li>Regular accessibility audits and testing</li>
            <li>Training for our development and content teams</li>
            <li>Including accessibility in our design and development processes</li>
            <li>Monitoring for accessibility issues and addressing them promptly</li>
          </ul>
        </div>

        <div className="mt-8 border-l-4 border-[var(--callouts)] bg-[var(--void-extra-light)] p-6">
          <p className="font-archivo font-bold text-[var(--callouts)]">
            Last Updated
          </p>
          <p className="mt-2">
            This accessibility statement was last updated on January 1, 2025.
          </p>
        </div>
      </section>
    </InteriorLayout>
  );
}

