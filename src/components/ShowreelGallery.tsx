"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGallery } from "@/context/GalleryContext";

import Image from "next/image";

export default function Gallery() {
  const containerRef = useRef<HTMLElement>(null);
  const { photos } = useGallery();

  const homepagePhotos = photos.filter(p => p.showOnHomepage).slice(0, 5); // take up to 5 for the layout

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from(".gallery-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%", once: true },
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
      });

      gsap.from(".gallery-item", {
        scrollTrigger: { trigger: ".gallery-grid", start: "top 80%", once: true },
        y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 relative z-10 bg-brand-primary/50 backdrop-blur-sm border-y border-white/5 min-h-[480px]" id="gallery-section">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="gallery-header text-center mb-16 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience the <span className="text-brand-accent">Energy</span></h2>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            From national ideathons to exclusive founder fireside chats, witness how we cultivate the entrepreneurial spirit.
          </p>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-brand-primary bg-brand-accent font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            Explore Full Gallery
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {homepagePhotos.map((photo, i) => (
            <div 
              key={photo.id} 
              className={clsx(
                "gallery-item relative rounded-2xl overflow-hidden group border border-white/10",
                i === 0 || i === 4 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              )}
            >
              <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src={photo.imageUrl} 
                alt="Gallery photo" 
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          ))}
          {homepagePhotos.length === 0 && (
            <div className="col-span-full py-12 text-center text-white/50 border border-white/10 rounded-2xl border-dashed">
              No featured photos yet.
            </div>
          )}
        </div>
        
      </div>
    </section>
  );
}
