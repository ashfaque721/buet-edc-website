"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";

export default function AboutPage() {
  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Journey & <span className="text-brand-accent">Legacy</span></h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Fostering the next generation of innovators, builders, and disruptive founders.
          </p>
        </div>

        {/* Leadership Quotes */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-4 text-brand-accent">Message from Club Moderator</h3>
            <p className="italic text-white/80 mb-6">"Our goal has always been to bridge the gap between academia and industry. EDC acts as the catalyst for students to test their ideas in the real world."</p>
            <div className="font-semibold">- Dr. Mohammad Muntasir</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
            <h3 className="text-xl font-bold mb-4 text-brand-accent">Founding President's Vision</h3>
            <p className="italic text-white/80 mb-6">"We started EDC with a simple thought: BUET students are building the future, but they need the ecosystem to launch it. We built that ecosystem."</p>
            <div className="font-semibold">- Tanvir Ahmed</div>
          </div>
        </div>

        {/* Key Pillars */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Key Pillars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Ideation", "Incubation", "Industry Connect"].map((pillar) => (
              <div key={pillar} className="bg-gradient-to-br from-[#013565]/80 to-[#0e3775]/70 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:-translate-y-2 transition-transform duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">{pillar}</h3>
                <p className="text-white/70">
                  {pillar === "Ideation" && "Brainstorming and shaping raw ideas into viable concepts through hackathons and workshops."}
                  {pillar === "Incubation" && "Providing the resources, mentorship, and workspace for startups to build their MVP."}
                  {pillar === "Industry Connect" && "Connecting founders with investors, partners, and corporate leaders to scale."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Interactive Timeline</h2>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
            {[
              { year: "2019", text: "Founded to foster entrepreneurship among engineering students." },
              { year: "2021", text: "Launched the first university-level incubation program in Bangladesh." },
              { year: "2023", text: "Hosted the biggest National Ideathon with 500+ participants." },
              { year: "2025", text: "Expanded industry connections globally, partnering with top VCs." }
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#001124] bg-brand-accent shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                  <div className="font-bold text-brand-accent mb-2 text-xl">{item.year}</div>
                  <div className="text-white/80">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
