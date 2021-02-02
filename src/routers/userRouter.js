const express = require('express');

const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

const userSchema = require('../schemas/userSchema');
const authController = require('../controllers/authController');

router.post('/signin', (req, res) => {
  const signInParams = req.body;

  const { error } = userSchema.signIn.validate(signInParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const userSession = authController.create(signInParams);

    return res.status(201).send(userSession);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(404).send({ error: 'Wrong email or password' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/user/signin ' });
  }
});

module.exports = router;
