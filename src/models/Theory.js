const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

const TheoryDone = require('./TheoryDone');

class Theory extends Sequelize.Model {}

Theory.init({
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
  youtubeLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'theory',
});

Theory.hasMany(TheoryDone);

module.exports = Theory;
