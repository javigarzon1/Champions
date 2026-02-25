import { useState, useCallback, useEffect } from "react";
import { ChampionsLogo } from "../components/ChampionsLogo.jsx";
import { PotDisplay } from "../components/PotDisplay.jsx";
import { MatchdayCard } from "../components/MatchdayCard.jsx";
import { StandingsTable } from "../components/StandingsTable.jsx";
import { TeamResults } from "../components/TeamResults.jsx";
import { DrawBall } from "../components/DrawBall.jsx";
import { Button } from "../components/ui/button.jsx";
import { teams } from "../data/teams.js";
import { generateDraw, simulateMatch, calculateStandings } from "../utils/drawEngine.js";
import { cn } from "../libs/utils.js";
import { Play, RotateCcw, Trophy, Calendar, Users, Sparkles, Hand, Zap, CircleDot } from "lucide-react";

// Simulador de Sorteo de la Champions League
const Index = () => {
  const [viewMode, setViewMode] = useState("draw");
  const [drawMode, setDrawMode] = useState("manual"); // "auto" o "manual"
  const [drawResult, setDrawResult] = useState(null);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [drawnTeams, setDrawnTeams] = useState(new Set());
  const [currentTeam, setCurrentTeam] = useState(null);
  const [currentPot, setCurrentPot] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawComplete, setDrawComplete] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [revealingMatchday, setRevealingMatchday] = useState(null);
  
  // Estados del modo manual
  const [manualDrawStarted, setManualDrawStarted] = useState(false);
  const [teamsQueue, setTeamsQueue] = useState([]);
  const [manualDrawIndex, setManualDrawIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);

  // Inicializar clasificación al montar
  useEffect(() => {
    setStandings(calculateStandings([]));
  }, []);

  // Preparar sorteo manual
  const prepareManualDraw = useCallback(() => {
    const result = generateDraw();
    setDrawResult(result);
    
    // Mezclar equipos para la presentación del sorteo
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    setTeamsQueue(shuffledTeams);
    setManualDrawIndex(0);
    setManualDrawStarted(true);
    setDrawnTeams(new Set());
    setCurrentTeam(null);
    setDrawComplete(false);
    setSimulationComplete(false);
    setMatches([]);
    setStandings(calculateStandings([]));
  }, []);

  // Extraer siguiente bola manualmente
  const extractNextBall = useCallback(async () => {
    if (manualDrawIndex >= teamsQueue.length || isRevealing) return;
    
    setIsRevealing(true);
    const team = teamsQueue[manualDrawIndex];
    
    // Mostrar animación de la bola
    setCurrentPot(team.pot);
    setCurrentTeam(team);
    
    // Esperar la revelación
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Añadir a equipos sorteados
    setDrawnTeams(prev => new Set([...prev, team.id]));
    setCurrentTeam(null);
    setIsRevealing(false);
    
    const nextIndex = manualDrawIndex + 1;
    setManualDrawIndex(nextIndex);
    
    // Comprobar si se completó
    if (nextIndex >= teamsQueue.length) {
      setDrawComplete(true);
      setMatches(drawResult.matches);
      
      // Revelar jornadas
      for (let i = 0; i < 8; i++) {
        setRevealingMatchday(i + 1);
        await new Promise(resolve => setTimeout(resolve, 400));
      }
      setRevealingMatchday(null);
    }
  }, [manualDrawIndex, teamsQueue, isRevealing, drawResult]);

  // Sorteo automático
  const startAutoDraw = useCallback(async () => {
    setIsDrawing(true);
    setDrawnTeams(new Set());
    setCurrentTeam(null);
    setDrawComplete(false);
    setSimulationComplete(false);
    setMatches([]);
    setStandings(calculateStandings([]));

    // Generar el sorteo
    const result = generateDraw();
    setDrawResult(result);

    // Animar el sorteo de cada equipo
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

    // Revelar jornadas una a una
    for (let i = 0; i < 8; i++) {
      setRevealingMatchday(i + 1);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setRevealingMatchday(null);
  }, []);

  const simulateAllMatches = useCallback(async () => {
    if (!drawResult) return;

    const simulatedMatches = [];
    
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
    setManualDrawStarted(false);
    setTeamsQueue([]);
    setManualDrawIndex(0);
    setIsRevealing(false);
    setViewMode("draw");
  }, []);

  const remainingBalls = teamsQueue.length - manualDrawIndex;
  const currentPotForManual = teamsQueue[manualDrawIndex]?.pot || 1;

  return (
    <div className="min-h-screen starfield">
      {/* Cabecera principal */}
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

          {/* Navegación */}
          <nav className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "draw", label: "Sorteo", icon: Sparkles },
              { id: "matchdays", label: "Jornadas", icon: Calendar },
              { id: "standings", label: "Clasificación", icon: Trophy },
              { id: "results", label: "Resultados", icon: Users },
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
        {/* Vista del Sorteo */}
        {viewMode === "draw" && (
          <div className="space-y-8">
            {/* Selector de modo - Solo mostrar si no ha empezado */}
            {!manualDrawStarted && !isDrawing && !drawComplete && (
              <div className="flex flex-col items-center gap-6">
                <h2 className="font-display text-2xl font-bold text-gradient-gold">
                  Selecciona el Modo de Sorteo
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setDrawMode("manual")}
                    className={cn(
                      "group relative p-6 rounded-xl border-2 transition-all duration-300 min-w-[200px]",
                      drawMode === "manual"
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 bg-card/50 hover:border-primary/50"
                    )}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Hand className={cn(
                        "w-12 h-12 transition-colors",
                        drawMode === "manual" ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="font-display text-lg font-bold">Manual</span>
                      <span className="text-sm text-muted-foreground text-center">
                        Extrae las bolas una a una
                      </span>
                    </div>
                    {drawMode === "manual" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setDrawMode("auto")}
                    className={cn(
                      "group relative p-6 rounded-xl border-2 transition-all duration-300 min-w-[200px]",
                      drawMode === "auto"
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 bg-card/50 hover:border-primary/50"
                    )}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Zap className={cn(
                        "w-12 h-12 transition-colors",
                        drawMode === "auto" ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className="font-display text-lg font-bold">Automático</span>
                      <span className="text-sm text-muted-foreground text-center">
                        Sorteo completo animado
                      </span>
                    </div>
                    {drawMode === "auto" && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs text-primary-foreground">✓</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Controles */}
            <div className="flex flex-wrap justify-center gap-4">
              {!drawComplete && !manualDrawStarted && !isDrawing && (
                <Button
                  variant="hero"
                  size="xl"
                  onClick={drawMode === "manual" ? prepareManualDraw : startAutoDraw}
                  className="min-w-[200px]"
                >
                  <Play className="w-5 h-5" />
                  Iniciar Sorteo
                </Button>
              )}
              
              {/* Modo manual: Botón de extraer bola */}
              {manualDrawStarted && !drawComplete && (
                <div className="flex flex-col items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Bombo {currentPotForManual} • Quedan {remainingBalls} bolas
                    </p>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4].map(pot => (
                        <div
                          key={pot}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                            currentPotForManual === pot
                              ? "bg-primary text-primary-foreground scale-110"
                              : drawnTeams.size >= pot * 9
                                ? "bg-muted text-muted-foreground"
                                : "bg-card border border-border"
                          )}
                        >
                          {pot}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="hero"
                    size="xl"
                    onClick={extractNextBall}
                    disabled={isRevealing}
                    className="min-w-[280px] animate-pulse hover:animate-none"
                  >
                    <CircleDot className={cn(
                      "w-6 h-6 transition-transform",
                      isRevealing && "animate-spin"
                    )} />
                    {isRevealing ? "Revelando..." : "Extraer Bola"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetSimulation}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Cancelar
                  </Button>
                </div>
              )}
              
              {/* Controles del modo automático */}
              {isDrawing && (
                <Button
                  variant="hero"
                  size="xl"
                  disabled
                  className="min-w-[200px]"
                >
                  <Play className="w-5 h-5 animate-pulse" />
                  Sorteando...
                </Button>
              )}
              
              {drawComplete && (
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

            {/* Bola actual del sorteo */}
            {(isDrawing || currentTeam || isRevealing) && (
              <div className="flex justify-center">
                <DrawBall team={currentTeam} isAnimating={!!currentTeam || isRevealing} />
              </div>
            )}

            {/* Barra de progreso del modo manual */}
            {manualDrawStarted && !drawComplete && (
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Progreso</span>
                  <span>{manualDrawIndex} / {teamsQueue.length}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-champions-gold transition-all duration-500 ease-out"
                    style={{ width: `${(manualDrawIndex / teamsQueue.length) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Visualización de bombos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(pot => (
                <PotDisplay
                  key={pot}
                  potNumber={pot}
                  drawnTeams={drawnTeams}
                  currentTeam={currentPot === pot ? currentTeam : null}
                  isActive={(isDrawing || (manualDrawStarted && !drawComplete)) && currentPot === pot}
                />
              ))}
            </div>

            {/* Estadísticas rápidas tras el sorteo */}
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

        {/* Vista de Jornadas */}
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

        {/* Vista de Clasificación */}
        {viewMode === "standings" && (
          <StandingsTable standings={standings} />
        )}

        {/* Vista de Resultados */}
        {viewMode === "results" && (
          <TeamResults matches={matches} />
        )}
      </main>

      {/* Pie de página */}
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