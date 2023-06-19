/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      stats {
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        guesses {
          nextToken
        }
        stats {
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: [SearchableUserSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        username
        guesses {
          nextToken
        }
        stats {
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
        }
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getGuess = /* GraphQL */ `
  query GetGuess($id: ID!) {
    getGuess(id: $id) {
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
export const listGuesses = /* GraphQL */ `
  query ListGuesses(
    $filter: ModelGuessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGuesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const searchGuesses = /* GraphQL */ `
  query SearchGuesses(
    $filter: SearchableGuessFilterInput
    $sort: [SearchableGuessSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableGuessAggregationInput]
  ) {
    searchGuesses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
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
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
