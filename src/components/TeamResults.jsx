import { useState } from "react";
import { teams, getCountryFlag } from "../data/teams.js";
import { TeamLogo } from "./TeamLogo.jsx";
import { cn } from "../lib/utils.js";

export function TeamResults({ matches }) {
  const [selectedTeam, setSelectedTeam] = useState(null);

  const getTeamMatches = (teamId) => {
    return matches.filter(
      m => (m.homeTeam.id === teamId || m.awayTeam.id === teamId) && m.played
    ).sort((a, b) => a.matchday - b.matchday);
  };

  const getTeamStats = (teamId) => {
    const teamMatches = getTeamMatches(teamId);
    let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;

    teamMatches.forEach(m => {
      const isHome = m.homeTeam.id === teamId;
      const goals = isHome ? m.homeGoals : m.awayGoals;
      const conceded = isHome ? m.awayGoals : m.homeGoals;
      
      gf += goals;
      ga += conceded;

      if (goals > conceded) wins++;
      else if (goals < conceded) losses++;
      else draws++;
    });

    return { wins, draws, losses, gf, ga, played: teamMatches.length };
  };

  return (
    <div className="card-champions rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent p-4 border-b border-border">
        <h2 className="font-display text-2xl font-bold text-center text-foreground">
          📊 Resultados por Equipo
        </h2>
      </div>

      <div className="p-4">
        {/* Team Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Selecciona un equipo:
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-1",
                  selectedTeam?.id === team.id
                    ? "bg-primary text-primary-foreground ring-2 ring-primary scale-105"
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <TeamLogo team={team} size="md" />
                <span className="text-xs font-medium truncate w-full text-center">
                  {team.shortName}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Team Details */}
        {selectedTeam && (
          <div className="animate-scale-in">
            {/* Team Header */}
            <div className="bg-muted/30 rounded-xl p-6 mb-4">
              <div className="flex items-center justify-center gap-4">
                <TeamLogo team={selectedTeam} size="xl" />
                <div>
                  <h3 className="font-display text-2xl font-bold">{selectedTeam.name}</h3>
                  <p className="text-muted-foreground flex items-center gap-2">
                    {getCountryFlag(selectedTeam.country)} {selectedTeam.city}, {selectedTeam.country}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              {(() => {
                const stats = getTeamStats(selectedTeam.id);
                return (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display">{stats.played}</p>
                      <p className="text-xs text-muted-foreground">Jugados</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display text-success">{stats.wins}</p>
                      <p className="text-xs text-muted-foreground">Victorias</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display text-draw">{stats.draws}</p>
                      <p className="text-xs text-muted-foreground">Empates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display text-destructive">{stats.losses}</p>
                      <p className="text-xs text-muted-foreground">Derrotas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display">{stats.gf}</p>
                      <p className="text-xs text-muted-foreground">GF</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold font-display">{stats.ga}</p>
                      <p className="text-xs text-muted-foreground">GC</p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Match List */}
            <div className="space-y-3">
              <h4 className="font-display text-lg font-semibold">Partidos Jugados</h4>
              {getTeamMatches(selectedTeam.id).length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hay partidos jugados todavía
                </p>
              ) : (
                getTeamMatches(selectedTeam.id).map((match, index) => {
                  const isHome = match.homeTeam.id === selectedTeam.id;
                  const opponent = isHome ? match.awayTeam : match.homeTeam;
                  const teamGoals = isHome ? match.homeGoals : match.awayGoals;
                  const opponentGoals = isHome ? match.awayGoals : match.homeGoals;
                  const result = teamGoals > opponentGoals ? "W" : teamGoals < opponentGoals ? "L" : "D";

                  return (
                    <div
                      key={match.id}
                      className={cn(
                        "bg-muted/30 rounded-lg p-4 flex items-center gap-4 animate-slide-up",
                        result === "W" && "border-l-4 border-success",
                        result === "L" && "border-l-4 border-destructive",
                        result === "D" && "border-l-4 border-draw"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="text-center min-w-[60px]">
                        <p className="text-xs text-muted-foreground">Jornada</p>
                        <p className="font-display font-bold">{match.matchday}</p>
                      </div>

                      <div className="flex-1 flex items-center gap-3">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded font-semibold",
                          isHome ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {isHome ? "LOCAL" : "VISITANTE"}
                        </span>
                        <TeamLogo team={opponent} size="md" />
                        <span className="font-medium">{opponent.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {getCountryFlag(opponent.country)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-display text-2xl font-bold",
                          result === "W" && "text-success",
                          result === "L" && "text-destructive",
                          result === "D" && "text-draw"
                        )}>
                          {teamGoals}
                        </span>
                        <span className="text-muted-foreground">-</span>
                        <span className="font-display text-2xl font-bold text-muted-foreground">
                          {opponentGoals}
                        </span>
                      </div>

                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                        result === "W" && "bg-success text-success-foreground",
                        result === "L" && "bg-destructive text-destructive-foreground",
                        result === "D" && "bg-draw text-foreground"
                      )}>
                        {result}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {!selectedTeam && (
          <div className="text-center py-12 text-muted-foreground">
            <span className="text-6xl mb-4 block">⚽</span>
            <p>Selecciona un equipo para ver sus resultados</p>
          </div>
        )}
      </div>
    </div>
  );
}