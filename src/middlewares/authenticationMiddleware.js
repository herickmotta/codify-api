/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const sessionController = require('../controllers/sessionController');
const NotFoundError = require('../errors/NotFoundError');

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  const token = authHeader.replace('JWT ', '');

  if (!token) return res.status(401).json({ error: 'No token provided.' });
  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    await sessionController.findSessionByUserId(id);

    req.userId = id;
    next();
  } catch (execption) {
    console.log(execption, 'aaaaaaaaaaaaaaaaaaaaa');
    if (execption instanceof NotFoundError) return res.status(401).json({ error: 'Failed to authenticate token.' });

    return res.status(500).json({ error: 'call the responsible person, routeError: /authenticationMiddleware ' });
  }
}

module.exports = authenticationMiddleware;
