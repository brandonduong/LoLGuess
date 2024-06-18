/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  score: number,
  maxScore: number,
  correctPlacements: number,
  correctRanks: number,
  totalRanks: number,
  unfinished: number,
  totalGuesses: number,
  averageCorrectPlacements: number,
  averageScore: number,
  scores?: Array< number | null > | null,
  rankGuesses?: Array< Array< number | null > | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  correctPlacementGuesses?: Array< number | null > | null,
  dailyTotalGuesses?: number | null,
  dailyScore?: number | null,
  dailyMaxScore?: number | null,
  dailyCorrectPlacements?: number | null,
  dailyCorrectRanks?: number | null,
  dailyScoresLow?: Array< number | null > | null,
  dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
  dailyScoresHigh?: Array< number | null > | null,
  dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
  dailyScoresAll?: Array< number | null > | null,
  dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  score?: ModelFloatInput | null,
  maxScore?: ModelFloatInput | null,
  correctPlacements?: ModelIntInput | null,
  correctRanks?: ModelIntInput | null,
  totalRanks?: ModelIntInput | null,
  unfinished?: ModelIntInput | null,
  totalGuesses?: ModelIntInput | null,
  averageCorrectPlacements?: ModelFloatInput | null,
  averageScore?: ModelFloatInput | null,
  scores?: ModelIntInput | null,
  rankGuesses?: ModelIntInput | null,
  placementGuesses?: ModelIntInput | null,
  correctPlacementGuesses?: ModelIntInput | null,
  dailyTotalGuesses?: ModelIntInput | null,
  dailyScore?: ModelFloatInput | null,
  dailyMaxScore?: ModelFloatInput | null,
  dailyCorrectPlacements?: ModelIntInput | null,
  dailyCorrectRanks?: ModelIntInput | null,
  dailyScoresLow?: ModelIntInput | null,
  dailyRankGuessesLow?: ModelIntInput | null,
  dailyPlacementGuessesLow?: ModelIntInput | null,
  dailyCorrectPlacementGuessesLow?: ModelIntInput | null,
  dailyScoresHigh?: ModelIntInput | null,
  dailyRankGuessesHigh?: ModelIntInput | null,
  dailyPlacementGuessesHigh?: ModelIntInput | null,
  dailyCorrectPlacementGuessesHigh?: ModelIntInput | null,
  dailyScoresAll?: ModelIntInput | null,
  dailyRankGuessesAll?: ModelIntInput | null,
  dailyPlacementGuessesAll?: ModelIntInput | null,
  dailyCorrectPlacementGuessesAll?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  guesses?: ModelGuessConnection | null,
  score: number,
  maxScore: number,
  correctPlacements: number,
  correctRanks: number,
  totalRanks: number,
  unfinished: number,
  totalGuesses: number,
  averageCorrectPlacements: number,
  averageScore: number,
  scores?: Array< number | null > | null,
  rankGuesses?: Array< Array< number | null > | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  correctPlacementGuesses?: Array< number | null > | null,
  dailyGuesses?: ModelDailyGuessConnection | null,
  dailyTotalGuesses?: number | null,
  dailyScore?: number | null,
  dailyMaxScore?: number | null,
  dailyCorrectPlacements?: number | null,
  dailyCorrectRanks?: number | null,
  dailyScoresLow?: Array< number | null > | null,
  dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
  dailyScoresHigh?: Array< number | null > | null,
  dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
  dailyScoresAll?: Array< number | null > | null,
  dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGuessConnection = {
  __typename: "ModelGuessConnection",
  items:  Array<Guess | null >,
  nextToken?: string | null,
};

export type Guess = {
  __typename: "Guess",
  id: string,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  ranks: Array< string >,
  userGuessesId: string,
  createdAt: string,
  region?: string | null,
  regions?: Array< string | null > | null,
  matchId?: string | null,
  updatedAt: string,
};

export type ModelDailyGuessConnection = {
  __typename: "ModelDailyGuessConnection",
  items:  Array<DailyGuess | null >,
  nextToken?: string | null,
};

export type DailyGuess = {
  __typename: "DailyGuess",
  date: string,
  category: string,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  userGuessesId: string,
  createdAt: string,
  updatedAt: string,
  userDailyGuessesId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  score?: number | null,
  maxScore?: number | null,
  correctPlacements?: number | null,
  correctRanks?: number | null,
  totalRanks?: number | null,
  unfinished?: number | null,
  totalGuesses?: number | null,
  averageCorrectPlacements?: number | null,
  averageScore?: number | null,
  scores?: Array< number | null > | null,
  rankGuesses?: Array< Array< number | null > | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  correctPlacementGuesses?: Array< number | null > | null,
  dailyTotalGuesses?: number | null,
  dailyScore?: number | null,
  dailyMaxScore?: number | null,
  dailyCorrectPlacements?: number | null,
  dailyCorrectRanks?: number | null,
  dailyScoresLow?: Array< number | null > | null,
  dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
  dailyScoresHigh?: Array< number | null > | null,
  dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
  dailyScoresAll?: Array< number | null > | null,
  dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
  dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
  dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateGuessInput = {
  id?: string | null,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  ranks: Array< string >,
  userGuessesId: string,
  createdAt?: string | null,
  region?: string | null,
  regions?: Array< string | null > | null,
  matchId?: string | null,
};

export type ModelGuessConditionInput = {
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  userGuessesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  region?: ModelStringInput | null,
  regions?: ModelStringInput | null,
  matchId?: ModelStringInput | null,
  and?: Array< ModelGuessConditionInput | null > | null,
  or?: Array< ModelGuessConditionInput | null > | null,
  not?: ModelGuessConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateGuessInput = {
  id: string,
  placements?: Array< string > | null,
  guessedRank?: string | null,
  rank?: string | null,
  ranks?: Array< string > | null,
  userGuessesId?: string | null,
  createdAt?: string | null,
  region?: string | null,
  regions?: Array< string | null > | null,
  matchId?: string | null,
};

export type DeleteGuessInput = {
  id: string,
};

export type CreateDailyGuessInput = {
  date: string,
  category: string,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  userGuessesId: string,
  createdAt?: string | null,
  userDailyGuessesId?: string | null,
};

export type ModelDailyGuessConditionInput = {
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDailyGuessConditionInput | null > | null,
  or?: Array< ModelDailyGuessConditionInput | null > | null,
  not?: ModelDailyGuessConditionInput | null,
  userDailyGuessesId?: ModelIDInput | null,
};

export type UpdateDailyGuessInput = {
  date: string,
  category: string,
  placements?: Array< string > | null,
  guessedRank?: string | null,
  rank?: string | null,
  userGuessesId: string,
  createdAt?: string | null,
  userDailyGuessesId?: string | null,
};

export type DeleteDailyGuessInput = {
  date: string,
  category: string,
  userGuessesId: string,
};

export type CreateLeaderboardInput = {
  byCorrectPlacements?: Array< string | null > | null,
  byCorrectRanks?: Array< string | null > | null,
  byScore?: Array< string | null > | null,
  byAverageCorrectPlacements?: Array< string | null > | null,
  byAverageScore?: Array< string | null > | null,
  date: string,
};

export type ModelLeaderboardConditionInput = {
  byCorrectPlacements?: ModelStringInput | null,
  byCorrectRanks?: ModelStringInput | null,
  byScore?: ModelStringInput | null,
  byAverageCorrectPlacements?: ModelStringInput | null,
  byAverageScore?: ModelStringInput | null,
  and?: Array< ModelLeaderboardConditionInput | null > | null,
  or?: Array< ModelLeaderboardConditionInput | null > | null,
  not?: ModelLeaderboardConditionInput | null,
};

export type Leaderboard = {
  __typename: "Leaderboard",
  byCorrectPlacements?: Array< string | null > | null,
  byCorrectRanks?: Array< string | null > | null,
  byScore?: Array< string | null > | null,
  byAverageCorrectPlacements?: Array< string | null > | null,
  byAverageScore?: Array< string | null > | null,
  date: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLeaderboardInput = {
  byCorrectPlacements?: Array< string | null > | null,
  byCorrectRanks?: Array< string | null > | null,
  byScore?: Array< string | null > | null,
  byAverageCorrectPlacements?: Array< string | null > | null,
  byAverageScore?: Array< string | null > | null,
  date: string,
};

export type DeleteLeaderboardInput = {
  date: string,
};

export type CreateDailyInput = {
  date: string,
  matchId: string,
  rank: string,
  region: string,
  category: string,
  usernames?: Array< string | null > | null,
  patch?: string | null,
  set?: number | null,
  datetimePlayed?: number | null,
  rankGuesses?: Array< number | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  perfects?: number | null,
  scores?: Array< number | null > | null,
  loggedRankGuesses?: Array< number | null > | null,
  loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
  loggedPerfects?: number | null,
  loggedScores?: Array< number | null > | null,
};

export type ModelDailyConditionInput = {
  matchId?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  region?: ModelStringInput | null,
  usernames?: ModelStringInput | null,
  patch?: ModelStringInput | null,
  set?: ModelIntInput | null,
  datetimePlayed?: ModelIntInput | null,
  rankGuesses?: ModelIntInput | null,
  placementGuesses?: ModelIntInput | null,
  perfects?: ModelIntInput | null,
  scores?: ModelIntInput | null,
  loggedRankGuesses?: ModelIntInput | null,
  loggedPlacementGuesses?: ModelIntInput | null,
  loggedPerfects?: ModelIntInput | null,
  loggedScores?: ModelIntInput | null,
  and?: Array< ModelDailyConditionInput | null > | null,
  or?: Array< ModelDailyConditionInput | null > | null,
  not?: ModelDailyConditionInput | null,
};

export type Daily = {
  __typename: "Daily",
  date: string,
  matchId: string,
  rank: string,
  region: string,
  category: string,
  usernames?: Array< string | null > | null,
  patch?: string | null,
  set?: number | null,
  datetimePlayed?: number | null,
  rankGuesses?: Array< number | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  perfects?: number | null,
  scores?: Array< number | null > | null,
  loggedRankGuesses?: Array< number | null > | null,
  loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
  loggedPerfects?: number | null,
  loggedScores?: Array< number | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type DeleteDailyInput = {
  date: string,
  category: string,
};

export type UpdateDailyInput = {
  date: string,
  matchId?: string | null,
  rank?: string | null,
  region?: string | null,
  category: string,
  usernames?: Array< string | null > | null,
  patch?: string | null,
  set?: number | null,
  datetimePlayed?: number | null,
  rankGuesses?: Array< number | null > | null,
  placementGuesses?: Array< Array< number | null > | null > | null,
  perfects?: number | null,
  scores?: Array< number | null > | null,
  loggedRankGuesses?: Array< number | null > | null,
  loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
  loggedPerfects?: number | null,
  loggedScores?: Array< number | null > | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  score?: ModelFloatInput | null,
  maxScore?: ModelFloatInput | null,
  correctPlacements?: ModelIntInput | null,
  correctRanks?: ModelIntInput | null,
  totalRanks?: ModelIntInput | null,
  unfinished?: ModelIntInput | null,
  totalGuesses?: ModelIntInput | null,
  averageCorrectPlacements?: ModelFloatInput | null,
  averageScore?: ModelFloatInput | null,
  scores?: ModelIntInput | null,
  rankGuesses?: ModelIntInput | null,
  placementGuesses?: ModelIntInput | null,
  correctPlacementGuesses?: ModelIntInput | null,
  dailyTotalGuesses?: ModelIntInput | null,
  dailyScore?: ModelFloatInput | null,
  dailyMaxScore?: ModelFloatInput | null,
  dailyCorrectPlacements?: ModelIntInput | null,
  dailyCorrectRanks?: ModelIntInput | null,
  dailyScoresLow?: ModelIntInput | null,
  dailyRankGuessesLow?: ModelIntInput | null,
  dailyPlacementGuessesLow?: ModelIntInput | null,
  dailyCorrectPlacementGuessesLow?: ModelIntInput | null,
  dailyScoresHigh?: ModelIntInput | null,
  dailyRankGuessesHigh?: ModelIntInput | null,
  dailyPlacementGuessesHigh?: ModelIntInput | null,
  dailyCorrectPlacementGuessesHigh?: ModelIntInput | null,
  dailyScoresAll?: ModelIntInput | null,
  dailyRankGuessesAll?: ModelIntInput | null,
  dailyPlacementGuessesAll?: ModelIntInput | null,
  dailyCorrectPlacementGuessesAll?: ModelIntInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelGuessFilterInput = {
  id?: ModelIDInput | null,
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  userGuessesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  region?: ModelStringInput | null,
  regions?: ModelStringInput | null,
  matchId?: ModelStringInput | null,
  and?: Array< ModelGuessFilterInput | null > | null,
  or?: Array< ModelGuessFilterInput | null > | null,
  not?: ModelGuessFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelDailyGuessPrimaryCompositeKeyConditionInput = {
  eq?: ModelDailyGuessPrimaryCompositeKeyInput | null,
  le?: ModelDailyGuessPrimaryCompositeKeyInput | null,
  lt?: ModelDailyGuessPrimaryCompositeKeyInput | null,
  ge?: ModelDailyGuessPrimaryCompositeKeyInput | null,
  gt?: ModelDailyGuessPrimaryCompositeKeyInput | null,
  between?: Array< ModelDailyGuessPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelDailyGuessPrimaryCompositeKeyInput | null,
};

export type ModelDailyGuessPrimaryCompositeKeyInput = {
  category?: string | null,
  userGuessesId?: string | null,
};

export type ModelDailyGuessFilterInput = {
  date?: ModelIDInput | null,
  category?: ModelStringInput | null,
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  userGuessesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelDailyGuessFilterInput | null > | null,
  or?: Array< ModelDailyGuessFilterInput | null > | null,
  not?: ModelDailyGuessFilterInput | null,
  userDailyGuessesId?: ModelIDInput | null,
};

export type ModelLeaderboardFilterInput = {
  byCorrectPlacements?: ModelStringInput | null,
  byCorrectRanks?: ModelStringInput | null,
  byScore?: ModelStringInput | null,
  byAverageCorrectPlacements?: ModelStringInput | null,
  byAverageScore?: ModelStringInput | null,
  date?: ModelIDInput | null,
  and?: Array< ModelLeaderboardFilterInput | null > | null,
  or?: Array< ModelLeaderboardFilterInput | null > | null,
  not?: ModelLeaderboardFilterInput | null,
};

export type ModelLeaderboardConnection = {
  __typename: "ModelLeaderboardConnection",
  items:  Array<Leaderboard | null >,
  nextToken?: string | null,
};

export type ModelDailyFilterInput = {
  date?: ModelIDInput | null,
  matchId?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  region?: ModelStringInput | null,
  category?: ModelStringInput | null,
  usernames?: ModelStringInput | null,
  patch?: ModelStringInput | null,
  set?: ModelIntInput | null,
  datetimePlayed?: ModelIntInput | null,
  rankGuesses?: ModelIntInput | null,
  placementGuesses?: ModelIntInput | null,
  perfects?: ModelIntInput | null,
  scores?: ModelIntInput | null,
  loggedRankGuesses?: ModelIntInput | null,
  loggedPlacementGuesses?: ModelIntInput | null,
  loggedPerfects?: ModelIntInput | null,
  loggedScores?: ModelIntInput | null,
  and?: Array< ModelDailyFilterInput | null > | null,
  or?: Array< ModelDailyFilterInput | null > | null,
  not?: ModelDailyFilterInput | null,
};

export type ModelDailyConnection = {
  __typename: "ModelDailyConnection",
  items:  Array<Daily | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  score?: ModelSubscriptionFloatInput | null,
  maxScore?: ModelSubscriptionFloatInput | null,
  correctPlacements?: ModelSubscriptionIntInput | null,
  correctRanks?: ModelSubscriptionIntInput | null,
  totalRanks?: ModelSubscriptionIntInput | null,
  unfinished?: ModelSubscriptionIntInput | null,
  totalGuesses?: ModelSubscriptionIntInput | null,
  averageCorrectPlacements?: ModelSubscriptionFloatInput | null,
  averageScore?: ModelSubscriptionFloatInput | null,
  scores?: ModelSubscriptionIntInput | null,
  rankGuesses?: ModelSubscriptionIntInput | null,
  placementGuesses?: ModelSubscriptionIntInput | null,
  correctPlacementGuesses?: ModelSubscriptionIntInput | null,
  dailyTotalGuesses?: ModelSubscriptionIntInput | null,
  dailyScore?: ModelSubscriptionFloatInput | null,
  dailyMaxScore?: ModelSubscriptionFloatInput | null,
  dailyCorrectPlacements?: ModelSubscriptionIntInput | null,
  dailyCorrectRanks?: ModelSubscriptionIntInput | null,
  dailyScoresLow?: ModelSubscriptionIntInput | null,
  dailyRankGuessesLow?: ModelSubscriptionIntInput | null,
  dailyPlacementGuessesLow?: ModelSubscriptionIntInput | null,
  dailyCorrectPlacementGuessesLow?: ModelSubscriptionIntInput | null,
  dailyScoresHigh?: ModelSubscriptionIntInput | null,
  dailyRankGuessesHigh?: ModelSubscriptionIntInput | null,
  dailyPlacementGuessesHigh?: ModelSubscriptionIntInput | null,
  dailyCorrectPlacementGuessesHigh?: ModelSubscriptionIntInput | null,
  dailyScoresAll?: ModelSubscriptionIntInput | null,
  dailyRankGuessesAll?: ModelSubscriptionIntInput | null,
  dailyPlacementGuessesAll?: ModelSubscriptionIntInput | null,
  dailyCorrectPlacementGuessesAll?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionGuessFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  placements?: ModelSubscriptionStringInput | null,
  guessedRank?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionStringInput | null,
  ranks?: ModelSubscriptionStringInput | null,
  userGuessesId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  region?: ModelSubscriptionStringInput | null,
  regions?: ModelSubscriptionStringInput | null,
  matchId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGuessFilterInput | null > | null,
  or?: Array< ModelSubscriptionGuessFilterInput | null > | null,
};

export type ModelSubscriptionDailyGuessFilterInput = {
  date?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  placements?: ModelSubscriptionStringInput | null,
  guessedRank?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionStringInput | null,
  userGuessesId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionDailyGuessFilterInput | null > | null,
  or?: Array< ModelSubscriptionDailyGuessFilterInput | null > | null,
};

export type ModelSubscriptionLeaderboardFilterInput = {
  byCorrectPlacements?: ModelSubscriptionStringInput | null,
  byCorrectRanks?: ModelSubscriptionStringInput | null,
  byScore?: ModelSubscriptionStringInput | null,
  byAverageCorrectPlacements?: ModelSubscriptionStringInput | null,
  byAverageScore?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
};

export type ModelSubscriptionDailyFilterInput = {
  date?: ModelSubscriptionIDInput | null,
  matchId?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionStringInput | null,
  region?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  usernames?: ModelSubscriptionStringInput | null,
  patch?: ModelSubscriptionStringInput | null,
  set?: ModelSubscriptionIntInput | null,
  datetimePlayed?: ModelSubscriptionIntInput | null,
  rankGuesses?: ModelSubscriptionIntInput | null,
  placementGuesses?: ModelSubscriptionIntInput | null,
  perfects?: ModelSubscriptionIntInput | null,
  scores?: ModelSubscriptionIntInput | null,
  loggedRankGuesses?: ModelSubscriptionIntInput | null,
  loggedPlacementGuesses?: ModelSubscriptionIntInput | null,
  loggedPerfects?: ModelSubscriptionIntInput | null,
  loggedScores?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionDailyFilterInput | null > | null,
  or?: Array< ModelSubscriptionDailyFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGuessMutationVariables = {
  input: CreateGuessInput,
  condition?: ModelGuessConditionInput | null,
};

export type CreateGuessMutation = {
  createGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateGuessMutationVariables = {
  input: UpdateGuessInput,
  condition?: ModelGuessConditionInput | null,
};

export type UpdateGuessMutation = {
  updateGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteGuessMutationVariables = {
  input: DeleteGuessInput,
  condition?: ModelGuessConditionInput | null,
};

export type DeleteGuessMutation = {
  deleteGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateDailyGuessMutationVariables = {
  input: CreateDailyGuessInput,
  condition?: ModelDailyGuessConditionInput | null,
};

export type CreateDailyGuessMutation = {
  createDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type UpdateDailyGuessMutationVariables = {
  input: UpdateDailyGuessInput,
  condition?: ModelDailyGuessConditionInput | null,
};

export type UpdateDailyGuessMutation = {
  updateDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type DeleteDailyGuessMutationVariables = {
  input: DeleteDailyGuessInput,
  condition?: ModelDailyGuessConditionInput | null,
};

export type DeleteDailyGuessMutation = {
  deleteDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type CreateLeaderboardMutationVariables = {
  input: CreateLeaderboardInput,
  condition?: ModelLeaderboardConditionInput | null,
};

export type CreateLeaderboardMutation = {
  createLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLeaderboardMutationVariables = {
  input: UpdateLeaderboardInput,
  condition?: ModelLeaderboardConditionInput | null,
};

export type UpdateLeaderboardMutation = {
  updateLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLeaderboardMutationVariables = {
  input: DeleteLeaderboardInput,
  condition?: ModelLeaderboardConditionInput | null,
};

export type DeleteLeaderboardMutation = {
  deleteLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateDailyMutationVariables = {
  input: CreateDailyInput,
  condition?: ModelDailyConditionInput | null,
};

export type CreateDailyMutation = {
  createDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDailyMutationVariables = {
  input: DeleteDailyInput,
  condition?: ModelDailyConditionInput | null,
};

export type DeleteDailyMutation = {
  deleteDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDailyMutationVariables = {
  input: UpdateDailyInput,
  condition?: ModelDailyConditionInput | null,
};

export type UpdateDailyMutation = {
  updateDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type BatchFetchUserQueryVariables = {
  ids?: Array< string | null > | null,
};

export type BatchFetchUserQuery = {
  batchFetchUser?:  Array< {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null > | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      guesses?:  {
        __typename: "ModelGuessConnection",
        nextToken?: string | null,
      } | null,
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
      totalGuesses: number,
      averageCorrectPlacements: number,
      averageScore: number,
      scores?: Array< number | null > | null,
      rankGuesses?: Array< Array< number | null > | null > | null,
      placementGuesses?: Array< Array< number | null > | null > | null,
      correctPlacementGuesses?: Array< number | null > | null,
      dailyGuesses?:  {
        __typename: "ModelDailyGuessConnection",
        nextToken?: string | null,
      } | null,
      dailyTotalGuesses?: number | null,
      dailyScore?: number | null,
      dailyMaxScore?: number | null,
      dailyCorrectPlacements?: number | null,
      dailyCorrectRanks?: number | null,
      dailyScoresLow?: Array< number | null > | null,
      dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
      dailyScoresHigh?: Array< number | null > | null,
      dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
      dailyScoresAll?: Array< number | null > | null,
      dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByUsernameQuery = {
  usersByUsername?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      guesses?:  {
        __typename: "ModelGuessConnection",
        nextToken?: string | null,
      } | null,
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
      totalGuesses: number,
      averageCorrectPlacements: number,
      averageScore: number,
      scores?: Array< number | null > | null,
      rankGuesses?: Array< Array< number | null > | null > | null,
      placementGuesses?: Array< Array< number | null > | null > | null,
      correctPlacementGuesses?: Array< number | null > | null,
      dailyGuesses?:  {
        __typename: "ModelDailyGuessConnection",
        nextToken?: string | null,
      } | null,
      dailyTotalGuesses?: number | null,
      dailyScore?: number | null,
      dailyMaxScore?: number | null,
      dailyCorrectPlacements?: number | null,
      dailyCorrectRanks?: number | null,
      dailyScoresLow?: Array< number | null > | null,
      dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
      dailyScoresHigh?: Array< number | null > | null,
      dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
      dailyScoresAll?: Array< number | null > | null,
      dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
      dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
      dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGuessQueryVariables = {
  id: string,
};

export type GetGuessQuery = {
  getGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type ListGuessesQueryVariables = {
  filter?: ModelGuessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGuessesQuery = {
  listGuesses?:  {
    __typename: "ModelGuessConnection",
    items:  Array< {
      __typename: "Guess",
      id: string,
      placements: Array< string >,
      guessedRank: string,
      rank: string,
      ranks: Array< string >,
      userGuessesId: string,
      createdAt: string,
      region?: string | null,
      regions?: Array< string | null > | null,
      matchId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GuessesByDateQueryVariables = {
  userGuessesId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGuessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GuessesByDateQuery = {
  guessesByDate?:  {
    __typename: "ModelGuessConnection",
    items:  Array< {
      __typename: "Guess",
      id: string,
      placements: Array< string >,
      guessedRank: string,
      rank: string,
      ranks: Array< string >,
      userGuessesId: string,
      createdAt: string,
      region?: string | null,
      regions?: Array< string | null > | null,
      matchId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDailyGuessQueryVariables = {
  date: string,
  category: string,
  userGuessesId: string,
};

export type GetDailyGuessQuery = {
  getDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type ListDailyGuessesQueryVariables = {
  date?: string | null,
  categoryUserGuessesId?: ModelDailyGuessPrimaryCompositeKeyConditionInput | null,
  filter?: ModelDailyGuessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDailyGuessesQuery = {
  listDailyGuesses?:  {
    __typename: "ModelDailyGuessConnection",
    items:  Array< {
      __typename: "DailyGuess",
      date: string,
      category: string,
      placements: Array< string >,
      guessedRank: string,
      rank: string,
      userGuessesId: string,
      createdAt: string,
      updatedAt: string,
      userDailyGuessesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type DailyGuessesByDateQueryVariables = {
  userGuessesId: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelDailyGuessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type DailyGuessesByDateQuery = {
  dailyGuessesByDate?:  {
    __typename: "ModelDailyGuessConnection",
    items:  Array< {
      __typename: "DailyGuess",
      date: string,
      category: string,
      placements: Array< string >,
      guessedRank: string,
      rank: string,
      userGuessesId: string,
      createdAt: string,
      updatedAt: string,
      userDailyGuessesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLeaderboardQueryVariables = {
  date: string,
};

export type GetLeaderboardQuery = {
  getLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLeaderboardsQueryVariables = {
  date?: string | null,
  filter?: ModelLeaderboardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListLeaderboardsQuery = {
  listLeaderboards?:  {
    __typename: "ModelLeaderboardConnection",
    items:  Array< {
      __typename: "Leaderboard",
      byCorrectPlacements?: Array< string | null > | null,
      byCorrectRanks?: Array< string | null > | null,
      byScore?: Array< string | null > | null,
      byAverageCorrectPlacements?: Array< string | null > | null,
      byAverageScore?: Array< string | null > | null,
      date: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetDailyQueryVariables = {
  date: string,
  category: string,
};

export type GetDailyQuery = {
  getDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDailiesQueryVariables = {
  date?: string | null,
  category?: ModelStringKeyConditionInput | null,
  filter?: ModelDailyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListDailiesQuery = {
  listDailies?:  {
    __typename: "ModelDailyConnection",
    items:  Array< {
      __typename: "Daily",
      date: string,
      matchId: string,
      rank: string,
      region: string,
      category: string,
      usernames?: Array< string | null > | null,
      patch?: string | null,
      set?: number | null,
      datetimePlayed?: number | null,
      rankGuesses?: Array< number | null > | null,
      placementGuesses?: Array< Array< number | null > | null > | null,
      perfects?: number | null,
      scores?: Array< number | null > | null,
      loggedRankGuesses?: Array< number | null > | null,
      loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
      loggedPerfects?: number | null,
      loggedScores?: Array< number | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    guesses?:  {
      __typename: "ModelGuessConnection",
      items:  Array< {
        __typename: "Guess",
        id: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        ranks: Array< string >,
        userGuessesId: string,
        createdAt: string,
        region?: string | null,
        regions?: Array< string | null > | null,
        matchId?: string | null,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    score: number,
    maxScore: number,
    correctPlacements: number,
    correctRanks: number,
    totalRanks: number,
    unfinished: number,
    totalGuesses: number,
    averageCorrectPlacements: number,
    averageScore: number,
    scores?: Array< number | null > | null,
    rankGuesses?: Array< Array< number | null > | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    correctPlacementGuesses?: Array< number | null > | null,
    dailyGuesses?:  {
      __typename: "ModelDailyGuessConnection",
      items:  Array< {
        __typename: "DailyGuess",
        date: string,
        category: string,
        placements: Array< string >,
        guessedRank: string,
        rank: string,
        userGuessesId: string,
        createdAt: string,
        updatedAt: string,
        userDailyGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    dailyTotalGuesses?: number | null,
    dailyScore?: number | null,
    dailyMaxScore?: number | null,
    dailyCorrectPlacements?: number | null,
    dailyCorrectRanks?: number | null,
    dailyScoresLow?: Array< number | null > | null,
    dailyRankGuessesLow?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesLow?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesLow?: Array< number | null > | null,
    dailyScoresHigh?: Array< number | null > | null,
    dailyRankGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesHigh?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesHigh?: Array< number | null > | null,
    dailyScoresAll?: Array< number | null > | null,
    dailyRankGuessesAll?: Array< Array< number | null > | null > | null,
    dailyPlacementGuessesAll?: Array< Array< number | null > | null > | null,
    dailyCorrectPlacementGuessesAll?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGuessSubscriptionVariables = {
  filter?: ModelSubscriptionGuessFilterInput | null,
};

export type OnCreateGuessSubscription = {
  onCreateGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateGuessSubscriptionVariables = {
  filter?: ModelSubscriptionGuessFilterInput | null,
};

export type OnUpdateGuessSubscription = {
  onUpdateGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteGuessSubscriptionVariables = {
  filter?: ModelSubscriptionGuessFilterInput | null,
};

export type OnDeleteGuessSubscription = {
  onDeleteGuess?:  {
    __typename: "Guess",
    id: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    ranks: Array< string >,
    userGuessesId: string,
    createdAt: string,
    region?: string | null,
    regions?: Array< string | null > | null,
    matchId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateDailyGuessSubscriptionVariables = {
  filter?: ModelSubscriptionDailyGuessFilterInput | null,
};

export type OnCreateDailyGuessSubscription = {
  onCreateDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type OnUpdateDailyGuessSubscriptionVariables = {
  filter?: ModelSubscriptionDailyGuessFilterInput | null,
};

export type OnUpdateDailyGuessSubscription = {
  onUpdateDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type OnDeleteDailyGuessSubscriptionVariables = {
  filter?: ModelSubscriptionDailyGuessFilterInput | null,
};

export type OnDeleteDailyGuessSubscription = {
  onDeleteDailyGuess?:  {
    __typename: "DailyGuess",
    date: string,
    category: string,
    placements: Array< string >,
    guessedRank: string,
    rank: string,
    userGuessesId: string,
    createdAt: string,
    updatedAt: string,
    userDailyGuessesId?: string | null,
  } | null,
};

export type OnCreateLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnCreateLeaderboardSubscription = {
  onCreateLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnUpdateLeaderboardSubscription = {
  onUpdateLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnDeleteLeaderboardSubscription = {
  onDeleteLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?: Array< string | null > | null,
    byCorrectRanks?: Array< string | null > | null,
    byScore?: Array< string | null > | null,
    byAverageCorrectPlacements?: Array< string | null > | null,
    byAverageScore?: Array< string | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateDailySubscriptionVariables = {
  filter?: ModelSubscriptionDailyFilterInput | null,
};

export type OnCreateDailySubscription = {
  onCreateDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDailySubscriptionVariables = {
  filter?: ModelSubscriptionDailyFilterInput | null,
};

export type OnUpdateDailySubscription = {
  onUpdateDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDailySubscriptionVariables = {
  filter?: ModelSubscriptionDailyFilterInput | null,
};

export type OnDeleteDailySubscription = {
  onDeleteDaily?:  {
    __typename: "Daily",
    date: string,
    matchId: string,
    rank: string,
    region: string,
    category: string,
    usernames?: Array< string | null > | null,
    patch?: string | null,
    set?: number | null,
    datetimePlayed?: number | null,
    rankGuesses?: Array< number | null > | null,
    placementGuesses?: Array< Array< number | null > | null > | null,
    perfects?: number | null,
    scores?: Array< number | null > | null,
    loggedRankGuesses?: Array< number | null > | null,
    loggedPlacementGuesses?: Array< Array< number | null > | null > | null,
    loggedPerfects?: number | null,
    loggedScores?: Array< number | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
