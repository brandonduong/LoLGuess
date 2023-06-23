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

const MIN_NUMBER_OF_GUESSES = 10;

async function createLeaderboard(
  byScore,
  byCorrectPlacements,
  byCorrectRanks,
  byAverageCorrectPlacements,
  byAverageScore
) {
  const query = /* GraphQL */ `
    mutation CREATE_LEADERBOARD($input: CreateLeaderboardInput!) {
      createLeaderboard(input: $input) {
        date
        byCorrectPlacements
        byCorrectRanks
        byScore
        byAverageCorrectPlacements
        byAverageScore
      }
    }
  `;
  // Today in UTC with no time
  const today = new Date().toISOString().split("T")[0];
  console.log(today);

  const variables = {
    input: {
      date: today,
      byCorrectPlacements,
      byCorrectRanks,
      byScore,
      byAverageCorrectPlacements,
      byAverageScore,
    },
  };
  console.log(variables);

  await signAndRun(query, variables).then((res) => {
    if (res.statusCode === 200) {
      console.log(res.body.data);
    } else {
      console.log(res.body.errors);
    }
  });
}

async function searchUsers(sortField) {
  const query = /* GraphQL */ `
    query SEARCH_USERS(
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
          score
          maxScore
          correctPlacements
          correctRanks
          totalRanks
          unfinished
          totalGuesses
          averageCorrectPlacements
          averageScore
        }
        nextToken
        total
      }
    }
  `;

  const variables = {
    sort: {
      direction: "desc",
      field: sortField,
    },
    filter: {
      totalGuesses: {
        gte: MIN_NUMBER_OF_GUESSES,
      },
    },
    limit: 100,
  };

  const res = await signAndRun(query, variables);
  if (res.statusCode === 200) {
    console.log(res.body);
    console.log(res.body.data.searchUsers.items.map((user) => user.id));
    return res.body.data.searchUsers.items.map((user) => user.id);
  } else {
    console.log(res.body.errors);
  }
}

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
    response = await fetch(request);
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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, context, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const byScore = await searchUsers("score");
  const byCorrectPlacements = await searchUsers("correctPlacements");
  const byCorrectRanks = await searchUsers("correctRanks");
  const byAverageCorrectPlacements = await searchUsers(
    "averageCorrectPlacements"
  );
  const byAverageScore = await searchUsers("averageScore");

  let statusCode = 200;
  try {
    await createLeaderboard(
      byScore,
      byCorrectPlacements,
      byCorrectRanks,
      byAverageCorrectPlacements,
      byAverageScore
    );
  } catch (error) {
    statusCode = 500;
  }

  return {
    statusCode,
  };
};
