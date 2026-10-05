"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

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
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setMobileEventsOpen(false);
  };

  return (
    <>
      {/* ── Main Sticky/Fixed Navigation Bar ── */}
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
                    {link.subLinks && (
                      <ChevronDown
                        size={14}
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                  </Link>

                  {link.subLinks && (
                    <div className="absolute top-[80%] left-0 mt-2 w-48 bg-[#001124]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col p-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                      {link.subLinks.map((sub) => (
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

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="md:hidden z-50 text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* ── Isolated Fullscreen Mobile Drawer Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 h-screen w-screen z-[100] flex flex-col justify-between p-6 sm:p-8 bg-[#000f20]/95 backdrop-blur-2xl overflow-y-auto md:hidden"
          >
            {/* Header Row (Top) */}
            <div className="flex items-center justify-between w-full shrink-0">
              {/* Left: BUET EDC Logo */}
              <Link
                href="/"
                prefetch={true}
                onClick={closeMenu}
                className="flex items-center gap-2"
              >
                <img
                  src="/logo-light.png"
                  alt="BUET EDC Logo"
                  className="h-10 w-auto"
                />
              </Link>

              {/* Right: Crisp circular 'X' (close) button */}
              <button
                onClick={closeMenu}
                className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95"
                aria-label="Close Navigation Menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation Links Stack (Center) */}
            <div className="flex flex-col items-center justify-center gap-6 my-auto py-8">
              <ul className="flex flex-col items-center gap-6 w-full text-center">
                {navLinks.map((link) => (
                  <li key={link.name} className="flex flex-col items-center w-full">
                    {link.subLinks ? (
                      <div className="flex flex-col items-center w-full">
                        <button
                          onClick={() => setMobileEventsOpen((prev) => !prev)}
                          className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 hover:text-[#38bdf8] transition-colors flex items-center justify-center gap-2 w-full py-1"
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            size={20}
                            className={clsx(
                              "transition-transform duration-300 text-white/60",
                              mobileEventsOpen && "rotate-180 text-[#38bdf8]"
                            )}
                          />
                        </button>
                        {mobileEventsOpen && (
                          <div className="flex flex-col items-center gap-3 mt-3 pt-1">
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={closeMenu}
                                className="text-lg font-semibold text-white/70 hover:text-[#38bdf8] transition-colors py-1"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="text-2xl sm:text-3xl font-bold tracking-tight text-white/90 hover:text-[#38bdf8] transition-colors py-1"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Button & Footer (Bottom) */}
            <div className="w-full shrink-0 flex flex-col items-center gap-5 pt-4">
              {/* Contact CTA Button */}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="w-full max-w-xs mx-auto py-3.5 px-6 rounded-full bg-[#38bdf8] text-[#013565] font-bold text-base shadow-[0_0_25px_rgba(56,189,248,0.3)] text-center transition-all active:scale-95"
              >
                Contact Us
              </Link>

              {/* Footer info: Email & Socials */}
              <div className="flex flex-col items-center gap-3 text-center">
                <a
                  href="mailto:edcbuet@gmail.com"
                  className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-[#38bdf8] transition-colors font-mono"
                >
                  <Mail size={14} className="text-[#38bdf8]" />
                  edcbuet@gmail.com
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="https://facebook.com/buetedc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-[#38bdf8] transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/company/buetedc"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-[#38bdf8] transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
