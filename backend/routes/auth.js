const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// middle ware
const passportLocal = require('../middleware/checkAuth');

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/login-failure',
  successRedirect: '/auth/login-success'
}), async (req, res) => {
    const { email, password } = req.body;
    return res.redirect('/');
});


router.get('/login-failure', (req, res) => {
  res.status(200).json({message: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"})
})
router.get('/login-success', (req, res) => {
  res.status(200).json({message: "เข้าสู่ระบบสำเร็จ"})
})

router.get('/logout', (req, res) => {
  req.logout()
  res.send('ออกจากระบบสำเร็จ');
})

module.exports = router;
