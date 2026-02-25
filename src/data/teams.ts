export const teams = [
  // Pot 1 - Champions and top ranked
  { id: "real-madrid", name: "Real Madrid", shortName: "RMA", country: "ESP", city: "Madrid", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg" },
  { id: "man-city", name: "Manchester City", shortName: "MCI", country: "ENG", city: "Manchester", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg" },
  { id: "bayern", name: "Bayern München", shortName: "BAY", country: "GER", city: "Munich", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg" },
  { id: "psg", name: "Paris Saint-Germain", shortName: "PSG", country: "FRA", city: "Paris", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg" },
  { id: "liverpool", name: "Liverpool", shortName: "LIV", country: "ENG", city: "Liverpool", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg" },
  { id: "inter", name: "Inter Milano", shortName: "INT", country: "ITA", city: "Milan", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg" },
  { id: "dortmund", name: "Borussia Dortmund", shortName: "BVB", country: "GER", city: "Dortmund", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg" },
  { id: "leipzig", name: "RB Leipzig", shortName: "RBL", country: "GER", city: "Leipzig", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg" },
  { id: "barcelona", name: "FC Barcelona", shortName: "BAR", country: "ESP", city: "Barcelona", pot: 1, logo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" },

  // Pot 2
  { id: "leverkusen", name: "Bayer Leverkusen", shortName: "LEV", country: "GER", city: "Leverkusen", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg" },
  { id: "atletico", name: "Atlético Madrid", shortName: "ATM", country: "ESP", city: "Madrid", pot: 2, logo: "/escudos/atletico.png" },
  { id: "atalanta", name: "Atalanta", shortName: "ATA", country: "ITA", city: "Bergamo", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg" },
  { id: "juventus", name: "Juventus", shortName: "JUV", country: "ITA", city: "Turin", pot: 2, logo: "../../public/escudos/juventus.png" },
  { id: "benfica", name: "SL Benfica", shortName: "BEN", country: "POR", city: "Lisbon", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg" },
  { id: "arsenal", name: "Arsenal", shortName: "ARS", country: "ENG", city: "London", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg" },
  { id: "bruges", name: "Club Brugge", shortName: "BRU", country: "BEL", city: "Bruges", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/d/d0/Club_Brugge_KV_logo.svg" },
  { id: "shakhtar", name: "Shakhtar Donetsk", shortName: "SHA", country: "UKR", city: "Donetsk", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/en/a/a1/FC_Shakhtar_Donetsk.svg" },
  { id: "milan", name: "AC Milan", shortName: "MIL", country: "ITA", city: "Milan", pot: 2, logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg" },

  // Pot 3
  { id: "feyenoord", name: "Feyenoord", shortName: "FEY", country: "NED", city: "Rotterdam", pot: 3, logo: "../../public/escudos/feyenoord.png" },
  { id: "sporting", name: "Sporting CP", shortName: "SCP", country: "POR", city: "Lisbon", pot: 3, logo: "../../public/escudos/sporting.png" },
  { id: "psv", name: "PSV Eindhoven", shortName: "PSV", country: "NED", city: "Eindhoven", pot: 3, logo: "https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg" },
  { id: "dinamo", name: "Dinamo Zagreb", shortName: "DIN", country: "CRO", city: "Zagreb", pot: 3, logo: "../../public/escudos/dinamo.png" },
  { id: "salzburg", name: "RB Salzburg", shortName: "SAL", country: "AUT", city: "Salzburg", pot: 3, logo: "https://upload.wikimedia.org/wikipedia/en/7/77/FC_Red_Bull_Salzburg_logo.svg" },
  { id: "lille", name: "LOSC Lille", shortName: "LIL", country: "FRA", city: "Lille", pot: 3, logo: "https://upload.wikimedia.org/wikipedia/en/3/3f/Lille_OSC_2018_logo.svg" },
  { id: "crvena", name: "Crvena Zvezda", shortName: "CZV", country: "SRB", city: "Belgrade", pot: 3, logo: "../../public/escudos/crvena.png" },
  { id: "young-boys", name: "Young Boys", shortName: "YB", country: "SUI", city: "Bern", pot: 3, logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/BSC_Young_Boys_logo.svg" },
  { id: "celtic", name: "Celtic", shortName: "CEL", country: "SCO", city: "Glasgow", pot: 3, logo: "https://upload.wikimedia.org/wikipedia/en/3/35/Celtic_FC.svg" },

  // Pot 4
  { id: "slovan", name: "Slovan Bratislava", shortName: "SLO", country: "SVK", city: "Bratislava", pot: 4, logo: "../../public/escudos/slovan.png" },
  { id: "monaco", name: "AS Monaco", shortName: "MON", country: "FRA", city: "Monaco", pot: 4, logo: "../../public/escudos/monaco.png" },
  { id: "sparta", name: "Sparta Praha", shortName: "SPA", country: "CZE", city: "Prague", pot: 4, logo: "../../public/escudos/sparta.png" },
  { id: "aston-villa", name: "Aston Villa", shortName: "AVL", country: "ENG", city: "Birmingham", pot: 4, logo: "../../public/escudos/aston-villa.png" },
  { id: "bologna", name: "Bologna", shortName: "BOL", country: "ITA", city: "Bologna", pot: 4, logo: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Bologna_F.C._1909_logo.svg" },
  { id: "girona", name: "Girona", shortName: "GIR", country: "ESP", city: "Girona", pot: 4, logo: "../../public/escudos/girona.png" },
  { id: "stuttgart", name: "VfB Stuttgart", shortName: "STU", country: "GER", city: "Stuttgart", pot: 4, logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg" },
  { id: "sturm", name: "Sturm Graz", shortName: "STG", country: "AUT", city: "Graz", pot: 4, logo: "https://upload.wikimedia.org/wikipedia/en/9/91/SK_Sturm_Graz_logo.svg" },
  { id: "brest", name: "Stade Brestois", shortName: "BRE", country: "FRA", city: "Brest", pot: 4, logo: "../../public/escudos/brest.png" },
];

export const getTeamsByPot = (pot) => {
  return teams.filter(team => team.pot === pot);
};

export const getCountryFlag = (country) => {
  const flags = {
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