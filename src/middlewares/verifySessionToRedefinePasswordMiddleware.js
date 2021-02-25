/* eslint-disable consistent-return */
const recoverPasswordSchemas = require('../schemas/recoverPasswordSchemas');
const User = require('../models/User');
const sessionController = require('../controllers/sessionController');

async function verifySessionToRedefinePasswordMiddleware(req, res, next) {
  const { error } = recoverPasswordSchemas.redefine.validate(req.body);
  if (error) {
    return res.status(422).send({ error: error.details[0].message });
  }

  const { id, token } = req.body;

  const user = await User.findByPk(id);
  if (!user) return res.status(404).send({ message: 'User not found' });

  await sessionController.verifySessionToRedefinePassword(id, token);

  req.user = user;
  next();
}

module.exports = verifySessionToRedefinePasswordMiddleware;
