// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/app/store/useAuthStore";

// export default function AdminPage() {
//   const { user, isAdmin, isLoading } = useAuthStore();
//   const router = useRouter();

//   // 1. Handle the Loading State
//   // This prevents the admin content from "flashing" before the check is done
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="text-orange-600 font-black animate-pulse uppercase tracking-[0.3em]">
//           Verifying Credentials...
//         </div>
//       </div>
//     );
//   }

//   // 2. The Gatekeeper Logic
//   // If there is no user, or they aren't an admin, block the page
//   if (!user || !isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
//         <h1 className="text-6xl font-black text-red-600 italic tracking-tighter uppercase">
//           Access Denied
//         </h1>
//         <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-4">
//           Unauthorized personnel detected. This incident has been logged.
//         </p>
//         <button
//           onClick={() => router.push("/")}
//           className="mt-8 border border-white/10 px-8 py-3 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all"
//         >
//           Return to Base
//         </button>
//       </div>
//     );
//   }

//   // 3. If they pass the checks, render the Admin UI
//   return (
//     <main className="p-8">
//       <h1 className="text-2xl font-black italic text-orange-600 uppercase">
//         Control Center <span className="text-white">Active</span>
//       </h1>
//       {/* ... Your match management tools ... */}
//     </main>
//   );
// }
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { supabase } from "@/app/lib/supabase"; // Make sure to import supabase
import PlayerList from "../players/page";
import TeamRandomizer from "../components/TeamRandomizer";

export default function AdminPage() {
  const { user, isAdmin, isLoading, setAuth, setLoading } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      router.push("/"); // Boot them out if they aren't admin
    }
  }, [user, isAdmin, isLoading, router]);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);

      // Get the current session from Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        // This updates the store and should set isLoading to false
        await setAuth(session.user);
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [setAuth, setLoading]);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-orange-600 font-black animate-pulse uppercase tracking-[0.3em]">
          Verifying Credentials...
        </div>
      </div>
    );
  }

  // 2. Gatekeeper Logic
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-6xl font-black text-red-600 italic tracking-tighter uppercase">
          Access Denied
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-4">
          Unauthorized personnel detected. This incident has been logged.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 border border-white/10 px-8 py-3 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all"
        >
          Return to Base
        </button>
      </div>
    );
  }

  // 3. Admin UI Integration
  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-12 space-y-12">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black italic text-orange-600 uppercase tracking-tighter">
            Control Center <span className="text-white">Active</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
            Logged in as: {user?.email}
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-black uppercase px-6 py-2 transition-all">
            Export CSV
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black uppercase px-6 py-2 transition-all shadow-lg shadow-orange-600/20"
          >
            Exit Terminal
          </button>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 gap-12">
        {/* Section 1: Player Roster (The list you uploaded) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-orange-600"></div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Database Records
            </h2>
          </div>
          <PlayerList />
        </section>

        {/* Section 2: Team Generation (The Randomizer) */}
        <section className="space-y-4 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-orange-600"></div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">
              Squad Deployment
            </h2>
          </div>
          <RandomizedTeamGrid />
        </section>
      </div>
    </main>
  );
}
