import { Team, teams } from "../data/teams";

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  matchday: number;
  homeGoals?: number;
  awayGoals?: number;
  played: boolean;
}

export interface TeamStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface DrawResult {
  matches: Match[];
  matchdays: Match[][];
}

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Check if two teams can play each other
function canPlay(team1: Team, team2: Team, existingMatches: Match[], matchday: number): boolean {
  // Can't play team from same country
  if (team1.country === team2.country) return false;
  
  // Can't play same team twice
  const alreadyPlayed = existingMatches.some(
    m => (m.homeTeam.id === team1.id && m.awayTeam.id === team2.id) ||
         (m.homeTeam.id === team2.id && m.awayTeam.id === team1.id)
  );
  if (alreadyPlayed) return false;
  
  return true;
}

// Check if a city is already hosting a match on this matchday
function cityAvailable(city: string, matchdayMatches: Match[]): boolean {
  return !matchdayMatches.some(m => m.homeTeam.city === city);
}

// Count how many home/away games a team has
function getHomeAwayCount(teamId: string, matches: Match[]): { home: number; away: number } {
  let home = 0;
  let away = 0;
  matches.forEach(m => {
    if (m.homeTeam.id === teamId) home++;
    if (m.awayTeam.id === teamId) away++;
  });
  return { home, away };
}

// Generate the complete draw
export function generateDraw(): DrawResult {
  const allTeams = [...teams];
  const matches: Match[] = [];
  const matchdays: Match[][] = [[], [], [], [], [], [], [], []];
  
  // Each team needs 8 opponents (4 home, 4 away)
  // We'll create matches ensuring constraints are met
  
  const teamMatches: Map<string, { opponents: Set<string>; homeCount: number; awayCount: number }> = new Map();
  
  allTeams.forEach(team => {
    teamMatches.set(team.id, { opponents: new Set(), homeCount: 0, awayCount: 0 });
  });
  
  // Try to create 8 matchdays
  for (let matchday = 1; matchday <= 8; matchday++) {
    const matchdayMatches: Match[] = [];
    const usedTeams = new Set<string>();
    const usedCities = new Set<string>();
    
    // Shuffle teams for this matchday
    const shuffledTeams = shuffle(allTeams);
    
    for (const team1 of shuffledTeams) {
      if (usedTeams.has(team1.id)) continue;
      
      const team1Data = teamMatches.get(team1.id)!;
      if (team1Data.opponents.size >= 8) continue;
      
      // Find a valid opponent
      const potentialOpponents = shuffle(
        shuffledTeams.filter(t => 
          t.id !== team1.id &&
          !usedTeams.has(t.id) &&
          !team1Data.opponents.has(t.id) &&
          t.country !== team1.country
        )
      );
      
      for (const team2 of potentialOpponents) {
        const team2Data = teamMatches.get(team2.id)!;
        if (team2Data.opponents.size >= 8) continue;
        
        // Determine home/away based on balance
        let homeTeam: Team;
        let awayTeam: Team;
        
        if (team1Data.homeCount < 4 && team2Data.awayCount < 4 && !usedCities.has(team1.city)) {
          homeTeam = team1;
          awayTeam = team2;
        } else if (team2Data.homeCount < 4 && team1Data.awayCount < 4 && !usedCities.has(team2.city)) {
          homeTeam = team2;
          awayTeam = team1;
        } else if (!usedCities.has(team1.city) && team1Data.homeCount < 4) {
          homeTeam = team1;
          awayTeam = team2;
        } else if (!usedCities.has(team2.city) && team2Data.homeCount < 4) {
          homeTeam = team2;
          awayTeam = team1;
        } else {
          continue;
        }
        
        // Create match
        const match: Match = {
          id: `${matchday}-${homeTeam.id}-${awayTeam.id}`,
          homeTeam,
          awayTeam,
          matchday,
          played: false,
        };
        
        matchdayMatches.push(match);
        usedTeams.add(team1.id);
        usedTeams.add(team2.id);
        usedCities.add(homeTeam.city);
        
        // Update tracking
        team1Data.opponents.add(team2.id);
        team2Data.opponents.add(team1.id);
        
        if (homeTeam.id === team1.id) {
          team1Data.homeCount++;
          team2Data.awayCount++;
        } else {
          team2Data.homeCount++;
          team1Data.awayCount++;
        }
        
        break;
      }
    }
    
    matchdays[matchday - 1] = matchdayMatches;
    matches.push(...matchdayMatches);
  }
  
  return { matches, matchdays };
}

// Simulate match results
export function simulateMatch(match: Match): Match {
  const homeGoals = Math.floor(Math.random() * 5);
  const awayGoals = Math.floor(Math.random() * 4);
  
  return {
    ...match,
    homeGoals,
    awayGoals,
    played: true,
  };
}

// Calculate standings
export function calculateStandings(matches: Match[]): TeamStanding[] {
  const standingsMap = new Map<string, TeamStanding>();
  
  // Initialize standings for all teams
  teams.forEach(team => {
    standingsMap.set(team.id, {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    });
  });
  
  // Process played matches
  matches.filter(m => m.played).forEach(match => {
    const home = standingsMap.get(match.homeTeam.id)!;
    const away = standingsMap.get(match.awayTeam.id)!;
    
    home.played++;
    away.played++;
    
    home.goalsFor += match.homeGoals!;
    home.goalsAgainst += match.awayGoals!;
    away.goalsFor += match.awayGoals!;
    away.goalsAgainst += match.homeGoals!;
    
    if (match.homeGoals! > match.awayGoals!) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (match.homeGoals! < match.awayGoals!) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points++;
      away.points++;
    }
  });
  
  // Calculate goal difference and sort
  const standings = Array.from(standingsMap.values()).map(s => ({
    ...s,
    goalDifference: s.goalsFor - s.goalsAgainst,
  }));
  
  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
  
  return standings;
}
