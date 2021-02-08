const router = require('express').Router();
const coursesController = require('../controllers/coursesController');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const courseSchema = require('../schemas/courseSchemas');

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
  const { error } = courseSchema.postCourse.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const course = await coursesController.createCourse(req.body);
    return res.status(201).send(course);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/courses ' });
  }
});

router.put('/courses/:id', async (req, res) => {
  const courseId = +req.params.id;
  const courseParams = req.body;
  courseParams.id = courseId;

  try {
    const course = await coursesController.editCourse(courseParams);
    return res.send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/courses ' });
  }
});

module.exports = router;
