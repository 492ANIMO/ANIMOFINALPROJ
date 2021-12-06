const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// middle ware
const passportLocal = require('../middleware/checkAuth');

/* GET home page. */
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login-failure',
  successRedirect: '/'
}), async (req, res) => {
    const { email, password } = req.body;

    return res.redirect('/');
});

router.get('/login-failure', (req, res) => {
  res.status(200).json({message: "failure login"})
})
router.get('/login-success', (req, res) => {
  res.status(200).json({message: "success login"})
})

router.get('/logout', (req, res) => {
  req.logout()
  // res.redirect('/')

  res.send('logout สำเร็จ');
})

module.exports = router;
