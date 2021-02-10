/* eslint-disable consistent-return */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const adminSchemas = require('../../schemas/adminSchemas');
const coursesAdminRouter = require('./coursesAdminRouter');
const chaptersAdminRouter = require('./chaptersAdminRouter');
const topicsAdminRouter = require('./topicsAdminRouter');
const exercisesAdminRouter = require('./exercisesAdminRouter');
const theoriesAdminRouter = require('./theoriesAdminRouter');
const authAdminMiddleware = require('../../middlewares/authAdminMiddleware');

router.post('/sign-in', (req, res) => {
  const { error } = adminSchemas.signIn.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const secretKey = process.env.SECRET;
    const token = jwt.sign('admin', secretKey, { expiresIn: '1h' });
    return res.send(token);
  }
  return res.sendStatus(409);
});

router.post('/sign-out', (req, res) => res.sendStatus(200));

router.use('/courses', authAdminMiddleware, coursesAdminRouter);
router.use('/chapters', authAdminMiddleware, chaptersAdminRouter);
router.use('/topics', authAdminMiddleware, topicsAdminRouter);
router.use('/exercises', authAdminMiddleware, exercisesAdminRouter);
router.use('/theories', authAdminMiddleware, theoriesAdminRouter);

module.exports = router;
