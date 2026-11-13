import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ServicesSection from "@/components/ServicesSection";
import GeoAdvantage from "@/components/GeoAdvantage";
import CaseStudies from "@/components/CaseStudies";
import EntrepreneurPlaybook from "@/components/EntrepreneurPlaybook";
import ProcessRoadmap from "@/components/ProcessRoadmap";
import FoundersTandem from "@/components/FoundersTandem";
import PricingSection from "@/components/PricingSection";
import AuditContactForm from "@/components/AuditContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAF9] text-[#0F172A] relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <StatsBar />
      <ServicesSection />
      <GeoAdvantage />
      <CaseStudies />
      <EntrepreneurPlaybook />
      <ProcessRoadmap />
      <FoundersTandem />
      <PricingSection />
      <AuditContactForm />
      <Footer />
    </main>
  );
}
