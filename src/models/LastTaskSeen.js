const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class LastTaskSeen extends Sequelize.Model {}

LastTaskSeen.init({
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
    allowNull: true,
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  chapterId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  topicId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  exerciseId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

}, {
  sequelize,
  modelName: 'LastTaskSeen',
  tableName: 'lastTaskSeen',
});

module.exports = LastTaskSeen;
