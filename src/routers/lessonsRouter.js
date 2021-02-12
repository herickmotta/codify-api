const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const lessonsController = require('../controllers/lessonsConstroller');

router.post('/:id', authenticationMiddleware, async (req, res) => {
  const { type, userId } = req.body;
  const lessonId = +req.params.id;

  const result = await lessonsController.createLessonDone(lessonId, userId, type);

  return res.status(201).send(result);
});

router.delete('/:id', authenticationMiddleware, async (req, res) => {
  const { type, userId } = req.body;
  const lessonId = +req.params.id;

  await lessonsController.destroyLessonDone(lessonId, userId, type);

  return res.sendStatus(200);
});

module.exports = router;
