"use client";

import { MasterLayout } from '@/frontend/layouts/Master';
import { Hero } from '@/frontend/_components/sections/Hero';
import { Stats } from '@/frontend/_components/sections/Stats';
import { Features } from '@/frontend/_components/sections/Features';
import { CTA } from '@/frontend/_components/sections/CTA';
import { GridBackground } from '@/frontend/_components/ui/GridBackground';
import { FloatingOrbs } from '@/frontend/_components/ui/FloatingOrbs';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <MasterLayout>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-[100] origin-left shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        style={{ scaleX }}
      />

      <GridBackground />
      <FloatingOrbs />

      <main className="relative z-10 w-full overflow-hidden flex flex-col items-center">
        <div id="hero" className="w-full">
          <Hero />
        </div>

        {/* Hero to Stats Divider */}
        <div className="w-full max-w-7xl relative h-24 sm:h-32 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10" />
          <div className="w-[1px] h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
        </div>

        <div className="w-full flex justify-center pb-24 lg:pb-32">
          <div className="w-full flex justify-center relative">
            {/* Ambient background glow for Stats */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <SectionWrapper>
              <Stats />
            </SectionWrapper>
          </div>
        </div>

        {/* Stats to Features Divider */}
        <div className="w-full max-w-7xl relative h-24 sm:h-32 flex items-center justify-center pointer-events-none">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent absolute top-1/2" />
        </div>

        <div className="w-full pb-24 lg:pb-32">
          <SectionWrapper>
            <Features />
          </SectionWrapper>
        </div>

        {/* Features to CTA Divider */}
        <div className="w-full max-w-7xl relative h-24 sm:h-32 flex items-center justify-center pointer-events-none">
          <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-primary/20 to-primary/50" />
        </div>

        <div className="w-full pb-12 lg:pb-24">
          <SectionWrapper>
            <CTA />
          </SectionWrapper>
        </div>
      </main>
    </MasterLayout>
  );
}

// Internal Expert Component for reveal animations
function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
