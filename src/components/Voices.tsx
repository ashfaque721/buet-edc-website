"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Quote, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const exPresidents = [
  {
    name: "Shafiqul Islam",
    role: "Founding President (2019–2020)",
    batch: "Batch '15 • Dept of ME",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    quote: "When we founded EDC, our mission was to demystify venture building for engineers. Today, seeing funded startups and global ventures emerge directly from our community is incredibly fulfilling.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Past President (2020–2021)",
    batch: "Batch '16 • Dept of EEE",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    quote: "EDC instilled a culture where failure is just data and problem-solving is an instinct. We proved that BUET engineers are not just technicians—we are venture architects.",
  },
  {
    name: "Abrar Zahin",
    role: "Past President (2021–2022)",
    batch: "Batch '17 • Dept of CSE",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop",
    quote: "Scaling our incubation partnerships with angel syndicates and VCs allowed student founders to test real hypotheses. The leadership grit developed at EDC lasts a lifetime.",
  },
  {
    name: "Nabila Haque",
    role: "Past President (2022–2023)",
    batch: "Batch '18 • Dept of IPE",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    quote: "Leading this club taught us that execution trumps theory every single time. The rigorous pitch bootcamps and founder mindset at EDC laid the foundation for my startup journey.",
  },
  {
    name: "Sadman Sakib",
    role: "Immediate Past President (2023–2024)",
    batch: "Batch '19 • Dept of ME",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    quote: "From deep-tech hardware prototypes to scalable SaaS, BUET students have unmatched potential. EDC is the launchpad that transforms raw intellectual ambition into scalable commercial value.",
  },
];

export default function Voices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Buffer array to support seamless continuous looping
  const displayItems = [...exPresidents, ...exPresidents, ...exPresidents];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else {
        setItemsPerView(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return exPresidents.length - 1;
      }
      return prev - 1;
    });
  }, []);

  // Seamless wrap-around reset
  const handleTransitionEnd = () => {
    if (currentIndex >= exPresidents.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Autoplay loop every 4.5 seconds (paused on hover/touch)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  const activeIndicatorIndex = currentIndex % exPresidents.length;

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
        <div className="moderator-spotlight rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 bg-gradient-to-br from-[#013565]/80 via-[#0e3775]/60 to-[#001124]/90 backdrop-blur-xl mb-12 sm:mb-16 relative overflow-hidden shadow-[0_12px_40px_0_rgba(1,53,101,0.4)]">
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

        {/* ── 2. Ex-Presidents' Voices: Looped Interactive Carousel ── */}
        <div className="ex-presidents-carousel-section">
          {/* Carousel Subheader & Navigation Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-accent/90 bg-brand-accent/15 px-3 py-1 rounded-full border border-brand-accent/30 inline-block mb-3">
                Founding Heritage & Legacy
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Ex-Presidents&apos; <span className="text-brand-accent">Voices</span>
              </h3>
              <p className="text-white/60 text-sm sm:text-base mt-1">
                Reflections and milestones from former club presidents across terms.
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 hover:bg-brand-accent hover:border-brand-accent hover:text-[#013565] transition-all flex items-center justify-center text-white shadow-sm active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/15 bg-white/5 hover:bg-brand-accent hover:border-brand-accent hover:text-[#013565] transition-all flex items-center justify-center text-white shadow-sm active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel Slider Window */}
          <div
            className="overflow-hidden w-full relative select-none py-2 -my-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex -mx-3 items-stretch"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: isTransitioning
                  ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)"
                  : "none",
              }}
            >
              {displayItems.map((president, index) => (
                <div
                  key={`${president.name}-${index}`}
                  className="shrink-0 px-3 flex self-stretch"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="w-full h-full glass-panel rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-brand-accent/40 shadow-xl relative group transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-[#013565]/40 via-[#0e3775]/25 to-[#001124]/60">
                    <div className="relative">
                      <Quote
                        size={32}
                        className="text-brand-accent/25 absolute -top-1 -right-1 pointer-events-none group-hover:text-brand-accent/40 transition-colors"
                      />
                      <p className="text-white/85 text-sm sm:text-base leading-relaxed italic pr-6 mb-8">
                        &ldquo;{president.quote}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-white/10 pt-5 mt-auto">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-accent/60 shadow-[0_0_20px_rgba(56,189,248,0.25)] relative shrink-0 bg-[#001124]">
                        <Image
                          src={president.photoUrl}
                          alt={president.name}
                          fill
                          sizes="56px"
                          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-base tracking-tight truncate group-hover:text-brand-accent transition-colors">
                          {president.name}
                        </h4>
                        <p className="text-brand-accent text-xs font-semibold mt-0.5 truncate">
                          {president.role}
                        </p>
                        <span className="text-[11px] text-white/50 font-mono block mt-0.5">
                          {president.batch}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {exPresidents.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(dotIdx);
                }}
                aria-label={`Jump to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndicatorIndex === dotIdx
                    ? "w-8 h-2 bg-brand-accent shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
