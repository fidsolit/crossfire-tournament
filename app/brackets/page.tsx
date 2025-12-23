"use client";

import React from "react";
import { motion } from "framer-motion";

type Match = {
  id: string;
  round: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  winner?: "home" | "away";
};

// Mock data based on your specific player names
const bracketData: Match[] = [
  // Round 1 (Quarter-Finals)
  {
    id: "m1",
    round: 1,
    homeTeam: "V_DAVES",
    awayTeam: "Ghost_Walker",
    homeScore: 10,
    awayScore: 8,
    winner: "home",
  },
  {
    id: "m2",
    round: 1,
    homeTeam: "*TeamBaryoM",
    awayTeam: "Viper-Tactics",
    homeScore: 5,
    awayScore: 10,
    winner: "away",
  },
  {
    id: "m3",
    round: 1,
    homeTeam: "Koscaaaaaa",
    awayTeam: "BlackList_Ace",
    homeScore: 10,
    awayScore: 2,
    winner: "home",
  },
  {
    id: "m4",
    round: 1,
    homeTeam: "SniperElite",
    awayTeam: "TDM_King",
    homeScore: 9,
    awayScore: 10,
    winner: "away",
  },
  // Round 2 (Semi-Finals)
  {
    id: "m5",
    round: 2,
    homeTeam: "V_DAVES",
    awayTeam: "Viper-Tactics",
    homeScore: 10,
    awayScore: 9,
    winner: "home",
  },
  {
    id: "m6",
    round: 2,
    homeTeam: "Koscaaaaaa",
    awayTeam: "TDM_King",
    homeScore: 10,
    awayScore: 7,
    winner: "home",
  },
  // Finals
  { id: "m7", round: 3, homeTeam: "V_DAVES", awayTeam: "Koscaaaaaa" },
];

const MatchCard = ({ match }: { match: Match }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className="relative w-48 md:w-64 bg-[#111] border border-white/10 rounded overflow-hidden shadow-xl"
  >
    {/* Home Team */}
    <div
      className={`flex justify-between items-center p-3 border-b border-white/5 ${
        match.winner === "home" ? "bg-orange-600/10" : ""
      }`}
    >
      <span
        className={`text-xs font-bold uppercase truncate ${
          match.winner === "away" ? "text-gray-500" : "text-white"
        }`}
      >
        {match.homeTeam}
      </span>
      <span className="text-xs font-black text-orange-500">
        {match.homeScore ?? "-"}
      </span>
    </div>
    {/* Away Team */}
    <div
      className={`flex justify-between items-center p-3 ${
        match.winner === "away" ? "bg-orange-600/10" : ""
      }`}
    >
      <span
        className={`text-xs font-bold uppercase truncate ${
          match.winner === "home" ? "text-gray-500" : "text-white"
        }`}
      >
        {match.awayTeam}
      </span>
      <span className="text-xs font-black text-orange-500">
        {match.awayScore ?? "-"}
      </span>
    </div>
  </motion.div>
);

export default function BracketPage() {
  const rounds = [1, 2, 3];
  const roundNames = ["Quarter-Finals", "Semi-Finals", "Grand Finals"];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4 overflow-x-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">
            Tournament <span className="text-orange-600">Brackets</span>
          </h1>
          <p className="text-gray-500 mt-2 uppercase tracking-widest text-xs">
            Crossfire Championship Season 1
          </p>
        </header>

        <div className="flex gap-8 justify-between min-w-[800px]">
          {rounds.map((round, roundIdx) => (
            <div key={round} className="flex flex-col flex-1">
              <h2 className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-8 py-2 border-y border-orange-500/20 bg-orange-500/5">
                {roundNames[roundIdx]}
              </h2>

              <div className="flex flex-col justify-around flex-grow gap-12">
                {bracketData
                  .filter((m) => m.round === round)
                  .map((match) => (
                    <div
                      key={match.id}
                      className="relative flex items-center justify-center"
                    >
                      <MatchCard match={match} />

                      {/* Branching Lines (CSS connectors) */}
                      {round < 3 && (
                        <div className="absolute -right-8 w-8 h-px bg-white/20" />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
