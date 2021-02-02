const router = require('express').Router();

const usersController = require('../controllers/usersController');
const signUpMiddleware = require('../middlewares/signUpMiddleware');

router.post('/sign-up', signUpMiddleware, async (req, res) => {
  usersController.create(req.body);

  return res.sendStatus(201);
});

module.exports = router;
