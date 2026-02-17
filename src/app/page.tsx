import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ResidencesSection } from "@/components/sections/ResidencesSection";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LocationSection />
        <ManifestoSection />
        <ResidencesSection />
        <InvestmentSection />
        <AmenitiesSection />
        <ArchitectureSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
