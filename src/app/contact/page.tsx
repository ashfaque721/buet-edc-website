"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { Mail, MapPin, CheckCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { FacebookIcon, LinkedinIcon, InstagramIcon } from "@/components/Icons";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const inputs = form.elements as any;
    const name = inputs[0].value;
    const email = inputs[1].value;
    const subject = inputs[2].value;
    const message = inputs[3].value;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!res.ok) throw new Error();

      form.reset();
      toast.success("Message Sent Successfully!", {
        description: "We'll get back to you as soon as possible."
      });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Info */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Let's <span className="text-brand-accent">Connect</span></h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Have an idea? Want to partner with us? Or just want to reach out? We'd love to hear from you across any of our official channels!
            </p>

            <div className="space-y-6">
              {/* Official Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-accent/40 transition-colors">
                <div className="bg-brand-accent/20 p-3.5 rounded-xl text-brand-accent shrink-0">
                  <Mail size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-white/60 mb-0.5 uppercase tracking-wider">Official Email</h3>
                  <a href="mailto:buet.edc@gmail.com" className="text-base sm:text-lg font-bold text-white hover:text-brand-accent transition-colors break-all">
                    buet.edc@gmail.com
                  </a>
                </div>
              </div>

              {/* Facebook Page */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#1877f2]/50 transition-colors">
                <div className="bg-[#1877f2]/20 p-3.5 rounded-xl text-[#1877f2] shrink-0">
                  <FacebookIcon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-white/60 mb-0.5 uppercase tracking-wider">Facebook Page</h3>
                  <a 
                    href="https://www.facebook.com/BUET.EDC" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base sm:text-lg font-bold text-white hover:text-[#1877f2] transition-colors break-all flex items-center gap-1.5"
                  >
                    facebook.com/BUET.EDC <ExternalLink size={14} className="text-[#1877f2] shrink-0" />
                  </a>
                </div>
              </div>

              {/* LinkedIn Page */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0a66c2]/50 transition-colors">
                <div className="bg-[#0a66c2]/20 p-3.5 rounded-xl text-[#0a66c2] shrink-0">
                  <LinkedinIcon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-white/60 mb-0.5 uppercase tracking-wider">LinkedIn Page</h3>
                  <a 
                    href="https://www.linkedin.com/company/buet-entrepreneurship-development-club/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base sm:text-lg font-bold text-white hover:text-brand-accent transition-colors break-all flex items-center gap-1.5"
                  >
                    BUET EDC on LinkedIn <ExternalLink size={14} className="text-brand-accent shrink-0" />
                  </a>
                </div>
              </div>

              {/* Instagram Page */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#e1306c]/50 transition-colors">
                <div className="bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 p-3.5 rounded-xl text-[#f43f5e] shrink-0">
                  <InstagramIcon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-white/60 mb-0.5 uppercase tracking-wider">Instagram</h3>
                  <a 
                    href="https://www.instagram.com/edc_buet/?hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base sm:text-lg font-bold text-white hover:text-[#f43f5e] transition-colors break-all flex items-center gap-1.5"
                  >
                    instagram.com/edc_buet <ExternalLink size={14} className="text-[#f43f5e] shrink-0" />
                  </a>
                </div>
              </div>

              {/* Campus Address */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="bg-brand-accent/20 p-3.5 rounded-xl text-brand-accent shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white/60 mb-0.5 uppercase tracking-wider">Campus Address</h3>
                  <div className="text-base sm:text-lg font-bold text-white/90">BUET, Dhaka-1000, Bangladesh</div>
                </div>
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
