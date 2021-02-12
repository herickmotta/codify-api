const Joi = require('joi');

const postTopic = Joi.object({
  name: Joi.string().min(3).max(30)
    .required(),
  chapterId: Joi.number().required(),
});

module.exports = {
  postTopic,
};
