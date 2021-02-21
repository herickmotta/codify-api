const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const activitiesConstroller = require('../controllers/activitiesConstroller');

router.post('/:id', authenticationMiddleware, async (req, res) => {
  const { type } = req.body;
  const lessonId = +req.params.id;
  const { userId } = req;

  const result = await activitiesConstroller.createActivityDone(lessonId, userId, type);

  return res.status(201).send(result);
});

router.delete('/:id', authenticationMiddleware, async (req, res) => {
  const { type } = req.body;
  const lessonId = +req.params.id;
  const { userId } = req;

  await activitiesConstroller.destroyActivityDone(lessonId, userId, type);

  return res.sendStatus(200);
});

module.exports = router;
