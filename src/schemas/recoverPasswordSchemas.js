const Joi = require('joi');

const postEmail = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  postEmail,
};
