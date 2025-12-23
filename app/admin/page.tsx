import React from "react";
import { supabase } from "../lib/supabase";

// --- Types ---
type Team = {
  id: number;
  name: string;
  short?: string | null;
};

type Match = {
  id: number;
  home_team: number;
  away_team: number;
  scheduled_at?: string | null;
  status?: string | null;
};

// --- Data Fetching ---
async function getAdminData() {
  const [teamsRes, matchesRes] = await Promise.all([
    supabase.from("teams").select("id, name, short"),
    supabase
      .from("matches")
      .select("id, home_team, away_team, scheduled_at, status"),
  ]);

  const errors = [teamsRes.error, matchesRes.error]
    .filter(Boolean)
    .map((err) => err?.message || "Unknown error");

  return {
    teams: (teamsRes.data as Team[]) || [],
    matches: (matchesRes.data as Match[]) || [],
    errors,
  };
}

// --- UI Components ---
const TableCell = ({
  children,
  isHeader = false,
}: {
  children: React.ReactNode;
  isHeader?: boolean;
}) => {
  const style: React.CSSProperties = {
    textAlign: "left",
    padding: "12px 8px",
    borderBottom: isHeader ? "2px solid #eee" : "1px solid #f0f0f0",
    fontWeight: isHeader ? "bold" : "normal",
  };
  return isHeader ? (
    <th style={style}>{children}</th>
  ) : (
    <td style={style}>{children}</td>
  );
};

export default async function AdminPage() {
  const { teams, matches, errors } = await getAdminData();

  // Create a lookup map for team names
  const teamMap = new Map(teams.map((t) => [t.id, t.name]));

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <header>
        <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>Admin Panel</h1>
        <p style={{ color: "#666" }}>Crossfire Tournament Management</p>
      </header>

      {/* Error Callout */}
      {errors.length > 0 && (
        <div
          style={{
            marginTop: 24,
            padding: 16,
            background: "#fff3f0",
            border: "1px solid #ffd1c1",
            borderRadius: 8,
          }}
        >
          <strong style={{ color: "#d32f2f" }}>Database Warning:</strong>
          <ul style={{ margin: "8px 0", color: "#7a1f00" }}>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
          <p style={{ fontSize: "0.9rem", margin: 0 }}>
            Ensure `teams` and `matches` tables exist in Supabase.
          </p>
        </div>
      )}

      {/* Teams Section */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: 8 }}>
          Teams ({teams.length})
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: 16,
          }}
        >
          {teams.map((t) => (
            <span
              key={t.id}
              style={{
                padding: "6px 12px",
                background: "#f5f5f5",
                borderRadius: "20px",
                fontSize: "0.9rem",
              }}
            >
              {t.name}{" "}
              {t.short && <small style={{ color: "#888" }}>({t.short})</small>}
            </span>
          ))}
        </div>
      </section>

      {/* Matches Section */}
      <section style={{ marginTop: 40 }}>
        <h2 style={{ borderBottom: "1px solid #eee", paddingBottom: 8 }}>
          Matches ({matches.length})
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ borderCollapse: "collapse", width: "100%", marginTop: 16 }}
          >
            <thead>
              <tr>
                <TableCell isHeader>ID</TableCell>
                <TableCell isHeader>Home Team</TableCell>
                <TableCell isHeader>Away Team</TableCell>
                <TableCell isHeader>Scheduled</TableCell>
                <TableCell isHeader>Status</TableCell>
              </tr>
            </thead>
            <tbody>
              {matches.map((m) => (
                <tr key={m.id}>
                  <TableCell>{m.id}</TableCell>
                  <TableCell>
                    <strong>{teamMap.get(m.home_team) ?? m.home_team}</strong>
                  </TableCell>
                  <TableCell>
                    {teamMap.get(m.away_team) ?? m.away_team}
                  </TableCell>
                  <TableCell>
                    {m.scheduled_at
                      ? new Date(m.scheduled_at).toLocaleString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        textTransform: "capitalize",
                        fontSize: "0.85rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: m.status === "live" ? "#e6fffa" : "#f0f0f0",
                        color: m.status === "live" ? "#047481" : "#444",
                      }}
                    >
                      {m.status ?? "pending"}
                    </span>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
