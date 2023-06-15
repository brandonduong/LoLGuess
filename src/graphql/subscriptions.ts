/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      username
      guesses {
        items {
          id
          placements
          guessedRank
          rank
          ranks
          createdAt
          updatedAt
          userGuessesId
        }
        nextToken
      }
      unfinished
      stats {
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      username
      guesses {
        items {
          id
          placements
          guessedRank
          rank
          ranks
          createdAt
          updatedAt
          userGuessesId
        }
        nextToken
      }
      unfinished
      stats {
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      username
      guesses {
        items {
          id
          placements
          guessedRank
          rank
          ranks
          createdAt
          updatedAt
          userGuessesId
        }
        nextToken
      }
      unfinished
      stats {
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGuess = /* GraphQL */ `
  subscription OnCreateGuess($filter: ModelSubscriptionGuessFilterInput) {
    onCreateGuess(filter: $filter) {
      id
      placements
      guessedRank
      rank
      ranks
      createdAt
      updatedAt
      userGuessesId
    }
  }
`;
export const onUpdateGuess = /* GraphQL */ `
  subscription OnUpdateGuess($filter: ModelSubscriptionGuessFilterInput) {
    onUpdateGuess(filter: $filter) {
      id
      placements
      guessedRank
      rank
      ranks
      createdAt
      updatedAt
      userGuessesId
    }
  }
`;
export const onDeleteGuess = /* GraphQL */ `
  subscription OnDeleteGuess($filter: ModelSubscriptionGuessFilterInput) {
    onDeleteGuess(filter: $filter) {
      id
      placements
      guessedRank
      rank
      ranks
      createdAt
      updatedAt
      userGuessesId
    }
  }
`;
