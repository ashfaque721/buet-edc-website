"use client";

import React, { useState } from "react";
import { mockData } from "@/lib/mock-data";
import { Plus, Edit3, Trash2, FileText, BookOpen } from "lucide-react";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState(mockData.resources);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Manage Resources</h1>
        <button className="bg-brand-accent text-[#013565] px-4 py-2 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
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
            {resources.map((res) => (
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
