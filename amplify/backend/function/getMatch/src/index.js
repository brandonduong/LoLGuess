const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
