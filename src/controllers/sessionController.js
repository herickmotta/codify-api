const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
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
    const userToken = client.get(userId, async (err, token) => {
      if (err) throw err;
      if (token) {
        return token;
      }
      return null;
    });
    if (userToken) return userToken;
    throw new NotFoundError();
  }

  async deleteSession(userId) {
    client.del(userId, async (err, res) => {
      if (res !== 1) {
        throw new NotFoundError();
      }
    });
  }

  async createRecoverPasswordSession(id, token) {
    const timeToExpires = { expiresIn: 60 * 10 };

    client.setex(`${id}-recover-password`, timeToExpires.expiresIn, token);
  }

  async verifySessionToRedefinePassword(id, tokenToVerify) {
    const userToken = await client.get(`${id}-recover-password`);

    if (tokenToVerify !== userToken) throw new UnauthorizedError();
  }
}

module.exports = new SessionController();
