/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const exercisesController = require('../../controllers/exercisesController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');
// const exerciseSchema = require('../../schemas/exerciseSchemas');

router.get('/', async (req, res) => {
  const { topicId } = JSON.parse(req.query.filter);
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

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/exercises/:id ' });
  }
});

router.post('/', async (req, res) => {
  // const { error } = exerciseSchema.postExercise.validate(req.body);
  // if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const exercise = await exercisesController.createExercise(req.body);
    return res.status(201).send(exercise);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/exercises ' });
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
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/exercises ' });
  }
});

router.delete('/:id', async (req, res) => {
  const exerciseId = +req.params.id;

  try {
    await exercisesController.destroyExercise(exerciseId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/exercises ' });
  }
});

module.exports = router;
