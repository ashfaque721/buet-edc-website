"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Users, Calendar, Rocket } from "lucide-react";
import CountUp from "@/components/reactbits/CountUp";
import SpotlightCard from "@/components/reactbits/SpotlightCard";

const metrics = [
  { id: 1, label: "Active Members", value: 500, suffix: "+", icon: Users },
  { id: 2, label: "Flagship Events", value: 30, suffix: "+", icon: Calendar },
  { id: 3, label: "Incubated Ventures", value: 15, suffix: "+", icon: Rocket },
];

export default function ImpactMetrics() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
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
    <section ref={containerRef} className="py-24 relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="metric-card">
              <SpotlightCard
                spotlightColor="rgba(56, 189, 248, 0.22)"
                className="glass-panel !border-white/10 !bg-transparent rounded-2xl p-8 flex flex-col items-center justify-center text-center transform transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/50 shadow-[0_8px_32px_0_rgba(1,53,101,0.37)]"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center mb-6 text-brand-accent">
                  <metric.icon size={32} />
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <CountUp
                    to={metric.value}
                    from={0}
                    duration={2.5}
                    className="text-5xl font-bold text-white tracking-tight"
                  />
                  <span className="text-4xl font-bold text-brand-accent">{metric.suffix}</span>
                </div>
                <p className="text-white/70 font-medium text-lg uppercase tracking-wide">
                  {metric.label}
                </p>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
