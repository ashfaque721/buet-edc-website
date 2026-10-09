"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StickyFooterReveal from "@/components/StickyFooterReveal";
import { FileText, Download, BookOpen, Loader2 } from "lucide-react";

const CATEGORIES = ["All", "Pitch Decks", "Case Studies", "Startup Guides", "Financial Models"];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = activeCategory === "All" 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <main className="relative z-10 flex flex-col bg-[#001124]">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Resource <span className="text-brand-accent">Library</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">Equip yourself with the knowledge, templates, and insights to build your next big thing.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeCategory === category ? 'bg-brand-accent text-[#013565] shadow-[0_0_15px_rgba(56,189,248,0.4)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-20 text-brand-accent">
            <Loader2 size={36} className="animate-spin" />
          </div>
        )}

        {/* Resources Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-gradient-to-br from-white/5 to-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col group">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full">{resource.category}</span>
                  <span className="text-white/50 text-sm flex items-center gap-1">
                    {resource.type === 'PDF' ? <FileText size={14}/> : <BookOpen size={14}/>}
                    {resource.readingTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-accent transition-colors">{resource.title}</h3>
                <p className="text-white/70 text-sm mb-8 flex-grow">{resource.description}</p>
                
                {resource.link && resource.link !== "#" ? (
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    download={resource.type === 'PDF' && resource.link.endsWith('.pdf') ? true : undefined}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/10 hover:bg-brand-accent hover:text-[#013565] transition-all font-semibold mt-auto border border-white/5 shadow-sm text-sm"
                  >
                    {resource.type === 'PDF' ? (
                      <><Download size={18}/> Download PDF</>
                    ) : (
                      <><BookOpen size={18}/> Read Article</>
                    )}
                  </a>
                ) : (
                  <button 
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/5 text-white/30 font-semibold mt-auto border border-white/5 text-sm cursor-not-allowed"
                  >
                    {resource.type === 'PDF' ? (
                      <><Download size={18}/> PDF Coming Soon</>
                    ) : (
                      <><BookOpen size={18}/> Article Coming Soon</>
                    )}
                  </button>
                )}
              </div>
            ))}
            {filteredResources.length === 0 && (
              <div className="col-span-3 text-center py-20 text-white/50">
                No resources found in this category.
              </div>
            )}
          </div>
        )}
      </section>

      <StickyFooterReveal />
    </main>
  );
}
