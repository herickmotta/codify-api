/* eslint-disable no-console */
const redis = require('redis');
require('dotenv').config();

const redisPort = process.env.REDIS_PORT || 6379;

const client = redis.createClient(redisPort);

client.on('error', (err) => {
  console.log(err);
});

module.exports = client;
