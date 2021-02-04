/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const sessionController = require('../controllers/sessionController');

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log(authHeader);
  const token = authHeader.replace('JWT ', '');

  console.log(token);

  if (!token) return res.status(401).json({ error: 'No token provided.' });
  try {
    const { id } = jwt.verify(token, process.env.SECRET);

    console.log(id, ' aaaaaaaaaaaaaaa');

    const session = await sessionController.findSessionByUserId(id);
    console.log(session, 'aaaaaaaaaa');
    if (!session) res.status(401).json({ error: 'Failed to authenticate token.' });

    req.userId = id;
    next();
  } catch {
    return res.status(401).json({ error: 'Failed to authenticate token.' });
  }
}

module.exports = authenticationMiddleware;
