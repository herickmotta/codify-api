const Joi = require('joi');

const postEmail = Joi.object({
  email: Joi.string().email().required(),
});

const redefine = Joi.object({
  id: Joi.number().integer().required(),
  token: Joi.string().required(),
  password: Joi.string().min(8).max(30).pattern(/^[a-zA-Z0-9]*$/)
    .required(),
  passwordConfirmation: Joi.ref('password'),
});

module.exports = {
  postEmail,
  redefine,
};
