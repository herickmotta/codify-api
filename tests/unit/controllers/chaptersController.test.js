/* eslint-disable no-undef */
const NotFoundError = require('../../../src/errors/NotFoundError');
const chaptersController = require('../../../src/controllers/chaptersController');

jest.mock('../../../src/models/Chapter');
const Chapter = require('../../../src/models/Chapter');
const ConflictError = require('../../../src/errors/ConflictError');

describe('chaptersController.findChapterById', () => {
  it('Should throw an error if given id invalid', async () => {
    const chapterNotFound = null;
    const invalidChapterId = null;

    await Chapter.findByPk.mockResolvedValue(chapterNotFound);

    const fn = async () => {
      await chaptersController.findChapterById(invalidChapterId);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a chapter if given id valid', async () => {
    const chapter = {
      id: 1,
      name: 'Chapter Test',
    };
    const validChapterId = 1;

    await Chapter.findByPk.mockResolvedValue(chapter);
    const result = await chaptersController.findChapterById(validChapterId);

    expect(result).toEqual(expect.objectContaining({ ...chapter }));
  });
});

describe('chaptersController.getAllChapters', () => {
  it('Should return a empty array of chapters when we dont have chapters', async () => {
    const chapters = [];

    await Chapter.findByPk.mockResolvedValue(chapters);
    const result = await chaptersController.getAllChapters();

    expect(result).toEqual(expect.objectContaining([]));
  });
});

describe('chaptersController.createChapter', () => {
  it('Should return a created chapter', async () => {
    const chapter = {
      id: 1,
      name: 'This is a name',
    };
    await Chapter.findOne.mockResolvedValue(null);
    await Chapter.create.mockResolvedValue(chapter);

    const result = await chaptersController.createChapter(chapter);

    expect(result).toEqual(expect.objectContaining(chapter));
  });

  it('Should throw error if given duplicate chapter name', async () => {
    const chapter = {
      id: 1,
      name: 'This is a name',
    };
    await Chapter.findOne.mockResolvedValue(chapter);

    const fn = async () => {
      await chaptersController.createChapter(chapter);
    };

    expect(fn).rejects.toThrow(ConflictError);
  });
});

describe('chaptersController.editChapter', () => {
  it('Should throw error if given invalid id', async () => {
    const chapter = {
      id: 1,
      name: 'This is a name',
    };
    await Chapter.findByPk.mockResolvedValue(null);

    const fn = async () => {
      await chaptersController.editChapter(chapter);
    };

    expect(fn).rejects.toThrow(NotFoundError);
  });

  it('Should return a edited chapter', async () => {
    const editedChapter = {
      id: 1,
      name: 'This is a edited name',
    };
    await Chapter.findByPk.mockResolvedValue({
      id: 1,
      name: 'This is a name',
      save: async () => Promise.resolve(),
    });

    const result = await chaptersController.editChapter(editedChapter);

    expect(result).toEqual(expect.objectContaining({
      id: 1,
      name: 'This is a edited name',
    }));
  });
});
