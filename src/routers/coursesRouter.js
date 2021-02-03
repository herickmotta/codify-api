const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const coursesController = require('../controllers/coursesController');

router.get('/:id', authenticationMiddleware, async (req, res) => {
  const { id } = req.body;
  const course = await coursesController.getOne(id);

  return res.send(course);
});

router.get('/', authenticationMiddleware, async (req, res) => {
  const courses = await coursesController.getAll();

  return res.send(courses);
});

module.exports = router;
