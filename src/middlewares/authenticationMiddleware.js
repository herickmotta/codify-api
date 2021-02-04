/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const sessionController = require('../controllers/sessionController');

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  const token = authHeader.replace('JWT ', '');

  if (!token) return res.status(401).json({ error: 'No token provided.' });
  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    const session = await sessionController.findSessionByUserId(id);

    if (!session) res.status(401).json({ error: 'Failed to authenticate token.' });

    req.userId = id;
    next();
  } catch {
    return res.status(401).json({ error: 'Failed to authenticate token.' });
  }
}

module.exports = authenticationMiddleware;
