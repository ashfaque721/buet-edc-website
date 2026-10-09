"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, X, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

export default function AdminExecutivesPage() {
  const [executives, setExecutives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    wing: "Executive Board",
    term: "current",
    photoUrl: "",
    facebook: "",
    linkedin: "",
    order: 0,
  });

  const fetchExecutives = async () => {
    try {
      const res = await fetch("/api/executives");
      if (res.ok) {
        const data = await res.json();
        setExecutives(data);
      }
    } catch {
      toast.error("Failed to load executives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      designation: "",
      wing: "Executive Board",
      term: "current",
      photoUrl: "",
      facebook: "",
      linkedin: "",
      order: executives.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exec: any) => {
    setEditingId(exec.id);
    setFormData({
      name: exec.name,
      designation: exec.designation,
      wing: exec.wing,
      term: exec.term,
      photoUrl: exec.photoUrl,
      facebook: exec.facebook || "",
      linkedin: exec.linkedin || "",
      order: exec.order || 0,
    });
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
      const form = new FormData();
      form.append("file", file);
      toast.loading("Compressing & uploading photo...", { id: "upload-exec" });
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData(prev => ({ ...prev, photoUrl: data.url }));
      toast.success("Photo compressed to WebP and saved!", { id: "upload-exec" });
    } catch {
      toast.error("Failed to upload photo", { id: "upload-exec" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.designation.trim()) {
      toast.error("Please provide both name and designation");
      return;
    }
    if (!formData.photoUrl.trim()) {
      toast.error("Please upload a photo or provide a URL");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/executives/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error();
        toast.success("Executive updated successfully!");
      } else {
        const res = await fetch("/api/executives", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error();
        toast.success("Executive added successfully!");
      }

      setIsModalOpen(false);
      fetchExecutives();
    } catch {
      toast.error(editingId ? "Failed to update executive" : "Failed to add executive");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setExecutives(prev => prev.filter(e => e.id !== id));
      try {
        const res = await fetch(`/api/executives/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success(`Removed ${name}`);
      } catch {
        toast.error("Failed to delete executive");
        fetchExecutives();
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Executives</h1>
          <p className="text-white/60 text-sm mt-1">Club advisors and executive panel members</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          <Plus size={18} /> Add Executive
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[620px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70">Executive</th>
              <th className="p-4 font-semibold text-white/70">Designation</th>
              <th className="p-4 font-semibold text-white/70">Wing</th>
              <th className="p-4 font-semibold text-white/70">Panel Term</th>
              <th className="p-4 font-semibold text-white/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {executives.map((exec) => (
              <tr key={exec.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={exec.photoUrl} alt={exec.name} className="w-10 h-10 rounded-full object-cover bg-white/10 border border-white/10" />
                  <span className="font-bold">{exec.name}</span>
                </td>
                <td className="p-4 text-brand-accent font-medium">{exec.designation}</td>
                <td className="p-4 text-white/80">{exec.wing}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${exec.term === 'current' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400'}`}>
                    {exec.term === 'current' ? 'Current' : 'Past'}
                  </span>
                </td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button 
                    onClick={() => openEditModal(exec)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(exec.id, exec.name)}
                    className="p-2 text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001124] border border-white/15 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Executive" : "Add Executive"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            <form data-lenis-prevent onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={e => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Panel Term</label>
                  <select
                    value={formData.term}
                    onChange={e => setFormData({ ...formData, term: e.target.value })}
                    className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="current">Current Panel</option>
                    <option value="past">Past Panel</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Wing</label>
                <select
                  value={formData.wing}
                  onChange={e => setFormData({ ...formData, wing: e.target.value })}
                  className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                >
                  <option value="Executive Board">Executive Board</option>
                  <option value="Advisory Panel">Advisory Panel</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Finance & Sponsorship">Finance & Sponsorship</option>
                </select>
              </div>

              {/* Photo Upload with Sharp WebP Compression */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Executive Photo</label>
                <div className="flex items-center gap-4">
                  {formData.photoUrl && (
                    <img src={formData.photoUrl} alt="" className="w-14 h-14 rounded-full object-cover border border-white/20 bg-white/5" />
                  )}
                  <label className="flex-1 border-2 border-dashed border-white/20 hover:border-brand-accent rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors bg-white/5">
                    <Upload size={16} className="text-brand-accent" />
                    <span className="text-sm font-semibold text-white/80">
                      {isUploading ? "Compressing & Uploading..." : "Upload & Compress Photo"}
                    </span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={isUploading} />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={e => setFormData({ ...formData, facebook: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-brand-accent text-sm"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-accent text-[#013565] px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  {editingId ? "Save Changes" : "Add Executive"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
