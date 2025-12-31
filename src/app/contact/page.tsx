"use client";

import { useState } from "react";
import { InteriorLayout } from "../../components/figma/InteriorLayout";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your backend
    setSubmitted(true);
  };

  return (
    <InteriorLayout
      title="CONTACT US"
      subtitle="Questions, feedback, or just want to talk running? We're here."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="flex h-[300px] items-center justify-center rounded-sm border border-[var(--callouts)] bg-[var(--void-extra-light)] p-8">
              <div className="text-center">
                <p className="font-archivo text-[1.25rem] font-bold text-[var(--callouts)]">
                  Message Sent!
                </p>
                <p className="mt-2 font-sans text-[var(--light)] opacity-70">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-60"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[14px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)]"
                  placeholder="Jane Runner"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-60"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[14px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)]"
                  placeholder="runner@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-60"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="h-12 w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 font-sans text-[14px] text-[var(--light)] focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)]"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="product">Product Questions</option>
                  <option value="wholesale">Wholesale / Partnership</option>
                  <option value="press">Press / Media</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-wider text-[var(--light)] opacity-60"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border border-[var(--void-extra-light)] bg-[var(--dark)] px-4 py-3 font-sans text-[14px] text-[var(--light)] placeholder:text-[var(--light)]/30 focus:border-[var(--callouts)] focus:outline-none focus:ring-1 focus:ring-[var(--callouts)]"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center border-2 border-[var(--callouts)] bg-[var(--light)] font-mono text-[12px] font-bold uppercase tracking-wider text-[var(--dark)] transition-all duration-200 hover:border-[var(--light)] hover:bg-[var(--callouts)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--callouts)]">
              Email
            </h3>
            <p className="mt-2 font-sans text-[var(--light)]">
              <a
                href="mailto:support@mile21.com"
                className="transition-opacity hover:opacity-70"
              >
                support@mile21.com
              </a>
            </p>
            <p className="mt-1 font-sans text-[13px] text-[var(--light)] opacity-60">
              We respond within 24 hours
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--callouts)]">
              Headquarters
            </h3>
            <p className="mt-2 font-sans text-[var(--light)]">
              Mile 21 Labs
              <br />
              Austin, TX 78701
              <br />
              United States
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--callouts)]">
              Business Hours
            </h3>
            <p className="mt-2 font-sans text-[var(--light)]">
              Monday – Friday
              <br />
              9:00 AM – 6:00 PM CST
            </p>
          </div>

          <div className="border-l-4 border-[var(--red)] bg-[var(--void-extra-light)] p-5">
            <p className="font-archivo font-bold text-[var(--light)]">
              Order Issues?
            </p>
            <p className="mt-2 font-sans text-[13px] text-[var(--light)] opacity-70">
              For fastest support on orders, shipping, or returns, please
              include your order number in your message.
            </p>
          </div>
        </div>
      </div>
    </InteriorLayout>
  );
}

