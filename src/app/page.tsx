import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import ImpactMetrics from "@/components/ImpactMetrics";
import MissionVision from "@/components/MissionVision";
import ShowreelGallery from "@/components/ShowreelGallery";
import Voices from "@/components/Voices";
import SponsorsMarquee from "@/components/SponsorsMarquee";
import JoinUsCta from "@/components/JoinUsCta";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import HomeFloatingBackground from "@/components/home/HomeFloatingBackground";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col bg-[#001124] text-white overflow-x-hidden">

      {/* ── Fixed Full Homepage FloatingLines Background loaded dynamically ── */}
      <HomeFloatingBackground />

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
