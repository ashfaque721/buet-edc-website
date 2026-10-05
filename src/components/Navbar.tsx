"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { name: "About", href: "/about" },
  { 
    name: "Events", 
    href: "/events",
    subLinks: [
      { name: "Events Hub", href: "/events" },
      { name: "Photo Gallery", href: "/gallery" }
    ]
  },
  { name: "Affiliations", href: "/affiliations" },
  { name: "Executives", href: "/executives" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#001124]/85 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center gap-2 z-50">
          <img src="/logo-light.png" alt="BUET EDC Logo" className="h-10 md:h-11 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors flex items-center gap-1 py-4"
                >
                  {link.name}
                  {link.subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                
                {link.subLinks && (
                  <div className="absolute top-[80%] left-0 mt-2 w-48 bg-[#001124]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                    {link.subLinks.map(sub => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-brand-accent hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] active:scale-[0.98]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 bg-[#001124]/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.name} className="flex flex-col items-center">
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-brand-accent transition-colors"
              >
                {link.name}
              </Link>
              {link.subLinks && (
                <div className="flex flex-col items-center gap-3 mt-3">
                  {link.subLinks.map(sub => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-white/60 hover:text-brand-accent transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className="mt-3">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-brand-accent text-brand-primary px-8 py-3 rounded-full text-lg font-bold shadow-[0_0_24px_rgba(56,189,248,0.3)]"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
