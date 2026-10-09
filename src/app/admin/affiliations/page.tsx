"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, X, Building2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminAffiliationsPage() {
  const [ambassadors, setAmbassadors] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newAmbassador, setNewAmbassador] = useState({
    name: "",
    company: "",
    logoUrl: "",
    photoUrl: "",
    linkedin: "",
    facebook: "",
  });

  const fetchAffiliations = async () => {
    try {
      const res = await fetch("/api/affiliations");
      if (res.ok) {
        const data = await res.json();
        setAmbassadors(data.ambassadors || []);
        setPartners(data.partners || []);
      }
    } catch {
      toast.error("Failed to load affiliations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliations();
  }, []);

  const handleUploadImage = async (
    file: File,
    target: "logo" | "photo"
  ) => {
    try {
      if (target === "logo") setIsUploadingLogo(true);
      else setIsUploadingPhoto(true);

      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      if (target === "logo") {
        setNewAmbassador(prev => ({ ...prev, logoUrl: data.url }));
        toast.success("Logo compressed to WebP and uploaded!");
      } else {
        setNewAmbassador(prev => ({ ...prev, photoUrl: data.url }));
        toast.success("Photo compressed to WebP and uploaded!");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      if (target === "logo") setIsUploadingLogo(false);
      else setIsUploadingPhoto(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from affiliations?`)) {
      setAmbassadors(prev => prev.filter(ca => ca.id !== id));
      try {
        const res = await fetch(`/api/affiliations/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success(`Removed ${name} from affiliations`);
      } catch {
        toast.error("Failed to delete ambassador");
        fetchAffiliations();
      }
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAmbassador.name || !newAmbassador.company) {
      toast.error("Please provide both ambassador name and company");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/affiliations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAmbassador),
      });

      if (!res.ok) throw new Error();
      const created = await res.json();
      setAmbassadors(prev => [created, ...prev]);
      setIsAddOpen(false);
      setNewAmbassador({ name: "", company: "", logoUrl: "", photoUrl: "", linkedin: "", facebook: "" });
      toast.success(`Added ${created.name} as Campus Ambassador for ${created.company}`);
    } catch {
      toast.error("Failed to add ambassador");
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Grid of Ambassadors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ambassadors.map(ca => (
          <div 
            key={ca.id} 
            className="group relative rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-brand-accent/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                    {ca.logoUrl ? (
                      <img src={ca.logoUrl} alt={ca.company} className="w-full h-full object-contain" />
                    ) : (
                      <Building2 size={24} className="text-brand-accent" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">{ca.company}</h3>
                    <span className="text-xs text-brand-accent">Partner Entity</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(ca.id, ca.name)}
                  className="p-2 text-white/40 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                  title="Remove Ambassador"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex items-center gap-4 my-4 p-3 rounded-xl bg-black/20 border border-white/5">
                <img 
                  src={ca.photoUrl || "https://i.pravatar.cc/150"} 
                  alt={ca.name} 
                  className="w-12 h-12 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="font-bold text-sm text-white">{ca.name}</div>
                  <div className="text-xs text-white/60">Campus Ambassador</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/5 text-xs text-white/60">
              {ca.linkedin && (
                <a href={ca.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                  LinkedIn
                </a>
              )}
              {ca.facebook && (
                <a href={ca.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                  • Facebook
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Ambassador Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001124] border border-white/15 rounded-2xl w-full max-w-lg p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
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

              {/* Logo Upload with Sharp Compression */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Company Logo</label>
                <div className="flex items-center gap-3">
                  {newAmbassador.logoUrl && (
                    <img src={newAmbassador.logoUrl} alt="" className="w-10 h-10 object-contain rounded-lg bg-white/5 border border-white/10 p-1" />
                  )}
                  <label className="flex-1 border-2 border-dashed border-white/20 hover:border-brand-accent rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5">
                    <Upload size={14} className="text-brand-accent" />
                    <span className="text-xs font-semibold text-white/80">
                      {isUploadingLogo ? "Compressing..." : "Upload Logo (Auto WebP)"}
                    </span>
                    <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleUploadImage(e.target.files[0], "logo")} className="hidden" disabled={isUploadingLogo} />
                  </label>
                </div>
              </div>

              {/* Photo Upload with Sharp Compression */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Ambassador Portrait Photo</label>
                <div className="flex items-center gap-3">
                  {newAmbassador.photoUrl && (
                    <img src={newAmbassador.photoUrl} alt="" className="w-10 h-10 object-cover rounded-full bg-white/5 border border-white/10" />
                  )}
                  <label className="flex-1 border-2 border-dashed border-white/20 hover:border-brand-accent rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5">
                    <Upload size={14} className="text-brand-accent" />
                    <span className="text-xs font-semibold text-white/80">
                      {isUploadingPhoto ? "Compressing..." : "Upload Photo (Auto WebP)"}
                    </span>
                    <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleUploadImage(e.target.files[0], "photo")} className="hidden" disabled={isUploadingPhoto} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">LinkedIn Profile URL</label>
                  <input 
                    type="text" 
                    placeholder="https://linkedin.com/in/..."
                    value={newAmbassador.linkedin}
                    onChange={e => setNewAmbassador({...newAmbassador, linkedin: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">Facebook Profile URL</label>
                  <input 
                    type="text" 
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
                  disabled={isSubmitting}
                  className="w-full bg-brand-accent text-[#013565] font-bold py-3 rounded-xl hover:brightness-110 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
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
