"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ResidencesSection } from "@/components/sections/ResidencesSection";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { InterestModal } from "@/components/ui/InterestModal";

export default function Home() {
  const [interestOpen, setInterestOpen] = useState(false);

  return (
    <>
      <Header onInterestClick={() => setInterestOpen(true)} />
      <main>
        <HeroSection />
        <LocationSection onInterestClick={() => setInterestOpen(true)} />
        <ManifestoSection />
        <ResidencesSection />
        <InvestmentSection />
        <AmenitiesSection onInterestClick={() => setInterestOpen(true)} />
      </main>
      <Footer />
      <InterestModal
        open={interestOpen}
        onClose={() => setInterestOpen(false)}
      />
    </>
  );
}
