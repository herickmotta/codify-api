const { compareSync } = require('bcrypt');

const NotFoundError = require('../errors/NotFoundError');
const User = require('../models/User');

class AuthController {
  async verifyUser({ email, password }) {
    const user = await User.findOne({ where: { email } });
    const { id, name } = user;

    if (!user) throw new NotFoundError();

    if (!compareSync(password, user.password)) throw new NotFoundError();

    return { id, name, email };
  }
}

module.exports = new AuthController();
