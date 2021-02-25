/* eslint-disable consistent-return */
const recoverPasswordSchemas = require('../schemas/recoverPasswordSchemas');
const User = require('../models/User');

async function recoverPasswordMiddleware(req, res, next) {
  const { error } = recoverPasswordSchemas.postEmail.validate(req.body);
  if (error) {
    return res.status(422).send({ error: error.details[0].message });
  }

  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).send({ error: 'There is not a account with this email' });

  req.userData = { id: user.id, email: user.email, name: user.name };

  next();
}

module.exports = recoverPasswordMiddleware;
