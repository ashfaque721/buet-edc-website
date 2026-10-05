"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/utils/gsap";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TextType from "@/components/reactbits/TextType";

const TYPING_WORDS = [
  "Innovators",
  "Builders",
  "Disruptors",
  "Founders",
  "Pioneers",
  "Visionaries",
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-transparent"
    >
      {/* ── Soft radial highlight for hero typography ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0, 17, 36, 0.7) 0%, transparent 75%)",
        }}
      />

      {/* ── Hero content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* ── Headline with React Bits TextType Typing Animation ── */}
        <h1 className="hero-anim text-4xl sm:text-5xl md:text-[4.5rem] lg:text-[5.25rem] font-extrabold tracking-tighter mb-7 leading-[1.1] sm:leading-[1.08] text-white drop-shadow-[0_2px_32px_rgba(0,17,36,0.9)]">
          Empowering the Next
          <br className="hidden sm:block" />
          Generation of{" "}
          <span className="relative inline-flex items-baseline overflow-visible">
            <TextType
              as="span"
              text={TYPING_WORDS}
              typingSpeed={80}
              deletingSpeed={45}
              pauseDuration={1800}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-brand-accent font-light animate-pulse ml-0.5 text-4xl md:text-6xl"
              textClassName="text-transparent bg-clip-text"
              className="inline-block text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #38bdf8 0%, #7dd3fc 45%, #bae6fd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              } as React.CSSProperties}
              loop={true}
            />
          </span>
        </h1>

        {/* ── Sub-headline: High-contrast crisp text on dark midnight navy ── */}
        <p className="hero-anim text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-12 leading-relaxed font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Fostering a culture of venture building, problem-solving, and
          sustainable growth within the BUET community. Your journey from idea
          to impact starts here.
        </p>

        {/* ── CTAs ── */}
        <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary — high contrast white */}
          <Link
            href="/events"
            className="group w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white text-[#013565] px-9 py-4 rounded-full font-bold text-base tracking-tight transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_0_rgba(255,255,255,0.22)] active:scale-[0.98] shadow-[0_4px_16px_0_rgba(255,255,255,0.12)]"
          >
            Explore Events
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>

          {/* Secondary — glassmorphic outline + cyan glow on hover */}
          <Link
            href="/about"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-base tracking-tight text-white bg-white/[0.04] backdrop-blur-xl border border-white/[0.14] shadow-[0_8px_32px_0_rgba(1,53,101,0.37)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#38bdf8]/50 hover:bg-white/[0.08] hover:shadow-[0_0_22px_0_rgba(56,189,248,0.18)] active:scale-[0.98]"
          >
            About EDC
          </Link>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="hero-anim mt-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs text-white/60 tracking-[0.2em] uppercase font-medium">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
