const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class CourseUser extends Sequelize.Model {}

CourseUser.init({
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
  courseId: {
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
  modelName: 'courseUser',
  tableName: 'coursesUsers',
});

module.exports = CourseUser;
