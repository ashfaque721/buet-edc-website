"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mock-data";
import { Download, Users, Edit3, X } from "lucide-react";

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockData.events);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const toggleRegStatus = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, isOpenForReg: !e.isOpenForReg } : e));
  };

  const selectedEvent = events.find(e => e.id === selectedEventId);

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
      alert("Failed to export Excel file.");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Events & Registrations</h1>
        <button className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity">
          + Create Event
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md mb-8">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[620px]">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white/70">Event Name</th>
              <th className="p-4 font-semibold text-white/70">Date</th>
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
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {event.status}
                  </span>
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleRegStatus(event.id)}
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
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white/90" title="Edit Event">
                    <Edit3 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>

      {/* Attendees Modal/Drawer */}
      {selectedEventId && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#001124] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedEvent.title} - Attendees</h2>
                <div className="text-sm text-white/50">{selectedEvent.attendees?.length || 0} Registered</div>
              </div>
              <button onClick={() => setSelectedEventId(null)} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto">
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-sm min-w-[500px]">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Dept/Batch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.attendees.map(att => (
                        <tr key={att.id} className="border-b border-white/5">
                          <td className="p-3 font-medium">{att.name}</td>
                          <td className="p-3 text-white/70">{att.email}</td>
                          <td className="p-3 text-white/70">{att.phone}</td>
                          <td className="p-3 text-white/70">{att.dept} '{att.batch}</td>
                        </tr>
                      ))}
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
