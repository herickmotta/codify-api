/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers('Authorization');
  const token = authHeader.replace('JWT ', '');

  if (!token) return res.status(401).json({ message: 'No token provided.' });
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Failed to authenticate token.' });
  }
}

module.exports = authenticationMiddleware;
