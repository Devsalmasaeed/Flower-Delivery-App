const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/userController');
const passport = require('passport');



router.get(
  '/secure',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ message: "You are authorized", user: req.user });
  }
);

// Sign up
router.post('/signup', signupUser);

// Login
router.post('/login', loginUser);

module.exports = router;
