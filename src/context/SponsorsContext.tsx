"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Sponsor {
  id: string;
  name: string;
  logoUrl: string;
  tier: string; // e.g. "Title Sponsor", "Gold Sponsor", "Incubation Partner", "Ecosystem Partner", "Strategic Partner"
  websiteUrl?: string;
  order?: number;
}

interface SponsorsContextType {
  sponsors: Sponsor[];
  loading: boolean;
  addSponsor: (sponsor: Omit<Sponsor, "id">) => Promise<Sponsor | null>;
  updateSponsor: (id: string, updates: Partial<Omit<Sponsor, "id">>) => Promise<void>;
  deleteSponsor: (id: string) => Promise<void>;
  refreshSponsors: () => Promise<void>;
}

const SponsorsContext = createContext<SponsorsContextType | undefined>(undefined);

async function getSponsorsData(): Promise<Sponsor[]> {
  const res = await fetch("/api/sponsors");
  if (!res.ok) throw new Error("Failed to fetch sponsors");
  return res.json();
}

export function SponsorsProvider({ children }: { children: React.ReactNode }) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSponsors = React.useCallback(async () => {
    try {
      const data = await getSponsorsData();
      setSponsors(data);
    } catch (e) {
      console.error("Failed to fetch sponsors:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await getSponsorsData();
        if (isMounted) {
          setSponsors(data);
        }
      } catch (e) {
        console.error("Failed to fetch sponsors:", e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const addSponsor = async (sponsor: Omit<Sponsor, "id">): Promise<Sponsor | null> => {
    try {
      const res = await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sponsor),
      });
      if (res.ok) {
        const created = await res.json();
        setSponsors((prev) => [created, ...prev]);
        return created;
      }
    } catch (e) {
      console.error("Failed to add sponsor:", e);
    }
    return null;
  };

  const updateSponsor = async (id: string, updates: Partial<Omit<Sponsor, "id">>) => {
    setSponsors((prev) =>
      prev.map((sp) => (sp.id === id ? { ...sp, ...updates } : sp))
    );
    try {
      await fetch(`/api/sponsors/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (e) {
      console.error("Failed to update sponsor:", e);
      fetchSponsors();
    }
  };

  const deleteSponsor = async (id: string) => {
    setSponsors((prev) => prev.filter((sp) => sp.id !== id));
    try {
      await fetch(`/api/sponsors/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete sponsor:", e);
      fetchSponsors();
    }
  };

  return (
    <SponsorsContext.Provider
      value={{
        sponsors,
        loading,
        addSponsor,
        updateSponsor,
        deleteSponsor,
        refreshSponsors: fetchSponsors,
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
