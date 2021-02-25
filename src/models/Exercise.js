const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Exercise extends Sequelize.Model {}

Exercise.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  topicId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  wording: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  example: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  defaultCode: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  test: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'exercise',
});

module.exports = Exercise;
