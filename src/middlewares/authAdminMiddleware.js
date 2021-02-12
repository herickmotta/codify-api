/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');

function authAdminMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.replace('JWT ', '');
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (execption) {
    if (execption instanceof NotFoundError) return res.status(401).json({ error: 'Failed to authenticate token.' });
  }
}

module.exports = authAdminMiddleware;
