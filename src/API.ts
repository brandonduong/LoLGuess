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
  updatedAt: string,
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
};

export type ModelGuessConditionInput = {
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  userGuessesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
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
};

export type DeleteGuessInput = {
  id: string,
};

export type CreateLeaderboardInput = {
  date: string,
};

export type ModelLeaderboardConditionInput = {
  and?: Array< ModelLeaderboardConditionInput | null > | null,
  or?: Array< ModelLeaderboardConditionInput | null > | null,
  not?: ModelLeaderboardConditionInput | null,
};

export type Leaderboard = {
  __typename: "Leaderboard",
  byCorrectPlacements?:  Array<User | null > | null,
  byCorrectRanks?:  Array<User | null > | null,
  byScore?:  Array<User | null > | null,
  byAverageCorrectPlacements?:  Array<User | null > | null,
  byAverageScore?:  Array<User | null > | null,
  date: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLeaderboardInput = {
  date: string,
};

export type DeleteLeaderboardInput = {
  date: string,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  username?: SearchableStringFilterInput | null,
  score?: SearchableFloatFilterInput | null,
  maxScore?: SearchableFloatFilterInput | null,
  correctPlacements?: SearchableIntFilterInput | null,
  correctRanks?: SearchableIntFilterInput | null,
  totalRanks?: SearchableIntFilterInput | null,
  unfinished?: SearchableIntFilterInput | null,
  totalGuesses?: SearchableIntFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableFloatFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  username = "username",
  score = "score",
  maxScore = "maxScore",
  correctPlacements = "correctPlacements",
  correctRanks = "correctRanks",
  totalRanks = "totalRanks",
  unfinished = "unfinished",
  totalGuesses = "totalGuesses",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableUserAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUserAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableUserAggregateField {
  id = "id",
  username = "username",
  score = "score",
  maxScore = "maxScore",
  correctPlacements = "correctPlacements",
  correctRanks = "correctRanks",
  totalRanks = "totalRanks",
  unfinished = "unfinished",
  totalGuesses = "totalGuesses",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
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
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelGuessFilterInput = {
  id?: ModelIDInput | null,
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  userGuessesId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelGuessFilterInput | null > | null,
  or?: Array< ModelGuessFilterInput | null > | null,
  not?: ModelGuessFilterInput | null,
};

export type ModelLeaderboardFilterInput = {
  date?: ModelStringInput | null,
  and?: Array< ModelLeaderboardFilterInput | null > | null,
  or?: Array< ModelLeaderboardFilterInput | null > | null,
  not?: ModelLeaderboardFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelLeaderboardConnection = {
  __typename: "ModelLeaderboardConnection",
  items:  Array<Leaderboard | null >,
  nextToken?: string | null,
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
  and?: Array< ModelSubscriptionGuessFilterInput | null > | null,
  or?: Array< ModelSubscriptionGuessFilterInput | null > | null,
};

export type ModelSubscriptionLeaderboardFilterInput = {
  date?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
  or?: Array< ModelSubscriptionLeaderboardFilterInput | null > | null,
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
    updatedAt: string,
  } | null,
};

export type CreateLeaderboardMutationVariables = {
  input: CreateLeaderboardInput,
  condition?: ModelLeaderboardConditionInput | null,
};

export type CreateLeaderboardMutation = {
  createLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: Array< SearchableUserSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUserAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
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
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
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
      updatedAt: string,
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
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
      byCorrectPlacements?:  Array< {
        __typename: "User",
        id: string,
        username: string,
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
        totalGuesses: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      byCorrectRanks?:  Array< {
        __typename: "User",
        id: string,
        username: string,
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
        totalGuesses: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      byScore?:  Array< {
        __typename: "User",
        id: string,
        username: string,
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
        totalGuesses: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      byAverageCorrectPlacements?:  Array< {
        __typename: "User",
        id: string,
        username: string,
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
        totalGuesses: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      byAverageScore?:  Array< {
        __typename: "User",
        id: string,
        username: string,
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
        totalGuesses: number,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      date: string,
      createdAt: string,
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
    updatedAt: string,
  } | null,
};

export type OnCreateLeaderboardSubscriptionVariables = {
  filter?: ModelSubscriptionLeaderboardFilterInput | null,
};

export type OnCreateLeaderboardSubscription = {
  onCreateLeaderboard?:  {
    __typename: "Leaderboard",
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
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
    byCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byCorrectRanks?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageCorrectPlacements?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    byAverageScore?:  Array< {
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
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
