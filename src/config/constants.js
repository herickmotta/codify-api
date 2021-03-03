require('dotenv').config();

const DB_URL_DEV = process.env.DATABASE_URL_DEV;

const DB_URL_PROD = process.env.DATABASE_URL;

const PRODUCTION = true;

const DB_URL = PRODUCTION ? DB_URL_PROD : DB_URL_DEV;

module.exports = DB_URL;
