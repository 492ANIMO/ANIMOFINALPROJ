const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController');

// middle ware
const passportLocal = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

/* GET users listing. */
router.get('/', [passportLocal.isLogin, checkRole.isAdmin], userController.index);
router.get('/me', [passportLocal.isLogin], userController.getCurrentProfile);
router.get('/:id', userController.show);


router.post('/register-client',
[ body('name').not().isEmpty().withMessage('กรุณากรอกข้อมูลชื่อสกุล'),
  body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลล์').isEmail().withMessage('รูปแบบอีเมลล์ไม่ถูกต้อง'),
  body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min: 6}).withMessage('รหัสผ่านต้อง 6 ตัวอักษรขึ้นไป'),
  body('contact').not().isEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์'),
  upload.single('avatar'),
] , userController.createClientUser);

router.post('/register-staff',
[ body('name').not().isEmpty().withMessage('กรุณากรอกข้อมูลชื่อสกุล'),
  body('email').not().isEmpty().withMessage('กรุณากรอกอีเมลล์').isEmail().withMessage('รูปแบบอีเมลล์ไม่ถูกต้อง'),
  body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({min: 6}).withMessage('รหัสผ่านต้อง 6 ตัวอักษรขึ้นไป'),
  body('contact').not().isEmpty().withMessage('กรุณากรอกเบอร์โทรศัพท์'),
  upload.single('avatar'),
] , userController.createStaffUser);

router.post('/', userController.create);

router.patch('/staff/edit/:id', userController.updateStaffUser); //*
router.patch('/:id', userController.update);

router.delete('/staff/delete/:id', userController.destroyStaff);
router.delete('/:id', userController.destroy);

module.exports = router;
