const LastTaskSeen = require('../models/LastTaskSeen');

class LastTaskSeenController {
  async createLastTaskSeen(userId, courseData) {
    const { id } = courseData;

    const chapterId = courseData.chapters[0].id;
    const topicId = courseData.chapters[0].topics[0].id;
    const theoryId = courseData.chapters[0].topics[0].theory.id;

    const lastTask = await LastTaskSeen.create({
      userId, courseId: id, chapterId, topicId, theoryId,
    });

    return lastTask;
  }

  async updateLastTaskSeen(userId, updateData) {
    const {
      courseId, chapterId, topicId, type,
    } = updateData;

    const lastTaskSeen = await LastTaskSeen.findOne({ where: { userId } });
    lastTaskSeen.courseId = courseId;
    lastTaskSeen.chapterId = chapterId;
    lastTaskSeen.topicId = topicId;

    if (type === 'Theory') {
      const { theoryId } = updateData;

      lastTaskSeen.theoryId = theoryId;
      lastTaskSeen.exerciseId = null;
    } if (type === 'Exercise') {
      const { exerciseId } = updateData;

      lastTaskSeen.theoryId = null;
      lastTaskSeen.exerciseId = exerciseId;
    }

    await lastTaskSeen.save();
    return lastTaskSeen;
  }

  async getLastTaskSeen(userId, courseId) {
    const lastTaskSeen = await lastTaskSeen.findOne({ where: { userId, courseId } });

    if (!lastTaskSeen) throw new CourseNotStarted();

    return lastTaskSeen;
  }
}

module.exports = new LastTaskSeenController();
