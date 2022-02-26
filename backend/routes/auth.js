const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('../middleware/passportJWT');

const authController = require('../controllers/authController');

// auth using passport JWT
router.post('/login', authController.login);
router.post('/login/client', authController.loginClient);

router.get('/logout', [passportJWT.isLogin], authController.logout);

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleAuth)


module.exports = router;
