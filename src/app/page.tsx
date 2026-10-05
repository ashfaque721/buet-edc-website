import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import MissionVision from "@/components/MissionVision";
import ShowreelGallery from "@/components/ShowreelGallery";
import Voices from "@/components/Voices";
import SponsorsMarquee from "@/components/SponsorsMarquee";
import JoinUsCta from "@/components/JoinUsCta";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import FloatingLines from "@/components/reactbits/FloatingLines";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-[#001124] text-white overflow-x-hidden">

      {/* ── Fixed Full Homepage FloatingLines Background from React Bits ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <FloatingLines
          linesGradient={["#0e3775", "#024282", "#0284c7", "#38bdf8", "#0e3775"]}
          backgroundColor="#001124"
          lineCount={[6, 7, 6]}
          lineDistance={[8, 7, 8]}
          topWavePosition={{ x: 8.0, y: 0.65, rotate: -0.3 }}
          middleWavePosition={{ x: 4.0, y: -0.2, rotate: 0.15 }}
          bottomWavePosition={{ x: 2.0, y: -0.75, rotate: 0.3 }}
          animationSpeed={0.7}
          interactive={true}
          bendRadius={5.0}
          bendStrength={-0.45}
          parallax={true}
          parallaxStrength={0.2}
          mixBlendMode="screen"
        />
      </div>

      {/* ── Ambient Radial Vignette Layer ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 80% at 50% 50%, transparent 40%, rgba(0, 17, 36, 0.75) 100%)",
        }}
      />

      {/* ── Foreground Sections ── */}
      <div className="relative z-10 w-full flex flex-col bg-transparent shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
        <Navbar />
        <Hero />
        <ImpactMetrics />
        <MissionVision />
        <ShowreelGallery />
        <Voices />
        <SponsorsMarquee />
        <JoinUsCta />
      </div>

      {/* ── Sticky Footer Reveal Animation ── */}
      <StickyFooterReveal />

    </main>
  );
}
