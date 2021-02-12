const Joi = require('joi');

const signIn = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { signIn };
