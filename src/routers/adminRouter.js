const router = require('express').Router();
const coursesController = require('../controllers/coursesController');
const NotFoundError = require('../errors/NotFoundError');

router.get('/courses', async (req, res) => {
  const courses = await coursesController.getAllCourses();
  res.send(courses);
});

router.get('/courses/:id', async (req, res) => {
  const courseId = +req.params.id;

  try {
    const course = await coursesController.findCourseById(courseId);

    return res.status(200).send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Course not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/courses/:id ' });
  }
});

router.post('/courses', async (req, res) => {

});

module.exports = router;
