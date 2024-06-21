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
        totalGuesses
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

  // Get current unfinished value
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

async function incrementUnfinished(user) {
  const query = /* GraphQL */ `
    mutation UPDATE_USER($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        unfinished
      }
    }
  `;

  // Increment unfinished value
  const variables = {
    input: {
      id: user.id,
      unfinished: user.unfinished + 1,
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

/**********************
 * Example get method *
 **********************/

app.get("/getMatch", async function (req, res) {
  // Add your code here
  const RIOT_TOKEN = process.env.RIOT_TOKEN;
  console.log(`EVENT: ${JSON.stringify(req.apiGateway.event)}`);

  const param = req.apiGateway.event.multiValueQueryStringParameters;
  const regions = param["regions[]"];
  const ranks = param["ranks[]"];
  console.log(`Query Parameters: ${regions}`);
  console.log(`Query Parameters: ${ranks}`);

  var foundRanked = false;
  var tries = 0;
  var ogRegion;
  var rankDivision;
  let patch, datetimePlayed;
  while (!foundRanked && tries < 3) {
    try {
      // Get random region
      var region = regions[Math.floor(Math.random() * regions.length)];
      ogRegion = region;

      // Get random rank
      var rank = ranks[Math.floor(Math.random() * ranks.length)];
      rankDivision = rank;
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

      const div = ["I", "II", "III", "IV"];

      const highRank =
        rank === "Challenger" || rank === "Grandmaster" || rank === "Master";
      if (highRank) {
        rank = rank.charAt(0).toLowerCase() + rank.slice(1);
      } else {
        const page = 1;
        rank =
          "entries/" +
          rank.toUpperCase() +
          `/${div[Math.floor(Math.random() * div.length)]}/?page=${page}`;
      }

      const baseUrl = `https://${region}.api.riotgames.com/tft`;
      const divUrl = `/league/v1/${rank}`;
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://developer.riotgames.com",
        "X-Riot-Token": RIOT_TOKEN,
      };

      console.log(baseUrl + divUrl);

      // Get ranked division
      var players = [];
      await axios
        .get(baseUrl + divUrl, {
          headers,
        })
        .then((res) => {
          if (!highRank) {
            console.log(res.data.slice(0, 5));
            players = res.data;
          } else {
            console.log(res.data.entries.slice(0, 5));
            players = res.data.entries;
          }
        })
        .catch((err) => console.log(err));

      // Get random player's puuid
      const player =
        players[Math.floor(Math.random() * players.length)].summonerId;
      const playerUrl = `/summoner/v1/summoners/${player}`;
      console.log(baseUrl + playerUrl);

      var puuid = "";
      await axios
        .get(baseUrl + playerUrl, {
          headers,
        })
        .then((res) => {
          console.log(res.data);
          puuid = res.data.puuid;
        })
        .catch((err) => console.log(err));

      // Get matches from player
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
      const count = 10;
      const startTime = Math.floor(new Date("2024.03.19").getTime() / 1000); // Only get matches from current patch
      const matchesUrl = `/match/v1/matches/by-puuid/${puuid}/ids?count=${count}&startTime=${startTime}`;
      console.log(baseRegionalUrl + matchesUrl);

      var matches = [];
      await axios
        .get(baseRegionalUrl + matchesUrl, {
          headers,
        })
        .then((res) => {
          console.log(res.data);
          matches = res.data;
        })
        .catch((err) => console.log(err));

      // Only get ranked matches

      var rankedMatch = {};
      var matchId;
      for (let i = 0; i < matches.length && !foundRanked; i++) {
        const matchUrl = `/match/v1/matches/${matches[i]}`;
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
              patch = res.data.info.game_version;
              datetimePlayed = res.data.info.game_datetime;
              matchId = matches[i];
              foundRanked = true;
            }
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log("Failed to fetch match: ", error);
      tries += 1;
    }
  }

  if (!foundRanked) {
    res.json({
      error: "Error finding ranked match",
    });
  } else {
    // Remove info that would allow someone to cheat
    const lastRounds = rankedMatch.map(({ last_round }) => last_round);
    rankedMatch = rankedMatch.map(
      ({
        augments,
        level,
        traits,
        placement,
        units,
        gold_left,
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
      })
    );

    // Increment Unfinished Games for User
    const user = await getUser(
      req.apiGateway.event.requestContext.authorizer.claims.sub
    );
    await incrementUnfinished(user);

    const sensitive = {
      rank: rankDivision,
      ranks: ranks,
      unfinished: user.unfinished + 1,
      totalGuesses: user.totalGuesses,
      region: ogRegion,
      regions: regions,
      matchId: matchId,
      mode: "freeplay",
      lastRounds,
    };

    res.json({
      rankedMatch,
      sensitive: CryptoJS.AES.encrypt(
        JSON.stringify(sensitive),
        RIOT_TOKEN
      ).toString(),
      patch,
      datetimePlayed,
    });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
