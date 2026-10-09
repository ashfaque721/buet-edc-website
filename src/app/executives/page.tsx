"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { FacebookIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ExecutivesPage() {
  const [activeTab, setActiveTab] = useState<"current" | "past">("current");
  const [executives, setExecutives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const res = await fetch("/api/executives");
        if (res.ok) {
          const data = await res.json();
          setExecutives(data);
        }
      } catch (err) {
        console.error("Failed to load executives:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExecutives();
  }, []);

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

        {loading && (
          <div className="flex justify-center py-20 text-brand-accent">
            <Loader2 size={36} className="animate-spin" />
          </div>
        )}

        {!loading && (
          <>
            {/* Advisory Panel */}
            {advisoryPanel.length > 0 && (
              <div className="mb-24">
                <h2 className="text-3xl font-bold mb-10 text-center border-b border-white/10 pb-4 inline-block mx-auto text-brand-accent">Advisory Panel</h2>
                <div className="flex flex-wrap justify-center gap-8 xl:gap-10">
                  {advisoryPanel.map(exec => {
                    const linkedin = exec.linkedin || exec.socials?.linkedin;
                    return (
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
                            {linkedin && (
                              <a 
                                href={linkedin} 
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* Executive Board Tabs */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/5 border border-white/10 p-1 rounded-full flex gap-2">
                <button 
                  onClick={() => setActiveTab("current")}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'current' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
                >
                  Current Panel (2025-26)
                </button>
                <button 
                  onClick={() => setActiveTab("past")}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'past' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
                >
                  Past Executive Panels
                </button>
              </div>
            </div>

            {/* Executive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredExecutives.map(exec => {
                const linkedin = exec.linkedin || exec.socials?.linkedin;
                const facebook = exec.facebook || exec.socials?.facebook;
                return (
                  <div key={exec.id} className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]">
                    {/* Full-Bleed Portrait Image */}
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src={exec.photoUrl} 
                        alt={exec.name} 
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                      />
                    </div>

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                    
                    {/* Typography & Details (Bottom-Left Aligned) */}
                    <div className="absolute bottom-0 left-0 p-5 sm:p-6 z-10 w-full flex flex-col items-start">
                      <span className="text-xs uppercase tracking-wider text-white/60 font-semibold mb-1">{exec.wing}</span>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-0.5">{exec.name}</h3>
                      <div className="text-xs sm:text-sm font-semibold text-[#38bdf8] mb-3">{exec.designation}</div>
                      
                      {/* Social Actions Pill Container */}
                      <div className="flex items-center gap-2">
                        {linkedin && (
                          <a 
                            href={linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                          >
                            <LinkedinIcon size={14} />
                          </a>
                        )}
                        {facebook && (
                          <a 
                            href={facebook} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                          >
                            <FacebookIcon size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      <StickyFooterReveal />
    </main>
  );
}
