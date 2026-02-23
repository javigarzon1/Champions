import { getCountryFlag } from "../data/teams.js";
import { TeamLogo } from "./TeamLogo.jsx";
import { cn } from "../lib/utils.js";

export function DrawBall({ team, isAnimating }) {
  if (!team) {
    return (
      <div className="w-64 h-40 bg-muted/30 rounded-xl flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <span className="text-4xl block mb-2">🎱</span>
          <p className="text-sm">Esperando sorteo...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "ball-paper w-64 rounded-xl p-6 transform perspective-1000",
        isAnimating && "animate-draw-ball"
      )}
    >
      <div className="text-center">
        <div className="flex justify-center mb-3">
          <TeamLogo team={team} size="2xl" reveal glow />
        </div>
        <h3 className="font-display text-xl font-bold text-navy-deep mb-1">
          {team.name}
        </h3>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          {getCountryFlag(team.country)} {team.city}
        </p>
        <div className="mt-3 inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
          Bombo {team.pot}
        </div>
      </div>
    </div>
  );
}