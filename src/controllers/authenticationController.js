const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');
const User = require('../models/User');

class AuthController {
  async verifyUserEmailAndPassword({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) throw new UnauthorizedError();

    if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedError();

    const { id, name } = user;
    return { id, name, email };
  }
}

module.exports = new AuthController();
