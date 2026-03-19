import { HeroSection } from "@/components/home/HeroSection";
import { TurtleSection } from "@/components/home/TurtleSection";
import { InversionSection } from "@/components/home/InversionSection";
import { WordCloudSection } from "@/components/home/WorldCloudSection";
import { LegacySection } from "@/components/home/LegacySection";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {/* Usando delay 0.1 para que o hero já carregue logo após a página renderizar */}
        <MotionWrapper animationType="fade-in" delay={0.1}>
          <HeroSection />
        </MotionWrapper>
        
        <MotionWrapper animationType="fade-up" delay={0.2}>
          <TurtleSection />
        </MotionWrapper>
        
        <MotionWrapper animationType="slide-in-right" delay={0.2}>
          <InversionSection />
        </MotionWrapper>
        
        <MotionWrapper animationType="fade-up" delay={0.2}>
          <WordCloudSection />
        </MotionWrapper>

        <MotionWrapper animationType="fade-in" delay={0.2}>
          <LegacySection />
        </MotionWrapper>
      </main>
    </div>
  );
}