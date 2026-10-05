"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function JoinUsCta() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
        scale: 0.95, opacity: 0, duration: 1, ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 px-6">
      <div className="max-w-5xl mx-auto cta-content">
        <div className="relative rounded-[2.5rem] overflow-hidden p-[2px] bg-gradient-to-br from-brand-accent/50 via-brand-secondary to-brand-primary group">
          <div className="absolute inset-0 bg-brand-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative h-full w-full bg-gradient-to-br from-[#013565]/80 to-[#0e3775]/70 backdrop-blur-xl rounded-[2.4rem] p-12 md:p-20 text-center flex flex-col items-center justify-center overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-accent/20 text-brand-accent font-semibold text-sm mb-6 border border-brand-accent/30">
                Connect With Us
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Ready to Build, Innovate, or <span className="text-brand-accent">Partner?</span>
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Whether you want to launch your startup, learn from industry leaders, or collaborate with us, we're always here.
              </p>
              
              <div className="flex items-center justify-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto bg-brand-accent hover:bg-brand-accent/90 text-brand-primary px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(56,189,248,0.5)]"
                >
                  <Mail size={20} />
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
