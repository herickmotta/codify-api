/* eslint-disable consistent-return */
const coursesControllers = require('../controllers/coursesController');
const lastTaskSeenSchemas = require('../schemas/lastTaskSeenSchemas');

async function lastTaskSeenMiddleware(req, res, next) {
  const { error } = lastTaskSeenSchemas.update.validate(req.body);
  if (error) {
    return res.status(422).send({ error: error.details[0].message });
  }

  const { courseId } = req.body;
  const existingCourse = await coursesControllers.findCourseById(courseId);
  if (!existingCourse) {
    return res.status(404).send({ message: 'Invalid course' });
  }

  const { chapterId } = req.body;
  const validChapter = existingCourse.chapters.find((c) => c.id === chapterId);
  if (!validChapter) {
    return res.status(404).send({ message: 'Invalid chapter id' });
  }

  const { topicId } = req.body;
  const validTopic = validChapter.topics.find((t) => t.id === topicId);
  if (!validTopic) {
    return res.status(404).send({ message: 'Invalid topic id' });
  }

  const { type } = req.body;
  if (type === 'Theory') {
    const { theoryId } = req.body;
    const validTheory = validTopic.theory.id === theoryId;
    if (!validTheory) {
      return res.status(404).send({ message: 'Invalid theory id' });
    }
  }
  if (type === 'Exercise') {
    const { exerciseId } = req.body;
    const validExercise = validTopic.exercises.find((e) => e.id === exerciseId);
    if (!validExercise) {
      return res.status(404).send({ message: 'Invalid exercise id' });
    }
  }

  next();
}

module.exports = lastTaskSeenMiddleware;
