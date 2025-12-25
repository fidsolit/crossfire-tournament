// "use client";

// import { useEffect } from "react";
// import { usePlayerStore } from "@/app/store/usePlayerStore";

// export default function PlayerList() {
//   const { players, fetchPlayers, isLoading } = usePlayerStore();

//   useEffect(() => {
//     fetchPlayers();
//   }, []);

//   if (isLoading)
//     return (
//       <div className="text-orange-600 animate-pulse">LOADING ROSTER...</div>
//     );

//   return (
//     <div className="bg-[#111] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
//       <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
//         <h2 className="text-xl font-black italic uppercase text-white">
//           Registered <span className="text-orange-600">Operatives</span>
//         </h2>
//         <span className="text-[10px] font-bold bg-orange-600/20 text-orange-500 px-3 py-1 rounded-full border border-orange-600/30">
//           {players.length} TOTAL
//         </span>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-black/50 text-[10px] font-black uppercase tracking-widest text-gray-500">
//               <th className="px-6 py-4">IGN (In-Game Name)</th>
//               <th className="px-6 py-4">Full Name</th>
//               <th className="px-6 py-4">Registration Date</th>
//               <th className="px-6 py-4 text-right">Status</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-white/5">
//             {players.map((player) => (
//               <tr
//                 key={player.id}
//                 className="hover:bg-white/[0.02] transition-colors group"
//               >
//                 <td className="px-6 py-4">
//                   <span className="text-orange-500 font-black italic uppercase group-hover:text-orange-400">
//                     {player.ign}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 text-sm font-medium text-gray-300">
//                   {player.name}
//                 </td>
//                 <td className="px-6 py-4 text-[11px] font-mono text-gray-500 uppercase">
//                   {new Date(player.registration_date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 text-right">
//                   <span className="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
