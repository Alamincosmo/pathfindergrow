import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pathfinder Grow | High-Yield Digital Growth Studio",
  description:
    "We engineer high-converting 3D web platforms, Generative Engine Optimization (GEO), high-ticket brand identities, and resilient automated cloud systems that multiply enterprise revenue.",
  keywords: [
    "Digital Growth Studio",
    "Generative Engine Optimization",
    "GEO",
    "Modern SEO",
    "Next.js Development",
    "Tailwind CSS",
    "3D Web Design",
    "Brand Identity & Logo Design",
    "Healthcare SaaS",
    "Business Automation",
    "Md Siyam",
    "Robin",
    "Pathfinder Grow",
  ],
  authors: [{ name: "Md Siyam & Robin" }],
  icons: {
    icon: "/logo.webp",
  },
  openGraph: {
    title: "Pathfinder Grow | High-Yield Digital Growth Studio",
    description:
      "We engineer high-converting 3D web platforms, Generative Engine Optimization (GEO), high-ticket brand identities, and resilient automated cloud systems.",
    url: "https://pathfindergrow.com",
    siteName: "Pathfinder Grow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pathfinder Grow | High-Yield Digital Growth Studio",
    description:
      "We engineer high-converting 3D web platforms, Generative Engine Optimization (GEO), high-ticket brand identities, and resilient automated cloud systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-[#F8FAF9] text-[#0F172A] font-sans antialiased selection:bg-[#23AB82]/20 selection:text-[#0F172A]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
