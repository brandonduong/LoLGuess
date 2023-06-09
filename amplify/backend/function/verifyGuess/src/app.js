/* Amplify Params - DO NOT EDIT
	API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIIDOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const CryptoJS = require("crypto-js");
const node_fetch = require("node-fetch");
const { Request } = node_fetch;
const crypto = require("@aws-crypto/sha256-js");
const provider = require("@aws-sdk/credential-provider-node");
const { defaultProvider } = provider;
const signature = require("@aws-sdk/signature-v4");
const { SignatureV4 } = signature;
const protocol = require("@aws-sdk/protocol-http");
const { HttpRequest } = protocol;

const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT =
  process.env.API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_LOLGUESSDATASTORE_GRAPHQLAPIKEYOUTPUT;
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const endpoint = new URL(GRAPHQL_ENDPOINT);

const signer = new SignatureV4({
  credentials: defaultProvider(),
  region: AWS_REGION,
  service: "appsync",
  sha256: Sha256,
});

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

async function getUser(sub) {
  const query = /* GraphQL */ `
    query GET_USER($id: ID!) {
      getUser(id: $id) {
        id
        unfinished
      }
    }
  `;

  const variables = {
    id: sub,
  };

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
  const request = new Request(GRAPHQL_ENDPOINT, signed);

  let body;
  let response;

  try {
    response = await node_fetch(request);
    body = await response.json();
    console.log(body);
  } catch (error) {
    statusCode = 500;
    console.log(error);
    body = { error };
  }
  return body.data.getUser;
}

async function createGuess(user, unencrypted, rank, ranks, selectedRank) {
  const query = /* GraphQL */ `
    mutation CREATE_GUESS($input: CreateGuessInput!) {
      createGuess(input: $input) {
        id
        placements
        guessedRank
        rank
        ranks
        userGuessesId
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
    },
  };
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
  const request = new Request(GRAPHQL_ENDPOINT, signed);

  try {
    response = await node_fetch(request);
    body = await response.json();
    console.log(body);
  } catch (error) {
    statusCode = 500;
    console.log(error);
    body = { error };
  }
}

async function decrementUnfinished(user) {
  const query = /* GraphQL */ `
    mutation UPDATE_USER($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        unfinished
      }
    }
  `;

  const variables = {
    input: {
      id: user.id,
      unfinished: user.unfinished - 1,
    },
  };
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
  const request = new Request(GRAPHQL_ENDPOINT, signed);

  try {
    response = await node_fetch(request);
    body = await response.json();
    console.log(body);
  } catch (error) {
    statusCode = 500;
    console.log(error);
    body = { error };
  }
}

/****************************
 * Example post method *
 ****************************/

app.post("/verifyGuess", async function (req, res) {
  // Add your code here
  const RIOT_TOKEN = process.env.RIOT_TOKEN;
  console.log(req.body);
  const guess = req.body.guess;
  console.log("guess", guess);
  const unencrypted = [];
  guess.forEach((g) => {
    unencrypted.push(
      CryptoJS.AES.decrypt(g, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
    );
  });
  console.log("unecrypted", unencrypted);
  const encryptedRank = req.body.encryptedRank;
  const encryptedRanks = req.body.encryptedRanks;
  const selectedRank = req.body.selectedRank;

  // Increment Unfinished Games for User
  const user = await getUser(
    req.apiGateway.event.requestContext.authorizer.claims.sub
  );
  const rank = CryptoJS.AES.decrypt(encryptedRank, RIOT_TOKEN).toString(
    CryptoJS.enc.Utf8
  );
  const ranks = CryptoJS.AES.decrypt(encryptedRanks, RIOT_TOKEN)
    .toString(CryptoJS.enc.Utf8)
    .split(",");
  console.log(rank, ranks, selectedRank);
  await createGuess(user, unencrypted, rank, ranks, selectedRank);
  await decrementUnfinished(user);

  res.json({
    unencrypted,
    rank,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
