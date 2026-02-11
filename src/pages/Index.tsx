import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/portfolio/ProgressBar";
import SidebarNav from "@/components/portfolio/SidebarNav";
import FloatingMuteButton from "@/components/portfolio/FloatingMuteButton";

import HeroSection from "@/components/portfolio/HeroSection";
import Level100 from "@/components/portfolio/Level100";
import Level200 from "@/components/portfolio/Level200";
import Level300 from "@/components/portfolio/Level300";
import Level400 from "@/components/portfolio/Level400";
import Level500 from "@/components/portfolio/Level500";
import AccessGate from "@/components/portfolio/AccessGate";

const Index = () => {
  const [activeLevel, setActiveLevel] = useState(100);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("portfolio_unlocked") === "true";
  });

  const handleLevelClick = useCallback((level: number) => {
    const element = document.getElementById(`level-${level}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleScrollToFirst = useCallback(() => {
    handleLevelClick(100);
  }, [handleLevelClick]);

  const handleUnlock = useCallback(() => {
    setIsAuthenticated(true);
    localStorage.setItem("portfolio_unlocked", "true");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // 100-500 levels mapping logic
      const levels = [100, 200, 300, 400, 500];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = levels.length - 1; i >= 0; i--) {
        const element = document.getElementById(`level-${levels[i]}`);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveLevel(levels[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Access Gate */}
      <AnimatePresence>
        {!isAuthenticated && <AccessGate onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Main Content - Only visible after authentication */}
      {isAuthenticated && (
        <>
          <ProgressBar />
          <SidebarNav activeLevel={activeLevel} onLevelClick={handleLevelClick} />
          
          {/* Global Audio Controls */}
          <FloatingMuteButton />

          <main>
            <HeroSection onScrollClick={handleScrollToFirst} />
            <Level100 />
            <Level200 />
            <Level300 />
            <Level400 />
            <Level500 />
          </main>
        </>
      )}
    </div>
  );
};

export default Index;