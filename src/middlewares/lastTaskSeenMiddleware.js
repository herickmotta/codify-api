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
    return res.status(404).send({ message: 'Course not found' });
  }

  const { chapterId } = req.body;
  const validChapter = existingCourse.chapters.find((c) => c.id === chapterId);
  if (!validChapter) {
    return res.status(404).send({ message: 'Chapter not found' });
  }

  const { topicId } = req.body;
  const validTopic = validChapter.topics.find((t) => t.id === topicId);
  if (!validTopic) {
    return res.status(404).send({ message: 'Topic not found' });
  }

  const { type } = req.body;
  if (type === 'Theory') {
    const { theoryId } = req.body;
    const validTheory = validTopic.theory.id === theoryId;
    if (!validTheory) {
      return res.status(404).send({ message: 'Theory not found' });
    }
  }
  if (type === 'Exercise') {
    const { exerciseId } = req.body;
    const validExercise = validTopic.exercises.find((e) => e.id === exerciseId);
    if (!validExercise) {
      return res.status(404).send({ message: 'Exercise not found' });
    }
  }

  next();
}

module.exports = lastTaskSeenMiddleware;
