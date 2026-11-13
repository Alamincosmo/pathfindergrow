import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const TITLE = "Pathfinder Grow | Digital Growth Studio: SEO, AI Search, Brand & Websites";
const DESCRIPTION =
  "Founder-led digital growth studio. SEO and AI-search visibility, brand identity, fast websites and automation to help your business get found, get chosen and grow.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pathfindergrow.com"),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  authors: [{ name: "Md. Siyam" }, { name: "Robin" }],
  icons: { icon: "/logo.webp" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://pathfindergrow.com",
    siteName: "Pathfinder Grow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#050D0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSans.variable} ${plexMono.variable}`}
    >
      <body className="bg-stage font-sans text-ink antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.scroll-word{opacity:1!important}`}</style>
        </noscript>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
