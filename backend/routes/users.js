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
router.get('/me', [passportJWT.isLogin], userController.getCurrentProfile);
router.get('/staff', userController.getStaff);
router.get('/:id', userController.show);

router.post('/', [upload.single('avatar')], userController.create);

router.patch('/:id', [passportJWT.isLogin, upload.single('avatar')], userController.update);

router.delete('/staff/:id', userController.deleteStaffWithProfile);
router.delete('/:id',[passportJWT.isLogin], userController.destroy);



module.exports = router;
