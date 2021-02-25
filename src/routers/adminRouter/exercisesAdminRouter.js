/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const exercisesController = require('../../controllers/exercisesController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');

router.get('/', async (req, res) => {
  let topicId = null;
  if (req.query.filter) {
    const filter = JSON.parse(req.query.filter);
    topicId = filter.topicId;
  }
  const exercises = await exercisesController.getAllExercises(req.queryConfig, topicId);
  const total = (await exercisesController.getAllExercises()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${req.queryConfig.offset}-${exercises.length}/${total}`,
  });
  return res.send(exercises);
});

router.get('/:id', async (req, res) => {
  const exerciseId = +req.params.id;

  try {
    const exercise = await exercisesController.findExerciseById(exerciseId);

    return res.status(200).send(exercise);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Exercise not found' });
    return res.status(500);
  }
});

router.post('/', async (req, res) => {
  try {
    const exercise = await exercisesController.createExercise(req.body);
    return res.status(201).send(exercise);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  const exerciseId = +req.params.id;
  const exerciseParams = req.body;
  exerciseParams.id = exerciseId;

  try {
    const exercise = await exercisesController.editExercise(exerciseParams);
    return res.send(exercise);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500);
  }
});

router.delete('/:id', async (req, res) => {
  const exerciseId = +req.params.id;

  try {
    await exercisesController.destroyExercise(exerciseId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500);
  }
});

module.exports = router;
