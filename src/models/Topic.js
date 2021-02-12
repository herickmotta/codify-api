const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const Theory = require('./Theory');
const Exercise = require('./Exercise');

class Topic extends Sequelize.Model {}

Topic.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  chapterId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'topic',
});

Topic.hasOne(Theory);
Topic.hasMany(Exercise);

module.exports = Topic;
