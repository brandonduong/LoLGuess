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

async function getDaily(date, category) {
  // Today in UTC with no time
  const getDaily = /* GraphQL */ `
    query GetDaily($date: ID!, $category: String!) {
      getDaily(date: $date, category: $category) {
        rank
        loggedRankGuesses
        loggedPlacementGuesses
        loggedPerfects
        loggedScores
      }
    }
  `;
  const variables = {
    date,
    category,
  };

  const res = await signAndRun(getDaily, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
    return res.body.data.getDaily;
  } else {
    console.log(res.body.errors);
  }
}

async function updateDaily(date, category, stats) {
  // Today in UTC with no time
  const updateDaily = /* GraphQL */ `
    mutation UpdateDaily($input: UpdateDailyInput!) {
      updateDaily(input: $input) {
        date
        category
        loggedRankGuesses
        loggedPlacementGuesses
        loggedPerfects
        loggedScores
      }
    }
  `;
  const variables = {
    input: {
      date,
      category,
      loggedRankGuesses: stats.loggedRankGuesses,
      loggedPlacementGuesses: stats.loggedPlacementGuesses,
      loggedPerfects: stats.loggedPerfects,
      loggedScores: stats.loggedScores,
    },
  };

  const res = await signAndRun(updateDaily, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
  } else {
    console.log(res.body.errors);
  }
}

async function getUser(sub) {
  const query = /* GraphQL */ `
    query GET_USER($id: ID!) {
      getUser(id: $id) {
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

async function updateUserStats(userSub, stats) {
  const query = /* GraphQL */ `
    mutation UPDATE_USER($input: UpdateUserInput!) {
      updateUser(input: $input) {
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
      }
    }
  `;

  const variables = {
    input: {
      id: userSub,
      ...stats,
    },
  };

  const res = await signAndRun(query, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
  } else {
    console.log(res.body.errors);
  }
}

async function getUserDailyGuess(date, category) {
  const query = /* GraphQL */ `
    query GET_DAILYGUESS($date: ID!, $category: String!) {
      getDailyGuess(date: $date, category: $category) {
        date
        category
      }
    }
  `;

  const variables = {
    date,
    category,
  };

  const res = await signAndRun(query, variables);
  console.log(res);
  if (res.statusCode === 200) {
    return res.body.data.getDailyGuess;
  } else {
    console.log(res.body.errors);
  }
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const unencrypted = event.unencrypted;
  const selectedRank = event.selectedRank;
  const date = event.date;
  const category = event.category;

  // check if logged in user already made a guess before
  if (!(await getUserDailyGuess())) {
    const daily = await getDaily(date, category);
    const {
      loggedRankGuesses,
      loggedPlacementGuesses,
      loggedPerfects,
      loggedScores,
      rank,
    } = daily;

    const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
    const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
    const all = [...low, ...high];
    const ranks = category === "low" ? low : category === "high" ? high : all;

    const [score, maxScore] = calculateScore(
      unencrypted,
      selectedRank,
      rank,
      ranks
    );

    // Calculate updated stats
    loggedScores[Math.round(score)] += 1;
    loggedRankGuesses[ranks.indexOf(selectedRank)] += 1;
    for (let i = 0; i < unencrypted.length; i++) {
      loggedPlacementGuesses[unencrypted[i] - 1][i] += 1;
    }

    const stats = {
      loggedRankGuesses,
      loggedPlacementGuesses,
      loggedPerfects: score === maxScore ? loggedPerfects + 1 : loggedPerfects,
      loggedScores,
    };

    await updateDaily(date, category, stats);

    // Update user stats
    let user = await getUser(event.userSub);
    const capitalCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
    // initialize stats
    if (!user.dailyTotalGuesses) {
      user = {
        dailyTotalGuesses: 0,
        dailyScore: 0,
        dailyMaxScore: 0,
        dailyCorrectPlacements: 0,
        dailyCorrectRanks: 0,
        dailyScoresLow: new Array(83).fill(0),
        dailyRankGuessesLow: new Array(5)
          .fill(0)
          .map((x) => new Array(5).fill(0)),
        dailyPlacementGuessesLow: new Array(8)
          .fill(0)
          .map((x) => new Array(8).fill(0)),
        dailyCorrectPlacementGuessesLow: new Array(18).fill(0),
        dailyScoresHigh: new Array(83).fill(0),
        dailyRankGuessesHigh: new Array(5)
          .fill(0)
          .map((x) => new Array(5).fill(0)),
        dailyPlacementGuessesHigh: new Array(8)
          .fill(0)
          .map((x) => new Array(8).fill(0)),
        dailyCorrectPlacementGuessesHigh: new Array(18).fill(0),
        dailyScoresAll: new Array(101).fill(0),
        dailyRankGuessesAll: new Array(10)
          .fill(0)
          .map((x) => new Array(10).fill(0)),
        dailyPlacementGuessesAll: new Array(8)
          .fill(0)
          .map((x) => new Array(8).fill(0)),
        dailyCorrectPlacementGuessesAll: new Array(18).fill(0),
      };
    }
    const copy = {
      [`dailyScores${capitalCategory}`]: user[`dailyScores${capitalCategory}`],
      [`dailyRankGuesses${capitalCategory}`]:
        user[`dailyRankGuesses${capitalCategory}`],
      [`dailyPlacementGuesses${capitalCategory}`]:
        user[`dailyPlacementGuesses${capitalCategory}`],
      [`dailyCorrectPlacementGuesses${capitalCategory}`]:
        user[`dailyCorrectPlacementGuesses${capitalCategory}`],
    };
    copy[`dailyScores${capitalCategory}`][Math.round(score)] += 1;
    copy[`dailyRankGuesses${capitalCategory}`][ranks.indexOf(rank)][
      ranks.indexOf(selectedRank)
    ] += 1;
    let correctPlacementsCount = 0;
    for (let i = 0; i < unencrypted.length; i++) {
      copy[`dailyPlacementGuesses${capitalCategory}`][unencrypted[i] - 1][
        i
      ] += 1;
      if (parseInt(unencrypted[i]) === i + 1) {
        correctPlacementsCount += 1;
      }
    }

    // Increment correctPlacementGuesses
    if (rank === selectedRank) {
      copy[`dailyCorrectPlacementGuesses${capitalCategory}`][
        correctPlacementsCount + 9
      ] += 1;
    } else {
      copy[`dailyCorrectPlacementGuesses${capitalCategory}`][
        correctPlacementsCount
      ] += 1;
    }
    user = {
      ...user,
      dailyTotalGuesses: user.dailyTotalGuesses + 1,
      dailyScore: user.dailyScore + score,
      dailyMaxScore: user.dailyMaxScore + maxScore,
      dailyCorrectPlacements:
        user.dailyCorrectPlacements + calculateCorrectPlacements(unencrypted),
      dailyCorrectRanks:
        user.dailyCorrectRanks + (rank === selectedRank ? 1 : 0),
      [`dailyScores${capitalCategory}`]: copy[`dailyScores${capitalCategory}`],
      [`dailyRankGuesses${capitalCategory}`]:
        copy[`dailyRankGuesses${capitalCategory}`],
      [`dailyPlacementGuesses${capitalCategory}`]:
        copy[`dailyPlacementGuesses${capitalCategory}`],
      [`dailyCorrectPlacementGuesses${capitalCategory}`]:
        copy[`dailyCorrectPlacementGuesses${capitalCategory}`],
    };
    await updateUserStats(event.userSub, user);

    // create guess
  }

  return {
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(event),
  };
};
