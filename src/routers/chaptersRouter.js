const router = require('express').Router();

const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const chaptersController = require('../controllers/chaptersController');

router.get('/:chapterId/topics/:topicId', authenticationMiddleware, async (req, res) => {
  const { chapterId, topicId } = req.params;

  const result = await chaptersController.findChapterTopics(chapterId, topicId);

  return res.status(200).send(result);
});

module.exports = router;
