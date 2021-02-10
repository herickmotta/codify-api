/* eslint-disable no-param-reassign */
const Topic = require('../models/Topic');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class TopicsController {
  async getTopicsData(id) {
    const topics = Topic.findByPk(id, {
      include: [Theory, Exercise],
    });

    return topics;
  }

  async findTopicById(topicId) {
    const topic = await Topic.findByPk(topicId);
    if (!topic) throw new NotFoundError('Topic not found');

    return topic;
  }

  getAllTopics(limit = null, offset = null, chapterId = null) {
    if (chapterId) {
      return Topic.findAll({ where: { chapterId }, limit, offset });
    } return Topic.findAll({ limit, offset });
  }

  async createTopic(topicParams) {
    const { name } = topicParams;
    const topic = await Topic.findOne({ where: { name } });
    if (topic) throw new ConflictError('Topic already exists');

    const createdTopic = await Topic.create(topicParams);
    return createdTopic;
  }

  async editTopic(topicParams) {
    const {
      id, name,
    } = topicParams;
    const topic = await Topic.findByPk(id);
    if (!topic) throw new NotFoundError('Topic not found');

    if (name) topic.name = name;

    await topic.save();
    return topic;
  }

  async destroyTopic(topicId) {
    const topic = await Topic.findByPk(topicId);
    if (!topic) throw new NotFoundError('Topic not found');

    await Topic.destroy({ where: { topicId } });
  }
}

module.exports = new TopicsController();
