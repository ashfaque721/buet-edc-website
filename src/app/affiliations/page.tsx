"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { mockData } from "@/lib/mock-data";
import { FacebookIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";
import { Building2 } from "lucide-react";

export default function AffiliationsPage() {
  const { ambassadors } = mockData.affiliations;

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-brand-accent">Affiliations</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Building a robust ecosystem through our dedicated campus ambassador network.</p>
        </div>

        {/* Campus Ambassadors */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center border-b border-white/10 pb-4 inline-block mx-auto">Campus Ambassadors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            {ambassadors.map(ca => (
              <div 
                key={ca.id} 
                className="group relative w-full rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#0e3775]/30 to-[#013565]/45 backdrop-blur-md border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)] flex flex-col"
              >
                {/* 1. Company Brand Header (Full Width for Logo & Company Name) */}
                <div className="flex items-center gap-3.5 px-1 pt-1 pb-2">
                  <div className="w-12 h-12 rounded-2xl p-1.5 bg-white/5 border border-white/15 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                    {ca.logoUrl ? (
                      <img 
                        src={ca.logoUrl} 
                        alt={ca.company} 
                        className="w-full h-full object-cover rounded-xl" 
                      />
                    ) : (
                      <Building2 size={22} className="text-[#38bdf8]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug line-clamp-2 block group-hover:text-[#38bdf8] transition-colors">
                      {ca.company}
                    </span>
                  </div>
                </div>

                {/* 2. Portrait Image Container */}
                <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group mt-4 border border-white/10 bg-[#001124]">
                  {/* Full-Bleed Portrait Image */}
                  <Image 
                    src={ca.photoUrl} 
                    alt={ca.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Typography & Details (Bottom-Left Aligned) */}
                  <div className="absolute bottom-0 left-0 p-5 sm:p-6 z-10 w-full flex flex-col items-start">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{ca.name}</h3>
                    <div className="text-sm font-semibold text-[#38bdf8]">Campus Ambassador</div>
                    
                    <div className="flex items-center gap-2.5 mt-3">
                      {ca.socials.facebook && (
                        <a 
                          href={ca.socials.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full border border-white/20 bg-black/45 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 hover:bg-white/15 transition-all"
                        >
                          <FacebookIcon size={16} />
                        </a>
                      )}
                      {ca.socials.linkedin && (
                        <a 
                          href={ca.socials.linkedin} 
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
