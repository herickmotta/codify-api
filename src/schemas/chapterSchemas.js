const Joi = require('joi');

const postChapter = Joi.object({
  name: Joi.string().min(3).max(30)
    .required(),
  courseId: Joi.number().required(),
});

module.exports = {
  postChapter,
};
