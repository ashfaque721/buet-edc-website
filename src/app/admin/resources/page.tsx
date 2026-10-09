"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, FileText, BookOpen, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: string;
  readingTime: string;
  description: string;
  link: string;
}

async function getResourcesData(): Promise<ResourceItem[]> {
  const res = await fetch("/api/resources");
  if (!res.ok) throw new Error("Failed to load resources");
  return res.json();
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Pitch Decks",
    type: "PDF",
    readingTime: "10 min read",
    description: "",
    link: "#",
  });

  const fetchResources = React.useCallback(async () => {
    try {
      const data = await getResourcesData();
      setResources(data);
    } catch {
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        const data = await getResourcesData();
        if (isMounted) {
          setResources(data);
        }
      } catch {
        toast.error("Failed to load resources");
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

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      category: "Pitch Decks",
      type: "PDF",
      readingTime: "10 min read",
      description: "",
      link: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (res: ResourceItem) => {
    setEditingId(res.id);
    setFormData({
      title: res.title,
      category: res.category,
      type: res.type,
      readingTime: res.readingTime,
      description: res.description,
      link: res.link,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in title and description");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/resources/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error();
        toast.success("Resource updated successfully!");
      } else {
        const res = await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error();
        toast.success("Resource published successfully!");
      }

      setIsModalOpen(false);
      fetchResources();
    } catch {
      toast.error(editingId ? "Failed to update resource" : "Failed to publish resource");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setResources(prev => prev.filter(r => r.id !== id));
      try {
        const res = await fetch(`/api/resources/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        toast.success(`Deleted "${title}"`);
      } catch {
        toast.error("Failed to delete resource");
        fetchResources();
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Resources</h1>
          <p className="text-white/60 text-sm mt-1">Resource library and educational materials</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          <Plus size={18} /> Publish Resource
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[580px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70">Resource Title</th>
              <th className="p-4 font-semibold text-white/70">Category</th>
              <th className="p-4 font-semibold text-white/70">Type</th>
              <th className="p-4 font-semibold text-white/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/50">
                  <Loader2 size={24} className="animate-spin mx-auto mb-2 text-brand-accent" />
                  Loading resources...
                </td>
              </tr>
            ) : resources.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/50">
                  No resources published yet. Click &quot;Publish Resource&quot; to add one.
                </td>
              </tr>
            ) : (
              resources.map((res) => (
                <tr key={res.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold">{res.title}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">{res.category}</span>
                  </td>
                  <td className="p-4 flex items-center gap-2 text-brand-accent">
                    {res.type === 'PDF' ? <FileText size={16}/> : <BookOpen size={16}/>}
                    {res.type}
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => openEditModal(res)}
                      className="p-2 text-white/60 hover:text-white transition-colors"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(res.id, res.title)}
                      className="p-2 text-red-400/60 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001124] border border-white/15 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Resource" : "Publish Resource"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            <form data-lenis-prevent onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="Pitch Decks">Pitch Decks</option>
                    <option value="Financial Models">Financial Models</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Startup Guides">Startup Guides</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Article">Article</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Reading Time</label>
                <input
                  type="text"
                  value={formData.readingTime}
                  onChange={e => setFormData({ ...formData, readingTime: e.target.value })}
                  placeholder="e.g. 10 min read"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Resource Link URL *</label>
                <input
                  required
                  type="text"
                  value={formData.link}
                  onChange={e => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://drive.google.com/... or https://..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                />
                <p className="text-[11px] text-white/50 mt-1">Direct downloadable PDF link, Google Drive document, or article URL</p>
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
                  {editingId ? "Save Changes" : "Publish Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
