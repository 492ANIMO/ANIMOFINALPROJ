const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport') , 
LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('../middleware/passportJWT');
const passportLocal = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

const authController = require('../controllers/authController');


// middle ware
// const passportLocal = require('../middleware/checkAuth');

// -- auth using passport local -- //

// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/auth/login-failure',
//   successRedirect: '/auth/login-success'
// }), async (req, res) => {
//     const { email, password } = req.body;
//     return res.redirect('/');
// });

// router.get('/login-failure', (req, res) => {
//   res.status(200).json({
//     message: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
//   })
// })

// router.get('/login-success', (req, res) => {
//   res.status(200).json({
//     message: "เข้าสู่ระบบสำเร็จ",
//     user: req.user.email
//   })
// })

// router.get('/logout', (req, res) => {
//   req.logout()
//   res.status(200).json({
//     message: "ออกจากระบบสำเร็จ"
//   })
// })

// auth using passport JWT

router.post('/login', authController.login);
router.get('/logout', authController.logout);


module.exports = router;
