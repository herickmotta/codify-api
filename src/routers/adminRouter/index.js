/* eslint-disable consistent-return */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const adminSchemas = require('../../schemas/adminSchemas');
const coursesAdminRouter = require('./coursesAdminRouter');
const chaptersAdminRouter = require('./chaptersAdminRouter');
const topicsAdminRouter = require('./topicsAdminRouter');
const exercisesAdminRouter = require('./exercisesAdminRouter');
const theoriesAdminRouter = require('./theoriesAdminRouter');
const NotFoundError = require('../../errors/NotFoundError');

router.post('/sign-in', (req, res) => {
  const { error } = adminSchemas.signIn.validate(req.body);
  if (error) return res.status(422).send({ error: error.details[0].message });
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const data = '';
    const secretKey = process.env.SECRET;
    const token = jwt.sign(data, secretKey);
    return res.send(token);
  }
  return res.sendStatus(409);
});

router.use('/', (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.replace('JWT ', '');

  if (!token) return res.status(401).json({ error: 'No token provided.' });
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (execption) {
    if (execption instanceof NotFoundError) return res.status(401).json({ error: 'Failed to authenticate token.' });
    return res.status(500).json({ error: 'call the responsible person, routeError: /admin/sign-in ' });
  }
});

router.use('/courses', coursesAdminRouter);
router.use('/chapters', chaptersAdminRouter);
router.use('/topics', topicsAdminRouter);
router.use('/exercises', exercisesAdminRouter);
router.use('/theories', theoriesAdminRouter);

module.exports = router;
