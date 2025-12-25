// store/usePlayerStore.ts
import { create } from "zustand";
import { supabase } from "@/app/lib/supabase";

export const usePlayerStore = create((set, get) => ({
  players: [],
  randomizedTeams: [],
  isLoading: false,

  fetchPlayers: async () => {
    set({ isLoading: true });
    const { data } = await supabase.from("registered_players").select("*");
    set({ players: data || [], isLoading: false });
  },

  // The Randomizer Logic
  randomizeIntoTeams: async (size: number = 5) => {
    const { players } = get();
    if (players.length === 0) return;

    // Fisher-Yates Shuffle
    const shuffled = [...players].sort(() => Math.random() - 0.5);

    const teams = [];
    for (let i = 0; i < shuffled.length; i += size) {
      teams.push({
        id: crypto.randomUUID(),
        teamName: `SQUAD ${Math.floor(i / size) + 1}`,
        members: shuffled.slice(i, i + size),
      });
    }

    set({ randomizedTeams: teams });
  },
}));
