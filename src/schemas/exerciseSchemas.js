const Joi = require('joi');

const postExercise = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  wording: Joi.string().required(),
  example: Joi.string().required(),
  defaultCode: Joi.string().required(),
  test: Joi.string().required(),
  solution: Joi.string().required(),
  topicId: Joi.number().required(),
});

module.exports = {
  postExercise,
};
