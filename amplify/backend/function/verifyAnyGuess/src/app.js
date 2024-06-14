/*
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
var aws = require("aws-sdk");
var lambda = new aws.Lambda({
  region: "us-east-1", //change to your region
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

/****************************
 * Example post method *
 ****************************/

app.post("/verifyAnyGuess", async function (req, res) {
  // Add your code here
  console.log(`EVENT: ${JSON.stringify(req.apiGateway.event)}`);
  const RIOT_TOKEN = process.env.RIOT_TOKEN;

  console.log(req.body);
  const sensitive = req.body.sensitive;
  const rawSensitive = JSON.parse(
    CryptoJS.AES.decrypt(sensitive, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
  );
  const selectedRank = req.body.selectedRank;
  console.log(rawSensitive);

  const guess = req.body.guess;
  console.log("guess", guess);
  const unencrypted = [];
  guess.forEach((g) => {
    unencrypted.push(
      CryptoJS.AES.decrypt(g, RIOT_TOKEN).toString(CryptoJS.enc.Utf8)
    );
  });
  console.log("unencrypted", unencrypted);
  const rank = rawSensitive.rank;
  const region = rawSensitive.region;

  const inv = lambda
    .invoke({
      FunctionName: "applyDailyNoAuth-main",
      Payload: JSON.stringify({
        unencrypted,
        selectedRank,
        date: req.body.date,
        category: req.body.category,
      }), // pass params
      InvocationType: "Event",
    })
    .promise();
  await inv; // Fire and forget
  // Return answers
  res.json({
    unencrypted,
    rank,
    region,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
