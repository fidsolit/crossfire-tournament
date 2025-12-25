"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// Use the Variants type to satisfy the index signature
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut", // TypeScript now knows this is a valid Easing value
    },
  }),
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// RENAMED AND CHANGED TO CONST TO AVOID BUILD ERRORS
const BRACKET_LINK = { name: "Brackets", href: "/brackets" };

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-orange-500/20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/CROSSFIRE.jpg"
            alt="Background"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] text-orange-500 uppercase border border-orange-500/50 rounded-full bg-orange-500/5"
          >
            <span className="relative flex h-2 w-2 mr-2 inline-block">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Season 1 Now Live
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-6xl md:text-9xl font-black tracking-tighter italic uppercase leading-[0.85]"
          >
            Crossfire <br />
            <span className="text-orange-600 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)]">
              Tournament
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-8 text-gray-400 max-w-xl mx-auto text-lg md:text-xl font-light"
          >
            Dominate the battlefield. Compete against the best teams and claim
            your share of the{" "}
            <span className="text-white font-bold tracking-wide">
              10,000 PHP
            </span>{" "}
            prize pool.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-10 py-4 bg-orange-600 overflow-hidden font-bold text-lg transition-all rounded-sm">
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 group-hover:w-full" />
              <span className="relative">REGISTER YOUR TEAM</span>
            </button>

            {/* FIXED LINK COMPONENT STRUCTURE */}
            <Link
              href={BRACKET_LINK.href}
              className="px-10 py-4 border border-white/20 hover:bg-white/10 font-bold text-lg transition-all rounded-sm backdrop-blur-sm uppercase tracking-widest text-gray-300"
            >
              VIEW BRACKETS
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- LIVE TICKER --- */}
      <div className="bg-orange-600 py-3 overflow-hidden whitespace-nowrap border-y border-orange-400/50">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-12 font-black uppercase text-sm italic"
        >
          {[1, 2, 3, 4].map((i) => (
            <span key={i}>
              • Live Match: Team Alpha vs Global Risk • Prize Pool: 10,000 PHP •
              128 Teams Registered • Finals on Dec 30th •
            </span>
          ))}
        </motion.div>
      </div>

      {/* --- FEATURED SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Card 1: Live Stream */}
          <motion.div
            variants={fadeIn}
            className="group bg-[#111] border border-white/5 p-8 rounded-xl hover:bg-[#151515] transition-all"
          >
            <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-6 border border-orange-600/30">
              <span className="text-orange-500 font-bold text-xs">LIVE</span>
            </div>
            <h3 className="text-2xl font-black mb-3 uppercase italic">
              Official Broadcast
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Watch the qualifiers live with professional casters and real-time
              analysis.
            </p>
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden ring-1 ring-white/10">
              <div className="absolute inset-0 flex items-center justify-center group-hover:bg-orange-600/20 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black pl-1 shadow-xl transition-transform group-hover:scale-110">
                  ▶
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Tournament Info */}
          <motion.div
            variants={fadeIn}
            className="bg-[#111] border border-white/5 p-8 rounded-xl"
          >
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
                  className="flex justify-between items-center border-b border-white/5 pb-3"
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
          </motion.div>

          {/* Card 3: Top MVP */}
          <motion.div
            variants={fadeIn}
            className="bg-gradient-to-br from-[#111] to-[#050505] border border-white/5 p-8 rounded-xl"
          >
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
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center border border-white/10 group-hover:border-orange-500/50">
                      <span className="text-[10px] text-gray-500 font-bold">
                        {player.clan}
                      </span>
                    </div>
                  </div>
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
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
