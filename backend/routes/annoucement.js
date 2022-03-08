const express = require('express');
const router = express.Router();

const annoucementController = require('../controllers/annoucementController.js');
// middleware
const passportJWT = require('../middleware/passportJWT');
const passportLocal = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');

/* GET users listing. */
// router.get('/', [passportLocal.isLogin], annoucementController.index);
router.get('/', annoucementController.index);
router.get('/type/', annoucementController.filterByType);
router.get('/:id', annoucementController.show);
router.post('/', upload.single('img'), annoucementController.create);
router.delete('/:id', annoucementController.destroy);
router.patch('/:id', annoucementController.update);

module.exports = router;
