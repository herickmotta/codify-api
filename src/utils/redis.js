/* eslint-disable no-console */
const redis = require('redis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL;

const client = redis.createClient(redisUrl);

client.on('error', (err) => {
  console.log(err);
});

module.exports = client;
