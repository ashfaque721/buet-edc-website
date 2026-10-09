"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { FacebookIcon, LinkedinIcon } from "@/components/Icons";
import Image from "next/image";
import { Building2, Loader2 } from "lucide-react";

export default function AffiliationsPage() {
  const [ambassadors, setAmbassadors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const res = await fetch("/api/affiliations");
        if (res.ok) {
          const data = await res.json();
          setAmbassadors(data.ambassadors || []);
        }
      } catch (err) {
        console.error("Failed to load affiliations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliations();
  }, []);

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-brand-accent">Affiliations</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Building a robust ecosystem through our dedicated campus ambassador network.</p>
        </div>

        {loading && (
          <div className="flex justify-center py-20 text-brand-accent">
            <Loader2 size={36} className="animate-spin" />
          </div>
        )}

        {!loading && (
          <div>
            <h2 className="text-3xl font-bold mb-10 text-center border-b border-white/10 pb-4 inline-block mx-auto">Campus Ambassadors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
              {ambassadors.map(ca => {
                const linkedin = ca.linkedin || ca.socials?.linkedin;
                const facebook = ca.facebook || ca.socials?.facebook;
                return (
                  <div 
                    key={ca.id} 
                    className="group relative w-full rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-[#0e3775]/30 to-[#013565]/45 backdrop-blur-md border border-white/10 hover:border-[#38bdf8]/40 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)] flex flex-col"
                  >
                    {/* 1. Company Brand Header */}
                    <div className="flex items-center gap-3.5 px-1 pt-1 pb-2">
                      <div className="w-12 h-12 rounded-2xl p-1.5 bg-white/5 border border-white/15 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                        {ca.logoUrl ? (
                          <img 
                            src={ca.logoUrl} 
                            alt={ca.company} 
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain rounded-xl" 
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
                      {ca.photoUrl ? (
                        <Image 
                          src={ca.photoUrl} 
                          alt={ca.name} 
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40">No photo</div>
                      )}
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent pointer-events-none" />
                      
                      {/* 3. Ambassador Identity (Bottom-Left Aligned) */}
                      <div className="absolute bottom-0 left-0 p-5 sm:p-6 z-10 w-full flex flex-col items-start">
                        <span className="text-xs uppercase tracking-wider text-[#38bdf8] font-bold mb-1">Campus Ambassador</span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug mb-2">{ca.name}</h3>
                        
                        {/* Social Links */}
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
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      <StickyFooterReveal />
    </main>
  );
}
