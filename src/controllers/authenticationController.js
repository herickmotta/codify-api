const bcrypt = require('bcrypt');

const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/User');

class AuthController {
  async verifyUser({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new NotFoundError();

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedError();

    const { id, name } = user;
    return { id, name, email };
  }
}

module.exports = new AuthController();
