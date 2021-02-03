const { v4: uuidv4 } = require('uuid');

const Session = require('../models/Session');

class SessionController {
  async createSession({ id, name, email }) {
    const token = uuidv4();
    await Session.create({ userId: id, token });

    return {
      id, name, email, token,
    };
  }
}

module.exports = new SessionController();
