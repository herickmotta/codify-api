// const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

class SessionController {
  async createSession({ id, name, email }) {
    const token = jwt.sign({ id }, process.env.SECRET);

    console.log(token);

    await Session.create({ userId: id, token });

    console.log(id, name, email, token);

    return {
      id, name, email, token,
    };
  }
}

module.exports = new SessionController();
