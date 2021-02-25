/* eslint-disable no-console */
const asyncRedis = require('async-redis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL;

const client = asyncRedis.createClient(redisUrl);

client.on('error', (err) => {
  console.log(err);
});

module.exports = client;
