"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { mockData } from "@/lib/mock-data";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const filteredEvents = mockData.events.filter(e => e.status === activeTab);

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our <span className="text-brand-accent">Events</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Discover the latest workshops, competitions, and networking events.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 border border-white/10 p-1 rounded-full flex gap-2">
            <button 
              onClick={() => setActiveTab("upcoming")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'upcoming' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
            >
              Upcoming Events
            </button>
            <button 
              onClick={() => setActiveTab("past")}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === 'past' ? 'bg-brand-accent text-[#013565]' : 'text-white hover:bg-white/10'}`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredEvents.map(event => (
            <Link key={event.id} href={`/events/${event.slug}`} className="group relative rounded-[2rem] overflow-hidden p-[1px] bg-white/10 hover:bg-brand-accent/50 transition-colors">
              <div className="bg-[#013565]/80 backdrop-blur-xl rounded-[2rem] h-full p-8 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <span className="px-4 py-1.5 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-semibold border border-brand-accent/30">{event.category}</span>
                  {event.isOpenForReg && <span className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold animate-pulse border border-green-500/30">Registration Open</span>}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">{event.title}</h3>
                <p className="text-white/70 mb-6 flex-grow">{event.summary}</p>
                <div className="flex flex-col gap-3 text-white/80 text-sm">
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-accent"/> {new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
                  <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-accent"/> {event.venue}</div>
                </div>
              </div>
            </Link>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-2 text-center py-20 text-white/50">
              No {activeTab} events found.
            </div>
          )}
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
