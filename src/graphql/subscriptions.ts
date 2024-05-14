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
          mode
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
      dailyTotalGuesses
      dailyScore
      dailyMaxScore
      dailyCorrectPlacements
      dailyCorrectRanks
      dailyScores
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
          mode
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
      dailyTotalGuesses
      dailyScore
      dailyMaxScore
      dailyCorrectPlacements
      dailyCorrectRanks
      dailyScores
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
          mode
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
      dailyTotalGuesses
      dailyScore
      dailyMaxScore
      dailyCorrectPlacements
      dailyCorrectRanks
      dailyScores
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
      mode
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
      mode
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
      mode
      updatedAt
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
      score
      scores
      loggedRankGuesses
      loggedPlacementGuesses
      loggedPerfects
      loggedScore
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
      score
      scores
      loggedRankGuesses
      loggedPlacementGuesses
      loggedPerfects
      loggedScore
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
      score
      scores
      loggedRankGuesses
      loggedPlacementGuesses
      loggedPerfects
      loggedScore
      loggedScores
      createdAt
      updatedAt
    }
  }
`;
