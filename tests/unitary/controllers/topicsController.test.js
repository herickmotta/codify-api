/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const topicsController = require('../../../src/controllers/topicsController');

jest.mock('../../../src/models/Topic');
const Topic = require('../../../src/models/Topic');
const ConflictError = require('../../../src/errors/ConflictError');

describe('topicsController.findTopicById', () => {
  it('Should throw an error if given id invalid', async () => {
    const topicNotFound = null;
    const invalidTopicId = 1;

    await Topic.findByPk.mockResolvedValue(topicNotFound);

    const fn = async () => {
      await topicsController.findTopicById(invalidTopicId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a topic if given id valid', async () => {
    const topic = {
      id: 1,
      name: 'Topic Test',
    };
    const validTopicId = 1;

    await Topic.findByPk.mockResolvedValue(topic);
    const result = await topicsController.findTopicById(validTopicId);

    expect(result).toEqual(expect.objectContaining({ ...topic }));
  });
});

describe('topicsController.getAllTopics', () => {
  it('Should return a empty array of topics when we dont have topics', async () => {
    const topics = [];

    await Topic.findByPk.mockResolvedValue(topics);
    const result = await topicsController.getAllTopics();

    expect(result).toEqual(expect.objectContaining([]));
  });
});

describe('topicsController.createTopic', () => {
  it('Should return a created topic', async () => {
    const topic = {
      id: 1,
      name: 'This is a name',
    };
    await Topic.findOne.mockResolvedValue(null);
    await Topic.create.mockResolvedValue(topic);

    const result = await topicsController.createTopic(topic);

    expect(result).toEqual(expect.objectContaining(topic));
  });

  it('Should throw error if given duplicate topic name', async () => {
    const topic = {
      id: 1,
      name: 'This is a name',
    };
    await Topic.findOne.mockResolvedValue(topic);

    const fn = async () => {
      await topicsController.createTopic(topic);
    };

    expect(fn).rejects.toThrow(ConflictError);
  });
});

describe('topicsController.editTopic', () => {
  it('Should throw error if given invalid id', async () => {
    const topic = {
      id: 1,
      name: 'This is a name',
    };
    await Topic.findByPk.mockResolvedValue(null);

    const fn = async () => {
      await topicsController.editTopic(topic);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a edited topic', async () => {
    const editedTopic = {
      id: 1,
      name: 'This is a edited name',
    };
    await Topic.findByPk.mockResolvedValue({
      id: 1,
      name: 'This is a name',
      save: async () => Promise.resolve(),
    });

    const result = await topicsController.editTopic(editedTopic);

    expect(result).toEqual(expect.objectContaining({
      id: 1,
      name: 'This is a edited name',
    }));
  });
});
