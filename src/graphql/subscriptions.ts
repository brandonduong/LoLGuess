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
      updatedAt
    }
  }
`;
export const onCreateLeaderboard = /* GraphQL */ `
  subscription OnCreateLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onCreateLeaderboard(filter: $filter) {
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
export const onUpdateLeaderboard = /* GraphQL */ `
  subscription OnUpdateLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onUpdateLeaderboard(filter: $filter) {
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
export const onDeleteLeaderboard = /* GraphQL */ `
  subscription OnDeleteLeaderboard(
    $filter: ModelSubscriptionLeaderboardFilterInput
  ) {
    onDeleteLeaderboard(filter: $filter) {
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
