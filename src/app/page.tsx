import Navbar, { StickyCta } from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import StatementBand from "@/components/StatementBand";
import ProofStrip from "@/components/ProofStrip";
import GrowthCards from "@/components/GrowthCards";
import GeoStage from "@/components/GeoStage";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Founders from "@/components/Founders";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import StartForm from "@/components/StartForm";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { buildJsonLd } from "@/lib/jsonld";

export default function Home() {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <StatementBand />
        <ProofStrip />
        <GrowthCards />
        <GeoStage />
        <Work />
        <Process />
        <Founders />
        <Pricing />
        <Faq />
        <StartForm />
      </main>
      <Footer />
      <StickyCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </>
  );
}
