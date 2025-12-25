"use client";
import { supabase } from "@/app/lib/supabase";
import { usePlayerStore } from "@/app/store/usePlayerStore";

export default function TeamRandomizer() {
  const { players } = usePlayerStore();

  const generateRandomTeams = async () => {
    // 1. Shuffle the players array (Fisher-Yates Algorithm)
    const shuffled = [...players].sort(() => Math.random() - 0.5);

    // 2. Define team size (e.g., 5 players per team)
    const teamSize = 5;
    const teams = [];

    for (let i = 0; i < shuffled.length; i += teamSize) {
      const teamChunk = shuffled.slice(i, i + teamSize);
      teams.push({
        team_name: `SQUAD ${Math.floor(i / teamSize) + 1}`,
        player_ids: teamChunk.map((p) => p.id),
        // Storing names for quick display
        player_names: teamChunk.map((p) => p.ign).join(", "),
      });
    }

    // 3. Save to Supabase
    const { error } = await supabase.from("randomized_teams").insert(teams);

    if (error) alert("Error saving teams");
    else alert("Randomized Teams Generated!");
  };

  return (
    <div className="p-6 bg-[#111] border border-orange-600/20 rounded-lg">
      <h3 className="text-white font-black uppercase italic mb-4">
        Team Generator
      </h3>
      <p className="text-gray-500 text-xs mb-6">
        Split {players.length} operatives into random 5-man squads.
      </p>

      <button
        onClick={generateRandomTeams}
        className="bg-orange-600 text-white px-6 py-3 text-[10px] font-black uppercase hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
      >
        Execute Randomization
      </button>
    </div>
  );
}
