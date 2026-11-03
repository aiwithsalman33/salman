import { BootSequence } from "@/components/motion/BootSequence";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Navbar } from "@/components/navigation/Navbar";
import { SceneLoader } from "@/components/scenes/SceneLoader";
import { TrajectoryRail } from "@/components/navigation/TrajectoryRail";
import { Footer } from "@/components/navigation/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkIntroSection } from "@/components/sections/WorkIntroSection";
import { WorkCategorySection } from "@/components/work/WorkCategorySection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { CreatorSection } from "@/components/sections/CreatorSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { workCategories } from "@/data/work";

export default function Home() {
  return (
    <>
      <BootSequence />
      <ScrollProgress />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SceneLoader />
      <Navbar />
      <TrajectoryRail />
      {/* Content stacks above the fixed 3D canvas. */}
      <main id="main" tabIndex={-1} className="relative z-1 outline-none">
        <HeroSection />
        <AboutSection />
        <WorkIntroSection />
        {workCategories.map((category) => (
          <WorkCategorySection key={category.id} category={category} />
        ))}
        <SkillsSection />
        <JourneySection />
        <CreatorSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
