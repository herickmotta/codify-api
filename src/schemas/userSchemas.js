const Joi = require('joi');

const postUser = Joi.object({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).pattern(/^[a-zA-Z0-9]*$/)
    .required(),
  passwordConfirmation: Joi.ref('password'),
});

module.exports = {
  postUser,
};
