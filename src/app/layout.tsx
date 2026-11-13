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

// Brand first, so a search for "Pathfinder Grow" matches the start of the title.
const TITLE = "Pathfinder Grow | Business Growth Company: Websites, Apps, SEO & Ads";
const DESCRIPTION =
  "Pathfinder Grow helps businesses grow in every direction: websites, apps, ads, branding, SEO and AI search. Built platforms used by 3M+ people. 200+ businesses grown.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pathfindergrow.com"),
  title: { default: TITLE, template: "%s | Pathfinder Grow" },
  description: DESCRIPTION,
  applicationName: "Pathfinder Grow",
  alternates: { canonical: "/" },
  authors: [
    { name: "Robin", url: "/team/robin" },
    { name: "Md. Siyam", url: "/team/siyam" },
  ],
  creator: "Pathfinder Grow",
  publisher: "Pathfinder Grow",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Google shows the favicon beside every result: square, larger than 48x48, stable URL, crawlable.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { title: "Pathfinder Grow", statusBarStyle: "default" },
  formatDetection: { telephone: false },
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
  themeColor: "#F4F8F5",
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
      <body className="bg-paper font-sans text-ink antialiased">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.scroll-word{opacity:1!important}`}</style>
        </noscript>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
