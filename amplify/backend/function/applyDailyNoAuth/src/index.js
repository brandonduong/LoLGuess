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
import { default as fetch, Request } from "node-fetch";

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
        rankGuesses
        placementGuesses
        perfects
        scores
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
        rankGuesses
        placementGuesses
        perfects
        scores
      }
    }
  `;
  const variables = {
    date,
    category,
    rankGuesses: stats.rankGuesses,
    placementGuesses: stats.placementGuesses,
    perfects: stats.perfects,
    scores: stats.scores,
  };

  const res = await signAndRun(getDaily, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
  } else {
    console.log(res.body.errors);
  }
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

  const daily = await getDaily(date, category);
  const { rankGuesses, placementGuesses, perfects, scores, rank } = daily;

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
  scores[Math.round(score)] += 1;
  rankGuesses[ranks.indexOf(selectedRank)] += 1;
  for (let i = 0; i < unencrypted.length; i++) {
    placementGuesses[unencrypted[i] - 1][i] += 1;
  }

  const stats = {
    rankGuesses,
    placementGuesses,
    perfects: score === 100 ? perfects + 1 : perfects,
    scores,
  };

  await updateDaily(date, category, stats);

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
    body: JSON.stringify(body),
  };
};
