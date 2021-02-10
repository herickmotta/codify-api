const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const coursesController = require('../controllers/coursesController');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

router.get('/:id', authenticationMiddleware, async (req, res) => {
  const courseId = +req.params.id;

  try {
    const course = await coursesController.findCourseById(courseId);

    return res.status(200).send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Course not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses/:id' });
  }
});

router.get('/', authenticationMiddleware, async (req, res) => {
  try {
    const courses = await coursesController.getAllCourses();

    return res.status(200).send(courses);
  } catch {
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses ' });
  }
});

router.post('/start', authenticationMiddleware, async (req, res) => {
  const { userId } = req;
  const { courseId } = req.body;

  try {
    const course = await coursesController.findCourseById(courseId);
    await coursesController.startCourse({ userId, courseId });

    return res.status(201).send({ ...course, userId });
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send({ error: 'This user has already started this course' });

    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Course not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses/start ' });
  }
});

router.get('/users/started', authenticationMiddleware, async (req, res) => {
  const { userId } = req;
  try {
    const courses = await coursesController.getAllCoursesThatUserStarted(userId);

    const cleanedCourses = courses.map(({ dataValues }) => {
      const data = dataValues;
      delete data.courseUser;
      delete data.createdAt;
      delete data.updatedAt;
      return data;
    });

    return res.status(200).send(cleanedCourses);
  } catch {
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses/user/started ' });
  }
});

module.exports = router;
