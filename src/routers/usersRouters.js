/* eslint-disable max-len */
const router = require('express').Router();

const usersController = require('../controllers/usersController');
const userSchemas = require('../schemas/userSchemas');
const authenticationController = require('../controllers/authenticationController');
const sessionController = require('../controllers/sessionController');
const signUpMiddleware = require('../middlewares/signUpMiddleware');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');
const UnauthorizedError = require('../errors/UnauthorizedError');
const lastTaskSeenController = require('../controllers/lastTaskSeenController');
const lastTaskSeenMiddleware = require('../middlewares/lastTaskSeenMiddleware');
const recoverPasswordMiddleware = require('../middlewares/recoverPasswordMiddleware');

router.post('/signup', signUpMiddleware, async (req, res) => {
  const user = await usersController.create(req.body);

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(201).send(userData);
});

router.post('/signin', async (req, res) => {
  const signInParams = req.body;

  const { error } = userSchemas.signIn.validate(signInParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const user = await authenticationController.verifyUserEmailAndPassword(signInParams);

    const userSession = await sessionController.createSession(user);

    return res.status(201).send(userSession);
  } catch (exception) {
    if (exception instanceof UnauthorizedError) return res.status(401).send({ error: 'Wrong email or password' });
    return res.sendStatus(500);
  }
});

router.get('/courses/:id/progress', authenticationMiddleware, async (req, res) => {
  const { userId } = req;
  const courseId = req.params.id;

  const progress = await usersController.getUserProgress(userId, courseId);

  return res.status(200).send(progress);
});

router.get('/courses/:courseId/chapters/:chapterId/progress', authenticationMiddleware, async (req, res) => {
  const { userId } = req;
  const { chapterId } = req.params;

  const topicsProgress = await usersController.getTopicsProgressByChapter(userId, chapterId);

  return res.status(200).send(topicsProgress);
});

router.post('/logout', authenticationMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    await sessionController.deleteSession(userId);

    return res.sendStatus(200);
  } catch (exception) {
    return res.sendStatus(500);
  }
});

router.put('/courses/:courseId/last-task-seen', authenticationMiddleware, lastTaskSeenMiddleware, async (req, res) => {
  const { userId } = req;

  const lastTaskSeen = await lastTaskSeenController.updateLastTaskSeen(userId, req.body);
  return res.status(200).send(lastTaskSeen);
});

router.get('/courses/:courseId/last-task-seen', authenticationMiddleware, async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  const lastTaskSeen = await lastTaskSeenController.getLastTaskSeen(userId, courseId);

  return res.status(200).send(lastTaskSeen);
});

router.post('/recover-password', recoverPasswordMiddleware, async (req, res) => {
  const { userData } = req;

  await usersController.sendEmailToRecoverPassword(userData);

  return res.sendStatus(200);
});

module.exports = router;
