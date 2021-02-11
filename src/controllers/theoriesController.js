/* eslint-disable no-param-reassign */
const Theory = require('../models/Theory');
const NotFoundError = require('../errors/NotFoundError');

class TheoriesController {
  async findTheoryById(theoryId) {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) throw new NotFoundError('Theory not found');

    return theory;
  }

  getAllTheories(queryConfig, topicId = null) {
    if (topicId) {
      return Theory.findAll({ where: { topicId }, ...queryConfig });
    } return Theory.findAll(queryConfig);
  }

  async createTheory(theoryParams) {
    const createdTheory = await Theory.create(theoryParams);
    return createdTheory;
  }

  async editTheory(theoryParams) {
    const {
      id, name,
    } = theoryParams;
    const theory = await Theory.findByPk(id);
    if (!theory) throw new NotFoundError('Theory not found');

    if (name) theory.name = name;

    await theory.save();
    return theory;
  }

  async destroyTheory(theoryId) {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) throw new NotFoundError('Theory not found');

    await Theory.destroy({ where: { id: theoryId } });
  }
}

module.exports = new TheoriesController();
