/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const chaptersController = require('../../controllers/chaptersController');
const ConflictError = require('../../errors/ConflictError');
const NotFoundError = require('../../errors/NotFoundError');
// const chapterSchema = require('../../schemas/chapterSchemas');

router.get('/', async (req, res) => {
  const { courseId } = JSON.parse(req.query.filter);
  let limit = null;
  let offset = null;

  if (req.query.range) {
    const range = JSON.parse(req.query.range);
    limit = range[1] - range[0] + 1;
    offset = range[0];
  }

  const chapters = await chaptersController.getAllChapters(limit, offset, courseId);
  const total = (await chaptersController.getAllChapters()).length;
  res.set({
    'Access-Control-Expose-Headers': 'Content-Range',
    'Content-Range': `${offset}-${chapters.length}/${total}`,
  });
  return res.send(chapters);
});

router.get('/:id', async (req, res) => {
  const chapterId = +req.params.id;

  try {
    const chapter = await chaptersController.findChapterById(chapterId);
    return res.status(200).send(chapter);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Chapter not found' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/chapters/:id ' });
  }
});

router.post('/', async (req, res) => {
  // const { error } = chapterSchema.postChapter.validate(req.body);
  // if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const chapter = await chaptersController.createChapter(req.body);
    return res.status(201).send(chapter);
  } catch (exception) {
    if (exception instanceof ConflictError) return res.status(409).send(exception.message);

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/chapters ' });
  }
});

router.put('/:id', async (req, res) => {
  const chapterId = +req.params.id;
  const chapterParams = req.body;
  chapterParams.id = chapterId;

  try {
    const chapter = await chaptersController.editChapter(chapterParams);
    return res.send(chapter);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/chapters ' });
  }
});

router.delete('/:id', async (req, res) => {
  const chapterId = +req.params.id;

  try {
    await chaptersController.destroyChapter(chapterId);
    return res.sendStatus(200);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send(exception.message);
    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/admin/chapters ' });
  }
});

module.exports = router;
