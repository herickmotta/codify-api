const Joi = require('joi');

const postCourse = Joi.object({
  name: Joi.string().min(3).max(30)
    .required(),
  description: Joi.string().min(5).max(40).required(),
  photo: Joi.string().uri().required(),
});

module.exports = {
  postCourse,
};
