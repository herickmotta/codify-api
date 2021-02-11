/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const topicsController = require('../../controllers/topicsController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');
const topicSchemas = require('../../schemas/topicSchemas');

router.get('/', async (req, res) => {
  const { chapterId } = JSON.parse(req.query.filter);
  const topics = await topicsController.getAllTopics(req.queryConfig, chapterId);
  const total = (await topicsController.getAllTopics()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${req.queryConfig.offset}-${topics.length}/${total}`,
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

    return res.status(500);
  }
});

router.post('/', async (req, res) => {
  const { error } = topicSchemas.postTopic.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const topic = await topicsController.createTopic(req.body);
    return res.status(201).send(topic);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500);
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
    return res.status(500);
  }
});

router.delete('/:id', async (req, res) => {
  const topicId = +req.params.id;

  try {
    await topicsController.destroyTopic(topicId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500);
  }
});

module.exports = router;
