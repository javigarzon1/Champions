export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  pot: number;
  logo: string;
}

export const teams: Team[] = [
  // Pot 1 - Champions and top ranked
  { id: "real-madrid", name: "Real Madrid", shortName: "RMA", country: "ESP", city: "Madrid", pot: 1, logo: "⚪" },
  { id: "man-city", name: "Manchester City", shortName: "MCI", country: "ENG", city: "Manchester", pot: 1, logo: "🔵" },
  { id: "bayern", name: "Bayern München", shortName: "BAY", country: "GER", city: "Munich", pot: 1, logo: "🔴" },
  { id: "psg", name: "Paris Saint-Germain", shortName: "PSG", country: "FRA", city: "Paris", pot: 1, logo: "🔵" },
  { id: "liverpool", name: "Liverpool", shortName: "LIV", country: "ENG", city: "Liverpool", pot: 1, logo: "🔴" },
  { id: "inter", name: "Inter Milano", shortName: "INT", country: "ITA", city: "Milan", pot: 1, logo: "⚫" },
  { id: "dortmund", name: "Borussia Dortmund", shortName: "BVB", country: "GER", city: "Dortmund", pot: 1, logo: "🟡" },
  { id: "leipzig", name: "RB Leipzig", shortName: "RBL", country: "GER", city: "Leipzig", pot: 1, logo: "⚪" },
  { id: "barcelona", name: "FC Barcelona", shortName: "BAR", country: "ESP", city: "Barcelona", pot: 1, logo: "🔵" },

  // Pot 2
  { id: "leverkusen", name: "Bayer Leverkusen", shortName: "LEV", country: "GER", city: "Leverkusen", pot: 2, logo: "🔴" },
  { id: "atletico", name: "Atlético Madrid", shortName: "ATM", country: "ESP", city: "Madrid", pot: 2, logo: "🔴" },
  { id: "atalanta", name: "Atalanta", shortName: "ATA", country: "ITA", city: "Bergamo", pot: 2, logo: "🔵" },
  { id: "juventus", name: "Juventus", shortName: "JUV", country: "ITA", city: "Turin", pot: 2, logo: "⚫" },
  { id: "benfica", name: "SL Benfica", shortName: "BEN", country: "POR", city: "Lisbon", pot: 2, logo: "🔴" },
  { id: "arsenal", name: "Arsenal", shortName: "ARS", country: "ENG", city: "London", pot: 2, logo: "🔴" },
  { id: "bruges", name: "Club Brugge", shortName: "BRU", country: "BEL", city: "Bruges", pot: 2, logo: "🔵" },
  { id: "shakhtar", name: "Shakhtar Donetsk", shortName: "SHA", country: "UKR", city: "Donetsk", pot: 2, logo: "🟠" },
  { id: "milan", name: "AC Milan", shortName: "MIL", country: "ITA", city: "Milan", pot: 2, logo: "🔴" },

  // Pot 3
  { id: "feyenoord", name: "Feyenoord", shortName: "FEY", country: "NED", city: "Rotterdam", pot: 3, logo: "🔴" },
  { id: "sporting", name: "Sporting CP", shortName: "SCP", country: "POR", city: "Lisbon", pot: 3, logo: "🟢" },
  { id: "psv", name: "PSV Eindhoven", shortName: "PSV", country: "NED", city: "Eindhoven", pot: 3, logo: "🔴" },
  { id: "dinamo", name: "Dinamo Zagreb", shortName: "DIN", country: "CRO", city: "Zagreb", pot: 3, logo: "🔵" },
  { id: "salzburg", name: "RB Salzburg", shortName: "SAL", country: "AUT", city: "Salzburg", pot: 3, logo: "🔴" },
  { id: "lille", name: "LOSC Lille", shortName: "LIL", country: "FRA", city: "Lille", pot: 3, logo: "🔴" },
  { id: "crvena", name: "Crvena Zvezda", shortName: "CZV", country: "SRB", city: "Belgrade", pot: 3, logo: "🔴" },
  { id: "young-boys", name: "Young Boys", shortName: "YB", country: "SUI", city: "Bern", pot: 3, logo: "🟡" },
  { id: "celtic", name: "Celtic", shortName: "CEL", country: "SCO", city: "Glasgow", pot: 3, logo: "🟢" },

  // Pot 4
  { id: "slovan", name: "Slovan Bratislava", shortName: "SLO", country: "SVK", city: "Bratislava", pot: 4, logo: "🔵" },
  { id: "monaco", name: "AS Monaco", shortName: "MON", country: "FRA", city: "Monaco", pot: 4, logo: "🔴" },
  { id: "sparta", name: "Sparta Praha", shortName: "SPA", country: "CZE", city: "Prague", pot: 4, logo: "🔴" },
  { id: "aston-villa", name: "Aston Villa", shortName: "AVL", country: "ENG", city: "Birmingham", pot: 4, logo: "🟣" },
  { id: "bologna", name: "Bologna", shortName: "BOL", country: "ITA", city: "Bologna", pot: 4, logo: "🔴" },
  { id: "girona", name: "Girona", shortName: "GIR", country: "ESP", city: "Girona", pot: 4, logo: "🔴" },
  { id: "stuttgart", name: "VfB Stuttgart", shortName: "STU", country: "GER", city: "Stuttgart", pot: 4, logo: "⚪" },
  { id: "sturm", name: "Sturm Graz", shortName: "STG", country: "AUT", city: "Graz", pot: 4, logo: "⚫" },
  { id: "brest", name: "Stade Brestois", shortName: "BRE", country: "FRA", city: "Brest", pot: 4, logo: "🔴" },
];

export const getTeamsByPot = (pot: number): Team[] => {
  return teams.filter(team => team.pot === pot);
};

export const getCountryFlag = (country: string): string => {
  const flags: Record<string, string> = {
    ESP: "🇪🇸",
    ENG: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    GER: "🇩🇪",
    FRA: "🇫🇷",
    ITA: "🇮🇹",
    POR: "🇵🇹",
    NED: "🇳🇱",
    BEL: "🇧🇪",
    UKR: "🇺🇦",
    CRO: "🇭🇷",
    AUT: "🇦🇹",
    SRB: "🇷🇸",
    SUI: "🇨🇭",
    SCO: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    SVK: "🇸🇰",
    CZE: "🇨🇿",
  };
  return flags[country] || "🏳️";
};
