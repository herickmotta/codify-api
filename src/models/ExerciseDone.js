const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class ExerciseDone extends Sequelize.Model {}

ExerciseDone.init({
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
  exerciseId: {
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
  modelName: 'exerciseDone',
  tableName: 'exercisesDone',
});

module.exports = ExerciseDone;
