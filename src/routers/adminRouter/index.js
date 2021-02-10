const router = require('express').Router();

const coursesAdminRouter = require('./coursesAdminRouter');
const chaptersAdminRouter = require('./chaptersAdminRouter');
const topicsAdminRouter = require('./topicsAdminRouter');
const exercisesAdminRouter = require('./exercisesAdminRouter');
const theoriesAdminRouter = require('./theoriesAdminRouter');

router.use('/courses', coursesAdminRouter);
router.use('/chapters', chaptersAdminRouter);
router.use('/topics', topicsAdminRouter);
router.use('/exercises', exercisesAdminRouter);
router.use('/theories', theoriesAdminRouter);

module.exports = router;
