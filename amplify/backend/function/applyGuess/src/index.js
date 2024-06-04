/* Amplify Params - DO NOT EDIT
	API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIIDOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import crypto from "@aws-crypto/sha256-js";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { default as node_fetch, Request } from "node-fetch";
import CryptoJS from "crypto-js";

const GRAPHQL_ENDPOINT =
  process.env.API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";
const { Sha256 } = crypto;

const endpoint = new URL(GRAPHQL_ENDPOINT);

const signer = new SignatureV4({
  credentials: defaultProvider(),
  region: AWS_REGION,
  service: "appsync",
  sha256: Sha256,
});

async function signAndRun(query, variables) {
  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
    },
    hostname: endpoint.host,
    body: JSON.stringify({ query, variables }),
    path: endpoint.pathname,
  });

  const signed = await signer.sign(requestToBeSigned);
  const request = new Request(endpoint, signed);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await node_fetch(request);
    body = await response.json();
    console.log(body);
    if (body.errors) statusCode = 400;
  } catch (error) {
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }
  return { statusCode, body };
}

async function guessesByDate(sub) {
  const query = /* GraphQL */ `
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
          placements
          guessedRank
          rank
          ranks
        }
        nextToken
      }
    }
  `;

  let guesses = [];
  var nextToken = "";
  const variables = {
    userGuessesId: sub,
    sortDirection: "DESC",
    limit: 200,
  };

  while (nextToken !== null) {
    const res = await signAndRun(query, variables);
    if (res.statusCode === 200) {
      guesses = guesses.concat(res.body.data.guessesByDate.items);
      nextToken = res.body.data.guessesByDate.nextToken;
      variables.nextToken = nextToken;
    } else {
      console.log(res.body.errors);
    }
  }
  return guesses;
}

async function getUser(sub) {
  const query = /* GraphQL */ `
    query GET_USER($id: ID!) {
      getUser(id: $id) {
        id
        correctPlacements
        correctRanks
        maxScore
        score
        totalRanks
        unfinished
        totalGuesses
        scores
        rankGuesses
        placementGuesses
        correctPlacementGuesses
      }
    }
  `;

  const variables = {
    id: sub,
  };

  const res = await signAndRun(query, variables);
  if (res.statusCode === 200) {
    return res.body.data.getUser;
  } else {
    console.log(res.body.errors);
  }
}

async function createGuess(
  user,
  unencrypted,
  rank,
  ranks,
  selectedRank,
  region,
  regions,
  matchId
) {
  const query = /* GraphQL */ `
    mutation CREATE_GUESS($input: CreateGuessInput!) {
      createGuess(input: $input) {
        id
        placements
        guessedRank
        rank
        ranks
        userGuessesId
        region
        regions
        matchId
      }
    }
  `;
  const variables = {
    input: {
      placements: unencrypted,
      guessedRank: selectedRank,
      rank,
      ranks,
      userGuessesId: user.id,
      region,
      regions,
      matchId,
    },
  };

  const res = await signAndRun(query, variables);
  if (res.statusCode === 200) {
    return res.body.data.createGuess.id;
  } else {
    console.log(res.body.errors);
  }
}

async function updateUserStats(user, stats) {
  const query = /* GraphQL */ `
    mutation UPDATE_USER($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        correctPlacements
        correctRanks
        maxScore
        score
        totalRanks
        unfinished
        totalGuesses
        averageCorrectPlacements
        averageScore
        scores
        rankGuesses
        placementGuesses
        correctPlacementGuesses
      }
    }
  `;

  const variables = {
    input: {
      id: user.id,
      correctPlacements: stats.correctPlacements,
      correctRanks: stats.correctRanks,
      maxScore: stats.maxScore,
      score: stats.score,
      totalRanks: stats.totalRanks,
      unfinished: stats.unfinished,
      totalGuesses: stats.totalGuesses,
      averageCorrectPlacements: stats.correctPlacements / stats.totalGuesses,
      averageScore: stats.score / stats.totalGuesses,
      scores: stats.scores,
      rankGuesses: stats.rankGuesses,
      placementGuesses: stats.placementGuesses,
      correctPlacementGuesses: stats.correctPlacementGuesses,
    },
  };

  const res = await signAndRun(query, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
  } else {
    console.log(res.body.errors);
  }
}

function calculateScore(placements, guessedRank, rank, ranks) {
  // Returns scored points and max score
  const MAX_POINTS = [8, 6, 3]; // For each correct placement (depending on how far guess was)
  const MAX_RANK_POOL = 10; // 10 ranks in total
  const MAX_RANK_POINTS = [36, 27, 13.5]; // If rank pool had all 10 ranks
  var score = 0;

  // Score for placement guesses
  for (let i = 0; i < placements.length; i++) {
    const distance = Math.abs(parseInt(placements[i]) - (i + 1));
    if (distance <= 2) {
      score += MAX_POINTS[distance];
    }
  }

  // Score for rank guess
  const selectedRankInd = ranks.indexOf(guessedRank);
  const verifiedRankInd = ranks.indexOf(rank);
  const currentMax = MAX_RANK_POINTS.map((x) => {
    if (ranks.length >= 4) {
      return Math.round(x * (ranks.length / MAX_RANK_POOL) * 100) / 100;
    } else {
      return 0;
    }
  }); // Depends on # of ranks in pool
  const distanceRank = Math.abs(selectedRankInd - verifiedRankInd);
  if (distanceRank <= 2 && ranks.length >= 4) {
    score += currentMax[distanceRank];
  }

  return [roundToTwo(score), MAX_POINTS[0] * 8 + currentMax[0]];
}

function roundToTwo(round) {
  return Math.round(round * 100) / 100;
}

function calculateCorrectPlacements(placements) {
  var correct = 0;
  for (let i = 0; i < placements.length; i++) {
    if (parseInt(placements[i]) === i + 1) {
      correct += 1;
    }
  }
  return correct;
}

async function calculateStats(stats, placements, guessedRank, rank, ranks) {
  const copy = stats; // copy of user
  console.log(copy);
  const [score, maxScore] = calculateScore(
    placements,
    guessedRank,
    rank,
    ranks
  );
  const RANKS = [
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Emerald",
    "Diamond",
    "Master",
    "Grandmaster",
    "Challenger",
  ];
  // Initialize scores, rankGuesses, placementGuesses, correctPlacementGuesses
  if (
    !copy.rankGuesses ||
    !copy.rankGuesses[0].length ||
    (copy.scores && copy.scores.length < 101) ||
    !copy.correctPlacementGuesses ||
    (copy.correctPlacementGuesses && copy.correctPlacementGuesses.length < 18)
  ) {
    const guesses = await guessesByDate(stats.id);
    copy.scores = new Array(101).fill(0);
    copy.rankGuesses = new Array(10).fill(0).map((x) => new Array(10).fill(0));
    copy.placementGuesses = new Array(8)
      .fill(0)
      .map((x) => new Array(8).fill(0));
    copy.correctPlacementGuesses = new Array(18).fill(0);

    for (const guess of guesses) {
      // initialize scores
      copy.scores[
        Math.round(
          calculateScore(
            guess.placements,
            guess.guessedRank,
            guess.rank,
            guess.ranks
          )[0]
        )
      ] += 1;

      // initialize rankGuesses
      copy.rankGuesses[RANKS.indexOf(guess.rank)][
        RANKS.indexOf(guess.guessedRank)
      ] += 1;

      // initialize placementGuesses
      let correctPlacementsCount = 0;
      for (let i = 0; i < guess.placements.length; i++) {
        copy.placementGuesses[guess.placements[i] - 1][i] += 1;

        if (parseInt(guess.placements[i]) === i + 1) {
          correctPlacementsCount += 1;
        }
      }

      // Initialize correctPlacementGuesses
      if (guess.rank === guess.guessedRank) {
        copy.correctPlacementGuesses[correctPlacementsCount + 9] += 1;
      } else {
        copy.correctPlacementGuesses[correctPlacementsCount] += 1;
      }
    }
  } else {
    copy.scores[Math.round(score)] += 1;
    copy.rankGuesses[RANKS.indexOf(rank)][RANKS.indexOf(guessedRank)] += 1;
    let correctPlacementsCount = 0;
    for (let i = 0; i < placements.length; i++) {
      copy.placementGuesses[placements[i] - 1][i] += 1;
      if (parseInt(placements[i]) === i + 1) {
        correctPlacementsCount += 1;
      }
    }

    // Increment correctPlacementGuesses
    if (guess.rank === guess.guessedRank) {
      copy.correctPlacementGuesses[correctPlacementsCount + 9] += 1;
    } else {
      copy.correctPlacementGuesses[correctPlacementsCount] += 1;
    }
  }
  copy.unfinished = copy.unfinished - 1;
  copy.score = copy.score + score;
  copy.maxScore = copy.maxScore + maxScore;
  copy.totalRanks = copy.totalRanks + ranks.length;
  copy.correctRanks = copy.correctRanks + (rank === guessedRank ? 1 : 0);
  copy.totalGuesses = copy.totalGuesses + 1;

  const correctPlacements = calculateCorrectPlacements(placements);
  copy.correctPlacements = copy.correctPlacements + correctPlacements;
  console.log(copy);
  return copy;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const RIOT_TOKEN = process.env.RIOT_TOKEN;
  const guess = event.guess;
  console.log("guess", guess);
  const unencrypted = [];
  guess.forEach((g) => {
    unencrypted.push(
      CryptoJS.AES.decrypt(g, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
    );
  });
  console.log("unecrypted", unencrypted);
  const sensitive = event.sensitive;
  const rawSensitive = JSON.parse(
    CryptoJS.AES.decrypt(sensitive, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
  );
  console.log(rawSensitive);
  const selectedRank = event.selectedRank;

  // Decrement Unfinished Games for User
  const user = await getUser(event.userSub);

  const rank = rawSensitive.rank;
  const ranks = rawSensitive.ranks;
  const unfinished = rawSensitive.unfinished;
  const totalGuesses = rawSensitive.totalGuesses;
  const region = rawSensitive.region;
  const regions = rawSensitive.regions;
  const matchId = rawSensitive.matchId;

  // Check that user did not cheat
  console.log(user.unfinished, unfinished, user.totalGuesses, totalGuesses);
  if (user.unfinished === unfinished && user.totalGuesses === totalGuesses) {
    await createGuess(
      user,
      unencrypted,
      rank,
      ranks,
      selectedRank,
      region,
      regions,
      matchId
    );
    const stats = await calculateStats(
      user,
      unencrypted,
      selectedRank,
      rank,
      ranks
    );
    await updateUserStats(user, stats);
  }

  return {
    body: JSON.stringify(event),
  };
};
