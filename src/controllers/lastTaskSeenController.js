const LastTaskSeen = require('../models/LastTaskSeen');

class LastTaskSeenController {
  async createLastTaskSeen(userId, courseData) {
    const { courseId } = courseData;
    const chapterId = courseData.chapters[0].id;
    const topicId = courseData.chapters[0].topics[0].id;
    const theoryId = courseData.chapters[0].topics[0].theory.id;

    const lastTask = await LastTaskSeen.create({
      userId, courseId, chapterId, topicId, theoryId,
    });
    console.log(lastTask);
    return lastTask;
  }
}

module.exports = new LastTaskSeenController();
