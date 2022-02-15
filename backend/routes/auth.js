const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('../middleware/passportJWT');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

const authController = require('../controllers/authController');

// auth using passport JWT
router.post('/login', authController.login);
router.get('/logout', [passportJWT.isLogin], authController.logout);


module.exports = router;
