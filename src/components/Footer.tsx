"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#000f20] pt-20 pb-14 border-t border-white/10 relative z-10 w-full" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" prefetch={true} className="inline-block mb-6">
              <Image
                src="/logo-light.png"
                alt="BUET EDC Logo"
                width={180}
                height={64}
                loading="lazy"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              The official entrepreneurship club of Bangladesh University of Engineering and Technology, fostering innovation and venture building since inception.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/BUET.EDC" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/buet-entrepreneurship-development-club/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a 
                href="https://www.instagram.com/edc_buet/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white hover:text-brand-accent hover:border-brand-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-white/60 hover:text-brand-accent transition-colors">Flagship Events</Link></li>
              <li><Link href="/affiliations" className="text-white/60 hover:text-brand-accent transition-colors">Our Affiliations</Link></li>
              <li><Link href="/executives" className="text-white/60 hover:text-brand-accent transition-colors">Executive Panel</Link></li>
              <li><Link href="/gallery" className="text-white/60 hover:text-brand-accent transition-colors">Photo Gallery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-accent shrink-0 mt-1" />
                <span className="text-white/60">BUET Campus, Dhaka-1000, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-accent shrink-0" />
                <a href="mailto:buet.edc@gmail.com" className="text-white/60 hover:text-brand-accent transition-colors break-all">buet.edc@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">Stay Updated</h4>
            <p className="text-white/60 mb-4">Subscribe to our newsletter for the latest events and opportunities.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-accent/50 transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-bold py-3 rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} BUET Entrepreneurship Development Club. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
