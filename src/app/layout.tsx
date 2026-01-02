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
    default: "Mile [21]",
    template: "Mile [21] - %s",
  },
  description: "Pure oxygen support and flow-state focus—priming your body for miles, not sets.",
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
