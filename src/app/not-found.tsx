"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-brand-primary/20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/10 via-[#001124] to-[#001124] z-0" />
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-[8rem] md:text-[12rem] font-bold leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/20 mb-8 drop-shadow-2xl">
            404
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Looks like this idea is still in <span className="text-brand-accent">incubation</span>.
          </h2>
          <p className="text-xl text-white/70 mb-12">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-brand-accent text-[#013565] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(56,189,248,0.4)]"
          >
            <ArrowLeft size={20} /> Return to Homepage
          </Link>
        </div>
      </section>
      <StickyFooterReveal />
    </main>
  );
}
