/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      dailyGuesses {
        items {
          date
          category
          placements
          guessedRank
          rank
          userGuessesId
          createdAt
          updatedAt
          userDailyGuessesId
        }
        nextToken
      }
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
      dailyGuesses {
        items {
          date
          category
          placements
          guessedRank
          rank
          userGuessesId
          createdAt
          updatedAt
          userDailyGuessesId
        }
        nextToken
      }
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
      dailyGuesses {
        items {
          date
          category
          placements
          guessedRank
          rank
          userGuessesId
          createdAt
          updatedAt
          userDailyGuessesId
        }
        nextToken
      }
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
export const onCreateGuess = /* GraphQL */ `
  subscription OnCreateGuess($filter: ModelSubscriptionGuessFilterInput) {
    onCreateGuess(filter: $filter) {
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
export const onUpdateGuess = /* GraphQL */ `
  subscription OnUpdateGuess($filter: ModelSubscriptionGuessFilterInput) {
    onUpdateGuess(filter: $filter) {
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
export const onDeleteGuess = /* GraphQL */ `
  subscription OnDeleteGuess($filter: ModelSubscriptionGuessFilterInput) {
    onDeleteGuess(filter: $filter) {
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
export const onCreateDailyGuess = /* GraphQL */ `
  subscription OnCreateDailyGuess(
    $filter: ModelSubscriptionDailyGuessFilterInput
  ) {
    onCreateDailyGuess(filter: $filter) {
      date
      category
      placements
      guessedRank
      rank
      userGuessesId
      createdAt
      updatedAt
      userDailyGuessesId
    }
  }
`;
export const onUpdateDailyGuess = /* GraphQL */ `
  subscription OnUpdateDailyGuess(
    $filter: ModelSubscriptionDailyGuessFilterInput
  ) {
    onUpdateDailyGuess(filter: $filter) {
      date
      category
      placements
      guessedRank
      rank
      userGuessesId
      createdAt
      updatedAt
      userDailyGuessesId
    }
  }
`;
export const onDeleteDailyGuess = /* GraphQL */ `
  subscription OnDeleteDailyGuess(
    $filter: ModelSubscriptionDailyGuessFilterInput
  ) {
    onDeleteDailyGuess(filter: $filter) {
      date
      category
      placements
      guessedRank
      rank
      userGuessesId
      createdAt
      updatedAt
      userDailyGuessesId
    }
  }
`;
export const onCreateLeaderboard = /* GraphQL */ `
  subscription OnCreateLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onCreateLeaderboard(filter: $filter) {
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
export const onUpdateLeaderboard = /* GraphQL */ `
  subscription OnUpdateLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onUpdateLeaderboard(filter: $filter) {
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
export const onDeleteLeaderboard = /* GraphQL */ `
  subscription OnDeleteLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onDeleteLeaderboard(filter: $filter) {
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
export const onCreateDaily = /* GraphQL */ `
  subscription OnCreateDaily($filter: ModelSubscriptionDailyFilterInput) {
    onCreateDaily(filter: $filter) {
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
export const onUpdateDaily = /* GraphQL */ `
  subscription OnUpdateDaily($filter: ModelSubscriptionDailyFilterInput) {
    onUpdateDaily(filter: $filter) {
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
export const onDeleteDaily = /* GraphQL */ `
  subscription OnDeleteDaily($filter: ModelSubscriptionDailyFilterInput) {
    onDeleteDaily(filter: $filter) {
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
