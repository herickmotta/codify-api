// const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

class SessionController {
  async createSession({ id, name, email }) {
    const token = jwt.sign({ id }, process.env.SECRET);

    await Session.create({ userId: id, token });

    return {
      id, name, email, token,
    };
  }
}

module.exports = new SessionController();
