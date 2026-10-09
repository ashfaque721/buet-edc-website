"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Users, FileText, Activity, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<{
    stats: {
      totalEvents: number;
      activeRegistrations: number;
      totalResources: number;
      currentExecutives: number;
    };
    recentRegistrations: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: "Total Events", value: data?.stats.totalEvents ?? 0, icon: Calendar, color: "text-blue-400" },
    { label: "Active Registrations", value: data?.stats.activeRegistrations ?? 0, icon: Activity, color: "text-green-400" },
    { label: "Total Resources", value: data?.stats.totalResources ?? 0, icon: FileText, color: "text-purple-400" },
    { label: "Current Executives", value: data?.stats.currentExecutives ?? 0, icon: Users, color: "text-brand-accent" }
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
              <div className="text-3xl font-bold mb-1">
                {loading ? <Loader2 size={24} className="animate-spin text-white/40" /> : stat.value}
              </div>
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
                <th className="p-4 font-semibold text-white/70">Registered At</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentRegistrations && data.recentRegistrations.length > 0 ? (
                data.recentRegistrations.map((att: any, i: number) => (
                  <tr key={att.id || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">
                      <div>{att.name}</div>
                      <div className="text-xs text-white/50">{att.email}</div>
                    </td>
                    <td className="p-4 text-brand-accent">{att.eventName}</td>
                    <td className="p-4 text-white/70">{att.institution}</td>
                    <td className="p-4 text-white/50 text-sm">
                      {att.createdAt ? new Date(att.createdAt).toLocaleDateString() : "Recently"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-white/40">
                    {loading ? "Loading registrations..." : "No registrations found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
