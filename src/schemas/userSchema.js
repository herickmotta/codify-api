const joi = require('joi');

const signIn = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  signIn,
};
