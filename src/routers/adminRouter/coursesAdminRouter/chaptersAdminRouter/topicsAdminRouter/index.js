/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const topicsController = require('../../../../../controllers/topicsController');
const ConflictError = require('../../../../../errors/ConflictError');
const NotFoundError = require('../../../../../errors/NotFoundError');
// const topicSchema = require('../../schemas/topicSchemas');
const exercisesAdminRouter = require('./exercisesAdminRouter');
const theoriesAdminRouter = require('./theoriesAdminRouter');

router.use('/:id/exercises', exercisesAdminRouter);
router.use('/:id/theories', theoriesAdminRouter);

router.get('/', async (req, res) => {
  let limit = null;
  let offset = null;

  if (req.query.range) {
    const range = JSON.parse(req.query.range);
    limit = range[1] - range[0] + 1;
    offset = range[0];
  }

  const topics = await topicsController.getAllTopics(limit, offset);
  const total = (await topicsController.getAllTopics()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${offset}-${topics.length}/${total}`,
  });
  return res.send(topics);
});

router.get('/:id', async (req, res) => {
  const topicId = +req.params.id;

  try {
    const topic = await topicsController.findTopicById(topicId);

    return res.status(200).send(topic);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Topic not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/topics/:id ' });
  }
});

router.post('/', async (req, res) => {
  // const { error } = topicSchema.postTopic.validate(req.body);
  // if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const topic = await topicsController.createTopic(req.body);
    return res.status(201).send(topic);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/topics ' });
  }
});

router.put('/:id', async (req, res) => {
  const topicId = +req.params.id;
  const topicParams = req.body;
  topicParams.id = topicId;

  try {
    const topic = await topicsController.editTopic(topicParams);
    return res.send(topic);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/topics ' });
  }
});

router.delete('/:id', async (req, res) => {
  const topicId = +req.params.id;

  try {
    await topicsController.destroyTopic(topicId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/topics ' });
  }
});

module.exports = router;
