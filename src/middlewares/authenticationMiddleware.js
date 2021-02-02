/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

async function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers('Authorization');
  const token = authHeader.replace('JWT ', '');

  if (!token) return res.status(401).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) return res.status(401).json({ message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

module.exports = authenticationMiddleware;
