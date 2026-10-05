"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Target, Lightbulb } from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

export default function MissionVision() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
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
    <section ref={containerRef} className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Mission Card */}
          <div className="mv-card">
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className="glass-panel !border-white/10 !bg-transparent rounded-3xl p-6 sm:p-10 group transition-all duration-500 overflow-hidden relative shadow-[0_8px_32px_0_rgba(1,53,101,0.37)] hover:border-brand-accent/40"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-brand-accent flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 text-white">
                  <Target size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  To bridge the gap between academic brilliance and entrepreneurial execution.
                  We provide BUET students with the resources, mentorship, and network needed
                  to transform innovative ideas into scalable, sustainable ventures that solve
                  real-world problems.
                </p>
              </div>
            </SpotlightCard>
          </div>

          {/* Vision Card */}
          <div className="mv-card mt-8 md:mt-16">
            <SpotlightCard
              spotlightColor="rgba(56, 189, 248, 0.2)"
              className="glass-panel !border-white/10 !bg-transparent rounded-3xl p-6 sm:p-10 group transition-all duration-500 overflow-hidden relative shadow-[0_8px_32px_0_rgba(1,53,101,0.37)] hover:border-brand-accent/40"
            >
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-accent to-teal-400 flex items-center justify-center mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300 text-brand-primary">
                  <Lightbulb size={28} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-white/70 text-lg leading-relaxed">
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
