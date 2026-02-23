import { getCountryFlag } from "../data/teams.js";
import { TeamLogo } from "./TeamLogo.jsx";
import { cn } from "../lib/utils.js";

export function StandingsTable({ standings }) {
  return (
    <div className="card-champions rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent p-4 border-b border-border">
        <h2 className="font-display text-2xl font-bold text-center text-foreground">
          🏆 Clasificación
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Equipo</th>
              <th className="p-3 text-center">PJ</th>
              <th className="p-3 text-center">G</th>
              <th className="p-3 text-center">E</th>
              <th className="p-3 text-center">P</th>
              <th className="p-3 text-center">GF</th>
              <th className="p-3 text-center">GC</th>
              <th className="p-3 text-center">DG</th>
              <th className="p-3 text-center font-bold">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => {
              const position = index + 1;
              const isQualified = position <= 8;
              const isPlayoff = position > 8 && position <= 24;
              const isEliminated = position > 24;

              return (
                <tr
                  key={standing.team.id}
                  className={cn(
                    "border-b border-border/50 transition-colors hover:bg-muted/30",
                    isQualified && "bg-success/10",
                    isPlayoff && "bg-primary/10",
                    isEliminated && "bg-destructive/10",
                    index < 8 && "animate-slide-up"
                  )}
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  <td className="p-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      isQualified && "bg-success text-success-foreground",
                      isPlayoff && "bg-primary text-primary-foreground",
                      isEliminated && "bg-destructive/50 text-foreground"
                    )}>
                      {position}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <TeamLogo team={standing.team} size="md" />
                      <div>
                        <p className="font-semibold text-sm">{standing.team.shortName}</p>
                        <p className="text-xs text-muted-foreground">
                          {getCountryFlag(standing.team.country)} {standing.team.country}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-center text-sm">{standing.played}</td>
                  <td className="p-3 text-center text-sm text-success font-medium">{standing.won}</td>
                  <td className="p-3 text-center text-sm text-draw">{standing.drawn}</td>
                  <td className="p-3 text-center text-sm text-destructive">{standing.lost}</td>
                  <td className="p-3 text-center text-sm">{standing.goalsFor}</td>
                  <td className="p-3 text-center text-sm">{standing.goalsAgainst}</td>
                  <td className="p-3 text-center text-sm font-medium">
                    <span className={cn(
                      standing.goalDifference > 0 && "text-success",
                      standing.goalDifference < 0 && "text-destructive"
                    )}>
                      {standing.goalDifference > 0 ? "+" : ""}{standing.goalDifference}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <span className="font-display text-lg font-bold text-primary">
                      {standing.points}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="p-4 bg-muted/30 flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span>Clasificados directamente (1-8)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Playoff (9-24)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/50" />
          <span>Eliminados (25-36)</span>
        </div>
      </div>
    </div>
  );
}