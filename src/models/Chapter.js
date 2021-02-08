const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Chapter extends Sequelize.Model {}

Chapter.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'chapter',
});

module.exports = Chapter;
