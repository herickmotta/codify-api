// const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

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

  findSessionByUserId(userId) {
    return Session.findOne({ where: { userId } });
  }
}

module.exports = new SessionController();
