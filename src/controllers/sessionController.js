const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const client = require('../utils/redis');

class SessionController {
  async createSession({ id, name, email }) {
    const data = { id };
    const secretKey = process.env.SECRET;
    const timeToExpires = { expiresIn: 60 * 60 * 24 };

    const token = jwt.sign(data, secretKey, timeToExpires);
    client.setex(id, timeToExpires.expiresIn, token);
    return {
      id, name, email, token,
    };
  }

  async findSessionByUserId(userId) {
    client.get(userId, async (err, token) => {
      if (err) throw err;
      if (token) {
        return token;
      }
      throw new NotFoundError();
    });
  }

  async deleteSession(userId) {
    client.del(userId, async (err, res) => {
      if (res !== 1) {
        throw new NotFoundError();
      }
    });
  }
}

module.exports = new SessionController();
