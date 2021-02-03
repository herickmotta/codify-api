/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const User = require('../models/User');

class UsersController {
  async create(userData) {
    userData.password = bcrypt.hashSync(userData.password, 10);

    const user = await User.create(userData);
    return user;
  }
}

module.exports = new UsersController();
