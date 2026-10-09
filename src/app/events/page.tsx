"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import Link from "next/link";
import { Calendar, MapPin, Loader2, Ticket } from "lucide-react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(e => e.status === activeTab);

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

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center py-20 text-brand-accent">
            <Loader2 size={36} className="animate-spin" />
          </div>
        )}

        {/* Events Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredEvents.map(event => (
              <Link key={event.id} href={`/events/${event.slug}`} className="group relative rounded-[2rem] overflow-hidden p-[1px] bg-white/10 hover:bg-brand-accent/50 transition-colors">
                <div className="bg-[#013565]/80 backdrop-blur-xl rounded-[2rem] h-full p-8 flex flex-col">
                  <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-4 py-1.5 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-semibold border border-brand-accent/30">{event.category}</span>
                    <div className="flex items-center gap-2">
                      {(event.regFee ?? 0) === 0 ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                          Free
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 font-mono">
                          ৳{event.regFee}
                        </span>
                      )}
                      {event.isOpenForReg && <span className="px-3.5 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold animate-pulse border border-green-500/30">Registration Open</span>}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-accent transition-colors">{event.title}</h3>
                  <p className="text-white/70 mb-6 flex-grow">{event.summary}</p>
                  <div className="flex flex-col gap-3 text-white/80 text-sm">
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-brand-accent"/> {new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
                    <div className="flex items-center gap-2"><MapPin size={16} className="text-brand-accent"/> {event.venue}</div>
                    <div className="flex items-center gap-2">
                      <Ticket size={16} className="text-brand-accent"/>
                      <span>Registration Fee: <strong className="text-white">{(event.regFee ?? 0) === 0 ? "Free" : `৳${event.regFee}`}</strong></span>
                    </div>
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
        )}
      </section>

      <StickyFooterReveal />
    </main>
  );
}
