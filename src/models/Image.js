const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Image extends Sequelize.Model {

}
Image.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.UUID,
  },
  bucket: Sequelize.STRING,
  key: Sequelize.STRING,
}, {
  sequelize,
  modelName: 'image',
});

module.exports = Image;
