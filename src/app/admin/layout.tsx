"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, Handshake, Library, ArrowLeft, LogOut, Image as ImageIcon, Award, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Events & Reg", href: "/admin/events", icon: CalendarDays },
    { name: "Executives", href: "/admin/executives", icon: Users },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Sponsors", href: "/admin/sponsors", icon: Award },
    { name: "Affiliations", href: "/admin/affiliations", icon: Handshake },
    { name: "Resources", href: "/admin/resources", icon: Library },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    document.cookie = "edc_admin_auth=; path=/; max-age=0";
    window.location.href = "/admin/login";
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#001124] text-white flex flex-col lg:flex-row">
      {/* Mobile Admin Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#013565]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-white/80 hover:text-white bg-white/5 rounded-lg border border-white/10"
            aria-label="Toggle admin menu"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo-light.png" alt="EDC Logo" className="h-6 w-auto" />
            <span className="font-bold text-base tracking-tight">Admin Portal</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="p-2 text-white/50 hover:text-red-400 bg-white/5 rounded-lg border border-white/10 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity" 
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`w-72 bg-[#013565]/95 lg:bg-[#013565]/40 border-r border-white/10 backdrop-blur-2xl flex flex-col fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm font-semibold mb-8">
            <ArrowLeft size={16} /> Back to Website
          </Link>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <img src="/logo-light.png" alt="EDC Logo" className="h-8" />
              <span className="font-bold text-lg tracking-tight">Admin</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                  ? 'bg-brand-accent text-[#013565] shadow-[0_0_15px_rgba(56,189,248,0.3)]' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:ml-72 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 overflow-y-auto min-h-screen relative">
        {/* Subtle background glow */}
        <div className="fixed top-0 left-0 lg:left-72 right-0 h-64 bg-gradient-to-b from-brand-accent/5 to-transparent pointer-events-none -z-10"></div>
        {children}
      </main>
    </div>
  );
}
