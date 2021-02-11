/* eslint-disable no-param-reassign */
const TheoryDone = require('../models/TheoryDone');
const ExerciseDone = require('../models/ExerciseDone');

class LessonsConstroller {
  async createLessonDone(lessonId, userId, type) {
    let done;

    if (type === 'exercise') {
      done = await ExerciseDone.create({ userId, exerciseId: lessonId });
    } else {
      done = await TheoryDone.create({ userId, theoryId: lessonId });
    }

    return done;
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
