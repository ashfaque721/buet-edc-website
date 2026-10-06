"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { mockData } from "@/lib/mock-data";
import { Calendar, MapPin, Clock, ExternalLink, CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const event = mockData.events.find(e => e.slug === slug);
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!event) return <div className="min-h-screen flex items-center justify-center text-white">Event not found.</div>;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setRegistered(true);
      toast.success("Registration Confirmed!", {
        description: `Check your email for details regarding ${event.title}.`
      });
    }, 1000);
  };

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="mb-8">
          <Link href="/events" className="text-brand-accent hover:underline text-sm font-semibold">&larr; Back to Events</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-semibold border border-brand-accent/30 mb-6">{event.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 mb-10 text-white/80">
              <div className="flex items-center gap-2"><Calendar className="text-brand-accent" size={20}/> {new Date(event.date).toLocaleDateString()}</div>
              <div className="flex items-center gap-2"><MapPin className="text-brand-accent" size={20}/> {event.venue}</div>
            </div>

            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">About the Event</h2>
            <p className="text-white/80 leading-relaxed mb-10 whitespace-pre-wrap">{event.description}</p>

            {event.timeline && event.timeline.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Agenda</h2>
                <div className="space-y-4 mb-10">
                  {event.timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="font-bold text-brand-accent w-24 shrink-0 flex items-center gap-2"><Clock size={16}/>{item.time}</div>
                      <div className="text-white/90">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {event.speakers && event.speakers.length > 0 && (
              <>
                <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-2">Speakers</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                      <img src={speaker.photoUrl} alt={speaker.name} width={64} height={64} loading="lazy" decoding="async" className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <div className="font-bold">{speaker.name}</div>
                        <div className="text-sm text-white/60">{speaker.designation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {event.fbLink !== "#" && (
              <a href={event.fbLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors font-semibold">
                <ExternalLink size={20} /> View on Facebook
              </a>
            )}
          </div>

          {/* Registration Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#013565]/80 to-[#0e3775]/70 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-32">
              <h3 className="text-2xl font-bold mb-6">Registration</h3>
              
              {!event.isOpenForReg ? (
                <div className="text-center p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400">
                  Registration is currently closed for this event.
                </div>
              ) : registered ? (
                <div className="text-center p-8 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-400 flex flex-col items-center">
                  <CheckCircle size={48} className="mb-4" />
                  <h4 className="text-xl font-bold mb-2">You're In!</h4>
                  <p className="text-sm">Your registration has been confirmed. Check your email for details.</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Full Name *</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Email *</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Phone Number *</label>
                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="017xxxxxxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Institution</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="BUET" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Dept</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="CSE" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1">Batch</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="21" />
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-bold py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex justify-center items-center">
                    {isSubmitting ? "Processing..." : "Register Now"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
