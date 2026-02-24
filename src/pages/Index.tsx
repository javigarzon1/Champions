import { useState, useCallback, useEffect } from "react";
import { ChampionsLogo } from "../components/ChampionsLogo";
import { PotDisplay } from "../components/PotDisplay";
import { MatchdayCard } from "../components/MatchdayCard";
import { StandingsTable } from "../components/StandingsTable";
import { TeamResults } from "../components/TeamResults";
import { DrawBall } from "../components/DrawBall";
import { Button } from "../components/ui/button";
import { teams, Team } from "../data/team";
import { generateDraw, simulateMatch, calculateStandings, Match, DrawResult, TeamStanding } from "../utils/drawEngine";
import { cn } from "../libs/utils";
import { Play, RotateCcw, Trophy, Calendar, Users, Sparkles } from "lucide-react";

type ViewMode = "draw" | "matchdays" | "standings" | "results";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("draw");
  const [drawResult, setDrawResult] = useState<DrawResult | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [drawnTeams, setDrawnTeams] = useState<Set<string>>(new Set());
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [currentPot, setCurrentPot] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawComplete, setDrawComplete] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [revealingMatchday, setRevealingMatchday] = useState<number | null>(null);

  // Initialize standings on mount
  useEffect(() => {
    setStandings(calculateStandings([]));
  }, []);

  const startDraw = useCallback(async () => {
    setIsDrawing(true);
    setDrawnTeams(new Set());
    setCurrentTeam(null);
    setDrawComplete(false);
    setSimulationComplete(false);
    setMatches([]);
    setStandings(calculateStandings([]));

    // Generate the draw
    const result = generateDraw();
    setDrawResult(result);

    // Animate drawing each team
    const allTeams = [...teams];
    for (let i = 0; i < allTeams.length; i++) {
      const team = allTeams[i];
      setCurrentPot(team.pot);
      setCurrentTeam(team);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDrawnTeams(prev => new Set([...prev, team.id]));
      setCurrentTeam(null);
      
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setDrawComplete(true);
    setIsDrawing(false);
    setMatches(result.matches);

    // Reveal matchdays one by one
    for (let i = 0; i < 8; i++) {
      setRevealingMatchday(i + 1);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setRevealingMatchday(null);
  }, []);

  const simulateAllMatches = useCallback(async () => {
    if (!drawResult) return;

    const simulatedMatches: Match[] = [];
    
    for (let matchday = 0; matchday < 8; matchday++) {
      const matchdayMatches = drawResult.matchdays[matchday].map(m => simulateMatch(m));
      simulatedMatches.push(...matchdayMatches);
      
      setMatches([...simulatedMatches]);
      setStandings(calculateStandings(simulatedMatches));
      
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setSimulationComplete(true);
  }, [drawResult]);

  const resetSimulation = useCallback(() => {
    setDrawResult(null);
    setMatches([]);
    setStandings(calculateStandings([]));
    setDrawnTeams(new Set());
    setCurrentTeam(null);
    setCurrentPot(1);
    setDrawComplete(false);
    setSimulationComplete(false);
    setRevealingMatchday(null);
    setViewMode("draw");
  }, []);

  return (
    <div className="min-h-screen starfield">
      {/* Hero Header */}
      <header className="relative py-8 px-4 border-b border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-4">
            <ChampionsLogo size="lg" />
            <div className="text-center">
              <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-gold tracking-tight">
                UEFA CHAMPIONS LEAGUE
              </h1>
              <p className="font-display text-xl md:text-2xl text-foreground/80 mt-2 tracking-widest uppercase">
                Simulador de Sorteo 2024/25
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "draw" as ViewMode, label: "Sorteo", icon: Sparkles },
              { id: "matchdays" as ViewMode, label: "Jornadas", icon: Calendar },
              { id: "standings" as ViewMode, label: "Clasificación", icon: Trophy },
              { id: "results" as ViewMode, label: "Resultados", icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={viewMode === id ? "default" : "outline"}
                onClick={() => setViewMode(id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Draw View */}
        {viewMode === "draw" && (
          <div className="space-y-8">
            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-4">
              {!drawComplete ? (
                <Button
                  variant="hero"
                  size="xl"
                  onClick={startDraw}
                  disabled={isDrawing}
                  className="min-w-[200px]"
                >
                  <Play className="w-5 h-5" />
                  {isDrawing ? "Sorteando..." : "Iniciar Sorteo"}
                </Button>
              ) : (
                <>
                  {!simulationComplete && (
                    <Button
                      variant="success"
                      size="lg"
                      onClick={simulateAllMatches}
                    >
                      <Play className="w-4 h-4" />
                      Simular Partidos
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={resetSimulation}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Nuevo Sorteo
                  </Button>
                </>
              )}
            </div>

            {/* Current Draw Ball */}
            {(isDrawing || currentTeam) && (
              <div className="flex justify-center">
                <DrawBall team={currentTeam} isAnimating={!!currentTeam} />
              </div>
            )}

            {/* Pots Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(pot => (
                <PotDisplay
                  key={pot}
                  potNumber={pot}
                  drawnTeams={drawnTeams}
                  currentTeam={currentPot === pot ? currentTeam : null}
                  isActive={isDrawing && currentPot === pot}
                />
              ))}
            </div>

            {/* Quick Stats after draw */}
            {drawComplete && (
              <div className="card-champions rounded-xl p-6 animate-reveal">
                <h3 className="font-display text-xl font-bold text-center mb-4 text-gradient-gold">
                  ✨ Sorteo Completado
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">36</p>
                    <p className="text-sm text-muted-foreground">Equipos</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">8</p>
                    <p className="text-sm text-muted-foreground">Jornadas</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">{matches.length}</p>
                    <p className="text-sm text-muted-foreground">Partidos</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary">
                      {matches.filter(m => m.played).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Jugados</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Matchdays View */}
        {viewMode === "matchdays" && (
          <div className="space-y-6">
            {!drawResult ? (
              <div className="text-center py-16">
                <span className="text-6xl block mb-4">📅</span>
                <h2 className="font-display text-2xl font-bold mb-2">Sin Sorteo</h2>
                <p className="text-muted-foreground mb-4">Realiza primero el sorteo para ver las jornadas</p>
                <Button variant="hero" onClick={() => setViewMode("draw")}>
                  Ir al Sorteo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(matchday => (
                  <MatchdayCard
                    key={matchday}
                    matchday={matchday}
                    matches={matches.filter(m => m.matchday === matchday)}
                    isRevealing={revealingMatchday === matchday}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Standings View */}
        {viewMode === "standings" && (
          <StandingsTable standings={standings} />
        )}

        {/* Results View */}
        {viewMode === "results" && (
          <TeamResults matches={matches} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Simulador de Sorteo Champions League • Basado en el formato 2024/25
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Los equipos no pueden enfrentarse a rivales de su mismo país • Cada ciudad solo alberga un partido por jornada
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
