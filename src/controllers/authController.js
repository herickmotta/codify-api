const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const NotFoundError = require('../errors/NotFoundError');
const Session = require('../models/Session');
const User = require('../models/User');

class AuthController {
  async create({ email, password }) {
    const user = await User.findOne({ where: { email } });
    const { id, name } = user;

    if (!user) throw new NotFoundError();

    if (!bcrypt.compareSync(password, user.password)) throw new NotFoundError();

    const token = uuidv4();
    await Session.create({ userId: id, token });

    return {
      id, name, email, token,
    };
  }
}

module.exports = new AuthController();
