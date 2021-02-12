const jwt = require('jsonwebtoken');

const Session = require('../models/Session');
const NotFoundError = require('../errors/NotFoundError');

class SessionController {
  async createSession({ id, name, email }) {
    const data = { id };
    const secretKey = process.env.SECRET;
    const timeToExpires = { expiresIn: 60 * 60 * 24 * 30 };

    const token = jwt.sign(data, secretKey, timeToExpires);

    await Session.create({ userId: id, token });

    return {
      id, name, email, token,
    };
  }

  async findSessionByUserId(userId) {
    const session = await Session.findOne({ where: { userId } });
    if (!session) throw new NotFoundError();

    return session;
  }

  deleteSession(userId) {
    return Session.destroy({ where: { userId } });
  }
}

module.exports = new SessionController();
