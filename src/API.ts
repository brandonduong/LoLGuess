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

export type CreateUserInput = {
  id?: string | null,
  unfinished: number,
};

export type ModelUserConditionInput = {
  unfinished?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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
  guesses?: ModelGuessConnection | null,
  unfinished: number,
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
  createdAt: string,
  updatedAt: string,
  userGuessesId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  unfinished?: number | null,
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
  unfinished?: ModelIntInput | null,
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
  and?: Array< ModelGuessFilterInput | null > | null,
  or?: Array< ModelGuessFilterInput | null > | null,
  not?: ModelGuessFilterInput | null,
  userGuessesId?: ModelIDInput | null,
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
  unfinished?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
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

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
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
    unfinished: number,
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
    unfinished: number,
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
    unfinished: number,
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
    unfinished: number,
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
      guesses?:  {
        __typename: "ModelGuessConnection",
        nextToken?: string | null,
      } | null,
      unfinished: number,
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
    unfinished: number,
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
    unfinished: number,
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
    unfinished: number,
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