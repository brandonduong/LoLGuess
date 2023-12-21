/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createGuess = /* GraphQL */ `
  mutation CreateGuess(
    $input: CreateGuessInput!
    $condition: ModelGuessConditionInput
  ) {
    createGuess(input: $input, condition: $condition) {
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
export const updateGuess = /* GraphQL */ `
  mutation UpdateGuess(
    $input: UpdateGuessInput!
    $condition: ModelGuessConditionInput
  ) {
    updateGuess(input: $input, condition: $condition) {
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
export const deleteGuess = /* GraphQL */ `
  mutation DeleteGuess(
    $input: DeleteGuessInput!
    $condition: ModelGuessConditionInput
  ) {
    deleteGuess(input: $input, condition: $condition) {
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
export const createLeaderboard = /* GraphQL */ `
  mutation CreateLeaderboard(
    $input: CreateLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    createLeaderboard(input: $input, condition: $condition) {
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
export const updateLeaderboard = /* GraphQL */ `
  mutation UpdateLeaderboard(
    $input: UpdateLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    updateLeaderboard(input: $input, condition: $condition) {
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
export const deleteLeaderboard = /* GraphQL */ `
  mutation DeleteLeaderboard(
    $input: DeleteLeaderboardInput!
    $condition: ModelLeaderboardConditionInput
  ) {
    deleteLeaderboard(input: $input, condition: $condition) {
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
export const createDaily = /* GraphQL */ `
  mutation CreateDaily(
    $input: CreateDailyInput!
    $condition: ModelDailyConditionInput
  ) {
    createDaily(input: $input, condition: $condition) {
      date
      matchId
      rank
      region
      category
      rankGuesses
      placementGuesses
      perfects
      score
      usernames
      patch
      createdAt
      updatedAt
    }
  }
`;
export const updateDaily = /* GraphQL */ `
  mutation UpdateDaily(
    $input: UpdateDailyInput!
    $condition: ModelDailyConditionInput
  ) {
    updateDaily(input: $input, condition: $condition) {
      date
      matchId
      rank
      region
      category
      rankGuesses
      placementGuesses
      perfects
      score
      usernames
      patch
      createdAt
      updatedAt
    }
  }
`;
export const deleteDaily = /* GraphQL */ `
  mutation DeleteDaily(
    $input: DeleteDailyInput!
    $condition: ModelDailyConditionInput
  ) {
    deleteDaily(input: $input, condition: $condition) {
      date
      matchId
      rank
      region
      category
      rankGuesses
      placementGuesses
      perfects
      score
      usernames
      patch
      createdAt
      updatedAt
    }
  }
`;
