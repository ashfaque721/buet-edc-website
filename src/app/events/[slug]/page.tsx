"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { Calendar, MapPin, ExternalLink, CheckCircle, ChevronDown, Loader2, Ticket } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function EventDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "BUET",
    studentId: "",
    dept: "",
    year: "",
    paymentMethod: "bKash",
    trxId: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setEvent(data);
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#001124] text-brand-accent">
        <Loader2 size={36} className="animate-spin" />
      </main>
    );
  }

  if (!event) return <div className="min-h-screen flex items-center justify-center text-white bg-[#001124]">Event not found.</div>;

  const isFree = (event.regFee ?? 0) === 0;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year) {
      toast.error("Please select your academic year.");
      return;
    }
    if (!isFree && !formData.trxId.trim()) {
      toast.error("Please provide a valid Transaction ID.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        paymentMethod: isFree ? "Free" : formData.paymentMethod,
        trxId: isFree ? "FREE" : formData.trxId.trim(),
      };

      const res = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      setRegistered(true);
      toast.success("Registration Confirmed!", {
        description: `Your registration for ${event.title} has been confirmed.`,
      });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 min-h-screen w-full">
        <div className="mb-6">
          <Link href="/events" className="inline-flex items-center gap-1.5 text-brand-accent hover:underline text-sm font-semibold">
            &larr; Back to Events
          </Link>
        </div>

        {/* Event Banner */}
        {event.bannerUrl && (
          <div className="w-full h-64 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden mb-10 border border-white/10 relative shadow-2xl bg-white/5">
            <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001124] via-transparent to-transparent opacity-80" />
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Info (Left 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-accent/20 text-brand-accent text-sm font-semibold border border-brand-accent/30">
                {event.category}
              </span>
              {isFree ? (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Free Event
                </span>
              ) : (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 font-mono">
                  Fee: ৳{event.regFee}
                </span>
              )}
              {event.isOpenForReg ? (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold border border-green-500/30 animate-pulse">
                  Registration Open
                </span>
              ) : (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-semibold border border-white/15">
                  Registration Closed
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              {event.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-10 text-white/80 pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="text-brand-accent" size={18}/> 
                <span>{new Date(event.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-brand-accent" size={18}/> 
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="text-brand-accent" size={18}/> 
                <span>Registration Fee: <strong className="text-white">{isFree ? "Free" : `৳${event.regFee}`}</strong></span>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-white">About the Event</h2>
            <p className="text-white/80 leading-relaxed mb-10 whitespace-pre-wrap text-base sm:text-lg">
              {event.description}
            </p>


            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-white pb-2 border-b border-white/10">Distinguished Speakers</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <img src={speaker.photoUrl} alt={speaker.name} width={56} height={56} loading="lazy" decoding="async" className="w-14 h-14 rounded-full object-cover border border-white/20 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{speaker.name}</div>
                        <div className="text-xs text-white/60 truncate">{speaker.designation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.guests && event.guests.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-white pb-2 border-b border-white/10">Honored Guests</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.guests.map((guest: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <img src={guest.photoUrl} alt={guest.name} width={56} height={56} loading="lazy" decoding="async" className="w-14 h-14 rounded-full object-cover border border-white/20 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{guest.name}</div>
                        <div className="text-xs text-white/60 truncate">{guest.designation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {event.fbLink && event.fbLink !== "#" && (
              <div className="pt-2">
                <a 
                  href={event.fbLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors font-semibold"
                >
                  <ExternalLink size={18} /> Official Facebook Event Page
                </a>
              </div>
            )}
          </div>

          {/* Registration Section (Right 5 Cols - Spacious & Robust) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#001733] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider block">Attendee Pass</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Event Registration</h3>
                </div>
                {event.isOpenForReg && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/25">
                    Live
                  </span>
                )}
              </div>

              {/* Fee Notice Box */}
              <div className={`mb-6 p-3.5 rounded-2xl border flex items-center justify-between ${
                isFree 
                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300' 
                  : 'bg-amber-500/10 border-amber-500/25 text-amber-300'
              }`}>
                <div className="flex items-center gap-2.5">
                  <Ticket size={18} className={isFree ? 'text-emerald-400' : 'text-amber-400'} />
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider">
                      {isFree ? "Free Registration Pass" : "Paid Event Pass"}
                    </div>
                    <div className="text-[11px] opacity-75">
                      {isFree ? "No bKash/Nagad transaction needed" : "Payment via bKash or Nagad required"}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                  isFree ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300 font-mono'
                }`}>
                  {isFree ? "FREE" : `৳${event.regFee}`}
                </div>
              </div>
              
              {!event.isOpenForReg ? (
                <div className="text-center py-10 px-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400 space-y-2">
                  <div className="font-bold text-lg">Registration Closed</div>
                  <p className="text-xs text-red-300/80">Online attendee registration for this event is currently unavailable.</p>
                </div>
              ) : registered ? (
                <div className="text-center p-8 bg-green-500/10 rounded-2xl border border-green-500/20 text-green-400 flex flex-col items-center">
                  <CheckCircle size={48} className="mb-4 text-green-400" />
                  <h4 className="text-2xl font-bold mb-2 text-white">Registration Confirmed!</h4>
                  <p className="text-sm text-white/70 mb-4">You have successfully registered for {event.title}.</p>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/80 w-full text-left space-y-2">
                    <div className="flex justify-between"><span className="text-white/40">Fee / Pass:</span> <span className={`font-semibold ${isFree ? 'text-emerald-300' : 'text-amber-300 font-mono'}`}>{isFree ? "Free (৳0)" : `৳${event.regFee}`}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Student ID:</span> <span className="font-mono font-medium text-white">{formData.studentId || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Year:</span> <span className="text-white">{formData.year}</span></div>
                    <div className="flex justify-between"><span className="text-white/40">Dept:</span> <span className="text-white">{formData.dept || "N/A"}</span></div>
                    {!isFree && (
                      <>
                        <div className="flex justify-between"><span className="text-white/40">Payment:</span> <span className="font-semibold text-brand-accent">{formData.paymentMethod}</span></div>
                        <div className="flex justify-between"><span className="text-white/40">TrxID:</span> <span className="font-mono text-white/90">{formData.trxId}</span></div>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                      placeholder="e.g. Ashfaque Amin Eshan"
                    />
                  </div>

                  {/* Email & Phone in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                        placeholder="017xxxxxxxx"
                      />
                    </div>
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Institution</label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                      placeholder="e.g. BUET"
                    />
                  </div>

                  {/* Student ID & Dept in 2 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Student ID *</label>
                      <input
                        required
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white font-mono placeholder-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                        placeholder="e.g. 2105001"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Department *</label>
                      <input
                        required
                        type="text"
                        value={formData.dept}
                        onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all text-sm"
                        placeholder="e.g. CSE, EEE, ME..."
                      />
                    </div>
                  </div>

                  {/* Year Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Academic Year *</label>
                    <div className="relative">
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all pr-10 cursor-pointer text-sm"
                      >
                        <option value="" disabled className="bg-[#001730] text-white/50">
                          Select Academic Year
                        </option>
                        <option value="1st Year" className="bg-[#001730] text-white">1st Year</option>
                        <option value="2nd Year" className="bg-[#001730] text-white">2nd Year</option>
                        <option value="3rd Year" className="bg-[#001730] text-white">3rd Year</option>
                        <option value="4th Year" className="bg-[#001730] text-white">4th Year</option>
                        <option value="Postgraduate" className="bg-[#001730] text-white">Postgraduate / Masters</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/50" size={18} />
                    </div>
                  </div>

                  {/* Payment Details (Only if Event is Paid) */}
                  {isFree ? (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2.5">
                      <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                      <span>This event is completely free! No payment or transaction ID is required.</span>
                    </div>
                  ) : (
                    <>
                      {/* Payment Method */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Payment Method *</label>
                        <div className="grid grid-cols-2 gap-3">
                          <label
                            className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.paymentMethod === "bKash"
                                ? "bg-[#e2136e]/20 border-[#e2136e] text-white shadow-[0_0_15px_rgba(226,19,110,0.25)]"
                                : "bg-black/30 border-white/10 text-white/70 hover:bg-white/5"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="bKash"
                              checked={formData.paymentMethod === "bKash"}
                              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                              className="accent-[#e2136e] w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-sm">bKash</span>
                          </label>

                          <label
                            className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                              formData.paymentMethod === "Nagad"
                                ? "bg-[#f7941d]/20 border-[#f7941d] text-white shadow-[0_0_15px_rgba(247,148,29,0.25)]"
                                : "bg-black/30 border-white/10 text-white/70 hover:bg-white/5"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="Nagad"
                              checked={formData.paymentMethod === "Nagad"}
                              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                              className="accent-[#f7941d] w-4 h-4 cursor-pointer"
                            />
                            <span className="font-bold text-sm">Nagad</span>
                          </label>
                        </div>
                      </div>

                      {/* Transaction ID */}
                      <div>
                        <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">Transaction ID *</label>
                        <input
                          required
                          type="text"
                          value={formData.trxId}
                          onChange={(e) => setFormData({ ...formData, trxId: e.target.value.toUpperCase() })}
                          className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white uppercase placeholder-white/30 font-mono text-sm focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent/50 transition-all tracking-wider"
                          placeholder="e.g. 9J28A7LK1Q"
                        />
                        <p className="text-[11px] text-white/50 mt-1">
                          Enter the transaction ID received from your {formData.paymentMethod} transfer of ৳{event.regFee}
                        </p>
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-brand-accent hover:brightness-110 text-[#013565] font-bold py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-[0_0_20px_rgba(56,189,248,0.3)] flex justify-center items-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <span>{isFree ? "Confirm Free Registration →" : "Complete Registration →"}</span>
                    )}
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
