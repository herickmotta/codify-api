const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const coursesController = require('../controllers/coursesController');
const topicsController = require('../controllers/topicsController');
const NotFoundError = require('../errors/NotFoundError');

router.get('/:id', authenticationMiddleware, async (req, res) => {
  const courseId = +req.params.id;

  try {
    const course = await coursesController.findCourseById(courseId);

    return res.status(200).send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Course not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses/:id ' });
  }
});

router.get('/', authenticationMiddleware, async (req, res) => {
  const courses = await coursesController.getAllCourses();

  return res.send(courses);
});

router.get('/:id/chapters/:id/topics', async (req, res) => {
  const chapterId = +req.params.id;
  const topics = await topicsController.findAllCourseTopics(chapterId);
  return res.send({ chapterId, topics });
});

module.exports = router;
