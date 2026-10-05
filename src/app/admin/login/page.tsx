"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "EdC@admin@2026") {
      // Set a cookie for the middleware
      document.cookie = "edc_admin_auth=true; path=/; max-age=86400"; // 1 day
      router.push("/admin");
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#001124] flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-accent/20 via-[#001124] to-[#001124]"></div>
      
      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[2rem] backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 border border-brand-accent/30 text-brand-accent">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/60 text-center">Enter the master password to access the EDC dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-black/20 border ${error ? 'border-red-500' : 'border-white/10 focus:border-brand-accent'} rounded-xl px-5 py-4 text-white focus:outline-none transition-colors text-center text-lg tracking-widest`}
              required
            />
            {error && <p className="text-red-400 text-sm mt-2 text-center">Incorrect password.</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-[#013565] font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(56,189,248,0.3)] text-lg"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
