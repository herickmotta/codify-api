/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const topicsController = require('../../../src/controllers/topicsController');

jest.mock('../../../src/models/Topic');
const Topic = require('../../../src/models/Topic');

describe('topicsController.getTopicsData', () => {
  it('Should throw an error if given id invalid', async () => {
    const courseNotFound = null;
    const invalidCourseId = null;

    await Topic.findByPk.mockResolvedValue(courseNotFound);

    const fn = async () => {
      await topicsController.getTopicsData(invalidCourseId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should throw an error if given id invalid', async () => {
    const validTopicId = 1;
    const validUserId = 1;

    const topic = {
      chapterId: 1,
      name: 'Topic from chapter 1',
      theory: [],
      exercises: [
        { exercise: [] },
        { exercise: [] },
      ],
    };

    const expected = {
      chapterId: 1,
      name: 'Topic from chapter 1',
      activities: [topic.theory, ...topic.exercises],
    };

    Topic.findByPk.mockResolvedValue(topic);

    const result = await topicsController.getTopicsData(validTopicId, validUserId);

    expect(result).toEqual(expect.objectContaining({ ...expected }));
  });
});
