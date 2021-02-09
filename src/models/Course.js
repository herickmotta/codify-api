const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const Chapter = require('./Chapter');

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

Course.hasMany(Chapter);

module.exports = Course;
