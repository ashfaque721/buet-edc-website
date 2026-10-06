"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { mockData } from "@/lib/mock-data";
import { FacebookIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";

export default function ExecutivesPage() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const { executives } = mockData;

  const advisoryPanel = executives.filter(e => e.wing === "Advisory Panel");
  const filteredExecutives = executives.filter(e => e.term === activeTab && e.wing !== "Advisory Panel");

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-brand-accent">Leaders</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">The visionary minds steering the BUET Entrepreneurship Development Club towards excellence.</p>
        </div>

        {/* Advisory Panel */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center border-b border-white/10 pb-4 inline-block mx-auto text-brand-accent">Advisory Panel</h2>
          <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
            {advisoryPanel.map(exec => (
              <div key={exec.id} className="group relative w-full sm:w-[340px] md:w-[380px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]">
                {/* Full-Bleed Portrait Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={exec.photoUrl} 
                    alt={exec.name} 
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                
                {/* Typography & Details (Bottom-Left Aligned) */}
                <div className="absolute bottom-0 left-0 p-6 sm:p-7 z-10 w-full flex flex-col items-start">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{exec.name}</h3>
                  <div className="text-sm font-semibold text-[#38bdf8]">{exec.designation}</div>
                  
                  <div className="flex items-center gap-2.5 mt-3">
                    {exec.socials?.linkedin && (
                      <a 
                        href={exec.socials.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                      >
                        <LinkedinIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Board Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 border border-white/10 p-1 rounded-full flex gap-2">
            <button 
              onClick={() => setActiveTab("current")}
              className={`px-6 md:px-10 py-3 rounded-full font-bold transition-all text-sm md:text-base ${activeTab === 'current' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
            >
              Current Panel (2025–2026)
            </button>
            <button 
              onClick={() => setActiveTab("past")}
              className={`px-6 md:px-10 py-3 rounded-full font-bold transition-all text-sm md:text-base ${activeTab === 'past' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
            >
              Past Panel (2024–2025)
            </button>
          </div>
        </div>

        {/* Executive Grid (3 cards per row on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {filteredExecutives.map(exec => (
            <div key={exec.id} className="group relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]">
              {/* Full-Bleed Portrait Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image 
                  src={exec.photoUrl} 
                  alt={exec.name} 
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                />
              </div>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
              
              {/* Typography & Details (Bottom-Left Aligned) */}
              <div className="absolute bottom-0 left-0 p-6 sm:p-7 z-10 w-full flex flex-col items-start">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{exec.name}</h3>
                <div className="text-sm font-semibold text-[#38bdf8]">{exec.designation}</div>
                {exec.wing && <div className="text-xs font-medium text-slate-300 mt-0.5">{exec.wing}</div>}
                
                <div className="flex items-center gap-2.5 mt-3">
                  {exec.socials?.facebook && (
                    <a 
                      href={exec.socials.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                    >
                      <FacebookIcon size={16} />
                    </a>
                  )}
                  {exec.socials?.linkedin && (
                    <a 
                      href={exec.socials.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredExecutives.length === 0 && (
            <div className="col-span-full text-center py-20 text-white/50">
              No executives found for this panel.
            </div>
          )}
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
