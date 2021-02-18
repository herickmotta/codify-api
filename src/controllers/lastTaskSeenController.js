const LastTaskSeen = require('../models/LastTaskSeen');

class LastTaskSeenController {
  async createLastTaskSeen() {
    const lastTask = await LastTaskSeen.findAll();

    return lastTask;
  }
}

module.exports = new LastTaskSeenController();
