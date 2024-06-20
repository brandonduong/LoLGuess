/* Amplify Params - DO NOT EDIT
	API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIIDOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_APPLYDAILY_NAME
	FUNCTION_APPLYGUESS_NAME
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
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

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

var aws = require("aws-sdk");
var lambda = new aws.Lambda({
  region: "us-east-1", //change to your region
});
// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

async function getUserDailyGuess(date, category, userSub) {
  const query = /* GraphQL */ `
    query GET_DAILYGUESS($date: ID!, $category: String!, $userGuessesId: ID!) {
      getDailyGuess(
        date: $date
        category: $category
        userGuessesId: $userGuessesId
      ) {
        date
        category
        userGuessesId
        placements
        guessedRank
      }
    }
  `;

  const variables = {
    date,
    category,
    userGuessesId: userSub,
  };

  const res = await signAndRun(query, variables);
  console.log(res);
  if (res.statusCode === 200) {
    return res.body.data.getDailyGuess;
  } else {
    console.log(res.body.errors);
  }
}

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

/****************************
 * Example post method *
 ****************************/

app.post("/verifyGuess", async function (req, res) {
  // Verify guesses for logged in users
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
  console.log("unencrypted", unencrypted);
  const sensitive = req.body.sensitive;
  const rawSensitive = JSON.parse(
    CryptoJS.AES.decrypt(sensitive, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
  );
  console.log(rawSensitive);
  const selectedRank = req.body.selectedRank;
  const userSub = req.apiGateway.event.requestContext.authorizer.claims.sub;

  let response;
  if (rawSensitive.mode === "freeplay") {
    const inv = lambda
      .invoke({
        FunctionName: process.env.FUNCTION_APPLYGUESS_NAME,
        Payload: JSON.stringify({
          unencrypted,
          sensitive,
          selectedRank,
          userSub,
        }), // pass params
        InvocationType: "Event",
      })
      .promise();
    await inv; // Fire and forget
    const { rank, ranks, region } = rawSensitive;
    console.log(rank, ranks, selectedRank);
    response = {
      unencrypted,
      rank,
      region,
    };
  } else if (rawSensitive.mode === "daily") {
    // Check if user already has a guess for this daily
    const { rank, region, usernames, date, category } = rawSensitive;
    const dailyGuess = await getUserDailyGuess(date, category, userSub);
    if (!dailyGuess) {
      // Create DailyGuess, update user and daily stats
      const inv = lambda
        .invoke({
          FunctionName: process.env.FUNCTION_APPLYDAILY_NAME,
          Payload: JSON.stringify({
            unencrypted,
            selectedRank,
            date,
            category,
            userSub,
          }), // pass params
          InvocationType: "Event",
        })
        .promise();
      await inv; // Fire and forget
      response = {
        unencrypted,
        rank,
        region,
        usernames,
      };
    } else {
      const { placements, guessedRank } = dailyGuess;
      // return original guess instead
      response = {
        unencrypted,
        rank,
        region,
        usernames,
        guessedRank,
        placements,
      };
    }
  }

  res.json(response);
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
