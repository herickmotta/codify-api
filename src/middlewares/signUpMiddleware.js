/* eslint-disable consistent-return */
const User = require('../models/User');
const userSchemas = require('../schemas/userSchemas');

async function signUpMiddleware(req, res, next) {
  const userValidation = userSchemas.postUser.validate(req.body);
  if (userValidation.error) {
    return res.status(422).send({ error: userValidation.error.details[0].message });
  }

  delete req.body.passwordConfirmation;

  const { email } = req.body;
  const existingEmail = await User.findOne({ where: { email } });
  if (existingEmail) {
    return res.sendStatus(409);
  }

  next();
}

module.exports = signUpMiddleware;
