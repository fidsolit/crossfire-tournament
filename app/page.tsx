"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore"; // Import your store

const BRACKET_LINK = { name: "Brackets", href: "/brackets" };

export default function Home() {
  // 1. Get user state from Zustand
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-orange-500/20">
        <div className="absolute inset-0 z-0 opacity-40 overflow-hidden">
          <img
            src="https://i.postimg.cc/Z5vG8655/CROSSFIRE.jpg"
            alt="Background"
            className="w-full h-full object-cover grayscale animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 animate-fade-in-up">
          <div className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] text-orange-500 uppercase border border-orange-500/50 rounded-full bg-orange-500/5 shadow-[0_0_15px_rgba(234,88,12,0.1)]">
            <span className="relative flex h-2 w-2 mr-2 inline-block">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Season 1 Now Live
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter italic uppercase leading-[0.85] drop-shadow-2xl">
            Crossfire <br />
            <span className="text-orange-600 animate-pulse-subtle">
              Tournament
            </span>
          </h1>

          <p className="mt-8 text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light">
            Dominate the battlefield. Compete against the best teams and claim
            your share of the{" "}
            <span className="text-white font-bold tracking-wide border-b border-orange-600/50">
              10,000 PHP
            </span>{" "}
            prize pool.
          </p>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* 2. DYNAMIC REDIRECT LOGIC */}
            {/* If user is logged in, go to register team. If not, go to login. */}
            <Link href={user ? "/auth/register-team" : "/auth/login"}>
              <button className="group relative px-10 py-4 bg-orange-600 overflow-hidden font-bold text-lg transition-all rounded-sm hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/20">
                <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full" />
                <span className="relative uppercase">
                  {user ? "REGISTER YOUR TEAM" : "LOGIN TO REGISTER"}
                </span>
              </button>
            </Link>

            <Link
              href={BRACKET_LINK.href}
              className="px-10 py-4 border border-white/20 hover:border-orange-500/50 hover:bg-white/5 font-bold text-lg transition-all rounded-sm backdrop-blur-sm uppercase tracking-widest text-gray-300 hover:text-white"
            >
              VIEW BRACKETS
            </Link>
          </div>
        </div>
      </section>

      {/* --- REST OF THE CODE (LIVE TICKER & FEATURES) REMAINS THE SAME --- */}
      <div className="bg-orange-600 py-3 overflow-hidden whitespace-nowrap border-y border-orange-400/50">
        <div className="flex gap-12 font-black uppercase text-sm italic animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="flex-shrink-0">
              • Live Match: Team Alpha vs Global Risk • Prize Pool: 10,000 PHP •
              128 Teams Registered • Finals on Dec 30th •
            </span>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-[#111] border border-white/5 p-8 rounded-xl hover:bg-[#151515] hover:border-orange-500/30 transition-all duration-500 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6 border border-orange-600/30">
              <span className="text-orange-500 font-bold text-xs animate-pulse">
                LIVE
              </span>
            </div>
            <h3 className="text-2xl font-black mb-3 uppercase italic group-hover:text-orange-500 transition-colors">
              Official Broadcast
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Watch the qualifiers live with professional casters and real-time
              analysis.
            </p>
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden ring-1 ring-white/10 shadow-inner">
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-orange-600/20 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black pl-1 shadow-xl transition-transform group-hover:scale-110">
                  ▶
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 p-8 rounded-xl transform hover:-translate-y-2 transition-all duration-500">
            <h3 className="text-2xl font-black mb-8 uppercase italic border-l-4 border-orange-600 pl-4">
              Tournament Info
            </h3>
            <div className="space-y-6">
              {[
                { label: "Format", value: "Double Elimination" },
                { label: "Mode", value: "Search & Destroy (5v5)" },
                { label: "Region", value: "Philippines / Online" },
                { label: "Anticheat", value: "GameGuard + MOSS" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-white/5 pb-3 hover:translate-x-1 transition-transform"
                >
                  <span className="text-gray-500 text-sm font-medium uppercase">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-orange-100">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 p-8 rounded-xl transform hover:-translate-y-2 transition-all duration-500 shadow-xl shadow-black/50">
            <h3 className="text-2xl font-black mb-6 uppercase italic">
              MVP Leaderboard
            </h3>
            <div className="space-y-4">
              {[
                { name: "V_DAVES", clan: "ELITE", kd: "2.85", rank: "01" },
                { name: "*TeamBaryoM", clan: "CN", kd: "2.42", rank: "02" },
                { name: "Koscaaaaaa", clan: "VND", kd: "2.10", rank: "03" },
              ].map((player, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 bg-white/[0.03] p-3 rounded-lg border border-transparent hover:border-orange-500/30 hover:bg-white/[0.06] transition-all"
                >
                  <span className="font-black text-orange-500 italic text-lg">
                    #{player.rank}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold uppercase truncate max-w-[100px]">
                      {player.name}
                    </span>
                    <span className="text-[9px] text-orange-500/70 font-bold tracking-widest uppercase">
                      {player.clan}
                    </span>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm font-black text-white">
                      {player.kd}
                    </div>
                    <div className="text-[8px] text-gray-500 uppercase">
                      K/D
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slow-zoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(234, 88, 12, 0.4);
          }
          50% {
            opacity: 0.8;
            text-shadow: 0 0 20px rgba(234, 88, 12, 0.6);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
