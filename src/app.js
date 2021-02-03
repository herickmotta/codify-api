require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const userRouter = require('./routers/userRouter');

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);

module.exports = app;
