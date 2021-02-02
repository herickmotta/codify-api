const joi = require('joi');

const signIn = joi.object({
  email: joi.string().required(),
  password: joi.string().min(8).max(30).pattern(/^[a-zA-Z0-9]*$/)
    .required(),
});

module.exports = {
  signIn,
};
