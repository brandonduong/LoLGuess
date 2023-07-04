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
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    .toISOString()
    .split("T")[0];

  console.log(now);
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

async function listAllUsers() {
  const query = /* GraphQL */ `
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
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  `;
  const users = [];
  var nextToken = "";
  var variables = {
    filter: {
      totalGuesses: {
        ge: MIN_NUMBER_OF_GUESSES,
      },
    },
    limit: 200,
  };

  while (nextToken !== null) {
    const res = await signAndRun(query, variables);
    if (res.statusCode === 200) {
      console.log(res.body.data.listUsers.items);
      users.concat(res.body.data.listUsers.items);
      nextToken = res.body.data.listUsers.nextToken;
      variables.nextToken = nextToken;
    } else {
      console.log(res.body.errors);
    }
  }
  return users;
}

function sortUsers(users, sortField) {
  const copy = [...users];
  console.log(copy, sortField);
  return copy.sort((a, b) =>
    a[sortField] < b[sortField] ? 1 : a[sortField] > b[sortField] ? -1 : 0
  );
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

  const users = await listAllUsers();

  const byScore = sortUsers(users, "score");
  const byCorrectPlacements = sortUsers(users, "correctPlacements");
  const byCorrectRanks = sortUsers(users, "correctRanks");
  const byAverageCorrectPlacements = sortUsers(
    users,
    "averageCorrectPlacements"
  );
  const byAverageScore = sortUsers(users, "averageScore");

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
