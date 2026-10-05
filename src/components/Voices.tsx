"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

const voices = [
  {
    quote: "BUET EDC has consistently proven to be the most dynamic platform for students to step out of their academic bubbles and build solutions that matter. The club's growth is a testament to the students' drive.",
    name: "Dr. Anisur Rahman",
    role: "Club Moderator & Professor",
  },
  {
    quote: "When we started EDC, the goal was simple: demystify entrepreneurship for engineers. Today, seeing multiple funded startups emerge from our ecosystem is incredibly fulfilling.",
    name: "Shafiqul Islam",
    role: "Founding President, BUET EDC",
  },
  {
    quote: "The hackathons and networking events organized by EDC were pivotal in finding my co-founders. The exposure to real-world industry leaders gave us the head start we needed.",
    name: "Nabila Haque",
    role: "Alumni & YC Backed Founder",
  }
];

export default function Voices() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      gsap.from(".voice-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.from(".voice-card", {
        scrollTrigger: { trigger: ".voices-grid", start: "top 80%", once: true },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10" id="executives">
      <div className="max-w-7xl mx-auto px-6">
        <div className="voice-header text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Voices of <span className="text-brand-accent">EDC</span></h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Hear from the visionaries, leaders, and alumni who shaped the ecosystem.
          </p>
        </div>

        <div className="voices-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {voices.map((voice, i) => (
            <div 
              key={i} 
              className="voice-card glass-panel rounded-3xl p-6 sm:p-8 relative flex flex-col hover:bg-brand-primary/40 transition-colors duration-300"
            >
              <Quote size={40} className="text-brand-accent/20 absolute top-8 right-8" />
              <div className="flex-1 mb-8 pt-4">
                <p className="text-white/80 leading-relaxed text-lg italic">"{voice.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary border border-white/20 flex items-center justify-center font-bold text-xl text-white">
                  {voice.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-white">{voice.name}</h4>
                  <p className="text-brand-accent text-sm font-medium">{voice.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
