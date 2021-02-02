const router = require('express').Router();

const usersController = require('../controllers/usersController');
const signUpMiddleware = require('../middlewares/signUpMiddleware');

router.post('/sign-up', signUpMiddleware, async (req, res) => {
  const user = await usersController.create(req.body);

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return res.send(userData).status(201);
});

module.exports = router;
