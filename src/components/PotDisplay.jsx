import { getTeamsByPot, getCountryFlag } from "../data/teams.js";
import { TeamLogo } from "./TeamLogo.jsx";
import { cn } from "../lib/utils.js";

export function PotDisplay({ potNumber, drawnTeams, currentTeam, isActive }) {
  const teams = getTeamsByPot(potNumber);

  return (
    <div
      className={cn(
        "pot-container rounded-xl p-4 transition-all duration-500",
        isActive && "animate-pulse-gold ring-2 ring-primary"
      )}
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-display font-bold text-primary-foreground">
          {potNumber}
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">
          Bombo {potNumber}
        </h3>
      </div>

      <div className="grid gap-2">
        {teams.map((team, index) => {
          const isDrawn = drawnTeams.has(team.id);
          const isCurrent = currentTeam?.id === team.id;

          return (
            <div
              key={team.id}
              className={cn(
                "relative overflow-hidden rounded-lg transition-all duration-500",
                isDrawn && !isCurrent && "opacity-30 scale-95",
                isCurrent && "animate-draw-ball z-10"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {isCurrent ? (
                <div className="ball-paper p-3 rounded-lg shadow-lg transform">
                  <div className="flex items-center gap-3">
                    <TeamLogo team={team} size="lg" reveal glow />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{team.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {getCountryFlag(team.country)} {team.city}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    "bg-muted/50 p-2 rounded-lg",
                    !isDrawn && "hover:bg-muted transition-colors"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <TeamLogo team={team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{team.shortName}</p>
                      <p className="text-xs text-muted-foreground">
                        {getCountryFlag(team.country)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}