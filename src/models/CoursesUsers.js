const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class CoursesUser extends Sequelize.Model {}

CoursesUser.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id',
    },
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },

}, {
  sequelize,
  modelName: 'coursesUser',
});

module.exports = CoursesUser;
