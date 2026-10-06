"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function InitialPreloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const circleProgressRef = useRef<SVGCircleElement>(null);
  const logoRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasViewed = sessionStorage.getItem("edc_preloader_viewed");
    if (!hasViewed) {
      setShouldRender(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const animDuration = isMobile ? 1.0 : 1.3;
      const exitDuration = 0.8;

      // Circle circumference: 2 * PI * 64 = ~402.12
      const circumference = 2 * Math.PI * 64;

      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: animDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.round(counter.val);
          if (counterRef.current) {
            counterRef.current.innerText = currentVal.toString();
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${currentVal}%`;
          }
          if (circleProgressRef.current) {
            const offset = circumference - (currentVal / 100) * circumference;
            circleProgressRef.current.style.strokeDashoffset = `${offset}`;
          }
        },
        onComplete: () => {
          sessionStorage.setItem("edc_preloader_viewed", "true");
          
          // Smooth curtain reveal upward and scale out
          gsap.timeline({
            onComplete: () => setShouldRender(false),
          })
            .to(logoRingRef.current, {
              scale: 1.1,
              opacity: 0,
              duration: 0.35,
              ease: "power2.in",
            })
            .to(
              containerRef.current,
              {
                yPercent: -100,
                duration: exitDuration,
                ease: "power3.inOut",
              },
              "-=0.15"
            );
        },
      });

      // Ambient pulsing glow around the logo
      if (logoRingRef.current) {
        gsap.to(logoRingRef.current, {
          boxShadow: "0 0 45px rgba(56, 189, 248, 0.45)",
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [shouldRender]);

  if (!shouldRender) return null;

  const circumference = 2 * Math.PI * 64;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020b18] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#013565]/40 rounded-full blur-[80px]" />
      </div>

      {/* Top subtle HUD watermark */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
        <span className="font-mono text-[11px] sm:text-xs text-white/40 tracking-[0.25em] uppercase">
          BUET EDC // PORTAL BOOT
        </span>
      </div>

      {/* Centerpiece: Glowing Logo inside Circular Progress Ring */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 148 148">
            {/* Background Track */}
            <circle
              cx="74"
              cy="74"
              r="64"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="2.5"
            />
            {/* Animated Progress Stroke */}
            <circle
              ref={circleProgressRef}
              cx="74"
              cy="74"
              r="64"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              style={{
                filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.75))",
                transition: "stroke-dashoffset 0.05s linear",
              }}
            />
          </svg>

          {/* Inner Glowing Glass Circle with BUET EDC Logo */}
          <div
            ref={logoRingRef}
            className="w-28 h-28 sm:w-34 sm:h-34 rounded-full border border-white/15 bg-gradient-to-br from-[#013565]/70 to-[#001124]/90 backdrop-blur-2xl flex items-center justify-center p-5 shadow-[0_0_35px_rgba(56,189,248,0.2)]"
          >
            <Image
              src="/logo-light.png"
              alt="BUET EDC Official Logo"
              width={80}
              height={80}
              priority
              style={{ width: "auto" }}
              className="h-12 sm:h-14 object-contain filter drop-shadow-[0_2px_12px_rgba(56,189,248,0.4)]"
            />
          </div>
        </div>

        {/* Text and Percentage Display */}
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="font-mono text-xs sm:text-sm tracking-[0.25em] text-white/80 uppercase font-medium mb-3">
            INITIALIZING BUET EDC
          </div>

          {/* Linear Progress Bar */}
          <div className="w-48 sm:w-56 h-1 bg-white/10 rounded-full overflow-hidden p-0.5 mb-3 border border-white/5">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#013565] via-[#38bdf8] to-white rounded-full transition-all duration-75 ease-linear shadow-[0_0_12px_#38bdf8]"
              style={{ width: "0%" }}
            />
          </div>

          {/* Counter percentage */}
          <div className="flex items-baseline font-mono text-[#38bdf8]">
            <span ref={counterRef} className="text-xl sm:text-2xl font-bold tabular-nums">
              0
            </span>
            <span className="text-sm font-semibold ml-0.5 text-white/50">%</span>
          </div>
        </div>
      </div>

      {/* Bottom corner tagline */}
      <div className="absolute bottom-8 sm:bottom-12 font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">
        VENTURE BUILDING • INNOVATION • INCUBATION
      </div>
    </div>
  );
}
