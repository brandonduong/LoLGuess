/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
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
          userGuessesId
          createdAt
          updatedAt
        }
        nextToken
      }
      score
      maxScore
      correctPlacements
      correctRanks
      totalRanks
      unfinished
      totalGuesses
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
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      nextToken
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
      userGuessesId
      createdAt
      updatedAt
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
        userGuessesId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard($date: String!) {
    getLeaderboard(date: $date) {
      byCorrectPlacements {
        id
        username
        guesses {
          nextToken
        }
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      byCorrectRanks {
        id
        username
        guesses {
          nextToken
        }
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      byScore {
        id
        username
        guesses {
          nextToken
        }
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      byAverageCorrectPlacements {
        id
        username
        guesses {
          nextToken
        }
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      byAverageScore {
        id
        username
        guesses {
          nextToken
        }
        score
        maxScore
        correctPlacements
        correctRanks
        totalRanks
        unfinished
        totalGuesses
        createdAt
        updatedAt
      }
      date
      createdAt
      updatedAt
    }
  }
`;
export const listLeaderboards = /* GraphQL */ `
  query ListLeaderboards(
    $date: String
    $filter: ModelLeaderboardFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLeaderboards(
      date: $date
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        byCorrectPlacements {
          id
          username
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          createdAt
          updatedAt
        }
        byCorrectRanks {
          id
          username
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          createdAt
          updatedAt
        }
        byScore {
          id
          username
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          createdAt
          updatedAt
        }
        byAverageCorrectPlacements {
          id
          username
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          createdAt
          updatedAt
        }
        byAverageScore {
          id
          username
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          createdAt
          updatedAt
        }
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const guessesByDate = /* GraphQL */ `
  query GuessesByDate(
    $userGuessesId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGuessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    guessesByDate(
      userGuessesId: $userGuessesId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        placements
        guessedRank
        rank
        ranks
        userGuessesId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
