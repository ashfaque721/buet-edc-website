"use client";

import React from "react";
import { useSponsors, INITIAL_SPONSORS } from "@/context/SponsorsContext";

export default function SponsorsMarquee() {
  const { sponsors } = useSponsors();

  // Fallback to static INITIAL_SPONSORS so marquee never collapses to height: 0 during SSR or loading
  const displaySponsors = sponsors && sponsors.length > 0 ? sponsors : INITIAL_SPONSORS;

  // Duplicate sponsors array to ensure seamless continuous scrolling
  const carouselItems = [...displaySponsors, ...displaySponsors, ...displaySponsors, ...displaySponsors];

  return (
    <section className="py-12 sm:py-16 md:py-24 relative z-10 overflow-hidden bg-transparent h-auto min-h-0">
      <div className="max-w-7xl mx-auto px-6 text-center mb-10 sm:mb-14">
        <span className="inline-block py-1 px-3.5 rounded-full bg-brand-accent/15 text-brand-accent font-semibold text-xs tracking-wider uppercase border border-brand-accent/30 mb-3 shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          Past Sponsors & Partners
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Empowered by Leading <span className="text-brand-accent">Brands</span>
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Visionary industry leaders that have powered BUET EDC's flagship initiatives and student ventures.
        </p>
      </div>

      {/* Marquee Carousel Container with Edge Gradient Fades */}
      <div className="relative w-full overflow-hidden py-6">
        {/* Left and Right Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-56 bg-gradient-to-r from-[#001124] via-[#001124]/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-56 bg-gradient-to-l from-[#001124] via-[#001124]/90 to-transparent z-20 pointer-events-none" />

        {/* Scrolling Track (Only Logos, Bigger, No Borders) */}
        <div className="flex w-max gap-16 sm:gap-24 md:gap-28 animate-marquee hover:[animation-play-state:paused] items-center min-h-[5rem]">
          {carouselItems.map((sponsor, index) => (
            <div
              key={`${sponsor.id}-${index}`}
              className="flex items-center justify-center shrink-0 h-14 sm:h-18 md:h-20 min-w-[100px] transition-transform duration-300 hover:scale-115 cursor-pointer select-none"
              title={sponsor.name}
            >
              {sponsor.logoUrl ? (
                <img
                  src={sponsor.logoUrl}
                  alt={sponsor.name}
                  loading="lazy"
                  decoding="async"
                  width={200}
                  height={80}
                  className="h-14 sm:h-18 md:h-20 w-auto max-w-[160px] sm:max-w-[210px] md:max-w-[240px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 filter drop-shadow-lg"
                />
              ) : (
                <span className="text-2xl sm:text-3xl font-extrabold text-white/60 hover:text-white transition-colors tracking-wider">
                  {sponsor.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
