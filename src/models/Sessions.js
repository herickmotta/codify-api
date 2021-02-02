const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Sessions extends Sequelize.Model {}

Sessions.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'session',
});

module.exports = Sessions;
