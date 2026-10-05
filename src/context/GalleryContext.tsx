"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface GalleryPhoto {
  id: string;
  imageUrl: string;
  caption: string;
  eventDate: string; // e.g. "2026-03-15"
  eventName?: string;
  showOnHomepage: boolean;
}

const INITIAL_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    caption: "The flagship pitch competition where 50+ startups presented their ideas.",
    eventDate: "2026-03-15",
    eventName: "National Startup Sprint 2026",
    showOnHomepage: true,
  },
  {
    id: "photo-2",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    caption: "Networking session with industry leaders and angel investors.",
    eventDate: "2026-04-10",
    eventName: "Founders Meetup",
    showOnHomepage: true,
  },
  {
    id: "photo-3",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    caption: "Collaborative ideation workshop focusing on sustainable tech solutions.",
    eventDate: "2026-02-22",
    eventName: "Sustainability Hackathon",
    showOnHomepage: true,
  },
  {
    id: "photo-4",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    caption: "Keynote address on the future of AI in consumer products.",
    eventDate: "2025-11-05",
    eventName: "Tech Trends Summit",
    showOnHomepage: false,
  },
  {
    id: "photo-5",
    imageUrl: "https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=800&q=80",
    caption: "Award ceremony recognizing the most innovative student projects.",
    eventDate: "2025-12-12",
    eventName: "Annual Innovation Awards",
    showOnHomepage: true,
  },
  {
    id: "photo-6",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
    caption: "Team building and leadership retreat for the executive panel.",
    eventDate: "2026-01-18",
    eventName: "Executive Retreat",
    showOnHomepage: false,
  },
];

interface GalleryContextType {
  photos: GalleryPhoto[];
  addPhoto: (photo: GalleryPhoto) => void;
  updatePhoto: (id: string, updates: Partial<GalleryPhoto>) => void;
  deletePhoto: (id: string) => void;
  toggleHomepage: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("edc_gallery_photos");
    if (stored) {
      try {
        setPhotos(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse gallery photos from localStorage", e);
        setPhotos(INITIAL_PHOTOS);
      }
    } else {
      setPhotos(INITIAL_PHOTOS);
      localStorage.setItem("edc_gallery_photos", JSON.stringify(INITIAL_PHOTOS));
    }
    setMounted(true);
  }, []);

  const savePhotos = (newPhotos: GalleryPhoto[]) => {
    setPhotos(newPhotos);
    localStorage.setItem("edc_gallery_photos", JSON.stringify(newPhotos));
  };

  const addPhoto = (photo: GalleryPhoto) => {
    savePhotos([photo, ...photos]);
  };

  const updatePhoto = (id: string, updates: Partial<GalleryPhoto>) => {
    const newPhotos = photos.map((p) => (p.id === id ? { ...p, ...updates } : p));
    savePhotos(newPhotos);
  };

  const deletePhoto = (id: string) => {
    const newPhotos = photos.filter((p) => p.id !== id);
    savePhotos(newPhotos);
  };

  const toggleHomepage = (id: string) => {
    const newPhotos = photos.map((p) =>
      p.id === id ? { ...p, showOnHomepage: !p.showOnHomepage } : p
    );
    savePhotos(newPhotos);
  };

  if (!mounted) {
    // Return null or basic wrapper during SSR to prevent hydration mismatch,
    // or just return children with empty context. For now, we'll return children 
    // wrapped in context, but components consuming it should handle empty initial state.
  }

  return (
    <GalleryContext.Provider value={{ photos, addPhoto, updatePhoto, deletePhoto, toggleHomepage }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}
