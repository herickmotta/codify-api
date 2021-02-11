/* eslint-disable no-param-reassign */
const Chapter = require('../models/Chapter');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const Topic = require('../models/Topic');
const topicsController = require('./topicsController');

class ChaptersController {
  async findChapterById(chapterId) {
    const chapter = await Chapter.findByPk(chapterId);
    if (!chapter) throw new NotFoundError('Chapter not found');

    return chapter;
  }

  getAllChapters(queryConfig, courseId = null) {
    if (courseId) {
      return Chapter.findAll({ where: { courseId }, ...queryConfig });
    }
    return Chapter.findAll(queryConfig);
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

    const topics = await Topic.findAll({ where: { chapterId } });
    const promises = topics.map((topic) => topicsController.destroyTopic(topic.id));
    await Promise.all(promises);

    await Chapter.destroy({ where: { id: chapterId } });
  }
}

module.exports = new ChaptersController();
