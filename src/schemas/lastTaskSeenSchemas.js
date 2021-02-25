const Joi = require('joi');

const update = Joi.object({
  courseId: Joi.number().integer().required(),
  chapterId: Joi.number().integer().required(),
  topicId: Joi.number().integer().required(),
  type: Joi.string().valid('Theory', 'Exercise').required(),
  theoryId: Joi.number().integer(),
  exerciseId: Joi.number().integer(),
});

module.exports = {
  update,
};
