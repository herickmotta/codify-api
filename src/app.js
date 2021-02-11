/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

require('./utils/loadRelationships');

const usersRouters = require('./routers/usersRouters');
const coursesRouter = require('./routers/coursesRouter');
const adminRouter = require('./routers/adminRouter');
const getQueriesMiddleware = require('./middlewares/getQueriesMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', usersRouters);

app.use('/api/v1/courses', coursesRouter);

app.use('/api/v1/admin', getQueriesMiddleware, adminRouter);

app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

module.exports = app;
