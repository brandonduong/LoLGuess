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
const axios = require("axios");
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

const RIOT_TOKEN = process.env.RIOT_TOKEN;

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
        matchId
        rank
        region
        patch
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

async function getDailyMatch(matchId, region) {
  const regTranslate = [
    "br1",
    "eun1",
    "euw1",
    "jp1",
    "kr",
    "la1",
    "la2",
    "na1",
    "oc1",
    "tr1",
    "ru",
    "ph2",
    "sg2",
    "th2",
    "tw2",
    "vn2",
  ];
  const reg = [
    "BR",
    "EUNE",
    "EUW",
    "JP",
    "KR",
    "LAN",
    "LAS",
    "NA",
    "OCE",
    "TR",
    "RU",
    "PH",
    "SG",
    "TH",
    "TW",
    "VN",
  ];

  region = regTranslate[reg.findIndex((x) => x === region)];

  // Match regions that cover player regions
  const americas = ["na1", "br1", "la1", "la2"];
  const asia = ["kr", "jp1"];
  const europe = ["eun1", "euw1", "tr1", "ru"];
  const sea = ["oc1", "ph2", "sg2", "th2", "tw2", "vn2"];
  var matchesRegion = "";
  if (americas.includes(region)) {
    matchesRegion = "americas";
  } else if (asia.includes(region)) {
    matchesRegion = "asia";
  } else if (europe.includes(region)) {
    matchesRegion = "europe";
  } else if (sea.includes(region)) {
    matchesRegion = "sea";
  }

  const baseRegionalUrl = `https://${matchesRegion}.api.riotgames.com/tft`;
  const matchUrl = `/match/v1/matches/${matchId}`;
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": RIOT_TOKEN,
  };
  console.log(baseRegionalUrl + matchUrl);
  await axios
    .get(baseRegionalUrl + matchUrl, {
      headers,
    })
    .then((res) => {
      // console.log(res.data);
      if (res.data.info.queue_id === 1100) {
        console.log("found ranked match");
        rankedMatch = res.data.info.participants;

        foundRanked = true;
      }
    })
    .catch((err) => console.log(err));

  rankedMatch = rankedMatch.map(
    ({
      augments,
      level,
      traits,
      placement,
      units,
      gold_left,
      puuid,
      last_round,
    }) => ({
      augments,
      level,
      traits,
      placement: CryptoJS.AES.encrypt(`${placement}`, RIOT_TOKEN).toString(),
      units,
      gold_left,
      augmentNum:
        last_round >= 20 ? 3 : last_round >= 13 ? 2 : last_round >= 5 ? 1 : 0,
      puuid: CryptoJS.AES.encrypt(`${puuid}`, RIOT_TOKEN).toString(),
      last_round: CryptoJS.AES.encrypt(`${last_round}`, RIOT_TOKEN).toString(),
    })
  );

  return rankedMatch;
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

app.get("/getDaily", async function (req, res) {
  console.log(`EVENT: ${JSON.stringify(req.apiGateway.event)}`);
  const param = req.apiGateway.event.queryStringParameters;
  const { date, category } = param;

  // Get daily info
  const daily = await getDaily(date, category);
  const { matchId, region, rank, patch } = daily;
  const dailyMatch = await getDailyMatch(matchId, region);

  const sensitive = {
    rank,
    region,
    date,
    category,
  };

  res.json({
    dailyMatch,
    sensitive: CryptoJS.AES.encrypt(
      JSON.stringify(sensitive),
      RIOT_TOKEN
    ).toString(),
    patch,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
