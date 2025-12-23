"use client";

import React from "react";
import { motion } from "framer-motion";

// Mock data representing your top players
const LEADERBOARD_DATA = [
  {
    id: 1,
    name: "V_DAVES",
    clan: "ELITE",
    wins: 45,
    kd: "2.85",
    headshots: "62%",
    status: "online",
  },
  {
    id: 2,
    name: "*TeamBaryoM",
    clan: "CN",
    wins: 38,
    kd: "2.42",
    headshots: "55%",
    status: "ingame",
  },
  {
    id: 3,
    name: "Koscaaaaaa",
    clan: "VND",
    wins: 31,
    kd: "2.10",
    headshots: "48%",
    status: "offline",
  },
  {
    id: 4,
    name: "Ghost_Walker",
    clan: "GRISK",
    wins: 28,
    kd: "1.95",
    headshots: "51%",
    status: "online",
  },
  {
    id: 5,
    name: "BlackList_Ace",
    clan: "BLIST",
    wins: 22,
    kd: "1.88",
    headshots: "44%",
    status: "online",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              Global <span className="text-orange-600">Leaderboard</span>
            </h1>
            <p className="text-gray-500 mt-4 uppercase tracking-[0.2em] text-xs font-bold">
              Season 1 • Tactical Rankings • Updated Live
            </p>
          </div>

          <div className="flex gap-4">
            <div className="bg-[#111] border border-white/5 p-4 rounded-sm min-w-[120px]">
              <div className="text-[10px] text-gray-500 uppercase font-bold">
                Total Players
              </div>
              <div className="text-xl font-black tracking-tight">1,248</div>
            </div>
            <div className="bg-[#111] border border-white/5 p-4 rounded-sm min-w-[120px]">
              <div className="text-[10px] text-gray-500 uppercase font-bold">
                Active Now
              </div>
              <div className="text-xl font-black tracking-tight text-green-500">
                342
              </div>
            </div>
          </div>
        </header>

        {/* Table Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#111] border border-white/10 rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-white/5 p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-white/10">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Soldier / Clan</div>
            <div className="col-span-2 text-center">Wins</div>
            <div className="col-span-2 text-center">K/D Ratio</div>
            <div className="col-span-2 text-right">HS %</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {LEADERBOARD_DATA.map((player, index) => (
              <motion.div
                key={player.id}
                variants={itemVariants}
                className="grid grid-cols-12 p-4 items-center hover:bg-orange-600/5 transition-colors group cursor-pointer"
              >
                {/* Rank */}
                <div className="col-span-1">
                  <span
                    className={`text-lg font-black italic ${
                      index < 3 ? "text-orange-500" : "text-gray-600"
                    }`}
                  >
                    #{index + 1}
                  </span>
                </div>

                {/* Name & Clan */}
                <div className="col-span-5 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 rounded flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-500">
                        {player.clan.substring(0, 2)}
                      </span>
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-[#111] ${
                        player.status === "online"
                          ? "bg-green-500"
                          : player.status === "ingame"
                          ? "bg-orange-500"
                          : "bg-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold uppercase text-sm tracking-wide group-hover:text-orange-500 transition-colors">
                      {player.name}
                    </span>
                    <span className="text-[10px] font-black text-gray-500 tracking-tighter uppercase">
                      Clan: {player.clan}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="col-span-2 text-center font-black text-sm">
                  {player.wins}
                </div>
                <div className="col-span-2 text-center">
                  <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-bold text-orange-400 border border-white/5">
                    {player.kd}
                  </span>
                </div>
                <div className="col-span-2 text-right font-black text-sm text-gray-400 italic">
                  {player.headshots}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-gray-600 text-[10px] uppercase font-bold tracking-[0.3em]">
          Top 100 players qualify for the{" "}
          <span className="text-gray-400">Regional Invitationals</span>
        </p>
      </div>
    </main>
  );
}
