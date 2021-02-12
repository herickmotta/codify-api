const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class TheoryDone extends Sequelize.Model {}

TheoryDone.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  theoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },

}, {
  sequelize,
  modelName: 'theoryDone',
  tableName: 'theoriesDone',
});

module.exports = TheoryDone;
