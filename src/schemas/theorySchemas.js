const Joi = require('joi');

const postTheory = Joi.object({
  youtubeLink: Joi.string().uri()
    .required(),
  topicId: Joi.number().required(),
});

module.exports = {
  postTheory,
};
