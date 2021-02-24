const Joi = require('joi');

const postExercise = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  wording: Joi.string().required(),
});

module.exports = {
  postExercise,
};
