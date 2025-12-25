"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    teamName: "",
    teamShort: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // 1. Create the Auth User
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      setMessage({ type: "error", text: authError.message });
      setLoading(false);
      return;
    }

    // 2. Create the Team Entry in your 'teams' table
    if (authData.user) {
      const { error: teamError } = await supabase.from("teams").insert([
        {
          name: formData.teamName,
          short: formData.teamShort.toUpperCase(),
        },
      ]);

      if (teamError) {
        setMessage({
          type: "error",
          text: "Account created, but team registration failed. Contact Admin.",
        });
      } else {
        setMessage({
          type: "success",
          text: "Registration Successful! Check your email to confirm.",
        });
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-[#111] border border-white/10 p-8 rounded-lg shadow-2xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
              Join the <span className="text-orange-600">Battlefield</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">
              Team Registration • Season 1
            </p>
          </header>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Team Info Section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                  Team Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-600 outline-none"
                  placeholder="e.g. ELITE SQUAD"
                  onChange={(e) =>
                    setFormData({ ...formData, teamName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                  Tag
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-600 outline-none"
                  placeholder="ELT"
                  onChange={(e) =>
                    setFormData({ ...formData, teamShort: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Auth Info Section */}
            <div className="space-y-5">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                  Leader Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-600 outline-none"
                  placeholder="leader@team.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-500 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full bg-black border border-white/10 rounded px-4 py-3 text-sm focus:border-orange-600 outline-none"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {message.text && (
              <div
                className={`text-[10px] font-bold uppercase p-3 rounded border ${
                  message.type === "error"
                    ? "bg-red-500/10 border-red-500/50 text-red-500"
                    : "bg-green-500/10 border-green-500/50 text-green-500"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black hover:bg-orange-600 hover:text-white font-black uppercase py-4 rounded-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Enlist Team Now"}
            </button>
          </form>

          <footer className="mt-8 text-center border-t border-white/5 pt-6">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              Already have access?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-400"
              >
                Login Here
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
