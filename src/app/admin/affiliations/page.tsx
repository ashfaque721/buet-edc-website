"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mock-data";
import { Plus, Trash2, X, Building2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminAffiliationsPage() {
  const [ambassadors, setAmbassadors] = useState(mockData.affiliations.ambassadors);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAmbassador, setNewAmbassador] = useState({
    name: "",
    company: "",
    logoUrl: "",
    photoUrl: "",
    linkedin: "",
    facebook: "",
  });

  const handleDelete = (id: string, name: string) => {
    setAmbassadors(prev => prev.filter(ca => ca.id !== id));
    toast.success(`Removed ${name} from affiliations`);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmbassador.name || !newAmbassador.company) {
      toast.error("Please provide both ambassador name and company");
      return;
    }

    const created = {
      id: `ca-${Date.now()}`,
      name: newAmbassador.name,
      company: newAmbassador.company,
      logoUrl: newAmbassador.logoUrl || "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80",
      photoUrl: newAmbassador.photoUrl || `https://i.pravatar.cc/300?u=${Date.now()}`,
      socials: {
        linkedin: newAmbassador.linkedin || "#",
        facebook: newAmbassador.facebook || "#",
      }
    };

    setAmbassadors(prev => [created, ...prev]);
    setIsAddOpen(false);
    setNewAmbassador({ name: "", company: "", logoUrl: "", photoUrl: "", linkedin: "", facebook: "" });
    toast.success(`Added ${created.name} as Campus Ambassador for ${created.company}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Affiliations (Campus Ambassadors)</h1>
          <p className="text-white/60 text-sm mt-1">Manage brand representatives and company affiliations</p>
        </div>
        <button 
          onClick={() => setIsAddOpen(true)}
          className="bg-brand-accent text-[#013565] px-4 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
        >
          <Plus size={18} /> Add Ambassador
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[580px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70">Ambassador</th>
              <th className="p-4 font-semibold text-white/70">Company / Partner</th>
              <th className="p-4 font-semibold text-white/70">Company Logo</th>
              <th className="p-4 font-semibold text-white/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambassadors.map((ca) => (
              <tr key={ca.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={ca.photoUrl} alt={ca.name} className="w-10 h-10 rounded-full object-cover bg-white/10 border border-white/10" />
                  <span className="font-bold text-white">{ca.name}</span>
                </td>
                <td className="p-4 font-medium text-brand-accent">{ca.company}</td>
                <td className="p-4">
                  {ca.logoUrl ? (
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 p-1 flex items-center justify-center overflow-hidden">
                      <img src={ca.logoUrl} alt={ca.company} className="w-full h-full object-cover rounded" />
                    </div>
                  ) : (
                    <span className="text-white/30 text-xs italic">No logo</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(ca.id, ca.name)}
                    className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete Ambassador"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {ambassadors.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/40">
                  No campus ambassadors found. Click "Add Ambassador" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add Ambassador Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#001833] border border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-1">Add Campus Ambassador</h2>
            <p className="text-white/60 text-xs mb-6">Enter ambassador details and company partner branding</p>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Ambassador Full Name *</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Ayman Sadiq"
                  value={newAmbassador.name}
                  onChange={e => setNewAmbassador({...newAmbassador, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Company / Partner Name *</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. 10 Minute School"
                  value={newAmbassador.company}
                  onChange={e => setNewAmbassador({...newAmbassador, company: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Company Logo Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={newAmbassador.logoUrl}
                  onChange={e => setNewAmbassador({...newAmbassador, logoUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Ambassador Photo URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={newAmbassador.photoUrl}
                  onChange={e => setNewAmbassador({...newAmbassador, photoUrl: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">LinkedIn Profile URL</label>
                  <input 
                    type="url" 
                    placeholder="https://linkedin.com/in/..."
                    value={newAmbassador.linkedin}
                    onChange={e => setNewAmbassador({...newAmbassador, linkedin: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Facebook Profile URL</label>
                  <input 
                    type="url" 
                    placeholder="https://facebook.com/..."
                    value={newAmbassador.facebook}
                    onChange={e => setNewAmbassador({...newAmbassador, facebook: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-brand-accent text-[#013565] font-bold py-3 rounded-xl hover:brightness-110 transition-all text-sm"
                >
                  Save Ambassador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
