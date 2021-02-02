/* eslint-disable class-methods-use-this */
const bcrypt = require('bcrypt');
const User = require('../models/User');
const NotFoundError = require('../errors/NotFoundError');

class UserController {
  async signIng({ email, password }) {
    const user = await User.findOne({ where: email });

    if (!user) throw new NotFoundError();

    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new NotFoundError();
  }
}

module.exports = new UserController();
