"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { Mail, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { FacebookIcon, LinkedinIcon } from "@/components/Icons";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Message Sent Successfully!", {
        description: "We'll get back to you as soon as possible."
      });
    }, 1500);
  };

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Info */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's <span className="text-brand-accent">Connect</span></h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Have an idea? Want to partner with us? Or just want to say hi? We'd love to hear from you. Drop us a message!
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-brand-accent/20 p-4 rounded-2xl text-brand-accent">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/60 mb-1 uppercase tracking-wide text-sm">Official Email</h3>
                  <a href="mailto:edcbuet@gmail.com" className="text-xl sm:text-2xl font-semibold hover:text-brand-accent transition-colors break-all">edcbuet@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-accent/20 p-4 rounded-2xl text-brand-accent">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white/60 mb-1 uppercase tracking-wide text-sm">Campus Address</h3>
                  <div className="text-xl font-semibold">BUET, Dhaka-1000<br/>Bangladesh</div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-white/60 mb-4 uppercase tracking-wide">Follow Our Journey</h3>
              <div className="flex gap-4">
                <a href="#" className="bg-white/5 p-4 rounded-xl hover:bg-[#1877f2] hover:text-white transition-all"><FacebookIcon size={24} /></a>
                <a href="#" className="bg-white/5 p-4 rounded-xl hover:bg-[#0a66c2] hover:text-white transition-all"><LinkedinIcon size={24} /></a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="John Doe" disabled={isSubmitting} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@example.com" disabled={isSubmitting} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors" placeholder="Partnership Inquiry" disabled={isSubmitting} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand-accent transition-colors resize-none" placeholder="Tell us about your idea..." disabled={isSubmitting}></textarea>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-bold py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_20px_rgba(56,189,248,0.3)] text-lg flex items-center justify-center">
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <StickyFooterReveal />
    </main>
  );
}
