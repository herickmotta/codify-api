/* eslint-disable consistent-return */
const userSchemas = require('../schemas/userSchemas');
const User = require('../models/User');

async function editProfiledMiddleware(req, res, next) {
  const { error } = userSchemas.editProfile.validate(req.body);
  if (error) {
    return res.status(422).send({ error: error.details[0].message });
  }

  const { userId } = req;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).send({ error: 'User not found' });

  req.userDataToEdit = req.body;
  req.user = user;
  next();
}

module.exports = editProfiledMiddleware;
