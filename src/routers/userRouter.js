const express = require('express');

const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

const userSchema = require('../schemas/userSchema');
const authenticationController = require('../controllers/authenticationController');
const sessionController = require('../controllers/sessionController');

router.post('/signin', (req, res) => {
  const signInParams = req.body;

  const { error } = userSchema.signIn.validate(signInParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const user = authenticationController.verifyUserEmailAndPassword(signInParams);
    const userSession = sessionController.createSession(user);

    return res.status(201).send(userSession);
  } catch (exception) {
    if (exception instanceof NotFoundError) return res.status(401).send({ error: 'Wrong email or password' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/user/signin ' });
  }
});

module.exports = router;
