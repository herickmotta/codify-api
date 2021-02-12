const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Course extends Sequelize.Model {}

Course.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'course',
});

module.exports = Course;
