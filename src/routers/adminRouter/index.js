/* eslint-disable prefer-destructuring */
const router = require('express').Router();
const coursesAdminRouter = require('./coursesAdminRouter');

router.use('/courses', coursesAdminRouter);

module.exports = router;
