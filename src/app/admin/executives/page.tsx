"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mock-data";
import { Plus, Edit3, Trash2 } from "lucide-react";

export default function AdminExecutivesPage() {
  const [executives, setExecutives] = useState(mockData.executives);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Executives</h1>
        <button className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
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
                  <img src={exec.photoUrl} alt={exec.name} className="w-10 h-10 rounded-full object-cover bg-white/10" />
                  <span className="font-bold">{exec.name}</span>
                </td>
                <td className="p-4 text-brand-accent">{exec.designation}</td>
                <td className="p-4 text-white/80">{exec.wing}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${exec.term === 'current' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                    {exec.term === 'current' ? 'Current (2025-26)' : 'Past'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-white/60 hover:text-white transition-colors"><Edit3 size={16} /></button>
                  <button className="p-2 text-red-400/60 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
