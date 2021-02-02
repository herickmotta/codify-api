const { v4: uuidv4 } = require('uuid');
const Session = require('../models/Session');

class SessionController {
  async create({ id }) {
    const token = uuidv4;
    const session = Session.create({ userId: id, token });
    return session;
  }
}

module.exports = new SessionController();
