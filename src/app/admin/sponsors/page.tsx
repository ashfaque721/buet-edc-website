"use client";

import React, { useState, useRef } from "react";
import { useSponsors, Sponsor } from "@/context/SponsorsContext";
import { Plus, Trash2, Edit3, Upload, Link as LinkIcon, Building2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function AdminSponsorsPage() {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useSponsors();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [tier, setTier] = useState("Past Sponsor");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setLogoUrl("");
    setTier("Past Sponsor");
    setWebsiteUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (sponsor: Sponsor) => {
    setEditingId(sponsor.id);
    setName(sponsor.name);
    setLogoUrl(sponsor.logoUrl);
    setTier(sponsor.tier || "Past Sponsor");
    setWebsiteUrl(sponsor.websiteUrl || "");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      toast.loading("Compressing & uploading logo...", { id: "upload-logo" });
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setLogoUrl(data.url);
      toast.success("Logo compressed to WebP and saved!", { id: "upload-logo" });
    } catch {
      toast.error("Failed to upload image", { id: "upload-logo" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please provide the company name");
      return;
    }

    if (!logoUrl.trim()) {
      toast.error("Please upload a logo image or provide an image URL");
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateSponsor(editingId, {
          name,
          logoUrl,
          tier,
          websiteUrl,
        });
        toast.success(`Updated ${name} sponsor details!`);
      } else {
        await addSponsor({
          name,
          logoUrl,
          tier,
          websiteUrl,
        });
        toast.success(`Added ${name} to past sponsors!`);
      }

      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save sponsor");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string, companyName: string) => {
    if (confirm(`Are you sure you want to remove ${companyName} from sponsors?`)) {
      deleteSponsor(id);
      toast.success(`Removed ${companyName} from past sponsors.`);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Past Sponsors & Partners</h1>
          <p className="text-white/60 text-sm mt-1">
            Upload and manage the company logos displayed in the homepage sponsors carousel.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-brand-accent text-[#013565] px-5 py-2.5 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.25)]"
        >
          <Plus size={18} /> Add Sponsor Logo
        </button>
      </div>

      {/* Grid of Sponsors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sponsors.map((sp) => (
          <div
            key={sp.id}
            className="group bg-white/5 border border-white/10 hover:border-brand-accent/40 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between transition-all hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]"
          >
            <div>
              <div className="w-full aspect-[16/9] rounded-xl bg-white/5 border border-white/10 p-3 mb-4 flex items-center justify-center overflow-hidden relative">
                {sp.logoUrl ? (
                  <img
                    src={sp.logoUrl}
                    alt={sp.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <Building2 size={32} className="text-white/30" />
                )}
              </div>

              <h3 className="font-bold text-lg text-white mb-1 tracking-tight truncate">{sp.name}</h3>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-accent/15 text-brand-accent border border-brand-accent/25 mb-3">
                {sp.tier || "Partner"}
              </span>

              {sp.websiteUrl && (
                <a
                  href={sp.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/50 hover:text-brand-accent flex items-center gap-1.5 transition-colors truncate mb-4"
                >
                  <ExternalLink size={12} /> {sp.websiteUrl.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-2">
              <button
                onClick={() => openEditModal(sp)}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Edit Sponsor"
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => handleDelete(sp.id, sp.name)}
                className="p-2 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Delete Sponsor"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {sponsors.length === 0 && (
          <div className="col-span-full py-16 text-center text-white/50 bg-white/5 border border-white/10 rounded-2xl">
            No sponsor logos found. Click &quot;Add Sponsor Logo&quot; to upload one.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001833] border border-white/10 w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-1">
              {editingId ? "Edit Sponsor Details" : "Add Sponsor Logo"}
            </h2>
            <p className="text-white/60 text-xs mb-6">
              Enter the partner company info and upload their logo for the homepage carousel.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">
                  Company Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Grameenphone, Unilever, Walton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">
                  Sponsorship Tier / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Title Sponsor, Gold Partner, Past Sponsor"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                />
              </div>

              {/* Logo Upload / URL */}
              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">
                  Company Logo *
                </label>
                
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="https://... (or choose a file to upload)"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                    disabled={isUploading}
                  />
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Upload size={16} /> {isUploading ? "Uploading..." : "Browse"}
                  </button>
                </div>

                {/* Logo Live Preview */}
                {logoUrl && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                    <div className="w-16 h-12 bg-white/10 rounded-lg p-1.5 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-xs text-green-400 font-medium">Logo ready to display</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 uppercase mb-1.5">
                  Company Website (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://company.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-accent text-[#013565] font-bold py-3 rounded-xl hover:brightness-110 transition-all text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingId ? "Update Sponsor" : "Save Sponsor Logo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
