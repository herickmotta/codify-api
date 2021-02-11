/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const theoriesController = require('../../controllers/theoriesController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');
// const theorySchema = require('../../schemas/theorySchemas');

router.get('/', async (req, res) => {
  const { topicId } = JSON.parse(req.query.filter);

  const theories = await theoriesController.getAllTheories(req.queryConfig, topicId);
  const total = (await theoriesController.getAllTheories()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${req.queryConfig.offset}-${theories.length}/${total}`,
  });
  return res.send(theories);
});

router.get('/:id', async (req, res) => {
  const theoryId = +req.params.id;

  try {
    const theory = await theoriesController.findTheoryById(theoryId);

    return res.status(200).send(theory);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Theory not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/theories/:id ' });
  }
});

router.post('/', async (req, res) => {
  // const { error } = theorySchema.postTheory.validate(req.body);
  // if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const theory = await theoriesController.createTheory(req.body);
    return res.status(201).send(theory);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/theories ' });
  }
});

router.put('/:id', async (req, res) => {
  const theoryId = +req.params.id;
  const theoryParams = req.body;
  theoryParams.id = theoryId;

  try {
    const theory = await theoriesController.editTheory(theoryParams);
    return res.send(theory);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/theories ' });
  }
});

router.delete('/:id', async (req, res) => {
  const theoryId = +req.params.id;

  try {
    await theoriesController.destroyTheory(theoryId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/theories ' });
  }
});

module.exports = router;
