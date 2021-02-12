/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const chaptersController = require('../../../src/controllers/chaptersController');

jest.mock('../../../src/models/Chapter');
const Chapter = require('../../../src/models/Chapter');

describe('chaptersController.findChapterTopics', () => {
  it('Should throw an error if given id invalid', async () => {
    const courseNotFound = null;
    const invalidCourseId = null;

    Chapter.findByPk.mockResolvedValue(courseNotFound);

    const fn = async () => {
      await chaptersController.findChapterTopics(invalidCourseId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return chapter topics if given id valid', async () => {
    const validChapterId = 1;
    const validTopicId = 1;
    const chapter = {
      name: 'Chapter 1',
      topics: [
        { id: 1, name: 'Topico 1' },
        { id: 2, name: 'Topico 2' },
      ],
    };
    const formatedTopics = {
      index: 0,
      list: [
        { value: 1, label: 'Chapter 1 - Topico 1' },
        { value: 2, label: 'Chapter 1 - Topico 2' },
      ],
    };

    Chapter.findByPk.mockResolvedValue(chapter);

    const result = await chaptersController.findChapterTopics(validChapterId, validTopicId);

    expect(result).toEqual(expect.objectContaining({ ...formatedTopics }));
  });
});
