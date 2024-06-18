/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const batchFetchUser = /* GraphQL */ `
  query BatchFetchUser($ids: [ID]) {
    batchFetchUser(ids: $ids) {
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
          region
          regions
          matchId
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
      averageCorrectPlacements
      averageScore
      scores
      rankGuesses
      placementGuesses
      correctPlacementGuesses
      dailyTotalGuesses
      dailyScore
      dailyMaxScore
      dailyCorrectPlacements
      dailyCorrectRanks
      dailyScoresLow
      dailyRankGuessesLow
      dailyPlacementGuessesLow
      dailyCorrectPlacementGuessesLow
      dailyScoresHigh
      dailyRankGuessesHigh
      dailyPlacementGuessesHigh
      dailyCorrectPlacementGuessesHigh
      dailyScoresAll
      dailyRankGuessesAll
      dailyPlacementGuessesAll
      dailyCorrectPlacementGuessesAll
      createdAt
      updatedAt
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
          region
          regions
          matchId
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
      averageCorrectPlacements
      averageScore
      scores
      rankGuesses
      placementGuesses
      correctPlacementGuesses
      dailyTotalGuesses
      dailyScore
      dailyMaxScore
      dailyCorrectPlacements
      dailyCorrectRanks
      dailyScoresLow
      dailyRankGuessesLow
      dailyPlacementGuessesLow
      dailyCorrectPlacementGuessesLow
      dailyScoresHigh
      dailyRankGuessesHigh
      dailyPlacementGuessesHigh
      dailyCorrectPlacementGuessesHigh
      dailyScoresAll
      dailyRankGuessesAll
      dailyPlacementGuessesAll
      dailyCorrectPlacementGuessesAll
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
        averageCorrectPlacements
        averageScore
        scores
        rankGuesses
        placementGuesses
        correctPlacementGuesses
        dailyTotalGuesses
        dailyScore
        dailyMaxScore
        dailyCorrectPlacements
        dailyCorrectRanks
        dailyScoresLow
        dailyRankGuessesLow
        dailyPlacementGuessesLow
        dailyCorrectPlacementGuessesLow
        dailyScoresHigh
        dailyRankGuessesHigh
        dailyPlacementGuessesHigh
        dailyCorrectPlacementGuessesHigh
        dailyScoresAll
        dailyRankGuessesAll
        dailyPlacementGuessesAll
        dailyCorrectPlacementGuessesAll
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const usersByUsername = /* GraphQL */ `
  query UsersByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
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
        averageCorrectPlacements
        averageScore
        scores
        rankGuesses
        placementGuesses
        correctPlacementGuesses
        dailyTotalGuesses
        dailyScore
        dailyMaxScore
        dailyCorrectPlacements
        dailyCorrectRanks
        dailyScoresLow
        dailyRankGuessesLow
        dailyPlacementGuessesLow
        dailyCorrectPlacementGuessesLow
        dailyScoresHigh
        dailyRankGuessesHigh
        dailyPlacementGuessesHigh
        dailyCorrectPlacementGuessesHigh
        dailyScoresAll
        dailyRankGuessesAll
        dailyPlacementGuessesAll
        dailyCorrectPlacementGuessesAll
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
      region
      regions
      matchId
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
        region
        regions
        matchId
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
        region
        regions
        matchId
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDailyGuess = /* GraphQL */ `
  query GetDailyGuess($date: ID!, $category: String!) {
    getDailyGuess(date: $date, category: $category) {
      date
      category
      placements
      guessedRank
      rank
      userGuessesId
      createdAt
      updatedAt
    }
  }
`;
export const listDailyGuesses = /* GraphQL */ `
  query ListDailyGuesses(
    $date: ID
    $category: ModelStringKeyConditionInput
    $filter: ModelDailyGuessFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDailyGuesses(
      date: $date
      category: $category
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        date
        category
        placements
        guessedRank
        rank
        userGuessesId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const dailyGuessesByDate = /* GraphQL */ `
  query DailyGuessesByDate(
    $userGuessesId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelDailyGuessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    dailyGuessesByDate(
      userGuessesId: $userGuessesId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        date
        category
        placements
        guessedRank
        rank
        userGuessesId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard($date: ID!) {
    getLeaderboard(date: $date) {
      byCorrectPlacements
      byCorrectRanks
      byScore
      byAverageCorrectPlacements
      byAverageScore
      date
      createdAt
      updatedAt
    }
  }
`;
export const listLeaderboards = /* GraphQL */ `
  query ListLeaderboards(
    $date: ID
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
        byCorrectPlacements
        byCorrectRanks
        byScore
        byAverageCorrectPlacements
        byAverageScore
        date
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDaily = /* GraphQL */ `
  query GetDaily($date: ID!, $category: String!) {
    getDaily(date: $date, category: $category) {
      date
      matchId
      rank
      region
      category
      usernames
      patch
      set
      datetimePlayed
      rankGuesses
      placementGuesses
      perfects
      scores
      loggedRankGuesses
      loggedPlacementGuesses
      loggedPerfects
      loggedScores
      createdAt
      updatedAt
    }
  }
`;
export const listDailies = /* GraphQL */ `
  query ListDailies(
    $date: ID
    $category: ModelStringKeyConditionInput
    $filter: ModelDailyFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDailies(
      date: $date
      category: $category
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        date
        matchId
        rank
        region
        category
        usernames
        patch
        set
        datetimePlayed
        rankGuesses
        placementGuesses
        perfects
        scores
        loggedRankGuesses
        loggedPlacementGuesses
        loggedPerfects
        loggedScores
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
