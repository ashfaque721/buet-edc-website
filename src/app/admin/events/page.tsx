"use client";

import React, { useState, useEffect, useRef } from "react";
import { Download, Users, Edit3, X, Plus, Loader2, Upload, Trash2, Mic, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface PersonItem {
  name: string;
  designation: string;
  photoUrl: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Modal for Create/Edit Event
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [speakers, setSpeakers] = useState<PersonItem[]>([]);
  const [guests, setGuests] = useState<PersonItem[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    date: "",
    venue: "",
    category: "Competition",
    status: "upcoming",
    isOpenForReg: true,
    regFee: 0,
    summary: "",
    description: "",
    fbLink: "",
    bannerUrl: "",
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    setIsUploadingBanner(true);
    try {
      const form = new FormData();
      form.append("file", file);
      toast.loading("Compressing & uploading banner...", { id: "upload-banner" });
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setFormData(prev => ({ ...prev, bannerUrl: data.url }));
      toast.success("Event banner compressed to WebP and saved!", { id: "upload-banner" });
    } catch {
      toast.error("Failed to upload banner", { id: "upload-banner" });
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const toggleRegStatus = async (id: string, currentStatus: boolean) => {
    setEvents(events.map(e => e.id === id ? { ...e, isOpenForReg: !currentStatus } : e));
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpenForReg: !currentStatus }),
      });
      if (!res.ok) throw new Error();
      toast.success(`Registration status updated!`);
    } catch {
      toast.error("Failed to update status");
      fetchEvents();
    }
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      venue: "",
      category: "Competition",
      status: "upcoming",
      isOpenForReg: true,
      regFee: 0,
      summary: "",
      description: "",
      fbLink: "",
      bannerUrl: "",
    });
    setSpeakers([]);
    setGuests([]);
    setIsModalOpen(true);
  };

  const openEditModal = (event: any) => {
    setEditingId(event.id);
    setFormData({
      title: event.title,
      slug: event.slug,
      date: new Date(event.date).toISOString().split("T")[0],
      venue: event.venue,
      category: event.category,
      status: event.status,
      isOpenForReg: event.isOpenForReg,
      regFee: event.regFee ?? 0,
      summary: event.summary,
      description: event.description,
      fbLink: event.fbLink || "",
      bannerUrl: event.bannerUrl || "",
    });
    setSpeakers(
      event.speakers && event.speakers.length > 0
        ? event.speakers.map((s: any) => ({ name: s.name, designation: s.designation, photoUrl: s.photoUrl }))
        : []
    );
    setGuests(
      event.guests && event.guests.length > 0
        ? event.guests.map((g: any) => ({ name: g.name, designation: g.designation, photoUrl: g.photoUrl }))
        : []
    );
    setIsModalOpen(true);
  };

  const addSpeaker = () => {
    setSpeakers(prev => [...prev, { name: "", designation: "", photoUrl: "" }]);
  };
  const removeSpeaker = (index: number) => {
    setSpeakers(prev => prev.filter((_, i) => i !== index));
  };
  const updateSpeaker = (index: number, field: keyof PersonItem, value: string) => {
    setSpeakers(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addGuest = () => {
    setGuests(prev => [...prev, { name: "", designation: "", photoUrl: "" }]);
  };
  const removeGuest = (index: number) => {
    setGuests(prev => prev.filter((_, i) => i !== index));
  };
  const updateGuest = (index: number, field: keyof PersonItem, value: string) => {
    setGuests(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handlePersonPhotoUpload = async (
    file: File,
    type: "speaker" | "guest",
    index: number
  ) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }
    const toastId = `upload-${type}-${index}`;
    toast.loading(`Compressing & uploading ${type} photo...`, { id: toastId });
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (type === "speaker") {
        updateSpeaker(index, "photoUrl", data.url);
      } else {
        updateGuest(index, "photoUrl", data.url);
      }
      toast.success("Photo compressed to WebP and saved!", { id: toastId });
    } catch {
      toast.error("Failed to upload photo", { id: toastId });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validSpeakers = speakers
      .filter(s => s.name.trim() !== "")
      .map((s, idx) => ({ ...s, order: idx }));
    const validGuests = guests
      .filter(g => g.name.trim() !== "")
      .map((g, idx) => ({ ...g, order: idx }));

    try {
      if (editingId) {
        const res = await fetch(`/api/events/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            regFee: Math.max(0, Number(formData.regFee) || 0),
            date: new Date(formData.date).toISOString(),
            speakers: validSpeakers,
            guests: validGuests,
          }),
        });
        if (!res.ok) throw new Error("Update failed");
        toast.success("Event updated successfully!");
      } else {
        const slug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            regFee: Math.max(0, Number(formData.regFee) || 0),
            slug,
            date: new Date(formData.date).toISOString(),
            speakers: validSpeakers,
            guests: validGuests,
          }),
        });
        if (!res.ok) throw new Error("Create failed");
        toast.success("Event created successfully!");
      }

      setIsModalOpen(false);
      fetchEvents();
    } catch {
      toast.error(editingId ? "Failed to update event" : "Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExport = async (eventId: string, eventTitle: string) => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}/export-excel`);
      if (!response.ok) throw new Error("Export failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${eventTitle.replace(/\s+/g, '-').toLowerCase()}-attendees.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
      toast.error("Failed to export Excel file.");
    }
  };

  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This will permanently delete the event, including its speakers, timeline, and attendee registrations.`)) {
      return;
    }

    setEvents(prev => prev.filter(e => e.id !== eventId));
    toast.loading(`Deleting "${eventTitle}"...`, { id: "delete-event" });

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      toast.success(`Event "${eventTitle}" deleted successfully!`, { id: "delete-event" });
    } catch {
      toast.error(`Failed to delete "${eventTitle}".`, { id: "delete-event" });
      fetchEvents();
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Manage Events & Registrations</h1>
          <p className="text-white/60 text-sm mt-1">Live events connected to Neon database</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          <Plus size={18} /> Create Event
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md mb-8">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[620px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70">Event Name</th>
              <th className="p-4 font-semibold text-white/70">Date</th>
              <th className="p-4 font-semibold text-white/70">Reg Fee</th>
              <th className="p-4 font-semibold text-white/70">Status</th>
              <th className="p-4 font-semibold text-white/70">Reg Open</th>
              <th className="p-4 font-semibold text-white/70 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 font-bold">{event.title}</td>
                <td className="p-4 text-white/70">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-4">
                  {(event.regFee ?? 0) === 0 ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Free
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                      ৳{event.regFee}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleRegStatus(event.id, event.isOpenForReg)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${event.isOpenForReg ? 'bg-green-500' : 'bg-white/20'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${event.isOpenForReg ? 'left-7' : 'left-1'}`} />
                  </button>
                </td>
                <td className="p-4 text-right flex items-center justify-end gap-2">
                  <button 
                    onClick={() => setSelectedEventId(event.id)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90"
                    title="View Attendees"
                  >
                    <Users size={16} />
                  </button>
                  <button 
                    onClick={() => handleExport(event.id, event.title)}
                    className="p-2 bg-brand-accent/20 hover:bg-brand-accent/30 text-brand-accent rounded-lg transition-colors"
                    title="Export Excel"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={() => openEditModal(event)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90" 
                    title="Edit Event"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id, event.title)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" 
                    title="Delete Event"
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001124] border border-white/15 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingId ? "Edit Event" : "Create New Event"}</h2>
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
                  <label className="block text-sm font-medium text-white/70 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="Competition">Competition</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={e => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#013565] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">
                  Registration Fee (BDT) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    required
                    value={formData.regFee}
                    onChange={e => setFormData({ ...formData, regFee: Math.max(0, parseInt(e.target.value) || 0) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent pr-20"
                    placeholder="0"
                  />
                  <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded ${formData.regFee === 0 ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>
                    {formData.regFee === 0 ? "FREE" : "BDT ৳"}
                  </span>
                </div>
                <p className="text-[11px] text-white/50 mt-1">
                  Set to 0 if the event is free. Free events skip payment method and transaction ID verification.
                </p>
              </div>

              {/* Banner Upload with Sharp WebP Compression */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Event Banner Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Image URL or upload banner..."
                    value={formData.bannerUrl}
                    onChange={e => setFormData({ ...formData, bannerUrl: e.target.value })}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                  />
                  <input
                    type="file"
                    ref={bannerInputRef}
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                    disabled={isUploadingBanner}
                  />
                  <button
                    type="button"
                    disabled={isUploadingBanner}
                    onClick={() => bannerInputRef.current?.click()}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
                  >
                    <Upload size={16} /> {isUploadingBanner ? "Compressing..." : "Upload"}
                  </button>
                </div>
                {formData.bannerUrl && (
                  <div className="mt-2 h-20 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                    <img src={formData.bannerUrl} alt="Banner Preview" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Summary</label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
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
                <label className="block text-sm font-medium text-white/70 mb-1">Facebook Event URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://facebook.com/events/..."
                  value={formData.fbLink}
                  onChange={e => setFormData({ ...formData, fbLink: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-accent text-sm"
                />
              </div>

              {/* Speakers Section (Optional) */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Mic size={16} className="text-brand-accent" /> Speakers (Optional)
                    </h3>
                    <p className="text-xs text-white/50">Add keynote or session speakers</p>
                  </div>
                  <button
                    type="button"
                    onClick={addSpeaker}
                    className="px-3 py-1.5 text-xs font-semibold bg-brand-accent/15 hover:bg-brand-accent/25 text-brand-accent border border-brand-accent/30 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={14} /> Add Speaker
                  </button>
                </div>

                {speakers.length === 0 ? (
                  <div className="text-xs text-white/40 italic p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                    No speakers added yet. Click &quot;Add Speaker&quot; to include speakers.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {speakers.map((sp, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                            Speaker #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeSpeaker(idx)}
                            className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove Speaker"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1">Speaker Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Dr. A. K. Azad"
                              value={sp.name}
                              onChange={e => updateSpeaker(idx, "name", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1">Designation / Role</label>
                            <input
                              type="text"
                              placeholder="e.g. Professor, Dept. of CSE"
                              value={sp.designation}
                              onChange={e => updateSpeaker(idx, "designation", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Photo (Upload or Image URL)</label>
                          <div className="flex items-center gap-3">
                            {sp.photoUrl ? (
                              <img
                                src={sp.photoUrl}
                                alt={sp.name || "Speaker"}
                                className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0 bg-white/10"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-white/40">
                                <Mic size={16} />
                              </div>
                            )}
                            <input
                              type="text"
                              placeholder="https://... or upload photo"
                              value={sp.photoUrl}
                              onChange={e => updateSpeaker(idx, "photoUrl", e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-accent"
                            />
                            <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0">
                              <Upload size={14} /> Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePersonPhotoUpload(file, "speaker", idx);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guests Section (Optional) */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <UserCheck size={16} className="text-brand-accent" /> Special Guests (Optional)
                    </h3>
                    <p className="text-xs text-white/50">Add chief guests, special dignitaries, or judges</p>
                  </div>
                  <button
                    type="button"
                    onClick={addGuest}
                    className="px-3 py-1.5 text-xs font-semibold bg-brand-accent/15 hover:bg-brand-accent/25 text-brand-accent border border-brand-accent/30 rounded-xl flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={14} /> Add Guest
                  </button>
                </div>

                {guests.length === 0 ? (
                  <div className="text-xs text-white/40 italic p-3 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                    No special guests added yet. Click &quot;Add Guest&quot; to include guests.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {guests.map((g, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-accent uppercase tracking-wider">
                            Guest #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeGuest(idx)}
                            className="text-red-400 hover:text-red-300 p-1 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove Guest"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1">Guest Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Mr. John Doe"
                              value={g.name}
                              onChange={e => updateGuest(idx, "name", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1">Designation / Affiliation</label>
                            <input
                              type="text"
                              placeholder="e.g. Managing Director, XYZ Ltd."
                              value={g.designation}
                              onChange={e => updateGuest(idx, "designation", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-brand-accent"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Photo (Upload or Image URL)</label>
                          <div className="flex items-center gap-3">
                            {g.photoUrl ? (
                              <img
                                src={g.photoUrl}
                                alt={g.name || "Guest"}
                                className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0 bg-white/10"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center shrink-0 bg-white/5 text-white/40">
                                <UserCheck size={16} />
                              </div>
                            )}
                            <input
                              type="text"
                              placeholder="https://... or upload photo"
                              value={g.photoUrl}
                              onChange={e => updateGuest(idx, "photoUrl", e.target.value)}
                              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-brand-accent"
                            />
                            <label className="cursor-pointer px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0">
                              <Upload size={14} /> Upload
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePersonPhotoUpload(file, "guest", idx);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="regOpen"
                  checked={formData.isOpenForReg}
                  onChange={e => setFormData({ ...formData, isOpenForReg: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-accent focus:ring-0"
                />
                <label htmlFor="regOpen" className="text-sm font-medium text-white/90">Registration Open</label>
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
                  {editingId ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Attendees Modal/Drawer */}
      {selectedEventId && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div data-lenis-prevent className="bg-[#001124] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedEvent.title} - Attendees</h2>
                <div className="text-sm text-white/50">{selectedEvent.attendees?.length || 0} Registered</div>
              </div>
              <button onClick={() => setSelectedEventId(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            <div data-lenis-prevent className="p-6 overflow-y-auto">
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-sm min-w-[640px]">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="p-3">Attendee</th>
                        <th className="p-3">Student ID</th>
                        <th className="p-3">Dept / Year</th>
                        <th className="p-3">Payment</th>
                        <th className="p-3">TrxID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.attendees.map((att: any) => {
                        const isFree = (att.paymentMethod || "").toLowerCase() === "free";
                        const isBkash = (att.paymentMethod || "bKash").toLowerCase() === "bkash";
                        return (
                          <tr key={att.id} className="border-b border-white/5">
                            <td className="p-3 font-medium">
                              <div>{att.name}</div>
                              <div className="text-xs text-white/50">{att.email} • {att.phone}</div>
                            </td>
                            <td className="p-3 text-brand-accent font-mono text-xs">{att.studentId || "N/A"}</td>
                            <td className="p-3 text-white/80">{att.dept} • {att.year || "N/A"}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                isFree 
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                  : isBkash 
                                  ? 'bg-[#e2136e]/20 text-[#f472b6]' 
                                  : 'bg-[#f7941d]/20 text-[#fb923c]'
                              }`}>
                                {isFree ? "Free (৳0)" : (att.paymentMethod || "bKash")}
                              </span>
                            </td>
                            <td className="p-3 text-white/70 font-mono text-xs">
                              {isFree ? "—" : (att.trxId || "N/A")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-white/50">No attendees registered yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
