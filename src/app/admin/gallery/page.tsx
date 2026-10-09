"use client";

import React, { useState } from "react";
import { useGallery, GalleryPhoto } from "@/context/GalleryContext";
import { Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, X, Loader2 } from "lucide-react";

export default function AdminGalleryPage() {
  const { photos, addPhoto, updatePhoto, deletePhoto, toggleHomepage } = useGallery();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [showOnHomepage, setShowOnHomepage] = useState(false);

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setImageUrl("");
    setCaption("");
    setEventDate("");
    setEventName("");
    setShowOnHomepage(false);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (photo: GalleryPhoto) => {
    setEditingId(photo.id);
    setImageUrl(photo.imageUrl);
    setCaption(photo.caption);
    setEventDate(photo.eventDate);
    setEventName(photo.eventName || "");
    setShowOnHomepage(photo.showOnHomepage);
    setIsModalOpen(true);
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !caption || !eventDate) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (editingId) {
      await updatePhoto(editingId, { imageUrl, caption, eventDate, eventName, showOnHomepage });
      showToast("Photo updated successfully!");
    } else {
      await addPhoto({
        imageUrl,
        caption,
        eventDate,
        eventName,
        showOnHomepage
      });
      showToast("Photo added successfully!");
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this photo? It will be removed from the gallery and homepage.")) {
      deletePhoto(id);
      showToast("Photo deleted.");
    }
  };

  // Upload image to server pipeline (compresses to WebP & stores in DB)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        setImageUrl(data.url);
        showToast("Image compressed to WebP and uploaded!");
      } catch (err) {
        console.error(err);
        showToast("Failed to upload image.", "error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <button 
          onClick={openAddModal}
          className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          <Plus size={18} /> Upload Photo
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl border flex items-center gap-3 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4 ${toast.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
          {toast.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
          <span className="font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Gallery Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70 w-24">Preview</th>
              <th className="p-4 font-semibold text-white/70">Details</th>
              <th className="p-4 font-semibold text-white/70">Date</th>
              <th className="p-4 font-semibold text-white/70 text-center">Homepage</th>
              <th className="p-4 font-semibold text-white/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {photos.map((photo) => (
              <tr key={photo.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                <td className="p-4">
                  <div className="w-16 h-12 bg-black/50 rounded-lg overflow-hidden border border-white/10">
                    <img src={photo.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-sm mb-1">{photo.eventName || "Untitled Event"}</div>
                  <div className="text-white/50 text-xs line-clamp-1 max-w-xs">{photo.caption}</div>
                </td>
                <td className="p-4 text-white/70 text-sm">
                  {new Date(photo.eventDate).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => toggleHomepage(photo.id)}
                    className={`w-12 h-6 rounded-full relative transition-colors mx-auto ${photo.showOnHomepage ? 'bg-brand-accent' : 'bg-white/20'}`}
                    title="Toggle Homepage Visibility"
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${photo.showOnHomepage ? 'left-7 bg-[#013565]' : 'left-1'}`} />
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(photo)} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Edit3 size={16} /></button>
                    <button onClick={() => handleDelete(photo.id)} className="p-2 text-red-400/60 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {photos.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/50">
                  <ImageIcon size={32} className="mx-auto mb-3 opacity-50" />
                  No photos in the gallery.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Upload/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#001124]/80 backdrop-blur-sm overflow-y-auto">
          <div data-lenis-prevent className="bg-[#001124] border border-white/10 rounded-3xl w-full max-w-xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col my-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Photo' : 'Upload New Photo'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} data-lenis-prevent className="p-6 space-y-5 overflow-y-auto flex-1">
              
              {/* Image Preview / Upload */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Image Source</label>
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste Image URL or upload from device below"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none text-sm mb-2"
                    />
                    <div className="relative w-full">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <div className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-3 text-white/70 text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                        {isUploading ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-brand-accent" />
                            <span>Compressing & Uploading to WebP...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon size={16} className="text-brand-accent" />
                            <span>Upload from device (Auto WebP compression)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {imageUrl && (
                    <div className="w-24 h-24 rounded-xl border border-white/10 overflow-hidden bg-black flex-shrink-0">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Event Name (Optional)</label>
                <input 
                  type="text" 
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. Ideathon 2026"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Event Date *</label>
                <input 
                  type="date" 
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none text-sm"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Caption *</label>
                <textarea 
                  required
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Describe the moment..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-accent focus:outline-none text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 cursor-pointer" onClick={() => setShowOnHomepage(!showOnHomepage)}>
                <div className={`w-12 h-6 rounded-full relative transition-colors flex-shrink-0 ${showOnHomepage ? 'bg-brand-accent' : 'bg-white/20'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showOnHomepage ? 'left-7 bg-[#013565]' : 'left-1'}`} />
                </div>
                <div>
                  <div className="font-semibold text-sm">Feature on Homepage</div>
                  <div className="text-xs text-white/50">Display this photo in the "Experience the Energy" section on the landing page.</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-semibold text-white/70 hover:bg-white/10 transition-colors">Cancel</button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="px-6 py-2.5 rounded-xl font-bold bg-brand-accent text-[#013565] hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-50"
                >
                  {editingId ? 'Save Changes' : 'Upload Photo'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
