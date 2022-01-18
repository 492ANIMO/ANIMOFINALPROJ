const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController');

// middleware
const passportJWT = require('../middleware/passportJWT');
const passportLocal = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

/* GET users listing. */
router.get('/', [passportJWT.isLogin, checkRole.isAdmin], userController.index);
router.get('/me',[passportJWT.isLogin], userController.getCurrentProfile);
router.get('/logout', userController.logout);
router.get('/:id', userController.show);

router.post('/', [upload.single('avatar')], userController.create);

// router.patch('/staff/edit/:id', userController.updateStaffUser); //*
router.patch('/:id', [upload.single('avatar')], userController.update);

// router.delete('/staff/delete/:id', userController.destroyStaff);
router.delete('/:id', userController.destroy);
router.post('/login', userController.login);


module.exports = router;
