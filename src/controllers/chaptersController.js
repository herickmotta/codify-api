/* eslint-disable no-param-reassign */
const Chapter = require('../models/Chapter');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

class ChaptersController {
  async findChapterById(chapterId) {
    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) throw new NotFoundError('Chapter not found');

    return chapter;
  }

  getAllChapters(limit = null, offset = null, courseId = null) {
    if (courseId) {
      return Chapter.findAll({ where: { courseId }, limit, offset });
    }
    return Chapter.findAll({ limit, offset });
  }

  async createChapter(chapterParams) {
    const { name } = chapterParams;
    const chapter = await Chapter.findOne({ where: { name } });
    if (chapter) throw new ConflictError('Chapter already exists');

    const createdChapter = await Chapter.create(chapterParams);
    return createdChapter;
  }

  async editChapter(chapterParams) {
    const {
      id, name,
    } = chapterParams;
    const chapter = await Chapter.findByPk(id);
    if (!chapter) throw new NotFoundError('Chapter not found');

    if (name) chapter.name = name;

    await chapter.save();
    return chapter;
  }

  async destroyChapter(chapterId) {
    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) throw new NotFoundError('Chapter not found');

    await Chapter.destroy({ where: { chapterId } });
  }
}

module.exports = new ChaptersController();
