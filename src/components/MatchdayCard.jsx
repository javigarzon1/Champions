import { getCountryFlag } from "../data/teams.js";
import { TeamLogo } from "./TeamLogo.jsx";
import { cn } from "../lib/utils.js";

export function MatchdayCard({ matchday, matches, isActive, isRevealing }) {
  return (
    <div
      className={cn(
        "card-champions rounded-xl overflow-hidden transition-all duration-500",
        isActive && "ring-2 ring-primary animate-pulse-gold",
        isRevealing && "animate-reveal"
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent p-3 border-b border-border">
        <h3 className="font-display text-xl font-bold text-center text-foreground">
          Jornada {matchday}
        </h3>
      </div>

      {/* Matches */}
      <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
        {matches.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <div className="text-4xl mb-2">🎱</div>
            <p>Pendiente de sorteo</p>
          </div>
        ) : (
          matches.map((match, index) => (
            <div
              key={match.id}
              className={cn(
                "bg-muted/30 rounded-lg p-3 transition-all duration-300",
                isRevealing && "animate-slide-up"
              )}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Home Team */}
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <TeamLogo team={match.homeTeam} size="md" />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{match.homeTeam.shortName}</p>
                    <p className="text-xs text-muted-foreground">
                      {getCountryFlag(match.homeTeam.country)}
                    </p>
                  </div>
                </div>

                {/* Score or VS */}
                <div className="flex-shrink-0 px-3">
                  {match.played ? (
                    <div className="flex items-center gap-2 bg-navy-deep rounded-lg px-3 py-1">
                      <span className={cn(
                        "font-display text-xl font-bold",
                        match.homeGoals > match.awayGoals && "text-success",
                        match.homeGoals < match.awayGoals && "text-destructive",
                        match.homeGoals === match.awayGoals && "text-draw"
                      )}>
                        {match.homeGoals}
                      </span>
                      <span className="text-muted-foreground">-</span>
                      <span className={cn(
                        "font-display text-xl font-bold",
                        match.awayGoals > match.homeGoals && "text-success",
                        match.awayGoals < match.homeGoals && "text-destructive",
                        match.awayGoals === match.homeGoals && "text-draw"
                      )}>
                        {match.awayGoals}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-primary bg-primary/20 px-2 py-1 rounded">
                      VS
                    </span>
                  )}
                </div>

                {/* Away Team */}
                <div className="flex-1 flex items-center justify-end gap-2 min-w-0">
                  <div className="min-w-0 text-right">
                    <p className="font-semibold text-sm truncate">{match.awayTeam.shortName}</p>
                    <p className="text-xs text-muted-foreground">
                      {getCountryFlag(match.awayTeam.country)}
                    </p>
                  </div>
                  <TeamLogo team={match.awayTeam} size="md" />
                </div>
              </div>

              {/* Venue */}
              <div className="mt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  📍 {match.homeTeam.city}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}