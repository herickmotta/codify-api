require('dotenv').config();
const { Sequelize } = require('sequelize');
const DB_URL = require('../config/constants');

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
