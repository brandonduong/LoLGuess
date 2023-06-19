/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
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

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateGuessInput = {
  id?: string | null,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  ranks: Array< string >,
  userGuessesId?: string | null,
};

export type ModelGuessConditionInput = {
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  and?: Array< ModelGuessConditionInput | null > | null,
  or?: Array< ModelGuessConditionInput | null > | null,
  not?: ModelGuessConditionInput | null,
  userGuessesId?: ModelIDInput | null,
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

export type Guess = {
  __typename: "Guess",
  id: string,
  placements: Array< string >,
  guessedRank: string,
  rank: string,
  ranks: Array< string >,
  createdAt: string,
  updatedAt: string,
  userGuessesId?: string | null,
};

export type UpdateGuessInput = {
  id: string,
  placements?: Array< string > | null,
  guessedRank?: string | null,
  rank?: string | null,
  ranks?: Array< string > | null,
  userGuessesId?: string | null,
};

export type DeleteGuessInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  username: string,
  stats: StatsInput,
};

export type StatsInput = {
  score: number,
  maxScore: number,
  correctPlacements: number,
  correctRanks: number,
  totalRanks: number,
  unfinished: number,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  guesses?: ModelGuessConnection | null,
  stats: Stats,
  createdAt: string,
  updatedAt: string,
};

export type ModelGuessConnection = {
  __typename: "ModelGuessConnection",
  items:  Array<Guess | null >,
  nextToken?: string | null,
};

export type Stats = {
  __typename: "Stats",
  score: number,
  maxScore: number,
  correctPlacements: number,
  correctRanks: number,
  totalRanks: number,
  unfinished: number,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  stats?: StatsInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  username?: SearchableStringFilterInput | null,
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

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  username = "username",
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

export type ModelGuessFilterInput = {
  id?: ModelIDInput | null,
  placements?: ModelStringInput | null,
  guessedRank?: ModelStringInput | null,
  rank?: ModelStringInput | null,
  ranks?: ModelStringInput | null,
  and?: Array< ModelGuessFilterInput | null > | null,
  or?: Array< ModelGuessFilterInput | null > | null,
  not?: ModelGuessFilterInput | null,
  userGuessesId?: ModelIDInput | null,
};

export type SearchableGuessFilterInput = {
  id?: SearchableIDFilterInput | null,
  placements?: SearchableStringFilterInput | null,
  guessedRank?: SearchableStringFilterInput | null,
  rank?: SearchableStringFilterInput | null,
  ranks?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  userGuessesId?: SearchableIDFilterInput | null,
  and?: Array< SearchableGuessFilterInput | null > | null,
  or?: Array< SearchableGuessFilterInput | null > | null,
  not?: SearchableGuessFilterInput | null,
};

export type SearchableGuessSortInput = {
  field?: SearchableGuessSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableGuessSortableFields {
  id = "id",
  placements = "placements",
  guessedRank = "guessedRank",
  rank = "rank",
  ranks = "ranks",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userGuessesId = "userGuessesId",
}


export type SearchableGuessAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableGuessAggregateField,
};

export enum SearchableGuessAggregateField {
  id = "id",
  placements = "placements",
  guessedRank = "guessedRank",
  rank = "rank",
  ranks = "ranks",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userGuessesId = "userGuessesId",
}


export type SearchableGuessConnection = {
  __typename: "SearchableGuessConnection",
  items:  Array<Guess | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
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

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionGuessFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  placements?: ModelSubscriptionStringInput | null,
  guessedRank?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionStringInput | null,
  ranks?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGuessFilterInput | null > | null,
  or?: Array< ModelSubscriptionGuessFilterInput | null > | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
  } | null,
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
      stats:  {
        __typename: "Stats",
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
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
      stats:  {
        __typename: "Stats",
        score: number,
        maxScore: number,
        correctPlacements: number,
        correctRanks: number,
        totalRanks: number,
        unfinished: number,
      },
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
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
      createdAt: string,
      updatedAt: string,
      userGuessesId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SearchGuessesQueryVariables = {
  filter?: SearchableGuessFilterInput | null,
  sort?: Array< SearchableGuessSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableGuessAggregationInput | null > | null,
};

export type SearchGuessesQuery = {
  searchGuesses?:  {
    __typename: "SearchableGuessConnection",
    items:  Array< {
      __typename: "Guess",
      id: string,
      placements: Array< string >,
      guessedRank: string,
      rank: string,
      ranks: Array< string >,
      createdAt: string,
      updatedAt: string,
      userGuessesId?: string | null,
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

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
        createdAt: string,
        updatedAt: string,
        userGuessesId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    stats:  {
      __typename: "Stats",
      score: number,
      maxScore: number,
      correctPlacements: number,
      correctRanks: number,
      totalRanks: number,
      unfinished: number,
    },
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
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
    createdAt: string,
    updatedAt: string,
    userGuessesId?: string | null,
  } | null,
};
