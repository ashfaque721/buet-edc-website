"use client";

import React from "react";
import { Quote, Sparkles } from "lucide-react";
import Image from "next/image";

const studentAlumniVoices = [
  {
    quote: "When we established EDC, our goal was simple: demystify entrepreneurship for engineers. Today, seeing funded startups and global ventures emerge directly from our community is incredibly fulfilling.",
    name: "Shafiqul Islam",
    role: "Founding President, BUET EDC",
    batch: "Batch '15",
  },
  {
    quote: "The hackathons, incubation bootcamps, and networking sessions hosted by EDC were pivotal in finding my co-founders. The direct exposure to venture capitalists gave us our earliest traction.",
    name: "Nabila Haque",
    role: "Alumni & YC-Backed Founder",
    batch: "Batch '17",
  },
  {
    quote: "Leading EDC has shown me the sheer magnitude of student innovation here. From deep-tech hardware to scalable software, this club bridges the gap between lab ideas and market disruption.",
    name: "Sadman Sakib",
    role: "President, Executive Board (2025–2026)",
    batch: "Batch '20",
  },
];

export default function Voices() {
  return (
    <section className="py-12 sm:py-16 md:py-24 relative z-10 h-auto min-h-0" id="voices">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="voice-header text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Voices of <span className="text-brand-accent">EDC</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Insights from our faculty leadership, founding pioneers, and alumni who engineered the entrepreneurial ecosystem.
          </p>
        </div>

        {/* ── 1. Distinguished Club Moderator Spotlight Banner ── */}
        <div className="moderator-spotlight rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 bg-gradient-to-br from-[#013565]/80 via-[#0e3775]/60 to-[#001124]/90 backdrop-blur-xl mb-8 md:mb-12 relative overflow-hidden shadow-[0_12px_40px_0_rgba(1,53,101,0.4)]">
          {/* Ambient Glow in Corner */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
            {/* Moderator Portrait */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-brand-accent/50 shadow-[0_0_30px_rgba(56,189,248,0.25)] relative bg-[#001124]">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Dr. Mohammad Muntasir - Club Moderator"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 144px, 144px"
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-accent text-[#013565] p-1.5 rounded-xl shadow-lg border border-white/20">
                <Sparkles size={16} />
              </div>
            </div>

            {/* Moderator Content & Quote */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-accent/20 text-brand-accent border border-brand-accent/30 tracking-wider uppercase mb-4 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
                Club Moderator&apos;s Perspective
              </div>

              {/* Quote Text */}
              <blockquote className="text-white/90 text-lg sm:text-xl md:text-2xl leading-relaxed font-normal tracking-tight mb-6 relative">
                &ldquo;BUET students possess exceptional analytical rigor and technical prowess. The mission of EDC is to channel that engineering intellect into scalable, sustainable venture creation. We aren&apos;t just nurturing managers; we are cultivating the next generation of deep-tech founders and industrial pioneers who will redefine Bangladesh&apos;s economic future.&rdquo;
              </blockquote>

              {/* Moderator Credentials */}
              <div className="border-t border-white/10 pt-4 w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Dr. Mohammad Muntasir
                  </h3>
                  <p className="text-brand-accent text-sm font-medium mt-0.5">
                    Club Moderator, BUET EDC • Associate Professor, BUET
                  </p>
                </div>
                <div className="text-xs text-white/50 font-mono tracking-wider uppercase">
                  Faculty Advisory Board
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. Student & Alumni Testimonials Grid ── */}
        <div className="voices-grid h-auto min-h-0 grid grid-cols-1 md:grid-cols-3 gap-6">
          {studentAlumniVoices.map((voice, i) => (
            <div
              key={i}
              className="voice-card glass-panel rounded-3xl p-7 sm:p-8 relative flex flex-col justify-between hover:bg-brand-primary/40 transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 shadow-[0_8px_32px_0_rgba(1,53,101,0.25)]"
            >
              <Quote size={36} className="text-brand-accent/20 absolute top-7 right-7 pointer-events-none" />
              
              <div className="flex-1 mb-8 pt-2">
                <p className="text-white/80 leading-relaxed text-base sm:text-lg italic">
                  &ldquo;{voice.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 pt-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-secondary to-[#013565] border border-white/15 flex items-center justify-center font-bold text-lg text-brand-accent shadow-inner shrink-0">
                  {voice.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-white text-base truncate">{voice.name}</h4>
                  <p className="text-brand-accent text-xs font-semibold mt-0.5 truncate">{voice.role}</p>
                  <span className="text-[11px] text-white/40 font-mono">{voice.batch}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
