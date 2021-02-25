/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./utils/loadRelationships');

const usersRouters = require('./routers/usersRouters');
const coursesRouter = require('./routers/coursesRouter');
const chaptersRouter = require('./routers/chaptersRouter');
const activitiesRouter = require('./routers/activitiesRouter');
const adminRouter = require('./routers/adminRouter');
const NotFoundError = require('./errors/NotFoundError');
const getQueriesMiddleware = require('./middlewares/getQueriesMiddleware');
const UnauthorizedError = require('./errors/UnauthorizedError');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRouters);

app.use('/api/v1/courses', coursesRouter);

app.use('/api/v1/chapters', chaptersRouter);

app.use('/api/v1/activities', activitiesRouter);

app.use('/api/v1/admin', getQueriesMiddleware, adminRouter);

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof NotFoundError) return res.status(404).send({ error: 'Not Found Error' });
  if (error instanceof UnauthorizedError) return res.status(401).send({ error: 'Unauthorized' });

  return res.sendStatus(500);
});

module.exports = app;
