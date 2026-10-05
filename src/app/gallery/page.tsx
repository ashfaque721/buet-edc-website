"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { useGallery } from "@/context/GalleryContext";
import { Calendar, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export default function GalleryPage() {
  const { photos } = useGallery();
  const [mounted, setMounted] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (!mounted) return null;

  const handlePrev = () => {
    if (lightboxIndex !== null && photos.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null && photos.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % photos.length);
    }
  };

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Through the <span className="text-brand-accent">Lens</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Life and milestones at BUET EDC. Relive our best moments.
          </p>
        </div>

        {/* Masonry / Grid */}
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/40">
            <ImageIcon size={48} className="mb-4" />
            <p>No photos have been uploaded yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, index) => (
              <div 
                key={photo.id} 
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer break-inside-avoid"
              >
                <img 
                  src={photo.imageUrl} 
                  alt={photo.caption}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#001124]/90 via-[#001124]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-brand-accent text-xs font-semibold mb-2">
                      <Calendar size={14} />
                      {new Date(photo.eventDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                    {photo.eventName && (
                      <div className="text-sm font-bold text-white mb-1">{photo.eventName}</div>
                    )}
                    <p className="text-white/70 text-sm line-clamp-2">{photo.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#001124]/90 backdrop-blur-xl">
          <button 
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 p-2 rounded-full z-50"
          >
            <X size={24} />
          </button>
          
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/60 hover:bg-white/20 p-2 sm:p-3 rounded-full z-50 flex items-center justify-center border border-white/10 shadow-lg"
            aria-label="Previous photo"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors bg-black/60 hover:bg-white/20 p-2 sm:p-3 rounded-full z-50 flex items-center justify-center border border-white/10 shadow-lg"
            aria-label="Next photo"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className="max-w-5xl w-full px-4 sm:px-8 md:px-20 max-h-[90vh] overflow-y-auto flex flex-col items-center py-6">
            <div className="relative w-full aspect-video md:aspect-auto md:h-[65vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 flex-shrink-0">
              <img 
                src={photos[lightboxIndex].imageUrl} 
                alt={photos[lightboxIndex].caption} 
                className="w-full h-full object-contain bg-black/40" 
              />
            </div>
            
            <div className="text-center w-full max-w-3xl">
              <div className="inline-flex items-center gap-2 text-brand-accent text-sm font-semibold mb-3 bg-brand-accent/10 px-4 py-1.5 rounded-full border border-brand-accent/20">
                <Calendar size={16} />
                {new Date(photos[lightboxIndex].eventDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              {photos[lightboxIndex].eventName && (
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{photos[lightboxIndex].eventName}</h2>
              )}
              <p className="text-white/80 md:text-lg leading-relaxed">{photos[lightboxIndex].caption}</p>
            </div>
          </div>
        </div>
      )}

      <StickyFooterReveal />
    </main>
  );
}
