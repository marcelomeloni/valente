import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { TurtleSection } from "@/components/home/TurtleSection";
import { InversionSection } from "@/components/home/InversionSection";

import { WordCloudSection } from "@/components/home/WorldCloudSection";
import { LegacySection } from "@/components/home/LegacySection";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
  

      <main className="flex w-full flex-1 flex-col">
        {/* 1. O Início Impactante */}
        <HeroSection />
          <TurtleSection />
          <InversionSection/>
          <WordCloudSection/>

    <LegacySection/>
      </main>

    </div>
  );
}