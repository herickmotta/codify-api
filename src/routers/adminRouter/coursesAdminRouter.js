/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const coursesController = require('../../controllers/coursesController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');
const courseSchema = require('../../schemas/courseSchemas');

router.get('/', async (req, res) => {
  const courses = await coursesController.getAllCourses(req.queryConfig);
  const total = (await coursesController.getAllCourses()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${req.queryConfig.offset}-${courses.length}/${total}`,
  });
  return res.send(courses);
});

router.get('/:id', async (req, res) => {
  const courseId = +req.params.id;

  try {
    const course = await coursesController.findCourseById(courseId);

    return res.status(200).send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Course not found' });
    return res.status(500);
  }
});

router.post('/', async (req, res) => {
  const { error } = courseSchema.postCourse.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const course = await coursesController.createCourse(req.body);
    return res.status(201).send(course);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);
    return res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  const courseId = +req.params.id;
  const courseParams = req.body;
  courseParams.id = courseId;

  try {
    const course = await coursesController.editCourse(courseParams);
    return res.send(course);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500);
  }
});

router.delete('/:id', async (req, res) => {
  const courseId = +req.params.id;
  try {
    await coursesController.destroyCourse(courseId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500);
  }
});

module.exports = router;
