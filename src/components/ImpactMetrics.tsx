"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Users, Handshake, Award } from "lucide-react";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const metrics = [
  {
    id: 1,
    label: "Active Members",
    sublabel: "Students & Innovators",
    value: 600,
    suffix: "+",
    icon: Users,
  },
  {
    id: 2,
    label: "Corporate Collaborations",
    sublabel: "Industry & Brand Partners",
    value: 30,
    suffix: "+",
    icon: Handshake,
  },
  {
    id: 3,
    label: "Years Running",
    sublabel: "Legacy of Excellence",
    value: 10,
    suffix: "+",
    icon: Award,
  },
];

export default function ImpactMetrics() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-24 relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {metrics.map((metric) => (
            <div key={metric.id} className="metric-card h-full flex flex-col">
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.22)"
                className="glass-panel !border-white/10 !bg-transparent rounded-3xl p-8 sm:p-9 flex flex-col items-center justify-between text-center h-full min-h-[260px] transform transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 shadow-[0_8px_32px_0_rgba(1,53,101,0.37)]"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-6 text-brand-accent shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  <metric.icon size={30} />
                </div>
                
                <div className="flex flex-col items-center my-auto">
                  <div className="flex items-baseline gap-1 mb-2">
                    <CountUp
                      to={metric.value}
                      from={0}
                      duration={2.2}
                      className="text-5xl sm:text-6xl font-black text-white tracking-tight"
                    />
                    <span className="text-4xl sm:text-5xl font-black text-brand-accent">
                      {metric.suffix}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight">
                    {metric.label}
                  </h3>
                  <p className="text-white/60 font-medium text-xs sm:text-sm mt-1 uppercase tracking-wider">
                    {metric.sublabel}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
