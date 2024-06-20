interface StaticData {
  apiName: string;
  icon: string;
  name: string;
  tileIcon: string;
}
interface StaticSetData {
  champions: StaticData[];
  traits: StaticData[];
}
interface StaticSetsData {
  9: StaticSetData;
  10: StaticSetData;
  11: StaticSetData;
}
interface APITrait {
  name: string;
  tier_current: number;
  style: number;
  num_units: number;
}
interface APIUnit {
  character_id: string;
  tier: number;
  itemNames: string[];
  rarity: number;
}
interface Team {
  order: number;
  level: number;
  augments: string[];
  traits: APITrait[];
  augmentNum: number;
  units: APIUnit[];
  gold_left: number;
  placement: string;
  last_round: number;
}
interface DailyGuess {
  placements: string[];
  rankedMatch: Team[];
  rank: string;
  date: string;
  category: string;
  verifiedRank: string;
  region: string;
  usernames: string[];
  lastRounds: number[];
}

export type {
  StaticData,
  StaticSetData,
  StaticSetsData,
  Team,
  APITrait,
  APIUnit,
  DailyGuess,
};
