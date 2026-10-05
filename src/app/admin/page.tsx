"use client";

import React from "react";
import { mockData } from "@/lib/mock-data";
import { Calendar, Users, FileText, Activity } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Events", value: mockData.events.length, icon: Calendar, color: "text-blue-400" },
    { label: "Active Registrations", value: mockData.events.reduce((acc, e) => acc + (e.attendees?.length || 0), 0), icon: Activity, color: "text-green-400" },
    { label: "Total Resources", value: mockData.resources.length, icon: FileText, color: "text-purple-400" },
    { label: "Current Executives", value: mockData.executives.filter(e => e.term === "current").length, icon: Users, color: "text-brand-accent" }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/60 font-medium uppercase tracking-wider">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-6">Recent Registrations</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="p-4 font-semibold text-white/70">Name</th>
                <th className="p-4 font-semibold text-white/70">Event</th>
                <th className="p-4 font-semibold text-white/70">Institution</th>
                <th className="p-4 font-semibold text-white/70">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockData.events.flatMap(e => e.attendees?.map(a => ({ ...a, eventName: e.title })) || []).slice(0, 5).map((att, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{att.name}</td>
                  <td className="p-4 text-brand-accent">{att.eventName}</td>
                  <td className="p-4 text-white/70">{att.institution}</td>
                  <td className="p-4 text-white/50">Just now</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
