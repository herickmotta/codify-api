/* eslint-disable no-param-reassign */
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');
const Theory = require('../models/Theory');
const Exercise = require('../models/Exercise');
const NotFoundError = require('../errors/NotFoundError');

class LessonsConstroller {
  async createLessonDone(lessonId, userId, type) {
    const checked = type === 'exercise'
      ? await Exercise.findByPk(lessonId)
      : await Theory.findByPk(lessonId);
    if (!checked) throw new NotFoundError();

    const result = type === 'exercise'
      ? await ExerciseDone.create({ userId, exerciseId: lessonId })
      : await TheoryDone.create({ userId, theoryId: lessonId });

    return result;
  }

  async destroyLessonDone(lessonId, userId, type) {
    if (type === 'exercise') {
      await ExerciseDone.destroy({ where: { userId, exerciseId: lessonId } });
    } else {
      await TheoryDone.destroy({ where: { userId, theoryId: lessonId } });
    }
  }
}

module.exports = new LessonsConstroller();
