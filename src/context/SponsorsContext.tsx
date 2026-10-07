"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  tier: string; // e.g. "Title Sponsor", "Gold Sponsor", "Incubation Partner", "Ecosystem Partner", "Strategic Partner"
  websiteUrl?: string;
}

export const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: "sp-1",
    name: "Walton",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Walton_Group_logo.svg/320px-Walton_Group_logo.svg.png",
    tier: "Title Sponsor",
    websiteUrl: "https://waltonbd.com",
  },
  {
    id: "sp-2",
    name: "10 Minute School",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/10_Minute_School_Logo.svg/320px-10_Minute_School_Logo.svg.png",
    tier: "Incubation Partner",
    websiteUrl: "https://10minuteschool.com",
  },
  {
    id: "sp-3",
    name: "bKash",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/BKash_Logo.svg/320px-BKash_Logo.svg.png",
    tier: "Fintech Partner",
    websiteUrl: "https://bkash.com",
  },
  {
    id: "sp-4",
    name: "Grameenphone",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Grameenphone_logo.svg/320px-Grameenphone_logo.svg.png",
    tier: "Telecom Partner",
    websiteUrl: "https://grameenphone.com",
  },
  {
    id: "sp-5",
    name: "Pathao",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pathao_logo.svg/320px-Pathao_logo.svg.png",
    tier: "Mobility Partner",
    websiteUrl: "https://pathao.com",
  },
  {
    id: "sp-6",
    name: "Unilever",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Unilever.svg/320px-Unilever.svg.png",
    tier: "FMCG Partner",
    websiteUrl: "https://unilever.com.bd",
  },
  {
    id: "sp-7",
    name: "Robi Axiata",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Robi_logo.svg/320px-Robi_logo.svg.png",
    tier: "Digital Partner",
    websiteUrl: "https://robi.com.bd",
  },
  {
    id: "sp-8",
    name: "Brain Station 23",
    logoUrl: "https://brainstation-23.com/wp-content/uploads/2021/04/Brain-Station-23-Logo.png",
    tier: "Tech Sponsor",
    websiteUrl: "https://brainstation-23.com",
  },
];

const STORAGE_KEY = "buet_edc_past_sponsors_v2";

interface SponsorsContextType {
  sponsors: Sponsor[];
  addSponsor: (sponsor: Omit<Sponsor, "id">) => void;
  updateSponsor: (id: string, updates: Partial<Omit<Sponsor, "id">>) => void;
  deleteSponsor: (id: string) => void;
}

const SponsorsContext = createContext<SponsorsContextType | undefined>(undefined);

export function SponsorsProvider({ children }: { children: React.ReactNode }) {
  const [sponsors, setSponsors] = useState<Sponsor[]>(INITIAL_SPONSORS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSponsors(parsed);
        } else {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SPONSORS));
        }
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SPONSORS));
      }
    } catch (e) {
      console.warn("Failed to read sponsors from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sponsors));
      } catch (e) {
        console.warn("Failed to persist sponsors to localStorage:", e);
      }
    }
  }, [sponsors, isLoaded]);

  const addSponsor = (sponsor: Omit<Sponsor, "id">) => {
    const newEntry: Sponsor = {
      ...sponsor,
      id: `sp-${Date.now()}`,
    };
    setSponsors(prev => [newEntry, ...prev]);
  };

  const updateSponsor = (id: string, updates: Partial<Omit<Sponsor, "id">>) => {
    setSponsors(prev =>
      prev.map(sp => (sp.id === id ? { ...sp, ...updates } : sp))
    );
  };

  const deleteSponsor = (id: string) => {
    setSponsors(prev => prev.filter(sp => sp.id !== id));
  };

  return (
    <SponsorsContext.Provider
      value={{
        sponsors,
        addSponsor,
        updateSponsor,
        deleteSponsor,
      }}
    >
      {children}
    </SponsorsContext.Provider>
  );
}

export function useSponsors() {
  const context = useContext(SponsorsContext);
  if (!context) {
    throw new Error("useSponsors must be used within a SponsorsProvider");
  }
  return context;
}
