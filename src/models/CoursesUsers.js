const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class CoursesUsers extends Sequelize.Model {}

CoursesUsers.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: Sequelize.INTEGER,
  courseId: Sequelize.INTEGER,
}, {
  sequelize,
  modelName: 'coursesUser',
});

module.exports = CoursesUsers;
