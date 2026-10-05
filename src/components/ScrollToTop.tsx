"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal when scrolled past 75% of the viewport height (past the Hero section)
      const heroThreshold = window.innerHeight * 0.75;
      setIsVisible(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ease-out group ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-75 pointer-events-none"
      } bg-[#00172e]/85 backdrop-blur-xl border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-[#38bdf8]/70 hover:text-[#38bdf8] hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] hover:-translate-y-1 active:scale-90`}
    >
      <ArrowUp
        size={20}
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
