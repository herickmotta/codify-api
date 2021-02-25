const dotenv = require('dotenv');
const DB_URL = require('../src/config/constants');

dotenv.config();

module.exports = {
  development: {
    url: DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    url: DB_URL,
  },
  production: {
    url: DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
};
