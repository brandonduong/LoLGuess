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
import axios from "axios";

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

async function createDaily(matchId, rank, region, category, usernames, patch) {
  const createDaily = /* GraphQL */ `
    mutation CreateDaily(
      $input: CreateDailyInput!
      $condition: ModelDailyConditionInput
    ) {
      createDaily(input: $input, condition: $condition) {
        date
        matchId
        rank
        region
        category
        rankGuesses
        placementGuesses
        perfects
        score
        usernames
        patch
      }
    }
  `;

  var numRanks;
  if (category === "all") {
    numRanks = 10;
  } else {
    numRanks = 5;
  }

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
      matchId,
      rank,
      region,
      category,
      rankGuesses: Array(numRanks).fill(0),
      placementGuesses: Array(8).fill(Array(8).fill(0)),
      perfects: 0,
      score: 0,
      usernames,
      patch,
    },
  };
  console.log(variables);

  await signAndRun(createDaily, variables).then((res) => {
    if (res.statusCode === 200) {
      console.log(res.body.data);
    } else {
      console.log(res.body.errors);
    }
  });
}

async function getMatch(ranks) {
  const RIOT_TOKEN = process.env.RIOT_TOKEN;
  const regions = [
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

  // Get random region
  var region = regions[Math.floor(Math.random() * regions.length)];
  const origRegion = region;
  // Get random rank
  var rank = ranks[Math.floor(Math.random() * ranks.length)];
  const rankDivision = rank;
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
  const player = players[Math.floor(Math.random() * players.length)].summonerId;
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
  const count = 100;
  const startTime = Math.floor(new Date("2023.06.7").getTime() / 1000); // Only get matches from current patch
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

  var foundRanked = false;
  var matchId;
  var patch;
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
          matchId = matches[i];
          players = res.data.info.participants;
          patch = res.data.info.tft_set_number;
          foundRanked = true;
        }
      })
      .catch((err) => console.log(err));
  }

  // Get usernames of participants
  const puuids = players.map(({ puuid }) => puuid);
  console.log(puuids);

  const usernames = [];
  for (let i = 0; i < puuids.length; i++) {
    const accountUrl = `https://${matchesRegion}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuids[i]}`;
    await axios
      .get(accountUrl, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
        usernames.push(`${res.data.gameName} #${res.data.tagLine}`);
      })
      .catch((err) => console.log(err));
  }

  return { matchId, rank: rankDivision, region: origRegion, patch, usernames };
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const all = [
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

  const low = ["Iron", "Bronze", "Silver", "Gold", "Platinum"];
  const high = ["Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];

  let statusCode = 200;
  try {
    const allData = await getMatch(all);
    var { matchId, rank, region, usernames, patch } = allData;
    await createDaily(matchId, rank, region, "all", usernames, patch);
    const lowData = await getMatch(low);
    var { matchId, rank, region, usernames, patch } = lowData;
    await createDaily(matchId, rank, region, "low", usernames, patch);
    const highData = await getMatch(high);
    var { matchId, rank, region, usernames, patch } = highData;
    await createDaily(matchId, rank, region, "high", usernames, patch);
  } catch (error) {
    console.log(error);
    statusCode = 500;
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // },
  };
};
