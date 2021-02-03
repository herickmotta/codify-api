const router = require('express').Router();

const usersController = require('../controllers/usersController');
const signUpMiddleware = require('../middlewares/signUpMiddleware');

router.post('/signup', signUpMiddleware, async (req, res) => {
  const user = await usersController.create(req.body);

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(201).send(userData);
});

module.exports = router;
