import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "../components/ui/CursorGlow";
import { PHProvider } from "./providers";
import PostHogPageView from "./PostHogPageView";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  style: ["normal", "italic"],
  weight: ["400", "600", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "600"],
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  style: ["normal", "italic"],
  // Variable font where available; otherwise these weights cover UI/body needs.
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mile 21 | Pre-Workout for Runners",
    template: "%s | Mile 21",
  },
  description:
    "Stop using gym supplements for running. Mile 21 is a gut-friendly, sustained-energy formula designed for the 21st mile. No jitters, no crash. Join the waitlist in Provo, UT.",
  keywords: [
    "endurance pre workout",
    "pre workout for runners",
    "marathon training supplements",
    "supplement for runner stomach",
    "citrulline for running",
    "non-stimulant energy for runners",
  ],
  openGraph: {
    title: "Mile 21 | Pre-Workout for Runners",
    description:
      "Stop using gym supplements for running. Mile 21 is a gut-friendly, sustained-energy formula designed for the 21st mile. No jitters, no crash.",
    type: "website",
    locale: "en_US",
    siteName: "Mile 21",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mile 21 | Pre-Workout for Runners",
    description:
      "Stop using gym supplements for running. Mile 21 is a gut-friendly, sustained-energy formula designed for the 21st mile.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${archivo.variable} ${inter.variable}`}
    >
      <body className="bg-[var(--void-lite)] font-sans antialiased">
        <CursorGlow />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-brand-red focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-brand-text-primary"
        >
          Skip to content
        </a>
        <PHProvider>
          <PostHogPageView />
          {children}
        </PHProvider>
      </body>
    </html>
  );
}
