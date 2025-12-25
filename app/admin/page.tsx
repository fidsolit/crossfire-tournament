"use client";

import React, { useState } from "react";

// --- Types (Kept from your original) ---
type Team = { id: number; name: string; short?: string | null };
type Match = {
  id: number;
  home_team: number;
  away_team: number;
  scheduled_at?: string | null;
  status?: string | null;
  home_score?: number;
  away_score?: number;
};

export default function AdminPage() {
  // Mocking the data for the UI demonstration
  const teams: Team[] = [
    { id: 1, name: "V_DAVES", short: "ELT" },
    { id: 2, name: "Koscaaaaaa", short: "VND" },
  ];

  const matches: Match[] = [
    {
      id: 1,
      home_team: 1,
      away_team: 2,
      status: "live",
      scheduled_at: new Date().toISOString(),
      home_score: 10,
      away_score: 8,
    },
  ];

  const teamMap = new Map(teams.map((t) => [t.id, t.name]));

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        {/* TOP BAR / NAVIGATION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-orange-600 animate-pulse rounded-full" />
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                Control <span className="text-orange-600">Center</span>
              </h1>
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
              Tournament Management System v1.0
            </p>
          </div>

          <div className="flex gap-3">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-sm text-xs font-black uppercase transition-all">
              + New Match
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2 rounded-sm text-xs font-black uppercase transition-all">
              Settings
            </button>
          </div>
        </header>

        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Active Teams", val: teams.length, color: "text-white" },
            {
              label: "Matches Today",
              val: matches.length,
              color: "text-orange-500",
            },
            {
              label: "System Status",
              val: "OPERATIONAL",
              color: "text-green-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/5 p-6 rounded-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5 font-black text-4xl italic">
                {i + 1}
              </div>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* MATCH MANAGEMENT LIST */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 border-l-4 border-orange-600 pl-4">
              Active Match Schedule
            </h2>

            <div className="space-y-4">
              {matches.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#111] border border-white/10 rounded-lg group hover:border-orange-500/50 transition-all overflow-hidden"
                >
                  <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Teams & Score */}
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          Home
                        </p>
                        <p className="font-black italic uppercase text-lg">
                          {teamMap.get(m.home_team)}
                        </p>
                      </div>

                      <div className="bg-white/5 px-4 py-2 rounded border border-white/5">
                        <span className="text-2xl font-black text-orange-500">
                          {m.home_score ?? 0}
                        </span>
                        <span className="mx-3 text-gray-600">:</span>
                        <span className="text-2xl font-black text-white">
                          {m.away_score ?? 0}
                        </span>
                      </div>

                      <div className="text-center">
                        <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                          Away
                        </p>
                        <p className="font-black italic uppercase text-lg">
                          {teamMap.get(m.away_team)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-right mr-4 hidden md:block">
                        <p className="text-[10px] text-gray-500 uppercase font-bold">
                          Status
                        </p>
                        <p
                          className={`text-[10px] font-black uppercase ${
                            m.status === "live"
                              ? "text-green-500"
                              : "text-gray-400"
                          }`}
                        >
                          {m.status}
                        </p>
                      </div>
                      <button className="flex-1 md:flex-none bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white px-4 py-2 rounded text-[10px] font-black uppercase transition-all border border-orange-600/20">
                        Update Score
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TEAM QUICK-LIST */}
          <div className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 border-l-4 border-orange-600 pl-4">
              Registered Teams
            </h2>
            <div className="bg-[#111] border border-white/10 rounded-lg divide-y divide-white/5">
              {teams.map((t) => (
                <div
                  key={t.id}
                  className="p-4 flex justify-between items-center group"
                >
                  <div>
                    <p className="font-bold uppercase text-sm group-hover:text-orange-500 transition-colors">
                      {t.name}
                    </p>
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-tighter">
                      ID: CF-00{t.id}
                    </p>
                  </div>
                  <button className="text-gray-600 hover:text-white transition-colors text-xs uppercase font-black">
                    Edit
                  </button>
                </div>
              ))}
              <button className="w-full p-4 text-[10px] font-black uppercase text-orange-500 hover:bg-orange-500/5 transition-all text-center">
                + Register Team
              </button>
            </div>
          </div>
        </div>

        {/* DATABASE FOOTER */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-gray-600 uppercase">
                Supabase Connected
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-[10px] font-bold text-gray-600 uppercase">
                Sync Frequency: 5s
              </span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">
            Protected by Crossfire Security
          </p>
        </footer>
      </div>
    </main>
  );
}
