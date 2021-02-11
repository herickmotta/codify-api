const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');
const ExerciseDone = require('./ExerciseDone');

const Topic = require('./Topic');

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
}, {
  sequelize,
  modelName: 'exercise',
});

Exercise.hasMany(ExerciseDone);

module.exports = Exercise;
