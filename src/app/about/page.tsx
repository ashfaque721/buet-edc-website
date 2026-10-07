"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import {
  Megaphone,
  CalendarDays,
  Handshake,
  Boxes,
  Palette,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const departments = [
  {
    number: "01",
    title: "Media and Public Relations",
    icon: Megaphone,
    description:
      "Drives external communications, press outreach, social storytelling, and campus engagement to amplify BUET EDC's mission and entrepreneurial ecosystem.",
  },
  {
    number: "02",
    title: "Events",
    icon: CalendarDays,
    description:
      "Curates and executes flagship competitions, national ideathons, startup masterclasses, and networking summits with seamless on-ground coordination.",
  },
  {
    number: "03",
    title: "Sponsorship",
    icon: Handshake,
    description:
      "Establishes corporate partnerships, brand alliances, and industry sponsorships, securing vital capital and strategic resources for club ventures.",
  },
  {
    number: "04",
    title: "Logistics",
    icon: Boxes,
    description:
      "Manages end-to-end venue operations, equipment procurement, stage infrastructure, and resource deployment for all on-campus and flagship events.",
  },
  {
    number: "05",
    title: "Design & Creatives",
    icon: Palette,
    description:
      "Shapes the visual identity, digital assets, motion graphics, and print media, crafting captivating brand aesthetics for EDC initiatives.",
  },
];

const pillars = [
  {
    title: "Ideation",
    icon: Sparkles,
    description:
      "Brainstorming and shaping raw ideas into viable concepts through national ideathons, design sprints, and problem-solving workshops.",
  },
  {
    title: "Incubation",
    icon: Target,
    description:
      "Providing workspace, mentorship from alumni founders, and technical resources for student startups to construct their initial MVP.",
  },
  {
    title: "Industry Connect",
    icon: TrendingUp,
    description:
      "Connecting promising founders with angel investors, VC firms, and corporate leaders to unlock seed funding and global acceleration.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen w-full">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3.5 rounded-full bg-brand-accent/15 text-brand-accent font-semibold text-xs tracking-wider uppercase border border-brand-accent/30 mb-4 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            Our Identity & Legacy
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Building the Next Wave of <span className="text-brand-accent">Ventures</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            The official Entrepreneurship Development Club of BUET, fostering innovation,
            deep-tech incubation, and industry bridges for engineering minds since inception.
          </p>
        </div>

        {/* Leadership Perspectives */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 items-stretch">
          <div className="glass-panel bg-gradient-to-br from-[#013565]/60 to-[#0e3775]/40 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-accent/90 bg-brand-accent/15 px-3 py-1 rounded-full border border-brand-accent/30 inline-block mb-4">
                Faculty Perspective
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                Message from Club Moderator
              </h3>
              <p className="italic text-white/80 leading-relaxed text-base sm:text-lg mb-6">
                &ldquo;Our vision has always been to bridge the gap between academic brilliance and entrepreneurial execution. EDC acts as the launchpad where engineering students test their disruptive hypotheses in the real world.&rdquo;
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 font-semibold text-white">
              Dr. Mohammad Muntasir
              <span className="block text-xs font-normal text-brand-accent mt-0.5">
                Club Moderator, BUET EDC • Associate Professor, BUET
              </span>
            </div>
          </div>

          <div className="glass-panel bg-gradient-to-br from-[#013565]/60 to-[#0e3775]/40 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-accent/90 bg-brand-accent/15 px-3 py-1 rounded-full border border-brand-accent/30 inline-block mb-4">
                Founder&apos;s Heritage
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                Founding President&apos;s Vision
              </h3>
              <p className="italic text-white/80 leading-relaxed text-base sm:text-lg mb-6">
                &ldquo;We started EDC with a simple conviction: BUET engineers are creating breakthrough technologies, but they need an authentic ecosystem to build scalable ventures. We engineered that ecosystem from the ground up.&rdquo;
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 font-semibold text-white">
              Shafiqul Islam
              <span className="block text-xs font-normal text-brand-accent mt-0.5">
                Founding President, BUET EDC
              </span>
            </div>
          </div>
        </div>

        {/* Key Pillars */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <span className="inline-block py-1 px-3.5 rounded-full bg-brand-accent/15 text-brand-accent font-semibold text-xs tracking-wider uppercase border border-brand-accent/30 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              Core Framework
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our Key <span className="text-brand-accent">Pillars</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
              Three interconnected pillars guiding students from their earliest raw concept to market-ready validation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-gradient-to-br from-[#013565]/80 to-[#0e3775]/70 border border-white/10 rounded-3xl p-8 sm:p-9 backdrop-blur-md flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 shadow-[0_8px_32px_0_rgba(1,53,101,0.3)] hover:border-brand-accent/50"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-6 shadow-sm">
                    <pillar.icon size={26} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-white/75 text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dedicated Section: Our Wings & Departments ── */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <span className="inline-block py-1 px-3.5 rounded-full bg-brand-accent/15 text-brand-accent font-semibold text-xs tracking-wider uppercase border border-brand-accent/30 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              Organizational Structure
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Our Wings & <span className="text-brand-accent">Departments</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
              The specialized functional arms executing the club&apos;s flagship initiatives, corporate tie-ups, and venture incubation programs.
            </p>
          </div>

          <div className="max-w-5xl mx-auto divide-y divide-white/10 border-t border-b border-white/10 bg-white/[0.01] rounded-2xl overflow-hidden backdrop-blur-sm">
            {departments.map((dept) => (
              <div
                key={dept.number}
                className="group py-6 sm:py-8 px-4 sm:px-8 hover:bg-white/[0.04] transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8"
              >
                <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                  <span className="text-xs font-mono text-[#38bdf8]/70 tracking-widest pt-1 sm:pt-0 shrink-0 font-semibold">
                    {dept.number}
                  </span>

                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent group-hover:scale-110 group-hover:bg-brand-accent/15 group-hover:border-brand-accent/30 transition-all duration-300 shrink-0 shadow-sm">
                    <dept.icon size={22} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-brand-accent transition-colors">
                      {dept.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mt-1 max-w-2xl">
                      {dept.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center text-xs font-mono text-white/30 tracking-widest uppercase shrink-0 group-hover:text-brand-accent/70 transition-colors">
                  WING // ACTIVE
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block py-1 px-3.5 rounded-full bg-brand-accent/15 text-brand-accent font-semibold text-xs tracking-wider uppercase border border-brand-accent/30 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              Historical Milestones
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              Interactive <span className="text-brand-accent">Timeline</span>
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {[
              { year: "2019", text: "Founded to foster entrepreneurship and venture creation among engineering students at BUET." },
              { year: "2021", text: "Launched the first university-level incubation program, producing multiple funded student startups." },
              { year: "2023", text: "Hosted the premier National Ideathon with 500+ participants and leading corporate venture partners." },
              { year: "2025", text: "Expanded global industry linkages and connected alumni ventures with venture capital accelerators." },
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#001124] bg-brand-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-brand-accent/30 transition-colors">
                  <div className="font-bold text-brand-accent mb-2 text-xl font-mono">{item.year}</div>
                  <div className="text-white/80 text-sm sm:text-base leading-relaxed">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
