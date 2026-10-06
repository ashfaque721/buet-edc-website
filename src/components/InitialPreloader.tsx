"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function InitialPreloader() {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const hasViewed = sessionStorage.getItem("edc_preloader_viewed");
    
    if (hasViewed) {
      setShouldRender(false);
      return;
    }
    
    setShouldRender(true);

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const animDuration = isMobile ? 0.9 : 1.2;
      const slideDuration = isMobile ? 0.6 : 0.8;

      const counter = { val: 0 };
      gsap.to(counter, {
        val: 100,
        duration: animDuration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.round(counter.val).toString();
          }
        },
        onComplete: () => {
          sessionStorage.setItem("edc_preloader_viewed", "true");
          // Slide up animation
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: slideDuration,
            ease: "power4.inOut",
            delay: 0.1,
            onComplete: () => setShouldRender(false)
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#030d1a] flex flex-col justify-between p-8 md:p-14 select-none"
    >
      {/* Top Left Header with corner marks */}
      <div className="flex items-start">
        <div className="relative border-l border-t border-brand-accent/50 p-3 pt-4 pl-4 before:content-[''] before:absolute before:w-1.5 before:h-1.5 before:bg-brand-accent before:-top-0.5 before:-left-0.5 after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-brand-accent after:-bottom-0.5 after:-left-0.5">
          <div className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase">
            BUET EDC / SYSTEM BOOT_
          </div>
        </div>
      </div>

      {/* Bottom Left Counter */}
      <div className="flex flex-col items-start justify-end h-full">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2 font-mono">
          LOADING
        </div>
        <div className="flex items-baseline text-brand-accent">
          <span 
            ref={counterRef} 
            className="text-7xl sm:text-9xl md:text-[11rem] font-black tracking-tighter leading-none tabular-nums"
          >
            0
          </span>
          <span className="text-4xl md:text-7xl font-bold ml-2">%</span>
        </div>
      </div>
    </div>
  );
}
