import React from "react";
import { supabase } from "../lib/supabase";

async function getTeams() {
  const { data, error } = await supabase
    .from("teams")
    .select("id, name, short");
  if (error) throw error;
  return data || [];
}

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <main style={{ padding: 24 }}>
      <h1>Teams</h1>
      <ul>
        {teams.map((t: any) => (
          <li key={t.id}>
            {t.name} {t.short ? `(${t.short})` : ""}
          </li>
        ))}
      </ul>
    </main>
  );
}
