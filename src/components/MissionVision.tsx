"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Target, Lightbulb } from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export default function MissionVision() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".mv-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Mission Card */}
          <div className="mv-card h-full flex flex-col">
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className="glass-panel !border-white/10 !bg-transparent rounded-3xl p-8 sm:p-10 group transition-all duration-500 overflow-hidden relative shadow-[0_8px_32px_0_rgba(1,53,101,0.37)] hover:border-brand-accent/40 h-full flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-brand-accent flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 text-white shrink-0">
                  <Target size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Our Mission</h2>
                <p className="text-white/75 text-base sm:text-lg leading-relaxed mt-1 flex-grow">
                  To bridge the gap between academic brilliance and entrepreneurial execution.
                  We provide BUET students with the resources, mentorship, and network needed
                  to transform innovative ideas into scalable, sustainable ventures that solve
                  real-world problems.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Vision Card */}
          <div className="mv-card h-full flex flex-col">
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className="glass-panel !border-white/10 !bg-transparent rounded-3xl p-8 sm:p-10 group transition-all duration-500 overflow-hidden relative shadow-[0_8px_32px_0_rgba(1,53,101,0.37)] hover:border-brand-accent/40 h-full flex flex-col justify-between"
            >
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-teal-400 flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 text-[#013565] shrink-0">
                  <Lightbulb size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Our Vision</h2>
                <p className="text-white/75 text-base sm:text-lg leading-relaxed mt-1 flex-grow">
                  To establish BUET as the premier deep-tech and innovation hub of Bangladesh,
                  fostering an ecosystem where student-led startups continuously drive national
                  economic growth and technological advancement on a global scale.
                </p>
              </div>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}
