/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

/* Amplify Params - DO NOT EDIT
	API_LOLGUESSDATASTORE_GRAPHQLAPIENDPOINTOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIIDOUTPUT
	API_LOLGUESSDATASTORE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

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

async function getDaily(date, category) {
  // Today in UTC with no time
  const getDaily = /* GraphQL */ `
    query GetDaily($date: ID!, $category: String!) {
      getDaily(date: $date, category: $category) {
        rankGuesses
        placementGuesses
        perfects
        scores
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

/**********************
 * Example get method *
 **********************/

app.get("/getDailyStats", async function (req, res) {
  // Add your code here
  console.log(`EVENT: ${JSON.stringify(req.apiGateway.event)}`);
  const param = req.apiGateway.event.queryStringParameters;
  const { date, category } = param;

  const daily = await getDaily(date, category);
  const {
    rankGuesses,
    placementGuesses,
    perfects,
    scores,
    loggedRankGuesses,
    loggedPlacementGuesses,
    loggedPerfects,
    loggedScores,
  } = daily;

  res.json({
    rankGuesses,
    placementGuesses,
    perfects,
    scores,
    loggedRankGuesses,
    loggedPlacementGuesses,
    loggedPerfects,
    loggedScores,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
