/* eslint-disable consistent-return */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const adminSchemas = require('../../schemas/adminSchemas');
const coursesAdminRouter = require('./coursesAdminRouter');
const chaptersAdminRouter = require('./chaptersAdminRouter');
const topicsAdminRouter = require('./topicsAdminRouter');
const exercisesAdminRouter = require('./exercisesAdminRouter');
const theoriesAdminRouter = require('./theoriesAdminRouter');

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

router.use('/courses', coursesAdminRouter);
router.use('/chapters', chaptersAdminRouter);
router.use('/topics', topicsAdminRouter);
router.use('/exercises', exercisesAdminRouter);
router.use('/theories', theoriesAdminRouter);

module.exports = router;
