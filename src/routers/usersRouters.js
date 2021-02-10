const router = require('express').Router();

const usersController = require('../controllers/usersController');
const userSchemas = require('../schemas/userSchemas');
const authenticationController = require('../controllers/authenticationController');
const sessionController = require('../controllers/sessionController');
const signUpMiddleware = require('../middlewares/signUpMiddleware');
const UnauthorizedError = require('../errors/UnauthorizedError');

router.post('/signup', signUpMiddleware, async (req, res) => {
  const user = await usersController.create(req.body);

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(201).send(userData);
});

router.post('/signin', async (req, res) => {
  const signInParams = req.body;

  const { error } = userSchemas.signIn.validate(signInParams);
  if (error) return res.status(422).send({ error: error.details[0].message });

  try {
    const user = await authenticationController.verifyUserEmailAndPassword(signInParams);

    const userSession = await sessionController.createSession(user);

    return res.status(201).send(userSession);
  } catch (exception) {
    if (exception instanceof UnauthorizedError) return res.status(401).send({ error: 'Wrong email or password' });

    return res.status(500).send({ error: 'call the responsible person, routeError: /api/v1/user/signin ' });
  }
});

module.exports = router;
